import { NextFunction, Response } from 'express'
import { Request } from 'express-jwt'
import { CouponCodeRequest, verifyCouponRequest } from './coupon-types'
import CouponService from './coupon-service'
import createHttpError from 'http-errors'

class CouponController {
    constructor(private couponService: CouponService) {}
    createCoupon = async (req: Request, res: Response) => {
        const { code, discount, title, tenantId, validUpto } =
            req.body as CouponCodeRequest

        const coupon = await this.couponService.create({
            code,
            discount,
            title,
            tenantId,
            validUpto,
        })

        res.status(200).json(coupon)
    }

    getCoupons = async (req: Request, res: Response) => {
        const coupons = await this.couponService.find()
        res.status(200).json(coupons)
    }

    getCoupon = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const existingCode = await this.couponService.findById(id)

        if (!existingCode) {
            return next(createHttpError(404, 'Coupon not found'))
        }

        res.status(200).json(existingCode)
    }

    updateCoupon = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const existingCode = await this.couponService.findById(id)

        if (!existingCode) {
            return next(createHttpError(404, 'Coupon not found'))
        }
        res.status(200).json({ message: 'hello' })
    }

    deleteCoupon = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const existingCode = await this.couponService.findById(id)

        if (!existingCode) {
            return next(createHttpError(404, 'Coupon not found'))
        }

        res.status(200).json({ message: 'hello' })
    }

    verifyCoupon = async (req: Request, res: Response, next: NextFunction) => {
        const { code, tenantId } = req.body as verifyCouponRequest

        const existingCode = await this.couponService.findByIdAndCode({
            tenantId,
            code,
        })

        if (!existingCode) {
            return next(createHttpError(404, 'Coupon not found'))
        }

        const currentDate = new Date()
        const couponDate = new Date(existingCode.validUpto)

        if (currentDate <= couponDate) {
            res.json({ valid: true, discount: existingCode.discount })
        }

        res.json({ valid: false, discount: 0 })
    }
}

export default CouponController
