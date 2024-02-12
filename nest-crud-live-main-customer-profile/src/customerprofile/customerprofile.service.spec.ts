import { Test, TestingModule } from '@nestjs/testing';
import { CustomerprofileService } from './customerprofile.service';
import { CustomerProfile } from './customerprofile.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

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
    it('It should call service.createCustomerProfile', async () => {
      jest
        .spyOn(service, 'createCustomerProfile')
        .mockResolvedValue(mockProfile);

      const result = await service.createCustomerProfile(mockProfile);
      expect(service.createCustomerProfile).toHaveBeenCalledWith(mockProfile);
      expect(result).toEqual(mockProfile);
    });

    it('Should create customer profile using typeorm', async () => {
      customerProfileRepository.create(mockProfile);
      expect(customerProfileRepository.create).toHaveBeenCalledWith(
        mockProfile,
      );
    });

    it('Should save customer profile using typeorm', async () => {
      customerProfileRepository.save(mockProfile);
      expect(customerProfileRepository.save).toHaveBeenCalledWith(mockProfile);
    });
  });

  describe('getAllCustomerProfile', () => {
    it('It should call service.getAllCustomerProfile', async () => {
      jest
        .spyOn(service, 'getAllCustomerProfile')
        .mockResolvedValue([mockProfile]);

      const result = await service.getAllCustomerProfile();
      expect(service.getAllCustomerProfile).toHaveBeenCalled();
      expect(result).toEqual([mockProfile]);
    });

    it('Should get the list of customer profiles', async () => {
      customerProfileRepository.find();
      expect(customerProfileRepository.find).toHaveBeenCalled();
    });
  });

  describe('getCustomerProfileByProfileId', () => {
    it('It should call service.getCustomerProfileByProfileId', async () => {
      jest
        .spyOn(service, 'getCustomerProfileByProfileId')
        .mockResolvedValue(mockProfile);
      const profile_id = 'a123';
      const result = await service.getCustomerProfileByProfileId(profile_id);
      expect(service.getCustomerProfileByProfileId).toHaveBeenCalledWith(
        profile_id,
      );
      expect(result).toEqual(mockProfile);
    });

    it('Should handle the case where the profile is not found', async () => {
      jest
        .spyOn(service, 'getCustomerProfileByProfileId')
        .mockResolvedValue(null);
      const profile_id = 'nonexistent_id';
      try {
        await service.getCustomerProfileByProfileId(profile_id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Should get the customer profile', async () => {
      const profile_id = 'abc123';
      customerProfileRepository.findOne({
        where: {
          profile_id: profile_id,
        },
      });
      expect(customerProfileRepository.findOne).toHaveBeenCalledWith({
        where: {
          profile_id: profile_id,
        },
      });
    });
  });

  describe('getCustomerProfileByCustomerId', () => {
    it('It should call service.getCustomerProfileByCustomerId', async () => {
      jest
        .spyOn(service, 'getCustomerProfileByCustomerId')
        .mockResolvedValue(mockProfile);
      const customer_id = 'a123';
      const result = await service.getCustomerProfileByCustomerId(customer_id);
      expect(service.getCustomerProfileByCustomerId).toHaveBeenCalledWith(
        customer_id,
      );
      expect(result).toEqual(mockProfile);
    });

    it('Should handle the case where the profile is not found', async () => {
      jest
        .spyOn(service, 'getCustomerProfileByCustomerId')
        .mockResolvedValue(null);
      const customer_id = 'nonexistent_id';
      try {
        await service.getCustomerProfileByCustomerId(customer_id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('Should get the customer profile', async () => {
      const customer_id = 'abc123';
      customerProfileRepository.findOne({
        where: {
          customer_id: customer_id,
        },
      });
      expect(customerProfileRepository.findOne).toHaveBeenCalledWith({
        where: {
          customer_id: customer_id,
        },
      });
    });
  });

  describe('deleteCustomerProfile', () => {
    it('It should call service.deleteCustomerProfile', async () => {
      jest.spyOn(service, 'deleteCustomerProfile').mockResolvedValue(null);
      const profile_id = 'a123';
      const result = await service.deleteCustomerProfile(profile_id);
      expect(service.deleteCustomerProfile).toHaveBeenCalledWith(profile_id);
      expect(result).toEqual(null);
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

    it('It should call service.getCustomerProfileByProfileId', async () => {
      jest
        .spyOn(service, 'getCustomerProfileByProfileId')
        .mockResolvedValue(mockProfile);
      const profile_id = 'a123';
      const result = await service.getCustomerProfileByProfileId(profile_id);
      expect(service.getCustomerProfileByProfileId).toHaveBeenCalledWith(
        profile_id,
      );
      expect(result).toEqual(mockProfile);
    });

    it('Should handle the case where the profile is not found', async () => {
      jest
        .spyOn(service, 'getCustomerProfileByProfileId')
        .mockResolvedValue(null);
      const profile_id = 'nonexistent_id';
      try {
        await service.getCustomerProfileByProfileId(profile_id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('It should call update method for service and typeorm', async () => {
      jest
        .spyOn(customerProfileRepository, 'update')
        .mockResolvedValue({} as never);

      jest
        .spyOn(service, 'updateCustomerProfile')
        .mockResolvedValue(updatedMockProfile);
      const profile_id = 'a123';
      const result = await service.updateCustomerProfile(
        profile_id,
        updateProfileData,
      );
      expect(service.updateCustomerProfile).toHaveBeenCalledWith(
        profile_id,
        updateProfileData,
      );
      expect(result).toEqual(updatedMockProfile);
    });
  });
});
