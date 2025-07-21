export interface CouponCodeRequest {
    title: string
    code: string
    discount: number
    validUpto: Date
    tenantId: number
}

export interface verifyCouponRequest {
    code: string
    tenantId: number
}
