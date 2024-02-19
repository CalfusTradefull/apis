import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiFoundResponse, ApiOperation, ApiParam, ApiTags, PartialType } from '@nestjs/swagger';
import { CustomerContactServiceHL } from './customer-contactHL.service';
import { param } from 'jquery';
import { CustomerContacts } from './customer-contactHL.dto';

@ApiTags('Customer Contacts')
@Controller('customercontact')
export class CustomerContactControllerHL {

    constructor(private conservhl : CustomerContactServiceHL) {}

    @Get('getCustomerContacts/')
    @ApiOperation({summary : 'Get All Customer Contact'})
    @ApiFoundResponse({description:'Customer not Found'})
    getCustomerCustomers(){
        return this.conservhl.getCustomerCustomers();
    }

    @Get('getById/:customercontactId')
    @ApiOperation({summary : 'Get By ID - Get Customer Contact according to Account ID', description : 'Get Customer Contact according to ID'})
    @ApiParam({name : 'customercontactId'})
    @ApiFoundResponse({description:'Customer not Found'})
    getCustomerCustomersById(@Param('customercontactId') customerId : string ){
        return this.conservhl.getCustomerCustomersById(customerId);
    }

    @Post('createCustomerContact/')
    @ApiOperation({summary : 'Create - Create Customer Contacts', description : 'Create Customer Contacts'})
    @ApiFoundResponse({description:'Customer not Found'})
    createCustomerCustomers(@Body() cusprefdto : CustomerContacts){
        return this.conservhl.createCustomerCustomers(cusprefdto);
    }

    @Put('upadteCustomerContact/:customerContactID')
    @ApiOperation({summary : 'Update - Update Customer Contact for Provided ID', description : 'Update Customer Contact for Provided ID'})
    @ApiParam({name : 'customerContactID',})
    @ApiBody({ type: PartialType<CustomerContacts> })
    @ApiFoundResponse({description:'Customer not Found'})
    updateCustomerCustomers(@Param('customerContactID') customerContactID: string, @Body() customerContactDto : Partial<CustomerContacts>){
       try{
        console.log(`from HL controller`);
        return this.conservhl.updateCustomerCustomers(customerContactID,customerContactDto);
       }
       catch(error){
        console.log(`error in controller ${error}`);
       }
    }
    
    @Delete('deleteUserContacts/:customerContactID')
    @ApiOperation({summary : 'Delete - Delete Customer Contact for given ID', description : 'Delete Customer Contact for given ID'})
    @ApiParam({name : 'customerContactID'})
    @ApiFoundResponse({description:'Customer not Found'})
    deleteCustomerCustomers(@Param('customerContactID') customerContactID: string){
        try{
        return this.conservhl.deleteCustomerCustomers(customerContactID);
        }
        catch(error){
            console.log(`error from HL controller is : ${error}`)
        }
    }
}

// @Body() contact:Partial<CustomerContacts> ): Promise<CustomerContacts> 