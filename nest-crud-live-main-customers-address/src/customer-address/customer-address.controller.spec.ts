import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAddressController } from './customer-address.controller';
import { CustomerAddressService } from './customer-address.service';
import { QueryFailedError, Repository } from 'typeorm';
import { customer_address } from './customer-address.entity';
import { MockType } from './customer-address.service.spec';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

const repositoryMockfn = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockImplementation((dto) => dto),
  find: jest.fn().mockImplementation(() => []),
  findOneOrFail: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  updateById: jest.fn(),
};
describe('CustomerAddressController', () => {
  let controller: CustomerAddressController;
  let service: CustomerAddressService;
  let repositoryMock: MockType<Repository<customer_address>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerAddressController],
      providers: [
        CustomerAddressService,
        {
          provide: getRepositoryToken(customer_address),
          useValue: repositoryMockfn,
        },
      ],
    }).compile();

    controller = module.get<CustomerAddressController>(
      CustomerAddressController,
    );
    service = module.get<CustomerAddressService>(CustomerAddressService);
    repositoryMock = module.get(getRepositoryToken(customer_address));
  });

  it('controller ->  CustomerAddressController ->  should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service ->  CustomerAddressService ->  should be defined', () => {
    expect(service).toBeDefined();
  });
  const dto: customer_address = {
    address_id: '',
    customer_id: '4f94ae7e-c3c7-4fd7-9b58-37967b846619',
    address_type: {
      bill_to: true,
      ship_to: false,
      hq: false,
    },
    address_nick_nm: 'home',
    address1: 'house/flat no, building name, street name/number',
    address2: 'Block no., Area Name',
    address3: 'City/district, state',
    address4: 'Country, ZIP code',
    city: 'Delhi',
    postal_code: '110017',
    state_province_nm: 'Delhi',
    state_province_cd: 'DL',
    county: 'XYZ County',
    country_nm: 'India',
    country_cd: 'IN',
    validated_flg: true,
    additional_address_info: {
      key1: 'value1',
      key2: 'value2',
    },
    create_date: new Date(),
    created_by: 'john_doe',
    last_update_date: new Date(),
    last_updated_by: 'jane_smith',
  };
  describe('create', () => {
    /**
     * should create a new customer address
     */

    it('should create a customer address', async () => {
      jest.spyOn(service, 'create').mockResolvedValueOnce(dto);
      jest.spyOn(repositoryMockfn, 'create').mockResolvedValueOnce(dto);

      const result = await controller.create(dto);
      expect(result).toEqual(dto);
      expect(service.create).toHaveBeenCalledWith(dto);

      jest.spyOn(repositoryMockfn, 'create').mockResolvedValueOnce(dto);
      const result1 = await controller.create(dto);
      expect(result1).toEqual(dto);
    });

    /**
     * Should handle validation errors and return 500 Internal Server Error
     */
    it('should handle validation errors and return 500 Internal Server Error', async () => {
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(
          new QueryFailedError(
            'Validation error',
            [],
            new Error('Internal Server Error'),
          ),
        );
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new HttpException('Internal Server Error', 500));

      await expect(controller.create(dto)).rejects.toThrowError(HttpException);
      expect(service.create).toHaveBeenCalledWith(dto);

      jest
        .spyOn(repositoryMockfn, 'create')
        .mockRejectedValue(new HttpException('Internal Server Error', 500));
      await expect(controller.create(dto)).rejects.toThrowError(HttpException);
    });

    /**
     * description
     */
  });

  /**
   * getAll
   */

  describe('getAll', () => {
    it('should get all customer addresses', async () => {
      const mockCustomerAddresses: customer_address[] = [
        {
          ...dto,
        },
      ];

      jest.spyOn(controller, 'getAll').mockResolvedValue(mockCustomerAddresses);
      const result = await controller.getAll();
      expect(result).toEqual(mockCustomerAddresses);
    });

    /**
     * should handle a getAll error and return Internal Server Error
     */

    it('should handle a getAll error and return Internal Server Error', async () => {
      jest
        .spyOn(controller, 'getAll')
        .mockRejectedValueOnce(new HttpException('', 500));
      await expect(controller.getAll()).rejects.toBeInstanceOf(HttpException);
    });
  });
});
