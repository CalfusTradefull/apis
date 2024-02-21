import { Test, TestingModule } from '@nestjs/testing';
import { CustomerprofileService } from './customerprofile.service';
import { CustomerProfile } from './customerprofile.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

describe('CustomerprofileService', () => {
  let service: CustomerprofileService;
  let customerProfileRepository: Repository<CustomerProfile>;
  const CUSTOMER_PROFILE_REPOSITORY_TOKEN = getRepositoryToken(CustomerProfile);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerprofileService,
        {
          provide: CUSTOMER_PROFILE_REPOSITORY_TOKEN,
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

    service = module.get<CustomerprofileService>(CustomerprofileService);
    customerProfileRepository = module.get<Repository<CustomerProfile>>(
      CUSTOMER_PROFILE_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('customer profile repository should be defined', () => {
    expect(customerProfileRepository).toBeDefined();
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

  describe('createCustomerProfile', () => {
    it('It create Customer Profile', async () => {
      jest.spyOn(customerProfileRepository, 'create').mockResolvedValueOnce(mockProfile as never);
      jest.spyOn(customerProfileRepository, 'save').mockResolvedValueOnce(mockProfile);
      const result = await service.createCustomerProfile(mockProfile);
      expect(customerProfileRepository.create).toHaveBeenCalledWith(mockProfile);
      expect(customerProfileRepository.save).toHaveBeenCalledWith(result);
      expect(result).toEqual(mockProfile);
    });
  });

  describe('getAllCustomerProfile', () => {
    it('It should get all Customer Profiles', async () => {
      jest.spyOn(customerProfileRepository, 'find').mockResolvedValue([mockProfile]);
      const result = await service.getAllCustomerProfile();
      expect(customerProfileRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockProfile]);
    });
  });

  describe('getCustomerProfileByProfileId', () => {
    it('It should get Customer Profile by profileid', async () => {
      jest.spyOn(customerProfileRepository, 'findOne').mockResolvedValue(mockProfile);
      const profile_id = 'a123';
      const mockData = {"where": {"profile_id": profile_id}}
      const result = await service.getCustomerProfileByProfileId(profile_id);
      expect(customerProfileRepository.findOne).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(mockProfile);
    });

    it('Should handle the case where the profile is not found', async () => {
      jest.spyOn(customerProfileRepository, 'findOne').mockResolvedValue(null);
      const profile_id = 'a123';
      await expect(service.getCustomerProfileByProfileId(profile_id)).rejects.toThrowError(NotFoundException);
    });

    it("should throw InternalServerErrorException for other unexpected errors", async () => {
      const unexpectedError = new Error('Error while fetching customer profile');
      jest.spyOn(customerProfileRepository, 'findOne').mockRejectedValue(unexpectedError);
      await expect(service.getCustomerProfileByProfileId('valid-id')).rejects.toThrowError(InternalServerErrorException);
    })

  });

  describe('getCustomerProfileByCustomerId', () => {
    it('It should get Customer Profile by customerid', async () => {
      jest.spyOn(customerProfileRepository, 'findOne').mockResolvedValue(mockProfile);
      const customer_id = 'a123';
      const mockData = {"where": {"customer_id": customer_id}}
      const result = await service.getCustomerProfileByCustomerId(customer_id);
      expect(customerProfileRepository.findOne).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(mockProfile);
    });

    it('Should handle the case where the profile is not found', async () => {
      jest.spyOn(customerProfileRepository, 'findOne').mockResolvedValue(null);
      const customer_id = 'a123';
      await expect(service.getCustomerProfileByCustomerId(customer_id)).rejects.toThrowError(NotFoundException);
    });

    it("should throw InternalServerErrorException for other unexpected errors", async () => {
      const unexpectedError = new Error('Error while fetching customer profile');
      jest.spyOn(customerProfileRepository, 'findOne').mockRejectedValue(unexpectedError);
      await expect(service.getCustomerProfileByCustomerId('valid-id')).rejects.toThrowError(InternalServerErrorException);
    })

  });

  describe('deleteCustomerProfile', () => {
    it('It should call service.deleteCustomerProfile', async () => {
      jest.spyOn(customerProfileRepository, 'delete').mockResolvedValue(undefined);
      const profile_id = 'a123';
      const result = await service.deleteCustomerProfile(profile_id);
      expect(customerProfileRepository.delete).toHaveBeenCalledWith(profile_id);
      expect(result).toEqual(undefined);
    });

    it('It should return InternalServerErrorException for other unexpected errors', async () => {
      const unexpectedError = new Error('Failed to delete customer profile');
      jest.spyOn(customerProfileRepository, 'delete').mockRejectedValue(unexpectedError);
      await expect(service.deleteCustomerProfile('valid-id')).rejects.toThrowError(Error);
    });
  });

  describe('updateCustomerProfile', () => {
    const updateProfileData: Partial<CustomerProfile> = {
      credit_limit_amt: 20000,
      ownership: 'PRIVATE',
      bankruptcy_flg: true,
      bankruptcy_filed_dt: '2024-02-06 13:16:54',
      year_established: '2024-01-01',
      website_url: 'https://exapletest.com',
    };

    const updatedMockProfile: CustomerProfile = {
      ...mockProfile,
      ...updateProfileData,
    };

    it('It should update Customer Profile using profileid and data', async () => {
      jest.spyOn(customerProfileRepository, 'update').mockResolvedValue({ affected: 1 } as UpdateResult);
      jest.spyOn(customerProfileRepository, 'findOne').mockResolvedValue(updatedMockProfile);
      const profile_id = 'a123';
      const result = await service.updateCustomerProfile(profile_id, updateProfileData,);
      expect(result).toEqual(updatedMockProfile);
    });

    it('Should handle the case where the profile is not found', async () => {
      jest.spyOn(customerProfileRepository, 'update').mockResolvedValue({ affected: 0 } as UpdateResult);
      const profile_id = 'a123';
      await expect(service.updateCustomerProfile(profile_id, updateProfileData)).rejects.toThrowError(NotFoundException);
    });

    it("should throw InternalServerErrorException for other unexpected errors", async () => {
      const unexpectedError = new Error('Failed to update customer profile');
      jest.spyOn(customerProfileRepository, 'update').mockRejectedValue(unexpectedError);
      await expect(service.updateCustomerProfile('valid-id', updateProfileData)).rejects.toThrowError(InternalServerErrorException);
    })
  });
});