import {
  Body,
  Controller,
  HttpException,
  Post,
  Get,
  Param,
  Put,
  Delete,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { CustomerAddressService } from './customer-address.service';
import { customer_address } from './customer-address.entity';
import { QueryFailedError } from 'typeorm';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Customer Address')
@Controller('customer-address')
export class CustomerAddressController {
  constructor(
    private readonly customerAddressService: CustomerAddressService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a New Customer Address',
    description: 'Create a new customer address.',
  })
  @ApiBody({ description: 'Create New Customer', type: customer_address })
  async create(@Body() customerAddress: customer_address): Promise<any> {
    console.log(customerAddress);

    try {
      const createdAddress =
        await this.customerAddressService.create(customerAddress);
      return createdAddress;
    } catch (error) {
      console.error('Error occurred during create:', error);

      if (error instanceof QueryFailedError) {
        console.error(error);
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  /**
   * Get All Addresses by Customer
   */
  @Get()
  @ApiOperation({
    summary: 'Get All Addresses by Customer',
    description: 'Retrieve all addresses associated with a specific customer.',
  })
  async getAll(): Promise<any> {
    try {
      const data = await this.customerAddressService.getAll();
      return data;
    } catch (error) {
      console.error('Error occurred during getAll:', error);

      if (error instanceof QueryFailedError) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  /**
   * Get Address by ID
   *
   * @param id - The unique identifier of the address.
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get Address by ID',
    description:
      'Retrieve details of a specific address by its unique identifier.',
  })
  async findById(@Param('id') id: string): Promise<any> {
    try {
      const data = await this.customerAddressService.getById(id);
      return data;
    } catch (error) {
      console.error('Error occurred during findById:', error);

      if (error instanceof QueryFailedError) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  /**
   * Get Addresses by Customer ID
   *
   * @param id - The unique identifier of the customer.
   */
  @Get('customer/:id')
  @ApiOperation({
    summary: 'Get Addresses by Customer ID',
    description:
      'Retrieve all addresses associated with a specific customer by their unique identifier.',
  })
  async getByCustomerId(@Param('id') customer_id: string): Promise<any> {
    try {
      const addresses =
        await this.customerAddressService.getByCustomerId(customer_id);
      return addresses;
    } catch (error) {
      console.error('Error occurred during getByCustomerId:', error);

      if (error instanceof QueryFailedError) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  /**
   * Update Customer Address
   *
   * @param id - The unique identifier of the address to update.
   */
  @Put(':id')
  @ApiOperation({
    summary: 'Update Customer Address',
    description:
      'Update details of a specific customer address by its unique identifier.',
  })
  async update(
    @Param('id') id: string,
    @Body() customerAddress: customer_address,
  ): Promise<{ message: string; data: customer_address }> {
    try {
      const updatedCustomerAddress =
        await this.customerAddressService.updateById(id, customerAddress);
      return {
        message: 'Updated Successfully!',
        data: updatedCustomerAddress,
      };
    } catch (error) {
      console.error('Error occurred during update:', error);

      if (error instanceof QueryFailedError) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  /**
   * Delete Customer Address by ID
   *
   * @param id - The unique identifier of the address to delete.
   */
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Customer Address by ID',
    description: 'Remove a specific customer address by its unique identifier.',
  })
  async remove(@Param('id') id: string) {
    try {
      await this.customerAddressService.deleteById(id);
      return { success: true };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(`${error.message}`, HttpStatus.CONFLICT);
      } else if (error instanceof NotFoundException) {
        throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
