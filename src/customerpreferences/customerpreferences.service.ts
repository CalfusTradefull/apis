import { AppConfig } from "../config/AppConfig";
import { ForbiddenException, Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { catchError, map, lastValueFrom } from 'rxjs';
import fetch from 'node-fetch';
import { CustomerPreferencesDTO } from './customerpreferences.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class CustomerPreferencesService {
  constructor(private http: HttpService, @Inject('APP_CONFIG') private appConfig: typeof AppConfig) {}
  private readonly logger = new Logger('TFHL_CUSTOMER_SERVICE');

  async getCustomerPreferences() {
   
    const customers = this.http
      .get(this.appConfig.DAL_URL + 'customerpreferences')
      .pipe(
        map((res) => res.data)
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    return customers;
  }

  
  async getCustomerPreferencesByID(customerpreferencesid: string) {
    const customerResponse = await fetch(this.appConfig.DAL_URL + 'customerpreferences/'.concat(customerpreferencesid));
    const customerData = await customerResponse.json();
    return customerData
  }

  async getCustomerPreferencesByCustomerID(customerpreferencesid: string) {

    const response = await fetch(this.appConfig.DAL_URL + 'customerpreferences/customerpreference/'.concat(customerpreferencesid));
    const data = await response.json();
    return data
  }

  async create(customerpreferences: CustomerPreferencesDTO) {

    const url = this.appConfig.DAL_URL + 'customerpreferences'

    const customHeaders = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {method: "POST",headers: customHeaders,body: JSON.stringify(customerpreferences),})
    const data = await response.json();
    return data
  }

  async update(customerpreferencesid: string, customerpreferences: CustomerPreferencesDTO) {

    const url = this.appConfig.DAL_URL + 'customerpreferences/'.concat(customerpreferencesid)

    const customHeaders = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {method: "PUT",headers: customHeaders,body: JSON.stringify(customerpreferences),})
    const data = await response.json();
    return data
  }

  async delete(customerid: string) {

    const url = this.appConfig.DAL_URL + 'customerpreferences/'.concat(customerid)

    const customHeaders = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {method: "DELETE"})
    const data = response.status
    return data
  }

    
}

