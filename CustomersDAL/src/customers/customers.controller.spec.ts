import { Test, TestingModule } from "@nestjs/testing";
import { CustomersController } from "./customers.controller";
import { CustomersService } from "./customers.service";
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Customer } from "./customer.entity";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("CustomersController", () => {
  let controller: CustomersController;
  let customersService: CustomersService;
  let repository: Repository<Customer>;
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    customersService = module.get<CustomersService>(CustomersService);
  });

  describe("findAll", () => {
    it("should return a list of customers", async () => {
      jest
        .spyOn(customersService, "findall")
        .mockResolvedValue([mockCustomers] as Customer[]);
      const result = await controller.findAll();
      expect(result).toEqual([mockCustomers] as Customer[]);
    });

    it("should handle errors and throw InternalServerErrorException", async () => {
      jest
        .spyOn(customersService, "findall")
        .mockRejectedValue(new Error("Test error"));
      await expect(async () => await controller.findAll()).rejects.toThrowError(
        InternalServerErrorException
      );
    });
  });

  /**
   *FindOne
   */
  describe("findOne", () => {
    it("should return the customer if found", async () => {
      jest.spyOn(customersService, "findOne").mockResolvedValue(mockCustomers);
      const result = await controller.findOne(mockCustomers.customer_id);
      expect(result).toBe(mockCustomers);
    });

    it("should throw NotFoundException if customer is not found", async () => {
      jest.spyOn(customersService, "findOne").mockResolvedValue(null);
      await expect(controller.findOne("non-existent-id")).rejects.toThrowError(
        NotFoundException
      );
    });

    it("should throw BadRequestException with detailed error message for invalid UUID format", async () => {
      jest
        .spyOn(customersService, "findOne")
        .mockRejectedValue(new BadRequestException());
      await expect(controller.findOne("invalid-uuid")).rejects.toThrowError(
        BadRequestException
      );
    });

    it("should throw InternalServerErrorException for other unexpected errors", async () => {
      jest
        .spyOn(customersService, "findOne")
        .mockRejectedValue(new Error("Unexpected error"));
      await expect(controller.findOne("some-id")).rejects.toThrowError(
        InternalServerErrorException
      );
    });
  });

  /**
   * Create
   */

  describe("Create", () => {
    it("should create a new customer successfully", async () => {
      jest.spyOn(customersService, "create").mockResolvedValue(mockCustomers);
      const createdCustomer = await controller.create(mockCustomers);
      expect(customersService.create).toHaveBeenCalledWith(mockCustomers);
      expect(createdCustomer).toEqual(mockCustomers);
    });

    it("should handle a BadRequestException from the service", async () => {
      jest
        .spyOn(customersService, "create")
        .mockRejectedValue(new BadRequestException("Bad request"));
      await expect(controller.create(mockCustomers)).rejects.toThrowError(
        BadRequestException
      );
    });

    it("should handle an InternalServerErrorException from the service", async () => {
      jest
        .spyOn(customersService, "create")
        .mockRejectedValue(
          new InternalServerErrorException("Internal server error")
        );
      await expect(controller.create(mockCustomers)).rejects.toThrowError(
        InternalServerErrorException
      );
    });

    it("should handle other unexpected errors from the service", async () => {
      jest
        .spyOn(customersService, "create")
        .mockRejectedValue(new Error("Some unexpected error"));
      await expect(controller.create(mockCustomers)).rejects.toThrowError(
        Error
      );
    });
  });

/**
 * Update Customers 
 */


  describe('update', () => {
    const mockCustomersupdate: Customer = {
      customer_id: "efb444e4-4b7d-44d0-b12b-06a97006ea95",
      customer_name: "ABC Corporation",
      customer_brand_name: "ABC Brand123",
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
    it('should update customer successfully', async () => {
      const customer_id = 'efb444e4-4b7d-44d0-b12b-06a97006ea95';
      const updatedCustomer: Partial<Customer> = {
        "customer_brand_name": "ABC Brand123"
     }
      jest.spyOn(customersService, 'update').mockResolvedValue(mockCustomersupdate);
      const result = await controller.update(customer_id, updatedCustomer);
      expect(result).toEqual(mockCustomersupdate);
    });

    it('should handle customer not found', async () => {

      const customer_id = 'nonexistent-customer-id';
      const updatedCustomer: Partial<Customer> = {
        "customer_brand_name": "ABC Brand123"
     }
      jest.spyOn(customersService, 'update').mockRejectedValue(new NotFoundException());
      await expect(controller.update(customer_id, updatedCustomer)).rejects.toThrowError(NotFoundException);
    });

    it('should handle internal server error during update', async () => {
  
      const customer_id = 'efb444e4-4b7d-44d0-b12b-06a97006ea95';
      const updatedCustomer: Partial<Customer> = {
        "customer_brand_name": "ABC Brand123"
     }
      jest.spyOn(customersService, 'update').mockRejectedValue(new InternalServerErrorException());
      await expect(controller.update(customer_id, updatedCustomer)).rejects.toThrowError(InternalServerErrorException);
    });
  });
});
