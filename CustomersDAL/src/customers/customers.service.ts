import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  DeleteResult,
  EntityNotFoundError,
  QueryFailedError,
  Repository,
} from "typeorm";
import { Customer } from "./customer.entity";
import { error } from "console";

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>
  ) {}

  // get all customers
  async findall(): Promise<Customer[]> {
    try {
      return await this.customersRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(
        "Error occurred while fetching customers"
      );
    }
  }
  // get one customer
  async findOne(customer_id: string): Promise<Customer> {
    try {
      const customer = await this.customersRepository.findOne({
        where: { customer_id },
      });
      return customer;
    } catch (error) {
      const postgresErrorMessage = error.message;
      if (postgresErrorMessage.includes("invalid input syntax for type uuid")) {
        throw new BadRequestException(postgresErrorMessage);
      }
      throw new InternalServerErrorException(
        "Error occurred while fetching customer"
      );
    }
  }

  /**
   * get one customer by Name
   */

  async findByName(customer_name: string): Promise<Customer> {
    return await this.customersRepository.findOne({ where: { customer_name } });
  }

  /**
   *  create customer
   */

  async create(customer: Customer): Promise<Customer> {
    try {
      const newCustomer = this.customersRepository.create(customer);
      const createdCustomer = await this.customersRepository.save(newCustomer);
      if (!createdCustomer) {
        throw new error("Could not create customer");
      }
      return createdCustomer;
    } catch (error) {
      const postgresErrorMessage = error.message;
      if (postgresErrorMessage.includes("null value in column")) {
        throw new BadRequestException(postgresErrorMessage);
      } else {
        throw new InternalServerErrorException(
          "Internal server error occurred while creating a customer"
        );
      }
    }
  }

  async update(
    customer_id: string,
    customer: Partial<Customer>
  ): Promise<Customer> {
    try {
      const updateResult = await this.customersRepository.update(
        customer_id,
        customer
      );
      if (updateResult.affected === 0) {
        throw new NotFoundException(
          `Customer with ID ${customer_id} not found`
        );
      }
      const updatedCustomer = await this.customersRepository.findOne({
        where: { customer_id },
      });
      if (!updatedCustomer) {
        throw new InternalServerErrorException(
          "Failed to retrieve updated customer information"
        );
      }
      return updatedCustomer;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(
          `Customer with ID ${customer_id} not found`
        );
      } else if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException(
          "Failed to update customer information"
        );
      } else {
        throw new InternalServerErrorException(
          "Internal server error occurred during customer update"
        );
      }
    }
  }

  // delete customer
  async delete(customer_id: string): Promise<DeleteResult> {
    try {
      const customer = await this.customersRepository.findOne({
        where: { customer_id },
      });
      if (!customer) {
        throw new NotFoundException("Customer not found");
      }
      const deleteResult: DeleteResult = await this.customersRepository.delete(
        customer_id
      );

      if (deleteResult.affected === 0) {
        throw new NotFoundException("Customer not found");
      }
      return deleteResult;
    } catch (error) {
      throw error;
    }
  }
}
