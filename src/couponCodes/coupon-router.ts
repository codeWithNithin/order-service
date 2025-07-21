import { Router } from 'express'
import CouponController from './coupon-controller'
import authenticate from '../common/middlewares/authenticate'
import { canAccess } from '../common/middlewares/canAccess'
import { Roles } from '../common/constants'
import CouponService from './coupon-service'
import createCouponValidator from './create-coupon-validator'
import asyncWrapper from '../common/utils/asyncWrapper'

const router = Router()

const couponService = new CouponService()
const couponController = new CouponController(couponService)

router.post(
    '/',
    authenticate,
    canAccess([Roles.ADMIN, Roles.MANAGER]),
    createCouponValidator,
    couponController.createCoupon,
)
router.get(
    '/',
    authenticate,
    canAccess([Roles.ADMIN, Roles.MANAGER]),
    couponController.getCoupons,
)
router.get(
    '/:id',
    authenticate,
    canAccess([Roles.ADMIN, Roles.MANAGER]),
    couponController.getCoupon,
)
router.patch(
    '/:id',
    authenticate,
    canAccess([Roles.ADMIN, Roles.MANAGER]),
    couponController.updateCoupon,
)
router.delete(
    '/:id',
    authenticate,
    canAccess([Roles.ADMIN, Roles.MANAGER]),
    couponController.deleteCoupon,
)

router.get(
    '/verify',
    authenticate,
    canAccess([Roles.ADMIN, Roles.MANAGER]),
    asyncWrapper(couponController.verifyCoupon),
)

export default router
