import { Response } from 'express'
import CustomerService from './customer-service'
import { AuthRequest } from '../common/types'
import { Logger } from 'winston'
import { Request } from 'express-jwt'
import { Address } from './customer-types'

export default class CustomerController {
    constructor(
        private customerService: CustomerService,
        private logger: Logger,
    ) {
        this.getCustomer = this.getCustomer.bind(this)
    }

    getCustomer = async (req: Request, res: Response) => {
        const {
            firstName,
            lastName,
            email,
            sub: userId,
        } = req.auth as AuthRequest

        const customer = await this.customerService.getById(userId)

        if (customer) {
            res.json(customer)
        }

        const newCustomer = await this.customerService.create({
            userId,
            firstName,
            lastName,
            email,
            addresses: [],
        })

        this.logger.info('New customer created', { id: newCustomer._id })
        res.json(newCustomer)
    }

    addAddress = async (req: Request, res: Response) => {
        const id = req.params.id
        const { sub: userId } = req.auth as AuthRequest
        const { text } = req.body as Address

        const updatedData = await this.customerService.findbyIdAndUpdate(
            id,
            userId,
            { text, isDefault: false },
        )

        res.status(200).json(updatedData)
    }
}
