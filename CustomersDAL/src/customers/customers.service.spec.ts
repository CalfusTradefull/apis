import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { Customer } from "./customer.entity";
import { error } from "console";

describe("CustomersService", () => {
  let service: CustomersService;
  let repository: Repository<Customer>;
  let repositoryMock: Record<string, jest.Mock>;

  const mockCustomers: Customer = {
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
    repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    repository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  describe("findAll", () => {
    it("should return an array of customers", async () => {
      jest.spyOn(repositoryMock, "find").mockResolvedValue([mockCustomers]);
      const result = await service.findall();
      expect(result).toEqual([mockCustomers]);
    });

    it("should handle errors and throw InternalServerErrorException", async () => {
      jest
        .spyOn(repositoryMock, "find")
        .mockRejectedValue(new Error("Test error"));
      await expect(service.findall()).rejects.toThrowError(
        InternalServerErrorException
      );
    });
  });

  /**
   * findOne
   */
  describe("findOne", () => {
    it("should return the customer if found", async () => {
      jest.spyOn(repositoryMock, "findOne").mockResolvedValue(mockCustomers);
      const result = await service.findOne("valid-customer-id");
      expect(result).toEqual(mockCustomers);
    });
    it("should throw BadRequestException for invalid UUID format", async () => {
      const invalidUuidError = new Error("invalid input syntax for type uuid");
      jest.spyOn(repositoryMock, "findOne").mockRejectedValue(invalidUuidError);
      await expect(service.findOne("invalid-uuid")).rejects.toThrowError(
        BadRequestException
      );
    });

    it("should throw null return if customer is not found", async () => {
      jest.spyOn(repository, "findOne").mockResolvedValue(null);
      await expect(service.findOne("invalid-uuid")).resolves.toEqual(null);
    });

    it("should throw InternalServerErrorException for other unexpected errors", async () => {
      const unexpectedError = new Error("Unexpected error");
      jest.spyOn(repository, "findOne").mockRejectedValue(unexpectedError);
      await expect(service.findOne("some-id")).rejects.toThrowError(
        InternalServerErrorException
      );
    });
  });

  /**
   * Create
   */
  describe("Create", () => {
    const mockCustomerscreate: Customer = {
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
      create_date: new Date("2024-02-15T12:07:02.001Z"),
      created_by: "JohnDoe",
      last_update_date: new Date("2024-02-15T12:07:02.001Z"),
      last_updated_by: "JaneDoe",
    };

    it("should create a new customer successfully", async () => {
      repositoryMock.create.mockReturnValue(mockCustomerscreate);
      repositoryMock.save.mockResolvedValue(mockCustomerscreate);
      const createdCustomer = await service.create(mockCustomerscreate);
      expect(repositoryMock.create).toHaveBeenCalledWith(mockCustomerscreate);
      expect(repositoryMock.save).toHaveBeenCalledWith(mockCustomerscreate);
      expect(createdCustomer).toEqual(mockCustomerscreate);
    });

    it("should handle a PostgreSQL constraint violation error", async () => {
      repositoryMock.create.mockReturnValue(mockCustomerscreate);
      repositoryMock.save.mockRejectedValue({
        message: "null value in column",
      });
      await expect(service.create(mockCustomerscreate)).rejects.toThrowError(
        BadRequestException
      );
    });

    it("should handle other errors during customer creation", async () => {
      repositoryMock.create.mockReturnValue(mockCustomerscreate);
      repositoryMock.save.mockRejectedValue(new Error("Some unexpected error"));
      await expect(service.create(mockCustomerscreate)).rejects.toThrowError(
        InternalServerErrorException
      );
    });
    it("should handle a failed save operation", async () => {
      repositoryMock.create.mockReturnValue(mockCustomerscreate);
      repositoryMock.save.mockResolvedValue(undefined);
      await expect(service.create(mockCustomerscreate)).rejects.toThrowError(
        InternalServerErrorException
      );
    });

    it("should handle other unexpected errors during customer creation", async () => {
      repositoryMock.create.mockReturnValue(mockCustomerscreate);
      repositoryMock.save.mockRejectedValue(new Error("Some unexpected error"));
      await expect(service.create(mockCustomerscreate)).rejects.toThrowError(
        InternalServerErrorException
      );
    });
  });

  /**
   * Update  Customer Test Suite
   */
  describe("Update  Customer", () => {
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
    it("should update customer successfully", async () => {
      const customer_id = "efb444e4-4b7d-44d0-b12b-06a97006ea95";
      const updatedCustomer: Partial<Customer> = {
        customer_brand_name: "ABC Brand123",
      };
      jest.spyOn(repositoryMock, "update").mockResolvedValue({ affected: 1 });
      jest
        .spyOn(repositoryMock, "findOne")
        .mockResolvedValue(mockCustomersupdate);

      const result = await service.update(customer_id, updatedCustomer);
      expect(result).toEqual(mockCustomersupdate);
    });

    it("should handle customer not found", async () => {
      const customer_id = "nonexistent-customer-id";
      const updatedCustomer: Partial<Customer> = {
        customer_brand_name: "ABC Brand123",
      };
      jest.spyOn(repositoryMock, "update").mockResolvedValue({ affected: 0 });
      await expect(
        service.update(customer_id, updatedCustomer)
      ).rejects.toThrowError(NotFoundException);
    });

    it("should handle internal server error during update", async () => {
      const customer_id = "efb444e4-4b7d-44d0-b12b-06a97006ea95";
      const updatedCustomer: Partial<Customer> = {
        customer_brand_name: "ABC Brand123",
      };
      jest
        .spyOn(repositoryMock, "update")
        .mockRejectedValue(new Error("Some unexpected error"));
      await expect(
        service.update(customer_id, updatedCustomer)
      ).rejects.toThrowError(InternalServerErrorException);
    });

    it("should handle internal server error during update", async () => {
      const customer_id = "efb444e4-4b7d-44d0-b12b-06a97006ea95";
      const updatedCustomer: Partial<Customer> = {
        customer_brand_name: "ABC Brand123",
      };
      jest
        .spyOn(repositoryMock, "update")
        .mockRejectedValue(
          new QueryFailedError("query", [], new Error("Some unexpected error"))
        );
      await expect(
        service.update(customer_id, updatedCustomer)
      ).rejects.toThrowError(InternalServerErrorException);
    });

    it("should handle Update but not return data ", async () => {
      const customer_id = "efb444e4-4b7d-44d0-b12b-06a97006ea95";
      const updatedCustomer: Partial<Customer> = {
        customer_brand_name: "ABC Brand123",
      };
      jest.spyOn(repositoryMock, "update").mockResolvedValue({ affected: 1 });
      jest.spyOn(repositoryMock, "findOne").mockRejectedValue(null);
      await expect(
        service.update(customer_id, updatedCustomer)
      ).rejects.toThrowError(InternalServerErrorException);
    });
  });

  /**
   * Delete  method service test tests
   */

  describe("Delete Customers ", () => {
    it("should delete an existing customer", async () => {
      var deleteResult = {
        affected: 1,
      };
      const customer_id = "efb444e4-4b7d-44d0-b12b-06a97006ea95";
      jest.spyOn(repositoryMock, "findOne").mockResolvedValue(mockCustomers);
      jest.spyOn(repositoryMock, "delete").mockResolvedValue(deleteResult);
      const result = await service.delete(customer_id);
      expect(result).toEqual(deleteResult);
    });
  });

  it("should throw NotFoundException for deleting a non-existing customer", async () => {
    const customer_id = "efb444e4-4b7d-44d0-b12b-06a97006ea95";
    jest.spyOn(repositoryMock, "findOne").mockResolvedValue(null);
    await expect(service.delete(customer_id)).rejects.toThrowError(
      NotFoundException
    );
  });
  it("should throw NotFoundException for deleting a non-existing customer", async () => {
    const customer_id = "efb444e4-4b7d-44d0-b12b-06a97006ea95";
    var deleteResult = {
      affected: 0,
    };
    jest.spyOn(repositoryMock, "findOne").mockResolvedValue(mockCustomers);
    jest.spyOn(repositoryMock, "delete").mockResolvedValue(deleteResult);
    await expect(service.delete(customer_id)).rejects.toThrowError(
      NotFoundException
    );
  });

  it("should handdal Others Errors", async () => {
    const customer_id = "efb444e4-4b7d-44d0-b12b-06a97006ea95";
    jest.spyOn(repositoryMock, "findOne").mockResolvedValue(Error);
    await expect(service.delete(customer_id)).rejects.toBeInstanceOf(Error);
  });
});
