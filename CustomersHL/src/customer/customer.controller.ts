import { Controller, Get, Post, Body, Patch, Put, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './customer.entity';
import { Logger } from '@nestjs/common';

@Controller()
export class CustomerController {
  
  constructor(private customerService: CustomerService) {}
  private readonly logger = new Logger('TFHL_CUSTOMER_CONTROLLER');

  @Get('customers/')
  getCustomers() {
    this.logger.log(new Date(Date.now()).toLocaleString() + ' Retreving all customers');
    return this.customerService.getCustomers();
  }

  @Get('customer/:customerid')
  getCustomerByCustomerID(@Param('customerid') customerid: string) {

    this.logger.log(new Date(Date.now()).toLocaleString() + ' Get Customer by ID: ' + customerid);
    return this.customerService.getCustomer(customerid);
  }

  
  @Get('customer/address/:customerid')
  getAddressByCustomerID(@Param('customerid') customerid: string) {
    return this.customerService.getAddress(customerid);
  }

  @Post('customer/')
  create(@Body() customerDTO: CustomerDTO) {

    this.logger.log(new Date(Date.now()).toLocaleString() + ' Create Customer: ' + JSON.stringify(customerDTO));
    return this.customerService.create(customerDTO);
  }

    //update customer
  @Put(':customerid')
  update(@Param('customerid') customerid: string, @Body() customerDTO: CustomerDTO){

    this.logger.log(new Date(Date.now()).toLocaleString() + ' Update Customer: ' + JSON.stringify(customerDTO));
    return this.customerService.update(customerid, customerDTO);
  }

  //delete customer
  @Delete(':customerid')
  delete(@Param('customerid') customerid: string) {
    this.logger.log(new Date(Date.now()).toLocaleString() + ' Delete Customer: ' + customerid);
    return this.customerService.delete(customerid);
  }

  
}
