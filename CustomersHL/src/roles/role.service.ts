import { AppConfig } from "../config/AppConfig";
import { ForbiddenException, Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { catchError, map, lastValueFrom } from 'rxjs';
import fetch from 'node-fetch';
import { RoleDTO } from './role.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(private http: HttpService, @Inject('APP_CONFIG') private appConfig: typeof AppConfig) {}
  private readonly logger = new Logger('TFHL_CUSTOMER_SERVICE');

  async getRoles() {
    
    const roles = this.http
      .get(this.appConfig.DAL_URL + 'roles')
      .pipe(
        map((res) => res.data)
      )
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    return roles;
  }

  async getRole(roleid: string) {
    const roleResponse = await fetch(this.appConfig.DAL_URL + 'roles/'.concat(roleid));
    const roleData = await roleResponse.json();
    return roleData
  }

  async create(role: RoleDTO) {

    const url = this.appConfig.DAL_URL + 'roles'

    const customHeaders = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {method: "POST",headers: customHeaders,body: JSON.stringify(role),})
    const data = await response.json();
    return data
  }

  async update(roleid: string, role: RoleDTO) {

    const url = this.appConfig.DAL_URL + 'roles/'.concat(roleid)

    const customHeaders = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {method: "PUT",headers: customHeaders,body: JSON.stringify(role),})
    const data = await response.json();
    return data
  }

  async delete(roleid: string) {

    const url = this.appConfig.DAL_URL + 'roles/'.concat(roleid)

    const customHeaders = {
      "Content-Type": "application/json",
    }

    const response = await fetch(url, {method: "DELETE"})
    const data = response.status
    return data
  }
    
}

