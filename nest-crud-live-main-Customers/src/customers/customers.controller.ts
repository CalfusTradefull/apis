import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  //get all customers
  @Get()
  async findAll(): Promise<Customer[]> {
    return await this.customersService.findall();
  }

  //get one customer
  @Get(':id')
  async findOne(@Param('id') customer_id: string): Promise<Customer> {
    const customer = await this.customersService.findOne(customer_id);
    if (!customer) {
      throw new Error('Customer not found');
    } else {
      return customer;
    }
  }

  //create customer
  @Post()
  async create(@Body() customer: Customer): Promise<Customer> {
    return await this.customersService.create(customer);
  }

  //update customer
  @Put(':id')
  async update(@Param('id') customer_id: string, @Body() customer: Customer): Promise<Customer> {
    return this.customersService.update(customer_id, customer);
  }

  //delete customer
  @Delete(':id')
  async delete(@Param('id') customer_id: string): Promise<void> {
    //handle the error if customer not found
    const customer = await this.customersService.findOne(customer_id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return this.customersService.delete(customer_id);
  }
}
