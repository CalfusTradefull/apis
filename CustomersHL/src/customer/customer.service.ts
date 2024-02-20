import {
  ForbiddenException,
  Injectable,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ClsModule, ClsService } from "nestjs-cls";
import { AppConfig } from "../config/AppConfig";
import { HttpService } from "@nestjs/axios";
import axios, { AxiosError } from "axios";
import { catchError, map, lastValueFrom, async } from "rxjs";
import fetch from "node-fetch";
import { CustomerDTO } from "./customer.entity";
import { Logger } from "@nestjs/common";

@Injectable()
export class CustomerService {
  constructor(
    private http: HttpService,
    @Inject("APP_CONFIG") private appConfig: typeof AppConfig,
    private readonly cls: ClsService
  ) {}
  private readonly logger = new Logger("TFHL_CUSTOMER_SERVICE");

  async getCustomers() {
    try {
      this.logger.log(
        this.cls.getId() +
          " " +
          new Date(Date.now()).toLocaleString() +
          " Retrieving all customers"
      );
      const response = await axios.get(this.appConfig.DAL_URL + "customers");
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        throw new ForbiddenException("API not available");
      } else {
        this.logger.log(
          `An error occurred while trying to retrieve customers: ${JSON.stringify(
            error
          )}`
        );
        throw new Error(error.message || "Server error");
      }
    }
  }

  async getCustomer(customer_id: string) {
    try {
      this.logger.log(
        this.cls.getId() +
          " " +
          new Date(Date.now()).toLocaleString() +
          " Get Customer by ID: " +
          customer_id
      );
      const response = await axios.get(
        this.appConfig.DAL_URL + "customers/" + customer_id
      );
      return response.data;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException("API not available");
      } else if (error.isAxiosError) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          throw new NotFoundException(
            `Customer with ID ${customer_id} not found`
          );
        } else if (axiosError.response?.status === 400) {
          throw new BadRequestException(axiosError.response.data);
        } else {
          this.logger.error(
            `An error occurred while trying to retrieve customer by ID ${customer_id}: ${error.message}`
          );
          throw error;
        }
      } else {
        this.logger.error(
          `An error occurred while trying to retrieve customer by ID ${customer_id}: ${error.message}`
        );
        throw error;
      }
    }
  }

  async getAddress(customer_id: string) {
    this.logger.log(
      new Date(Date.now()).toLocaleString() +
        " Get Address by Customer ID: " +
        customer_id
    );
    const response = await fetch(
      this.appConfig.DAL_URL + "address/address/".concat(customer_id)
    );
    const data = await response.json();
    return data;
  }

  /**
   * Create user Service function
   */

  async create(customer: CustomerDTO) {
    const customHeaders = {
      "Content-Type": "application/json",
    };
    try {
      this.logger.log(
        new Date(Date.now()).toLocaleString() +
          " Create Customer: " +
          JSON.stringify(customer)
      );
      const url = this.appConfig.DAL_URL + "customers";
      const response = await axios.post(url, customer, {
        headers: customHeaders,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          if (axiosError.response.status === 400) {
            throw new HttpException(
              axiosError.response.data,
              HttpStatus.BAD_REQUEST
            );
          } else if (axiosError.response.status === 404) {
            throw new HttpException("Not found", HttpStatus.NOT_FOUND);
          } else {
            throw new HttpException(
              "Server error",
              HttpStatus.INTERNAL_SERVER_ERROR
            );
          }
        } else {
          throw new HttpException(
            "Network error",
            HttpStatus.SERVICE_UNAVAILABLE
          );
        }
      }
      throw new HttpException(
        "Internal server error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(customerid: string, customer: Partial<CustomerDTO>) {
    const url = this.appConfig.DAL_URL + "customers/" + customerid;

    const customHeaders = {
      "Content-Type": "application/json",
    };

    try {
      this.logger.log(
        new Date(Date.now()).toLocaleString() +
          " Update Customer: " +
          JSON.stringify(customer)
      );

      const response = await axios.put(url, customer, {
        headers: customHeaders,
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          const { status } = axiosError.response;

          if (status === 404) {
            throw new HttpException("Customer not found", HttpStatus.NOT_FOUND);
          } else if (status === 400) {
            throw new HttpException("Bad request", HttpStatus.BAD_REQUEST);
          } else {
            throw new HttpException(
              "Server error",
              HttpStatus.INTERNAL_SERVER_ERROR
            );
          }
        } else {
          throw new HttpException(
            "Network error",
            HttpStatus.SERVICE_UNAVAILABLE
          );
        }
      } else {
        throw new HttpException(
          "Internal server error",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  async delete(customerId: string) {
    try {
      this.logger.log(
        new Date(Date.now()).toLocaleString() +
          " Delete Customer: " +
          customerId
      );
      const url = this.appConfig.DAL_URL + "customers/".concat(customerId);
      const customHeaders = {
        "Content-Type": "application/json",
      };
      const response = await axios.delete(url, { headers: customHeaders });

      if (response.status >= 200 && response.status < 300) {
        return response.status;
      } else {
        this.logger.error(
          `Failed to delete customer with ID ${customerId}. Status: ${response.status}`
        );
        throw new Error(
          `Failed to delete customer with ID ${customerId}. Status: ${response.status}`
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        this.logger.warn(`Customer with ID ${customerId} not found.`);
        throw new NotFoundException(`Customer with ID ${customerId} not found`);
      } else {
        this.logger.error(
          `Unexpected error during delete operation for customer with ID ${customerId}. Error: ${error.message}`
        );
      }
      throw error;
    }
  }
}
