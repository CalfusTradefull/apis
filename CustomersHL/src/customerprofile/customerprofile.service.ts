import { AppConfig } from "../config/AppConfig";
import { ForbiddenException, Injectable, Inject, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosError } from 'axios';
import { catchError, map, lastValueFrom } from 'rxjs';
import fetch from 'node-fetch';
import { Logger } from '@nestjs/common';

@Injectable()
export class CustomerProfileService {
  constructor(private http: HttpService, @Inject('APP_CONFIG') private appConfig: typeof AppConfig) {}
  private readonly logger = new Logger('TFHL_CUSTOMER_SERVICE');

  async getProfiles() {
    
    const customers = this.http
      .get(this.appConfig.DAL_URL + 'customerprofile')
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

  async getProfileByProfileID(profileid: string) {
    try {
        const customerprofileResponse = await axios.get(this.appConfig.DAL_URL + 'customerprofile/profileid/'.concat(profileid));
        if (customerprofileResponse.data && customerprofileResponse.data.message === 'No customer profile found with given profile_id!') {
            throw new NotFoundException(customerprofileResponse.data);
        }
        return customerprofileResponse.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 404) {
                throw new NotFoundException('No customer profile found with given profile_id!');
            } else if (axiosError.code === 'ECONNREFUSED') {  
              throw new ForbiddenException('API not available');
            } else {
                throw error;
            }
        } else {
            throw error;
        }
    }
}

async getProfileByCustomerID(customerid: string) {
  try {
    const customerprofileResponse = await axios.get(this.appConfig.DAL_URL + 'customerprofile/customerid/'.concat(customerid));
    if(customerprofileResponse.data && customerprofileResponse.data.message === 'No customer profile found with given customer_id!') {
      throw new NotFoundException(customerprofileResponse.data);
    }
    return customerprofileResponse.data;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
              throw new NotFoundException('No customer profile found with given customerid!');
          } else if (axiosError.code === 'ECONNREFUSED') {  
            throw new ForbiddenException('API not available');
          } else {
              throw error;
          }
      } else {
          throw error;
      }
  }
}
}
