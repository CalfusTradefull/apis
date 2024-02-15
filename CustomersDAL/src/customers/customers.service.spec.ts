import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';

describe('CustomersService', () => {
  let service: CustomersService;
  let repository: Repository<Customer>;
  const mockCustomers: Customer = 
    {
      "customer_id": "efb444e4-4b7d-44d0-b12b-06a97006ea95",
      "customer_name": "ABC Corporation",
      "customer_brand_name": "ABC Brand",
      "tf_customer_number": "TF123",
      "erp_account_number": "ERP456",
      "customer_type": "Business",
      "customer_status": "Active",
      "customer_category_id": "Category123",
      "tax_identifier_number": "TIN789",
      "customer_since_dt": "2022-01-01",
      "parent_customer_id": "Parent456",
      "doing_business_as": "ABC Corp",
      "retail_outlet_flg": true,
      "is_b2b_flg": true,
      "is_multi_brand_flg": true,
      "tier_id": "Tier1",
      "region_id": "Region123",
      "lifecycle_stage_id": "Stage456",
      "sic_code": "SIC789",
      "sic_code_type": "TypeA",
      "naics_code": "NAICS123",
      "naics_code_descr": "Description for NAICS123",
      "stock_ticker": "ABC",
      "logistics_fulfillment": {
        "pick_pack_ship": "Warehouse123",
        "ship_station": "ShipStation456",
        "wms": "WMS789"
      },
      "cis_id": "CIS789",
      "duns_number": "DUNS456",
      "demandbase_id": "Demandbase789",
      "zoominfo_id": "ZoomInfo456",
      "expected_arr": "2022-02-01",
      "expected_gmv": "100000",
      "additional_customer_info": {
        "key1": "value1",
        "key2": "value2"
      },
      "create_date":new Date(),
      "created_by": "JohnDoe",
      "last_update_date":new Date(),
      "last_updated_by": "JaneDoe"
    }
    
  ;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  describe('findAll', () => {
    it('should return an array of customers', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockCustomers]);
      const result = await service.findall();
      expect(result).toEqual([mockCustomers]);
    });

    it('should handle errors and throw InternalServerErrorException', async () => {
      jest.spyOn(repository, 'find').mockRejectedValue(new Error('Test error'));
      await expect(service.findall()).rejects.toThrowError(InternalServerErrorException);
    });
  });

/**
 * findOne
 */
  describe('findOne', () => {
    it('should return the customer if found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockCustomers);
      const result = await service.findOne('valid-customer-id');
      expect(result).toEqual(mockCustomers);
    });
    it('should throw BadRequestException for invalid UUID format', async () => {
      const invalidUuidError = new Error('invalid input syntax for type uuid');
      jest.spyOn(repository, 'findOne').mockRejectedValue(invalidUuidError);
      await expect(service.findOne('invalid-uuid')).rejects.toThrowError(BadRequestException);
    });

    it('should throw null return if customer is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      await expect(service.findOne('invalid-uuid')).resolves.toEqual(null);
    });

    it('should throw InternalServerErrorException for other unexpected errors', async () => {
      const unexpectedError = new Error('Unexpected error');
      jest.spyOn(repository, 'findOne').mockRejectedValue(unexpectedError);
      await expect(service.findOne('some-id')).rejects.toThrowError(InternalServerErrorException);
    });
  });
  
});
