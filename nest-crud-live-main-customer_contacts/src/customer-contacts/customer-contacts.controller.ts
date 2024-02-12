import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerContactsService } from './customer-contacts.service';
import { CustomerContacts } from './customer-contact.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('customer-contacts')
@ApiTags('Customer-Contacts')
export class CustomerContactsController {

    constructor(private readonly cusconserv : CustomerContactsService){}

    //Get all entries
    @Get('all')
    @ApiOperation({ summary: 'Get all Customer Contacts' })
    @ApiResponse({ status: 200, type: CustomerContacts, isArray: true })
    async findall(): Promise<CustomerContacts[]>{
        return await this.cusconserv.findall();
    }

    // Get a single entries
    @Get('onlyone/:id')
    @ApiOperation({ summary: 'Get only single Customer Contact' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, type: CustomerContacts })
    async findOne(@Param('id') contact_id: string): Promise<CustomerContacts>{
        const result= await this.cusconserv.findOne(contact_id);
        if (!result) {
            throw new Error('Customer Contact not found');
          } else {
            return result;
          }
    }

    @Post('create')
    @ApiOperation({ summary: 'Create Customer Contact' })
    @ApiBody({ type: CustomerContacts })
    async create(@Body() contact:CustomerContacts): Promise<CustomerContacts> {
        // console.log('!!!!!!!!!!');
        return await this.cusconserv.create(contact);
    }

    //update role
    @Put('update/:id')
    @ApiOperation({ summary: 'Update Customer Contact' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: CustomerContacts })
    async update(@Param('id') cus_id: string, @Body() contact:CustomerContacts ): Promise<CustomerContacts> {
    return this.cusconserv.update(cus_id, contact);
    }

    //delete role
    @Delete('delete/:id')
    @ApiOperation({ summary: 'Customer Customer profiles' })
    @ApiParam({ name: 'id', type: String })
    async delete(@Param('id') contact_id: string): Promise<void> {
    const role = await this.cusconserv.findOne(contact_id);
    if (!role) {
      throw new Error('Customer contact not found');
    }
    return this.cusconserv.delete(contact_id);
  }

}
