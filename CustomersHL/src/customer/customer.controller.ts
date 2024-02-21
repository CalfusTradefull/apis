import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { ClsModule, ClsService } from "nestjs-cls";
import { CustomerService } from "./customer.service";
import { CustomerDTO } from "./customer.entity";
import { Logger } from "@nestjs/common";

@Controller("customers")
@ApiTags("Customers") // Add API tag for Swagger documentation
export class CustomerController {
  constructor(
    private customerService: CustomerService,
    private readonly cls: ClsService
  ) {}
  private readonly logger = new Logger("TFHL_CUSTOMER_CONTROLLER");

  @Get()
  @ApiOperation({
    summary: "Get all customers",
    description: "Retrieves a list of all customers.",
  })
  getCustomers() {
    this.logger.log(
      this.cls.getId() +
        " " +
        new Date(Date.now()).toLocaleString() +
        " Retrieving all customers"
    );
    return this.customerService.getCustomers();
  }

  @Get(":customerid")
  @ApiOperation({
    summary: "Get customer by ID",
    description:
      "Retrieves customer information based on the provided customer ID.",
  })
  @ApiParam({ name: "customerid", description: "Customer ID" })
  getCustomerByCustomerID(@Param("customerid") customerid: string) {
    this.logger.log(
      this.cls.getId() +
        " " +
        new Date(Date.now()).toLocaleString() +
        " Get Customer by ID: " +
        customerid
    );
    return this.customerService.getCustomer(customerid);
  }

  @Get("address/:customerid")
  @ApiOperation({
    summary: "Get customer address by ID",
    description:
      "Retrieves customer address based on the provided customer ID.",
  })
  @ApiParam({ name: "customerid", description: "Customer ID" })
  getAddressByCustomerID(@Param("customerid") customerid: string) {
    return this.customerService.getAddress(customerid);
  }

  @Post()
  @ApiOperation({
    summary: "Create customer",
    description: "Creates a new customer.",
  })
  @ApiBody({
    type: CustomerDTO,
    description: "Customer data to create a new customer",
  })
  @ApiOkResponse({
    type: CustomerDTO,
    description: "Successfully updated customer information",
  })
  @ApiNotFoundResponse({ description: "Customer not found" })
  @ApiBadRequestResponse({ description: "Bad request" })
  @ApiInternalServerErrorResponse({ description: "Internal server error" })
  create(@Body() customerDTO: CustomerDTO) {
    this.logger.log(
      new Date(Date.now()).toLocaleString() +
        " Create Customer: " +
        JSON.stringify(customerDTO)
    );
    return this.customerService.create(customerDTO);
  }

  @Put(":customerid")
  @ApiOperation({
    summary: "Update customer by ID",
    description:
      "Updates customer information based on the provided customer ID.",
  })
  @ApiParam({ name: "customerid", description: "Customer ID" })
  @ApiBody({ type: CustomerDTO, description: "Updated customer data" })
  update(
    @Param("customerid") customerid: string,
    @Body() customerDTO: Partial<CustomerDTO>
  ) {
    this.logger.log(
      new Date(Date.now()).toLocaleString() +
        " Update Customer: " +
        JSON.stringify(customerDTO)
    );

    return this.customerService.update(customerid, customerDTO);
  }

  @Delete(":customerid")
  @ApiOperation({
    summary: "Delete customer by ID",
    description: "Deletes a customer based on the provided customer ID.",
  })
  @ApiParam({ name: "customerid", description: "Customer ID" })
  delete(@Param("customerid") customerid: string) {
    this.logger.log(
      new Date(Date.now()).toLocaleString() + " Delete Customer: " + customerid
    );
    return this.customerService.delete(customerid);
  }
}
