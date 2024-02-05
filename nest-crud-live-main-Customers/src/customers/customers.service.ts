import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  // get all users
  async findall(): Promise<Customer[]> {
    return await this.customersRepository.find();
  }

  // get one user
  async findOne(customer_id: string): Promise<Customer> {
    return await this.customersRepository.findOne({ where : { customer_id } });
  }

  //create user
  async create(user: Customer): Promise<Customer> {
    const newCustomer = this.customersRepository.create(user);
    return await this.customersRepository.save(newCustomer);
  }

  // update user
  async update(customer_id: string, user: Customer): Promise<Customer> {
    await this.customersRepository.update(customer_id, user);
    return await this.customersRepository.findOne( { where : { customer_id} } );
  }

  // delete user
  async delete(customer_id: string): Promise<void> {
    await this.customersRepository.delete(customer_id);
  }
}
