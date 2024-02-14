import { ForbiddenException, Injectable, Inject } from '@nestjs/common';
import { ClsModule, ClsService } from 'nestjs-cls';
import { AppConfig } from "../config/AppConfig";
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { catchError, map, lastValueFrom } from 'rxjs';
import fetch from 'node-fetch';
import { CustomerDTO } from './customer.entity';
import { Logger } from '@nestjs/common';


@Injectable()
export class CustomerService {
  constructor(private http: HttpService, @Inject('APP_CONFIG') private appConfig: typeof AppConfig, private readonly cls: ClsService) {}
  private readonly logger = new Logger('TFHL_CUSTOMER_SERVICE');
  

  async getCustomers() {
    try {
      this.logger.log(this.cls.getId() +' ' +new Date(Date.now()).toLocaleString() +' Retrieving all customers',);
      const response = await axios.get(this.appConfig.DAL_URL + 'customers');
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        throw new ForbiddenException('API not available');
      } else {
       this.logger.log(`An error occurred while trying to retrieve customers: ${JSON.stringify(error)}`);
        throw error;
      }
    }
  }

  async getCustomer(customer_id: string) {
    
    this.logger.log(this.cls.getId() + " " + new Date(Date.now()).toLocaleString() + ' Get Customer by ID: ' + customer_id);
    const customerResponse = await fetch(this.appConfig.DAL_URL + 'customers/'.concat(customer_id));
    const customerData = await customerResponse.json();
    return customerData
  }

  async getAddress(customer_id: string) {

    this.logger.log(new Date(Date.now()).toLocaleString() + ' Get Address by Customer ID: ' + customer_id);
    const response = await fetch( this.appConfig.DAL_URL + 'address/address/'.concat(customer_id));
    const data = await response.json();
    return data
  }

  async create(customer: CustomerDTO) {

    this.logger.log(new Date(Date.now()).toLocaleString() + ' Create Customer: ' + JSON.stringify(customer));
    
    const url = this.appConfig.DAL_URL + 'customers'

    const customHeaders = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {method: "POST",headers: customHeaders,body: JSON.stringify(customer),})
    const data = await response.json();
    return data
  }

  async update(customerid: string, customer: CustomerDTO) {

    this.logger.log(new Date(Date.now()).toLocaleString() + ' Update Customer: ' + JSON.stringify(customer));
    const url = this.appConfig.DAL_URL + 'customers/'.concat(customerid)

    const customHeaders = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {method: "PUT",headers: customHeaders,body: JSON.stringify(customer),})
    const data = await response.json();
    return data
  }

  async delete(customerid: string) {

    this.logger.log(new Date(Date.now()).toLocaleString() + ' Delete Customer: ' + customerid);
    const url = this.appConfig.DAL_URL + 'customers/'.concat(customerid)

    const customHeaders = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {method: "DELETE"})
    const data = response.status
    return data
  }

}

