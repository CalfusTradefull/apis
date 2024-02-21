import { Test, TestingModule } from "@nestjs/testing";
import { HttpService } from "@nestjs/axios";
import { AppConfig } from "../config/AppConfig";
import { firstValueFrom, lastValueFrom, of, throwError, toArray } from "rxjs";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { CustomerProfileService } from "./customerprofile.service";
import { CustomerProfileDTO } from "./customerprofiledto";
import axios from 'axios';
 
describe("CustomerService", () => {
  let service: CustomerProfileService;
  let httpService: HttpService;
  jest.mock('axios');
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerProfileService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        }, 
          {
            useValue: AppConfig,
            provide: "APP_CONFIG",
          },
      ],
    }).compile();
    service = module.get<CustomerProfileService>(CustomerProfileService);
    httpService = module.get<HttpService>(HttpService);
  });
  
  const mockProfile: CustomerProfileDTO = {
    profile_id: "78b8f457-6e1a-43af-be2e-460f356905fa",
    customer_id: "CUST124",
    customer_address_id: "Kolkata",
    credit_rating: "191919",
    credit_limit_amt: 8987989,
    ownership: "PRIVATE",
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
 
  describe("getCustomerProfiles", () => {
    it("should return a array of customer profiles", async () => {
      jest
        .spyOn(axios, "get")
        .mockResolvedValueOnce({data: [mockProfile]});
      const result = await service.getProfiles()
      expect(result).toEqual([mockProfile]);
    });

    it("should handle API error and throw ForbiddenException", async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new ForbiddenException('API not available'));
      await expect(service.getProfiles()).rejects.toThrowError(ForbiddenException);
    });
  });
  
  describe("getProfileByProfileID", () => {
    it("should return a customer profile by profile id", async () => {
      jest
        .spyOn(axios, "get")
        .mockResolvedValue({ data: mockProfile });
      const profile_id = '78b8f457-6e1a-43af-be2e-460f356905fa';
      const result = await service.getProfileByProfileID(profile_id);
      expect(result).toEqual(mockProfile);
    });

    it('should throw NotFoundException for invalid profile id', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { message: 'No customer profile found with given profile_id!' } });
      await expect(service.getProfileByProfileID('invalid-profile-id')).rejects.toThrowError(NotFoundException);
    });

    it('should return "ECONNREFUSED" connection refused if other server is unreachable', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce({ code: 'ECONNREFUSED' });
      try {
        await service.getProfileByProfileID('valid-profile-id');
        fail('Expected method to throw ForbiddenException');
      } catch (error) {
        expect(error.code).toBe('ECONNREFUSED');  
      }
    });

    it('should throw ForbiddenException for connection error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new ForbiddenException('API not available'));
      await expect(service.getProfileByProfileID('valid-profile-id')).rejects.toBeInstanceOf(ForbiddenException);
    });
  });

  describe("getProfileByCustomerID", () => {
    const customer_id = 'CUST1234';
    it("should return a customer profile by customer id", async () => {
      jest
        .spyOn(axios, "get").mockResolvedValueOnce({ data: mockProfile });
      const result = await service.getProfileByCustomerID(customer_id);
      expect(result).toEqual(mockProfile);
    });

    it('should throw NotFoundException for invalid customer id', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { message: 'No customer profile found with given customer_id!' } });
      await expect(service.getProfileByCustomerID(customer_id)).rejects.toThrowError(NotFoundException);
    });

    it('should return "ECONNREFUSED" connection refused if other server is unreachable', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce({ code: 'ECONNREFUSED' });
      try {
        await service.getProfileByCustomerID(customer_id);
        fail('Expected method to throw ForbiddenException');
      } catch (error) {
        expect(error.code).toBe('ECONNREFUSED');  
      }
    });

    it('should throw ForbiddenException for connection error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new ForbiddenException('API not available'));
      await expect(service.getProfileByCustomerID('valid-customer-id')).rejects.toBeInstanceOf(ForbiddenException);
    });
  });
});
