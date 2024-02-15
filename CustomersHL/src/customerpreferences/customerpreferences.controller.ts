import { Controller, Get, Post, Body, Patch, Put, Param, Delete } from '@nestjs/common';
import { CustomerPreferencesService } from './customerpreferences.service';
import { CustomerPreferencesDTO } from './customerpreferences.entity';
import { Logger } from '@nestjs/common';

@Controller()
export class CustomerPreferencesController {
  
  constructor(private customerpreferencesService: CustomerPreferencesService) {}

  @Get('customerpreferences/')
  getCustomerPreferences() {
    return this.customerpreferencesService.getCustomerPreferences();
  }

  @Get('customerpreferences/:customerpreferencesid')
  getCustomerPreferencesByID(@Param('customerpreferencesid') customerpreferencesid: string) {
    return this.customerpreferencesService.getCustomerPreferencesByID(customerpreferencesid);
  }

  
  @Get('customer/customerpreferences/:customerid')
  getCustomerPreferencesByCustomerID(@Param('customerid') customerid: string) {
    return this.customerpreferencesService.getCustomerPreferencesByCustomerID(customerid);
  }

  @Post('customerpreferences/')
  create(@Body() customerpreferencesDTO: CustomerPreferencesDTO) {
    return this.customerpreferencesService.create(customerpreferencesDTO);
  }

    //update customer
  @Put(':customerpreferencesid')
  update(@Param('customerpreferencesid') customerpreferencesid: string, @Body() customerpreferencesDTO: CustomerPreferencesDTO){
    return this.customerpreferencesService.update(customerpreferencesid, customerpreferencesDTO);
  }

  //delete customer
  @Delete(':customerpreferencesid')
  delete(@Param('customerpreferencesid') customerpreferencesid: string) {
    
    return this.customerpreferencesService.delete(customerpreferencesid);
  }

  
}
