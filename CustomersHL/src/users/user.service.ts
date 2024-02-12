import { AppConfig } from "../config/AppConfig";
import { ForbiddenException, Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { catchError, map, lastValueFrom } from 'rxjs';
import fetch from 'node-fetch';
import { UserDTO } from './user.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private http: HttpService, @Inject('APP_CONFIG') private appConfig: typeof AppConfig) {}
  private readonly logger = new Logger('TFHL_CUSTOMER_SERVICE');

  async getUsers() {
    this.logger.log(new Date(Date.now()).toLocaleString() + ' Retreving all Users');
    const customers = this.http
      .get(this.appConfig.DAL_URL + 'users')
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

  
  async getUser(userid: string) {

    this.logger.log(new Date(Date.now()).toLocaleString() + ' Get User by ID: ' + userid);
    const userResponse = await fetch(this.appConfig.DAL_URL + 'users/'.concat(userid));
    const userData = await userResponse.json();
    return userData
  }

  async create(user: UserDTO) {

    const url = this.appConfig.DAL_URL + 'users'

    const customHeaders = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {method: "POST",headers: customHeaders,body: JSON.stringify(user),})
    const data = await response.json();
    return data
  }

  async update(userid: string, user: UserDTO) {

    const url = this.appConfig.DAL_URL + 'users/'.concat(userid)

    const customHeaders = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {method: "PUT",headers: customHeaders,body: JSON.stringify(user),})
    const data = await response.json();
    return data
  }

  async delete(userid: string) {

    const url = this.appConfig.DAL_URL + 'users/'.concat(userid)

    const customHeaders = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {method: "DELETE"})
    const data = response.status
    return data
  }

    
}

