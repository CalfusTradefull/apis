import { Controller, Get, Post, Body, Param, Delete, Put, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiNotFoundResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';

@Controller('customers')
@ApiTags('Customers')

export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // Get all customers
  @Get()
  async findAll(): Promise<Customer[]> {
    try {
      const customers = await this.customersService.findall();
      return customers;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error occurred while fetching customers');
    }
  }

  // Get one customer by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get customer by ID', description: 'Retrieves customer information based on the provided ID.' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  async findOne(@Param('id') customer_id: string): Promise<Customer> {
    const customer = await this.customersService.findOne(customer_id);
    if (!customer) {
      throw new Error('Customer not found');
    } else {
      return customer;
    }
  }

  // Get one customer by name
  @Get('/customer/:customername')
  @ApiOperation({ summary: 'Get customer by name', description: 'Retrieves customer information based on the provided name.' })
  @ApiParam({ name: 'customername', description: 'Customer name' })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  async findByName(@Param('customername') customername: string): Promise<Customer> {
    const customer = await this.customersService.findByName(customername);
    if (!customer) {
      throw new Error('Customer not found');
    } else {
      return customer;
    }
  }

  // Create customer
  @Post()
  @ApiOperation({ summary: 'Create customer', description: 'Creates a new customer.' })
  @ApiBody({ type: Customer, description: 'Customer data to create a new customer' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() customer: Customer): Promise<Customer> {
    return await this.customersService.create(customer);
  }

  // Update customer
  @Put(':id')
  @ApiOperation({ summary: 'Update customer by ID', description: 'Updates customer information based on the provided ID.' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiBody({ type: Customer, description: 'Updated customer data' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(@Param('id') customer_id: string, @Body() customer: Customer): Promise<Customer> {
    return this.customersService.update(customer_id, customer);
  }

  // Delete customer
  @Delete(':id')
  @ApiOperation({ summary: 'Delete customer by ID', description: 'Deletes a customer based on the provided ID.' })
  @ApiParam({ name: 'id', description: 'Customer ID' })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async delete(@Param('id') customer_id: string): Promise<void> {
    // Handle the error if the customer is not found
    const customer = await this.customersService.findOne(customer_id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return this.customersService.delete(customer_id);
  }
}
