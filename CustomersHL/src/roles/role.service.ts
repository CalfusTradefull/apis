import { AppConfig } from "../config/AppConfig";
import { ForbiddenException, Injectable, Inject, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosError } from 'axios';
import { RoleDTO } from './role.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(private http: HttpService, @Inject('APP_CONFIG') private appConfig: typeof AppConfig) {}
  private readonly logger = new Logger('TFHL_CUSTOMER_SERVICE');

  async getRoles() {
    try {
      this.logger.log(new Date(Date.now()).toLocaleString() + "Get Roles Call");
      const response = await axios.get(this.appConfig.DAL_URL + 'roles');
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async getRole(roleid: string) {
    try {
      const response = await axios.get(this.appConfig.DAL_URL + 'roles/'.concat(roleid));
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async create(role: RoleDTO) {
    const customHeaders = { "Content-Type": "application/json" };
    try {
      this.logger.log(new Date(Date.now()).toLocaleString() + " Create Role: " + JSON.stringify(role));
      const url = this.appConfig.DAL_URL + 'roles';
      const response = await axios.post(url, role, { headers: customHeaders});
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async update(roleid: string, role: Partial<RoleDTO>) {
    const customHeaders = { "Content-Type": "application/json" };
    try {
      this.logger.log(new Date(Date.now()).toLocaleString() + " Create Role: " + JSON.stringify(role));
      const url = this.appConfig.DAL_URL + 'roles/'.concat(roleid);
      const response = await axios.put(url, role, { headers: customHeaders});
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  async delete(roleid: string) {
    const customHeaders = { "Content-Type": "application/json" };
    try {
      this.logger.log(new Date(Date.now()).toLocaleString() + " Delete Role: " + roleid);
      const url = this.appConfig.DAL_URL + 'roles/'.concat(roleid);
      const response = await axios.delete(url, { headers: customHeaders});
      return response;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  // Used for error handling.
  private handleAxiosError(error: any): never {
    if (error instanceof ForbiddenException) {
      throw new ForbiddenException("API not available");
    }
    if (!axios.isAxiosError(error)) {
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      this.logger.error(JSON.stringify(axiosError.response.data));
      switch (axiosError.response.status) {
        case 400:
          throw new BadRequestException(axiosError.response.data);
        case 404:
          throw new NotFoundException(`Role not found for the given roleid.`);
        default:
          throw new HttpException("Internal Server error", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      throw new HttpException("Network error", HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
    
}

