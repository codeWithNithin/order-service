import mongoose from 'mongoose'
import { CouponCodeRequest } from './coupon-types'

const couponCodeSchema = new mongoose.Schema<CouponCodeRequest>(
    {
        title: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        validUpto: {
            type: Date,
            required: true,
        },
        tenantId: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

export default mongoose.model('CouponCode', couponCodeSchema)
