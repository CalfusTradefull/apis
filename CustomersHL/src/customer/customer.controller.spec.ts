import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './customer.entity';
import { InjectionToken, NotFoundException } from '@nestjs/common';
import { AppConfig } from 'src/config/AppConfig';
import { ClsService } from 'nestjs-cls';
import { HttpService } from '@nestjs/axios';

const mockAppConfig = {
    DAL_URL:'https://example.com/',
  };

  const mockClsService: Partial<ClsService> = {
    getId: () => 'mocked-id',
  };
describe('CustomerController', () => {
  let controller: CustomerController;
  let customerService: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService,
        { provide: 'APP_CONFIG', useValue: mockAppConfig },
          {
            provide: ClsService,
            useValue: mockClsService,
          },
          {
            provide: HttpService,
            useValue: {
              get: jest.fn(),
            },
          }],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
    customerService = module.get<CustomerService>(CustomerService);
  });

  describe('getCustomers', () => {
    it('should retrieve all customers successfully', async () => {
      jest.spyOn(customerService, 'getCustomers').mockResolvedValueOnce('mocked-customer-data');
      const result = await controller.getCustomers();
      expect(result).toBe('mocked-customer-data');
    });
  });
});
