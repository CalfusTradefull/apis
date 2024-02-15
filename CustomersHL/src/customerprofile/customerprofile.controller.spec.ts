import { Test, TestingModule } from '@nestjs/testing';
import { CustomerProfileController } from './customerprofile.controller';
import { CustomerProfileService } from './customerprofile.service';
import { CustomerProfileDTO } from './customerprofiledto';
import { AppConfig } from "../config/AppConfig";
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('CustomerprofileController', () => {
  let controller: CustomerProfileController;
  let service: CustomerProfileService;
  jest.mock('axios');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerProfileController],
      providers: [
        CustomerProfileService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
          }, 
        {
          provide: "APP_CONFIG",
          useValue: AppConfig,
        },
      ],
    }).compile();

    controller = module.get<CustomerProfileController>(CustomerProfileController);
    service = module.get<CustomerProfileService>(CustomerProfileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  const mockProfile: CustomerProfileDTO = {
    profile_id: "78b8f457-6e1a-43af-be2e-460f356905fa",
    customer_id: "CUST124",
    customer_address_id: "CUSTOMER_ADDRESS_ID_VALUE",
    credit_rating: "CREDIT_RATING_VALUE",
    credit_limit_amt: 10000,
    ownership: "PUBLIC",
    bankruptcy_flg: false,
    bankruptcy_filed_dt: "2024-02-06",
    year_established: "2024-01-01",
    website_url: "https://example.com",
    ceo_name: "John Doe",
    number_of_employees: "100",
    annual_revenue: "1000000",
    additional_profile_info: {
      key1: "value1",
      key2: "value2"
    },
    create_date: "2024-02-13T12:49:56.798Z",
    created_by: "Admin",
    last_update_date: "2024-02-13T12:49:56.798Z",
    last_updated_by: "Admin"
  };

  describe("getProfiles", () => {
    it('should return an array of Customer Profiles', async () => {
      jest.spyOn(service, 'getProfiles').mockReturnValue([mockProfile] as never);
      const result = await controller.getProfiles();
      expect(result).toEqual([mockProfile]);
    });

    it('should return ForbiddenException if server is not reachable', async () => {
        jest.spyOn(service, 'getProfiles').mockRejectedValue(new ForbiddenException('API not available'));
        await expect(controller.getProfiles()).rejects.toBeInstanceOf(ForbiddenException);
    });

    describe('getProfileByProfileID', () => {
      it('should return a customer profile by profileid', async () => {
        jest.spyOn(service, 'getProfileByProfileID').mockReturnValue(mockProfile as never);
        const result = await controller.getProfileByProfileID('valid-profile-id');
        expect(result).toEqual(mockProfile);
      });

      it('should return NotFoundException if profile is not found', async () => {
        jest.spyOn(service, 'getProfileByProfileID').mockRejectedValue(new NotFoundException('API not available'));
        await expect(controller.getProfileByProfileID('invalid-profile-id')).rejects.toBeInstanceOf(NotFoundException);
      });

      it('should receive ECONNREFUSED if server is not reachable', async () => {
        jest.spyOn(service, 'getProfileByProfileID').mockRejectedValue({ code: 'ECONNREFUSED' });
        try {
          const result = await controller.getProfileByProfileID('valid-profile-id');
        } catch (error) {
          expect(error.code).toEqual('ECONNREFUSED');
        }
      });

      it('should return ForbiddenException if server is not reachable', async () => {
        jest.spyOn(service, 'getProfileByProfileID').mockRejectedValue(new ForbiddenException('API not available'));
        await expect(controller.getProfileByProfileID('valid-profile-id')).rejects.toBeInstanceOf(ForbiddenException);
      })

    });

    describe('getProfileByCustomerID', () => {
      it('should return a customer profile by customer', async () => {
        jest.spyOn(service, 'getProfileByCustomerID').mockReturnValue(mockProfile as never);
        const result = await controller.getProfileByCustomerID('valid-profile-id');
        expect(result).toEqual(mockProfile);
      });

      it('should return NotFoundException if profile is not found', async () => {
        jest.spyOn(service, 'getProfileByCustomerID').mockRejectedValue(new NotFoundException('API not available'));
        await expect(controller.getProfileByCustomerID('invalid-profile-id')).rejects.toBeInstanceOf(NotFoundException);
      });

      it('should receive ECONNREFUSED if server is not reachable', async () => {
        jest.spyOn(service, 'getProfileByCustomerID').mockRejectedValue({ code: 'ECONNREFUSED' });
        try {
          const result = await controller.getProfileByCustomerID('valid-profile-id');
        } catch (error) {
          expect(error.code).toEqual('ECONNREFUSED');
        }
      });

      it('should return ForbiddenException if server is not reachable', async () => {
        jest.spyOn(service, 'getProfileByCustomerID').mockRejectedValue(new ForbiddenException('API not available'));
        await expect(controller.getProfileByCustomerID('valid-profile-id')).rejects.toBeInstanceOf(ForbiddenException);
      })

    })

  })

});
