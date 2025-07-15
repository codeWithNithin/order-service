import customerModel from './customer-model'
import { Address, Customer } from './customer-types'

export default class CustomerService {
    async create(customerData: Customer) {
        return await customerModel.create(customerData)
    }

    async getById(id: string) {
        return await customerModel.findById(id)
    }

    async findbyIdAndUpdate(
        id: string,
        userId: string,
        addressData: Partial<Address>,
    ) {
        return await customerModel.findOneAndUpdate(
            { _id: id, userId },
            { $push: { addresses: addressData } },
            {
                new: true,
            },
        )
    }
}
