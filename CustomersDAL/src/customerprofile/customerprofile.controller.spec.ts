import { Test, TestingModule } from '@nestjs/testing';
import { CustomerprofileController } from './customerprofile.controller';
import { CustomerprofileService } from './customerprofile.service';
import { CustomerProfile } from './customerprofile.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('CustomerprofileController', () => {
  let controller: CustomerprofileController;
  let service: CustomerprofileService;
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

    controller = module.get<CustomerprofileController>(CustomerprofileController);
    service = module.get<CustomerprofileService>(CustomerprofileService);
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
    additional_profile_info: {
      key1: "value",
      key2: "value",
    },
    create_date: '',
    last_update_date: '',
  };

  const mock_data: Partial<CustomerProfile> = {
    customer_address_id: 'NEW_ADDRESS_123',
    credit_rating: 'EXCELLENT',
    credit_limit_amt: 220000,
  }
  const finalMockData: CustomerProfile = {
    ...mockProfile,
    ...mock_data
  }

  describe('getAllCustomerProfile', () => {
    it('should return an array of Customer Profiles', async () => {
      jest
        .spyOn(service, 'getAllCustomerProfile')
        .mockResolvedValue([mockProfile]);
      const result = await controller.getAllCustomerProfile();
      expect(result).toEqual([mockProfile]);
    });
  });

  describe('getCustomerProfileByProfileId', () => {
    it('should return Customer Profile', async () => {
      jest
        .spyOn(service, 'getCustomerProfileByProfileId')
        .mockResolvedValue(mockProfile);
      const result = await controller.getCustomerProfileByProfileId('valid-profile-id');
      expect(result).toEqual(mockProfile);
      expect(service.getCustomerProfileByProfileId).toHaveBeenCalledWith('valid-profile-id');
    });

    it('Should throw NotFoundException the profile is not found', async () => {
      jest.spyOn(service, 'getCustomerProfileByProfileId').mockRejectedValue(new NotFoundException('No customer profile found with given profile_id!'));
      const profile_id = 'nonexistent_id';
      await expect(controller.getCustomerProfileByProfileId(profile_id)).rejects.toBeInstanceOf(NotFoundException);
      expect(service.getCustomerProfileByProfileId).toHaveBeenCalledWith(profile_id);
    });

  });

  describe('getCustomerProfileByCustomerId', () => {
    it('should return Customer Profile', async () => {
      jest
        .spyOn(service, 'getCustomerProfileByCustomerId')
        .mockResolvedValue(mockProfile);
      const result = await controller.getCustomerProfileByCustomerId('valid-customer-id');
      expect(result).toEqual(mockProfile);
      expect(service.getCustomerProfileByCustomerId).toHaveBeenCalledWith('valid-customer-id');
    });

    it('Should throw NotFoundException the profile is not found', async () => {
      jest
        .spyOn(service, 'getCustomerProfileByCustomerId')
        .mockRejectedValue(new NotFoundException('No customer profile found with given profile_id!'));
      const customer_id = 'nonexistent_id';
      await expect(controller.getCustomerProfileByCustomerId(customer_id)).rejects.toBeInstanceOf(NotFoundException);
      expect(service.getCustomerProfileByCustomerId).toHaveBeenCalledWith(customer_id);
    });

  });

  describe('createCustomerProfile', () => {
    it('should create Customer Profiles', async () => {
      jest
        .spyOn(service, 'createCustomerProfile')
        .mockResolvedValue(mockProfile);
      const result = await controller.createCustomerProfile(mockProfile);
      expect(result).toEqual(mockProfile);
    });

    it('should throw InternalServerErrorException if an error occurs', async () => {
      const profile_id = '12345';
      jest.spyOn(service, 'createCustomerProfile').mockRejectedValueOnce(new InternalServerErrorException('Failed to update customer profile'));
      await expect(controller.createCustomerProfile(mockProfile)).rejects.toBeInstanceOf(InternalServerErrorException);
    });
  });

  describe('updateCustomerProfile', () => {
    it('should update Customer Profile', async () => {
      const profile_id = '12345';
      jest.spyOn(service, 'updateCustomerProfile').mockResolvedValueOnce(finalMockData);
      expect(await controller.updateCustomerProfile(profile_id, mock_data)).toEqual(finalMockData);
      expect(service.updateCustomerProfile).toHaveBeenCalledWith(profile_id, mock_data);
    });

    it('should throw NotFoundException if profile is not found', async () => {
      const profile_id = '12345';
      jest.spyOn(service, 'updateCustomerProfile').mockRejectedValueOnce(new NotFoundException('No customer profile found with given profile_id!'));
      await expect(controller.updateCustomerProfile(profile_id, mock_data)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should throw InternalServerErrorException if an error occurs', async () => {
      const profile_id = '12345';
      jest.spyOn(service, 'updateCustomerProfile').mockRejectedValueOnce(new InternalServerErrorException('Failed to update customer profile'));
      await expect(controller.updateCustomerProfile(profile_id, mock_data)).rejects.toBeInstanceOf(InternalServerErrorException);
    });
  });

  describe('deleteCustomerProfile', () => {
    it('should delete Customer Profile', async () => {
      const profile_id = '12345';
      jest.spyOn(service, 'getCustomerProfileByProfileId').mockResolvedValueOnce(mockProfile); // Simulate profile not found
      jest.spyOn(service, 'deleteCustomerProfile').mockResolvedValueOnce(null); // Mock deleteCustomerProfile method
      await expect(controller.deleteCustomerProfile(profile_id)).resolves.toBeNull();
      expect(service.getCustomerProfileByProfileId).toHaveBeenCalledWith(profile_id);
      expect(service.deleteCustomerProfile).toHaveBeenCalledWith(profile_id);
    });

    it('should throw NotFoundException if profile is not found', async () => {
      const profile_id = '12345';
      jest.spyOn(service, 'getCustomerProfileByProfileId').mockRejectedValueOnce(new NotFoundException('No customer profile found with given profile_id!'));
      await expect(controller.deleteCustomerProfile(profile_id)).rejects.toThrowError(NotFoundException);
      expect(service.getCustomerProfileByProfileId).toHaveBeenCalledWith(profile_id);
    });
  
    it('should throw InternalServerErrorException if an error occurs', async () => {
      const profile_id = '12345';
      jest.spyOn(service, 'getCustomerProfileByProfileId').mockRejectedValueOnce(new InternalServerErrorException('Failed to delete customer profile'));
      await expect(controller.deleteCustomerProfile(profile_id)).rejects.toThrowError(InternalServerErrorException);
      expect(service.getCustomerProfileByProfileId).toHaveBeenCalledWith(profile_id);
    });
  });
});