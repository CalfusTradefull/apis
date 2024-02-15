import { Test, TestingModule } from "@nestjs/testing";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { CustomerDTO } from "./customer.entity";
import {
    BadRequestException,
  ForbiddenException,
  InjectionToken,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { AppConfig } from "src/config/AppConfig";
import { ClsService } from "nestjs-cls";
import { HttpService } from "@nestjs/axios";
import axios, { AxiosError } from "axios";
import * as request from "supertest";

const mockAppConfig = {
  DAL_URL: "https://example.com/",
};
const mockCustomers = {
  customer_id: "efb444e4-4b7d-44d0-b12b-06a97006ea95",
  customer_name: "ABC Corporation",
  customer_brand_name: "ABC Brand",
  tf_customer_number: "TF123",
  erp_account_number: "ERP456",
  customer_type: "Business",
  customer_status: "Active",
  customer_category_id: "Category123",
  tax_identifier_number: "TIN789",
  customer_since_dt: "2022-01-01",
  parent_customer_id: "Parent456",
  doing_business_as: "ABC Corp",
  retail_outlet_flg: true,
  is_b2b_flg: true,
  is_multi_brand_flg: true,
  tier_id: "Tier1",
  region_id: "Region123",
  lifecycle_stage_id: "Stage456",
  sic_code: "SIC789",
  sic_code_type: "TypeA",
  naics_code: "NAICS123",
  naics_code_descr: "Description for NAICS123",
  stock_ticker: "ABC",
  logistics_fulfillment: {
    pick_pack_ship: "Warehouse123",
    ship_station: "ShipStation456",
    wms: "WMS789",
  },
  cis_id: "CIS789",
  duns_number: "DUNS456",
  demandbase_id: "Demandbase789",
  zoominfo_id: "ZoomInfo456",
  expected_arr: "2022-02-01",
  expected_gmv: "100000",
  additional_customer_info: {
    key1: "value1",
    key2: "value2",
  },
  create_date: new Date(),
  created_by: "JohnDoe",
  last_update_date: new Date(),
  last_updated_by: "JaneDoe",
};

const mockClsService: Partial<ClsService> = {
  getId: () => "mocked-id",
};
describe("CustomerController", () => {
  let controller: CustomerController;
  let customerService: CustomerService;
  let loggerMock: jest.Mocked<Logger>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        CustomerService,
        { provide: "APP_CONFIG", useValue: mockAppConfig },
        {
          provide: ClsService,
          useValue: mockClsService,
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();
    loggerMock = module.get(Logger) as jest.Mocked<Logger>;

    controller = module.get<CustomerController>(CustomerController);
    customerService = module.get<CustomerService>(CustomerService);
  });
  /**
   * get Customers
   */

  describe("getCustomers", () => {
    it("should retrieve all customers successfully", async () => {
      jest
        .spyOn(customerService, "getCustomers")
        .mockResolvedValueOnce([mockCustomers]);
      const result = await controller.getCustomers();
      expect(result).toStrictEqual([mockCustomers]);
    });

    it("should handle NotFound exception from service", async () => {
      jest
        .spyOn(customerService, "getCustomers")
        .mockRejectedValueOnce(new NotFoundException("Customers not found"));
      await expect(controller.getCustomers()).rejects.toThrowError(
        NotFoundException
      );
    });

    it("should handle ForbiddenException from service", async () => {
      jest
        .spyOn(customerService, "getCustomers")
        .mockRejectedValueOnce(new ForbiddenException("API not available"));
      await expect(controller.getCustomers()).rejects.toThrowError(
        ForbiddenException
      );
    });

    it("should handle other exceptions from service", async () => {
      jest
        .spyOn(customerService, "getCustomers")
        .mockRejectedValueOnce(new Error("Internal server error"));
      await expect(controller.getCustomers()).rejects.toThrowError(Error);
    });
  });

  /**
   * getCustomerByCustomerID
   */

  describe("getCustomerByCustomerID", () => {
    it("should return customer data when the service call is successful", async () => {
      const customerId = mockCustomers.customer_id;
      jest
        .spyOn(customerService, "getCustomer")
        .mockImplementation(() => Promise.resolve(mockCustomers));
      const result = await controller.getCustomerByCustomerID(customerId);
      //expect(loggerMock.log).toHaveBeenCalledTimes(0);
      expect(result).toStrictEqual(mockCustomers);
    });

    it("should handle 404 error (Not Found)", async () => {
      const customerId = "non-existent-id";
      const axiosError = new NotFoundException("Not Found");
      (axiosError as any).response = { status: 404 };
      jest
        .spyOn(customerService, "getCustomer")
        .mockRejectedValueOnce(axiosError);
      return expect(
        controller.getCustomerByCustomerID(customerId)
      ).rejects.toThrowError(NotFoundException);
    });

    it("should handle InternalServerErrorException", () => {
      jest
        .spyOn(customerService, "getCustomer")
        .mockRejectedValue(new Error("Some internal server error"));
      return expect(
        controller.getCustomerByCustomerID(
          "efb444e4-4b7d-44d0-b12b-06a97006ea91"
        )
      ).rejects.toThrowError(Error);
    });

    it("should handle ForbiddenException", async () => {
      jest
        .spyOn(customerService, "getCustomer")
        .mockRejectedValueOnce(new ForbiddenException());
      await expect(
        controller.getCustomerByCustomerID(
          "efb444e4-4b7d-44d0-b12b-06a97006ea95"
        )
      ).rejects.toThrowError(ForbiddenException);
    });

    
  });

  /**
   * Create Customers 
   */

  describe("create Customers", () => {
    const mockCustomerDTO: CustomerDTO = {
        customer_name: "ABC Corporation",
        customer_brand_name: "ABC Brand",
        tf_customer_number: "TF123",
        erp_account_number: "ERP456",
        customer_type: "Business",
        customer_status: "Active",
        customer_category_id: "Category123",
        tax_identifier_number: "TIN789",
        customer_since_dt: "2022-01-01",
        parent_customer_id: "Parent456",
        doing_business_as: "ABC Corp",
        retail_outlet_flg: true,
        is_b2b_flg: true,
        is_multi_brand_flg: true,
        tier_id: "Tier1",
        region_id: "Region123",
        lifecycle_stage_id: "Stage456",
        sic_code: "SIC789",
        sic_code_type: "TypeA",
        naics_code: "NAICS123",
        naics_code_descr: "Description for NAICS123",
        stock_ticker: "ABC",
        logistics_fulfillment:
          '{"pick_pack_ship":"Warehouse123","ship_station":"ShipStation456","wms":"WMS789"}',
        cis_id: "CIS789",
        duns_number: "DUNS456",
        demandbase_id: "Demandbase789",
        zoominfo_id: "ZoomInfo456",
        expected_arr: "2022-02-01",
        expected_gmv: "100000",
        additional_customer_info: '{"key1":"value1","key2":"value2"}',
        created_by: "JohnDoe",
        last_updated_by: "JaneDoe",
      };
    it('should create a new customer successfully', async () => {
        jest.spyOn(customerService, 'create').mockResolvedValue(mockCustomerDTO);
        const response = await controller.create(mockCustomerDTO);
        expect(response).toEqual(mockCustomerDTO);
      });

      it('should handle internal server error during customer creation', async () => {
        jest.spyOn(customerService, 'create').mockRejectedValue(new InternalServerErrorException('Internal server error'));
      
        await expect(controller.create(mockCustomerDTO)).rejects.toThrowError(InternalServerErrorException);
      });
      it('should handle bad request during customer creation', async () => {
        jest.spyOn(customerService, 'create').mockRejectedValue(new BadRequestException('Bad request'));
      
        await expect(controller.create(mockCustomerDTO)).rejects.toThrowError(BadRequestException);
      });

      it('should log the customer creation', async () => {
        jest.spyOn(customerService, 'create').mockResolvedValue(mockCustomerDTO);

        const loggerSpy = jest.spyOn(controller['logger'], 'log');
      
        await controller.create(mockCustomerDTO);
      
        expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining('Create Customer'));
      });
  });
});
