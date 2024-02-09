import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerContactsService } from './customer-contacts.service';
import { CustomerContacts } from './customer-contact.entity';

@Controller('customer-contacts')
export class CustomerContactsController {

    constructor(private readonly cusconserv : CustomerContactsService){}

    //Get all entries
    @Get('all')
    async findall(): Promise<CustomerContacts[]>{
        return await this.cusconserv.findall();
    }

    // Get a single entries
    @Get('onlyone/:id')
    async findOne(@Param('id') cus_id: string): Promise<CustomerContacts>{
        const result= await this.cusconserv.findOne(cus_id);
        if (!result) {
            throw new Error('Customer contact not found');
          } else {
            return result;
          }
    }

    @Post('create')
    async create(@Body() contact:CustomerContacts): Promise<CustomerContacts> {
        // console.log('!!!!!!!!!!');
        return await this.cusconserv.create(contact);
    }

    //update role
    @Put('update/:id')
    async update(@Param('id') cus_id: string, @Body() contact:CustomerContacts ): Promise<CustomerContacts> {
    return this.cusconserv.update(cus_id, contact);
    }

    //delete role
    @Delete('delete/:id')
    async delete(@Param('id') contact_id: string): Promise<void> {
    //handle the error if Customer contact not found
    const role = await this.cusconserv.findOne(contact_id);
    if (!role) {
      throw new Error('Customer contact not found');
    }
    return this.cusconserv.delete(contact_id);
  }

}
