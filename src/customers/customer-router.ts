import { Router } from 'express'
import CustomerController from './customer-controller'
import asyncWrapper from '../common/utils/asyncWrapper'
import CustomerService from './customer-service'
import { logger } from '../config/logger'
import authenticate from '../common/middlewares/authenticate'
const customerRouter = Router()

const customerService = new CustomerService()
const customerController = new CustomerController(customerService, logger)

customerRouter.get(
    '/',
    authenticate,
    asyncWrapper(customerController.getCustomer),
)

customerRouter.patch(
    '/addresses/:id',
    authenticate,
    asyncWrapper(customerController.addAddress),
)

export default customerRouter
