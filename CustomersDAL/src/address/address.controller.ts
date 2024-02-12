import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  //get all address
  @Get()
  async findAll(): Promise<Address[]> {
    return await this.addressService.findall();
  }

  //get one address
  @Get(':id')
  async findOne(@Param('id') address_id: string): Promise<Address> {
    const address = await this.addressService.findOne(address_id);
    if (!address) {
      throw new Error('Address not found');
    } else {
      return address;
    }
  }

  //create address
  @Post()
  async create(@Body() address: Address): Promise<Address> {
    return await this.addressService.create(address);
  }

  //update address
  @Put(':id')
  async update(@Param('id') address_id: string, @Body() address: Address): Promise<Address> {
    return this.addressService.update(address_id, address);
  }

  //get one address
  @Get('/address/:customerid')
  async findByCustomerID(@Param('customerid') customerid: string): Promise<Address> {
    console.log("**************************")
    console.log("Customer ID: " + customerid)
    const address = await this.addressService.findByCustomerID(customerid);
    if (!address) {
      console.log("**************************")
      throw new Error('Address not found');
    } else {
      console.log("**************************")
      return address;
    }
  }

  //delete address
  @Delete(':id')
  async delete(@Param('id') address_id: string): Promise<void> {
    //handle the error if address not found
    const address = await this.addressService.findOne(address_id);
    if (!address) {
      throw new Error('Address not found');
    }
    return this.addressService.delete(address_id);
  }
}
