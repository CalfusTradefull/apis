import { Test, TestingModule } from "@nestjs/testing";
import {
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { ClsService } from "nestjs-cls";
import { AppConfig } from "../config/AppConfig";
import axios, { AxiosError } from "axios";
import fetch from "node-fetch";
import { HttpService } from "@nestjs/axios";

jest.mock("axios");
jest.mock("node-fetch");

describe("CustomerService", () => {
  let service: CustomerService;
  let httpService: HttpService;

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

  const mockClsService = {
    getId: jest.fn(),
  };

  const mockAppConfig = {
    DAL_URL: "https://example.com/",
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        HttpService,
        { provide: ClsService, useValue: mockClsService },
        { provide: "APP_CONFIG", useValue: AppConfig },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe("getCustomers", () => {
    it("should retrieve customers successfully", async () => {
      jest.spyOn(axios, "get").mockResolvedValue({ data: [mockCustomers] });
      const result = await service.getCustomers();
      expect(result).toEqual([mockCustomers]);
    });
    it("should handle 403 Forbidden error", async () => {
      jest.spyOn(axios, "get").mockRejectedValue({ response: { status: 403 } });
      await expect(service.getCustomers()).rejects.toThrowError(
        ForbiddenException
      );
    });

    it("should handle other errors", async () => {
      jest.spyOn(axios, "get").mockRejectedValue({ response: { status: 500 } });
      await expect(service.getCustomers()).rejects.toThrowError("Server error");
    });
  });

  // /**
  //  * FindOne
  //  */
  describe("FindOne", () => {
    it("should retrieve customer successfully", async () => {
      jest.spyOn(axios, "get").mockResolvedValue({ data: mockCustomers });
      const result = await service.getCustomer(
        "efb444e4-4b7d-44d0-b12b-06a97006ea95"
      );
      expect(result).toEqual(mockCustomers);
    });

    it("should handle 404 error (Not Found)", async () => {
      const axiosError: AxiosError = {
        name: "AxiosError",
        message: "Request failed with status code 404",
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: {},
          status: 404,
          statusText: "Not Found",
          headers: {},
          config: undefined,
        },
      };
      jest.spyOn(axios, "get").mockRejectedValue(axiosError);
      await expect(
        service.getCustomer("efb444e4-4b7d-44d0-b12b-06a97006ea91")
      ).rejects.toThrowError(NotFoundException);
    });

    it('should handle InternalServerErrorException', () => {
        jest.spyOn(axios, 'get').mockRejectedValue(new Error('Some internal server error'));
        return expect(service.getCustomer('efb444e4-4b7d-44d0-b12b-06a97006ea91')).rejects.toThrowError(Error);
      });

      it('should handle ForbiddenException', async () => {
          jest.spyOn(axios, 'get').mockRejectedValueOnce(new ForbiddenException);
          await expect(service.getCustomer('efb444e4-4b7d-44d0-b12b-06a97006ea95')).rejects.toThrowError(ForbiddenException)
      });
  });
});
