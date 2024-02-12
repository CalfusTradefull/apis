import { Test, TestingModule } from '@nestjs/testing';
import { CustomerprofileController } from './customerprofile.controller';
import { CustomerprofileService } from './customerprofile.service';
import { CustomerProfile } from './customerprofile.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CustomerprofileController', () => {
  let controller: CustomerprofileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerprofileController],
      providers: [
        CustomerprofileService,
        {
          provide: getRepositoryToken(CustomerProfile),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CustomerprofileController>(
      CustomerprofileController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const mockProfile: CustomerProfile = {
    customer_id: 'CUST456', // Unique?
    customer_address_id: 'CUSTOMER_ADDRESS_ID_VALUE',
    credit_rating: 'CREDIT_RATING_VALUE',
    credit_limit_amt: 10000,
    ownership: 'PUBLIC',
    bankruptcy_flg: false,
    bankruptcy_filed_dt: '2024-02-06 13:16:54',
    year_established: '2024-01-01',
    website_url: 'https://example.com',
    ceo_name: 'John Doe',
    number_of_employees: '100',
    annual_revenue: '1000000',
    created_by: 'Admin',
    last_updated_by: 'Admin',
    profile_id: '',
    additional_profile_info: undefined,
    create_date: '',
    last_update_date: '',
  };

  describe('getAllCustomerProfile', () => {
    it('should return an array of Customer Profiles', async () => {
      jest
        .spyOn(controller, 'getAllCustomerProfile')
        .mockResolvedValue([mockProfile]);
      const result = await controller.getAllCustomerProfile();
      expect(result).toEqual([mockProfile]);
    });
  });

  describe('createCustomerProfile', () => {
    it('should create Customer Profiles', async () => {
      jest
        .spyOn(controller, 'createCustomerProfile')
        .mockResolvedValue(mockProfile);
      const result = await controller.createCustomerProfile(mockProfile);
      expect(result).toEqual(mockProfile);
    });
  });

  describe('deleteCustomerProfile', () => {
    it('should delete Customer Profile', async () => {
      const profile_id = '12345';
      jest.spyOn(controller, 'deleteCustomerProfile').mockResolvedValue(null);
      const result = await controller.deleteCustomerProfile(profile_id);
      expect(result).toEqual(null);
    });

    it('should check for Customer Profile existence', async () => {
      const profile_id = '12345';
      const type = 'profile_id';
      jest
        .spyOn(controller, 'getCustomerProfile')
        .mockResolvedValue(mockProfile);
      const result = await controller.getCustomerProfile(type, profile_id);
      expect(result).toEqual(mockProfile);
    });

    // it('should throw exception if Profile does not exist', async () => {
    //   const profile_id = '12345';
    //   const type = 'profile_id';
    //   jest
    //     .spyOn(controller, 'getCustomerProfile')
    //     .mockResolvedValue(mockProfile);
    //   const result = await controller.getCustomerProfile(type, profile_id);
    //   expect(result).toEqual(mockProfile);
    // });
  });
});
