import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { error } from 'console';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  // get all customers
  async findall(): Promise<Customer[]> {
    try {
      return await this.customersRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error occurred while fetching customers');
    }
  }
  // get one customer
  async findOne( customer_id: string): Promise<Customer> {
      try {
        const customer = await this.customersRepository.findOne({ where: { customer_id } });
        return customer;
      } catch (error) {
         const postgresErrorMessage = error.message; 
         if (postgresErrorMessage.includes('invalid input syntax for type uuid')) {
          throw new BadRequestException(postgresErrorMessage);
        }
        throw new InternalServerErrorException('Error occurred while fetching customer');
      }
  }

  /**
   * get one customer
   */
  
  async findByName(customer_name: string): Promise<Customer> {
    return await this.customersRepository.findOne({ where : { customer_name } })
  }

/**
 *  create customer
 */

  async create(customer: Customer): Promise<Customer> {
    try {
      const newCustomer = this.customersRepository.create(customer);
      const createdCustomer = await this.customersRepository.save(newCustomer);
      if(!createdCustomer){
        throw new error( 'Could not create customer')
      }
      return createdCustomer;
    } catch (error) {
      const postgresErrorMessage = error.message; 
      if (postgresErrorMessage.includes('null value in column')) {
        throw new BadRequestException(postgresErrorMessage);
      } else {
        throw new InternalServerErrorException('Internal server error occurred while creating a customer');
      }
    }
  }

  // update customer
  async update(customer_id: string, customer: Customer): Promise<Customer> {
    await this.customersRepository.update(customer_id, customer);
    return await this.customersRepository.findOne( { where : { customer_id} } );
  }

  // delete customer
  async delete(customer_id: string): Promise<void> {
    await this.customersRepository.delete(customer_id);
  }
}
