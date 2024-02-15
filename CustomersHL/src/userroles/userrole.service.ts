import { AppConfig } from "../config/AppConfig";
import { ForbiddenException, Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { catchError, map, lastValueFrom } from 'rxjs';
import fetch from 'node-fetch';
import { UserRoleDTO } from './userrole.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class UserRoleService {
  constructor(private http: HttpService, @Inject('APP_CONFIG') private appConfig: typeof AppConfig) {}
  private readonly logger = new Logger('TFHL_CUSTOMER_SERVICE');

  async getUserRoles() {
    
    const userroles = this.http
      .get(this.appConfig.DAL_URL + 'userroles')
      .pipe(
        map((res) => userroles.data)
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    return userroles;
  }

  
  async getUserRole(userroleid: string) {
    const userroleResponse = await fetch(this.appConfig.DAL_URL + 'userroles/'.concat(userroleid));
    const userroleData = await userroleResponse.json();
    return userroleData
  }

  async getUserRoleByUserID(userid: string) {

    const response = await fetch(this.appConfig.DAL_URL + 'roles/role/'.concat(userid));
    const data = await response.json();
    return data
  }

  async create(userrole: UserRoleDTO) {

    const url = this.appConfig.DAL_URL + 'userroles'

    const customHeaders = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {method: "POST",headers: customHeaders,body: JSON.stringify(userrole),})
    const data = await response.json();
    return data
  }

  async update(userroleid: string, userrole: UserRoleDTO) {

    const url = this.appConfig.DAL_URL + 'userroles/'.concat(userroleid)

    const customHeaders = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {method: "PUT",headers: customHeaders,body: JSON.stringify(userrole),})
    const data = await response.json();
    return data
  }

  async delete(userroleid: string) {

    const url = this.appConfig.DAL_URL + 'userroles/'.concat(userroleid)

    const customHeaders = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {method: "DELETE"})
    const data = response.status
    return data
  }
    
}

