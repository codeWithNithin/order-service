import { body } from 'express-validator'

export default [
    body('title')
        .exists()
        .withMessage('title is required!!')
        .isString()
        .withMessage('title should be a string'),
    body('code')
        .exists()
        .withMessage('code is required!!')
        .isString()
        .withMessage('code should be a string'),
    body('discount')
        .exists()
        .withMessage('discount field is required')
        .isNumeric()
        .withMessage('discount should be a number'),
    body('validUpto').exists().withMessage('valid upto field is required'),
    body('tenantId').exists().withMessage('tenant id is required!!'),
]
