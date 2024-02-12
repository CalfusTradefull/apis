import { Injectable, NotFoundException } from '@nestjs/common';
import { customer_address } from './customer-address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectRepository(customer_address)
    private customerAddress: Repository<customer_address>,
  ) {}

  async create(customer: customer_address): Promise<customer_address> {
    const newCustomeraddress = this.customerAddress.create(customer);
    return await this.customerAddress.save(newCustomeraddress);
  }

  async getAll(limit?: number, offset?: number): Promise<any> {
    if (limit !== undefined && offset !== undefined) {
      return await this.customerAddress.findAndCount({
        take: limit,
        skip: offset,
      });
    } else {
      return await this.customerAddress.find();
    }
  }

  async getById(id: string): Promise<customer_address> {
    const address = await this.customerAddress.findOne({
      where: { address_id: id },
    });
    if (!address) throw new NotFoundException('Address not found');
    return address;
  }

  async getByCustomerId(customer_id: string): Promise<customer_address[]> {
    const addresses = await this.customerAddress.find({
      where: { customer_id: customer_id },
    });
    if (addresses.length === 0)
      throw new NotFoundException('No addresses found for the customer');
    return addresses;
  }

  async updateById(
    id: string,
    customer: Partial<customer_address>,
  ): Promise<customer_address> {
    await this.customerAddress.update(id, customer);
    return await this.getById(id);
  }

  async deleteById(address_id: string): Promise<void> {
    const result = await this.customerAddress.delete(address_id);
    if (result.affected === 0) throw new NotFoundException('Address not found');
  }
}
