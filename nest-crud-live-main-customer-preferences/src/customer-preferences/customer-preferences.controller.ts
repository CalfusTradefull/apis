import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';
import { CustomerPreference } from './customer-preferences-entity';
import { CustomerPreferenceService } from './customer-preferences.service';
import { QueryFailedError } from 'typeorm';

@Controller('customer-preferences')
@ApiTags('Customer Preferencess')
export class CustomerPreferencesController {
  constructor(
    private readonly customerPreferenceService: CustomerPreferenceService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer preference' })
  @ApiResponse({
    status: 201,
    description: 'Customer preference created successfully',
    type: CustomerPreference,
  })
  @ApiBody({
    type: CustomerPreference,
    description: 'Customer preference data',
  })
  async create(
    @Body() customerPreference: CustomerPreference,
  ): Promise<CustomerPreference> {
    try {
      return await this.customerPreferenceService.create(customerPreference);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        // PostgreSQL error code for not-null violation
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw error; // Re-throw other errors
      }
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all customer preferences' })
  @ApiResponse({
    status: 200,
    description: 'Return all customer preferences',
    type: [CustomerPreference],
  })
  async getAll(): Promise<CustomerPreference[]> {
    return this.customerPreferenceService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a customer preference by ID' })
  @ApiParam({ name: 'id', description: 'Customer preference ID', type: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Return a customer preference by ID',
    type: CustomerPreference,
  })
  @ApiProperty({
    required: true,
    description: 'The unique identifier of the customer',
  })
  async getById(@Param('id') id: string): Promise<CustomerPreference> {
    return this.customerPreferenceService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a customer preference by ID' })
  @ApiParam({ name: 'id', description: 'Customer preference ID', type: 'uuid' })
  @ApiBody({
    type: CustomerPreference,
    description: 'Updated customer preference data',
  })
  @ApiResponse({
    status: 200,
    description: 'Customer preference updated successfully',
    type: CustomerPreference,
  })
  async updateById(
    @Param('id') id: string,
    @Body() customerPreference: Partial<CustomerPreference>,
  ): Promise<CustomerPreference> {
    try {
      return await this.customerPreferenceService.updateById(
        id,
        customerPreference,
      );
    } catch (error) {
      if (error instanceof QueryFailedError) {
        // PostgreSQL error code for not-null violation
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw error; // Re-throw other errors
      }
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a customer preference by ID' })
  @ApiParam({ name: 'id', description: 'Customer preference ID', type: 'uuid' })
  @ApiResponse({
    status: 204,
    description: 'Customer preference deleted successfully',
  })
  async deleteById(@Param('id') id: string): Promise<void> {
    return this.customerPreferenceService.deleteById(id);
  }
}
