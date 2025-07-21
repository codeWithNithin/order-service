import couponModel from './coupon-model'
import { CouponCodeRequest, verifyCouponRequest } from './coupon-types'

export default class CouponService {
    create = async (couponRequest: CouponCodeRequest) => {
        return await couponModel.create(couponRequest)
    }

    find = async () => {
        return await couponModel.find()
    }

    findById = async (id: string) => {
        return await couponModel.findById(id)
    }

    findByIdAndCode = async (data: verifyCouponRequest) => {
        return await couponModel.findOne(data)
    }

    findByIdAndUpdate = async (
        id: string,
        data: Partial<CouponCodeRequest>,
    ) => {
        return await couponModel.findOneAndUpdate({ _id: id }, data, {
            new: true,
        })
    }

    findByIdAndDelete = async (id: string) => {
        return await couponModel.findByIdAndDelete(id)
    }
}
