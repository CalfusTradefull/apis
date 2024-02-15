import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './customer.entity';
import { ForbiddenException, InjectionToken, NotFoundException } from '@nestjs/common';
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
/**
 * get Customers
 */

  describe('getCustomers', () => {
    it('should retrieve all customers successfully', async () => {
      jest.spyOn(customerService, 'getCustomers').mockResolvedValueOnce('mocked-customer-data');
      const result = await controller.getCustomers();
      expect(result).toBe('mocked-customer-data');
    });

    it('should handle NotFound exception from service', async () => {
        jest.spyOn(customerService, 'getCustomers').mockRejectedValueOnce(new NotFoundException('Customers not found'));
        await expect(controller.getCustomers()).rejects.toThrowError(NotFoundException);
      });
    
      it('should handle ForbiddenException from service', async () => {
        jest.spyOn(customerService, 'getCustomers').mockRejectedValueOnce(new ForbiddenException('API not available'));
        await expect(controller.getCustomers()).rejects.toThrowError(ForbiddenException);
      });
    
      it('should handle other exceptions from service', async () => {
        jest.spyOn(customerService, 'getCustomers').mockRejectedValueOnce(new Error('Internal server error'));
        await expect(controller.getCustomers()).rejects.toThrowError(Error);  
      });
  });

//   describe('getCustomerByCustomerID', () => {
//     it('should retrieve a customer by ID successfully', async () => {
//       // Mock customerService's getCustomer method
//       jest.spyOn(customerService, 'getCustomer').mockResolvedValueOnce('mocked-customer-data');

//       const result = await controller.getCustomerByCustomerID('mocked-customer-id');

//       expect(result).toBe('mocked-customer-data');
//     });

//     it('should handle customer not found and throw NotFoundException', async () => {
//       // Mock customerService's getCustomer method to return null
//       jest.spyOn(customerService, 'getCustomer').mockResolvedValueOnce(null);

//       await expect(async () => await controller.getCustomerByCustomerID('nonexistent-id')).rejects.toThrowError(
//         NotFoundException,
//       );
//     });
//   });

  // Add similar test cases for getAddressByCustomerID, create, update, and delete methods
});
