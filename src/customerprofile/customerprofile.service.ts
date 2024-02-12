import { AppConfig } from "../config/AppConfig";
import { ForbiddenException, Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
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
    const customerprofileResponse = await fetch(this.appConfig.DAL_URL + 'customerprofile/'.concat(profileid));
    const customerprofileData = await customerprofileResponse.json();
    return customerprofileData
  }

  async getProfileByCustomerID(customer_id: string) {

    const response = await fetch(this.appConfig.DAL_URL + 'profiles/profile/'.concat(customer_id));
    const data = await response.json();
    return data
  }


    
}

