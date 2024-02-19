import { HttpService } from "@nestjs/axios";
import { RoleService } from "./role.service";
import { Test, TestingModule } from "@nestjs/testing";
import { AppConfig } from "../config/AppConfig";
import axios, { AxiosError } from "axios";
import { RoleDTO, mockRoleDTO } from "./role.entity";
import { BadRequestException, ForbiddenException, HttpException, HttpStatus, InternalServerErrorException, NotFoundException } from "@nestjs/common";


describe("RoleService", () => {
  let service: RoleService;
  let httpService: HttpService;
  jest.mock('axios');
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: "APP_CONFIG",
          useValue: AppConfig,
        },
      ],
    }).compile();
    service = module.get<RoleService>(RoleService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  const mockRole: RoleDTO = {
    role_name: "Tester",
    role_name_cd: "Admin",
    role_status: "Active",
    active_start_dt: "2024-02-14",
    active_end_dt: "2024-02-14",
    additional_role_info: {
      key1: "No Kia",
      key2: "Afternoon",
      key3: "1234"
    },
    created_by: "Admin",
    last_updated_by: "Admin"
  }

  const mockReturnedRole: mockRoleDTO = {
    role_name: "Tester",
    role_name_cd: "Admin",
    role_status: "Active",
    active_start_dt: "2024-02-14",
    active_end_dt: "2024-02-14",
    additional_role_info: {
        key1: "No Kia",
        key2: "Afternoon"
    },
    created_by: "Admin",
    last_updated_by: "Admin",
    role_id: "91f0e770-8e4a-42ac-ab5e-8cec6b27d9b1",
    create_date: "2024-02-19T09:34:19.450Z",
    last_update_date: "2024-02-19T09:34:19.450Z"
  }
   
  const mockUpdateData = {
    role_name: "Viewer",
    role_name_cd: "Viewer_cd",
    role_status: "Inactive"
  }

  const mockUpdatedRole: mockRoleDTO = {
    ...mockReturnedRole,
    ...mockUpdateData
  }

  const valid_role_id = 'valid-id';
  const invalid_role_id = 'invalid-id';

  describe(("getRoles"), () => {
    it('should return a list of roles', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ data: [mockReturnedRole]});
      const result = await service.getRoles();
      expect(result).toEqual([mockReturnedRole])
    });

    it('should return Forbidden exception if DAL server is not reachable', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new ForbiddenException('API not available'));
      await expect(service.getRoles()).rejects.toThrowError(ForbiddenException);
    });

    it('should return BadRequestException for making a bad request', async () => {
      const axiosError: AxiosError = {
        name: "AxiosError",
        message: "Request failed with status code 400",
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: {},
          status: 400,
          statusText: "Bad Request",
          headers: {},
          config: undefined,
        },
      };
      jest.spyOn(axios, 'get').mockRejectedValue(axiosError);
      await expect(service.getRoles()).rejects.toThrowError(BadRequestException);
    })

    it('should return HttpException for any internal server error', async () => {
      const errorResponseData = { message: 'Internal server error', status: HttpStatus.INTERNAL_SERVER_ERROR };
      const axiosError: AxiosError = {
        name: "AxiosError",
        message: "Internal Server Error",
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: errorResponseData,
          status: 500,
          statusText: "Internal Server Error",
          headers: {},
          config: undefined,
        },
      };
      jest.spyOn(axios, 'get').mockRejectedValue(axiosError);
      await expect(service.getRoles()).rejects.toThrowError(HttpException);
    })

    it('should return HttpException for any other error', async () => {
      const errorResponseData = { message: 'Service Unavailable', status: HttpStatus.SERVICE_UNAVAILABLE };
      const axiosError: AxiosError = {
        name: "AxiosError",
        message: "Network Error",
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: errorResponseData,
          status: 503,
          statusText: "Network Error",
          headers: {},
          config: undefined,
        },
      };
      jest.spyOn(axios, 'get').mockRejectedValue(axiosError);
      await expect(service.getRoles()).rejects.toThrowError(HttpException);
    })

  });

  describe(("getRole"), () => {
    it('should return a role', async () => {
      jest.spyOn(axios, 'get').mockResolvedValue({ data: mockReturnedRole});
      const result = await service.getRole(valid_role_id);
      expect(result).toEqual(mockReturnedRole);
    });

    it('should return Forbidden exception if DAL server is not reachable', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new ForbiddenException('API not available'));
      await expect(service.getRole(valid_role_id)).rejects.toThrowError(ForbiddenException);
    });

    it('should return NotFoundException for any other axios error', async () => {
      const axiosError: AxiosError = {
        name: "AxiosError",
        message: "Request failed with status code 404",
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: {},
          status: 404,
          statusText: "Not Found",
          headers: {},
          config: undefined,
        },
      };
      jest.spyOn(axios, 'get').mockRejectedValue(axiosError);
      await expect(service.getRole(invalid_role_id)).rejects.toThrowError(NotFoundException);
    })

    it('should return BadRequestException for making a bad request', async () => {
      const axiosError: AxiosError = {
        name: "AxiosError",
        message: "Request failed with status code 400",
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: {},
          status: 400,
          statusText: "Bad Request",
          headers: {},
          config: undefined,
        },
      };
      jest.spyOn(axios, 'get').mockRejectedValue(axiosError);
      await expect(service.getRole(valid_role_id)).rejects.toThrowError(BadRequestException);
    })

    it('should return HttpException for any internal server error', async () => {
      const errorResponseData = { message: 'Internal server error', status: HttpStatus.INTERNAL_SERVER_ERROR };
      const axiosError: AxiosError = {
        name: "AxiosError",
        message: "Internal Server Error",
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: errorResponseData,
          status: 500,
          statusText: "Internal Server Error",
          headers: {},
          config: undefined,
        },
      };
      jest.spyOn(axios, 'get').mockRejectedValue(axiosError);
      await expect(service.getRole(valid_role_id)).rejects.toThrowError(HttpException);
    })

    it('should return HttpException for any other error', async () => {
      const errorResponseData = { message: 'Service Unavailable', status: HttpStatus.SERVICE_UNAVAILABLE };
      const axiosError: AxiosError = {
        name: "AxiosError",
        message: "Network Error",
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: errorResponseData,
          status: 503,
          statusText: "Network Error",
          headers: {},
          config: undefined,
        },
      };
      jest.spyOn(axios, 'get').mockRejectedValue(axiosError);
      await expect(service.getRole(valid_role_id)).rejects.toThrowError(HttpException);
    })
  });

  describe(("create"), () => {
    it('should create a role', async () => {
      jest.spyOn(axios, 'post').mockResolvedValue({ data: mockReturnedRole });
      const result = await service.create(mockRole);
      expect(result).toEqual(mockReturnedRole);
    });

    it('should return Forbidden exception if DAL server is not reachable', async () => {
      jest.spyOn(axios, 'post').mockRejectedValue(new ForbiddenException('API not available'));
      await expect(service.create(mockRole)).rejects.toThrowError(ForbiddenException);
    });
    
    it('should return BadRequestException for making a bad request', async () => {
      const axiosError: AxiosError = {
        name: "AxiosError",
        message: "Request failed with status code 400",
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: {},
          status: 400,
          statusText: "Bad Request",
          headers: {},
          config: undefined,
        },
      };
      jest.spyOn(axios, 'post').mockRejectedValue(axiosError);
      await expect(service.create(mockRole)).rejects.toThrowError(BadRequestException);
    })

    it('should return HttpException for any internal server error', async () => {
      const errorResponseData = { message: 'Internal server error', status: HttpStatus.INTERNAL_SERVER_ERROR };
      const axiosError: AxiosError = {
        name: "AxiosError",
        message: "Internal Server Error",
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: errorResponseData,
          status: 500,
          statusText: "Internal Server Error",
          headers: {},
          config: undefined,
        },
      };
      jest.spyOn(axios, 'post').mockRejectedValue(axiosError);
      await expect(service.create(mockRole)).rejects.toThrowError(HttpException);
    })

    it('should return HttpException for any other error', async () => {
      const errorResponseData = { message: 'Service Unavailable', status: HttpStatus.SERVICE_UNAVAILABLE };
      const axiosError: AxiosError = {
        name: "AxiosError",
        message: "Network Error",
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: errorResponseData,
          status: 503,
          statusText: "Network Error",
          headers: {},
          config: undefined,
        },
      };
      jest.spyOn(axios, 'post').mockRejectedValue(axiosError);
      await expect(service.create(mockRole)).rejects.toThrowError(HttpException);
    })

  });
  
  describe(("update"), () => {
    it('should update a role', async () => {
      jest.spyOn(axios, 'put').mockResolvedValue({ data: mockUpdatedRole});
      const result = await service.update(valid_role_id, mockUpdateData);
      expect(result).toEqual(mockUpdatedRole);
    });
    
    it('should return Forbidden exception if DAL server is not reachable', async () => {
      jest.spyOn(axios, 'put').mockRejectedValue(new ForbiddenException('API not available'));
      await expect(service.update(valid_role_id, mockUpdateData)).rejects.toThrowError(ForbiddenException);
    });

    it('should return NotFoundException for any other axios error', async () => {
      const axiosError: AxiosError = {
        name: "AxiosError",
        message: "Request failed with status code 404",
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: {},
          status: 404,
          statusText: "Not Found",
          headers: {},
          config: undefined,
        },
      };
      jest.spyOn(axios, 'put').mockRejectedValue(axiosError);
      await expect(service.update(invalid_role_id, mockUpdateData)).rejects.toThrowError(NotFoundException);
    })

    it('should return BadRequestException for making a bad request', async () => {
      const axiosError: AxiosError = {
        name: "AxiosError",
        message: "Request failed with status code 400",
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: {},
          status: 400,
          statusText: "Bad Request",
          headers: {},
          config: undefined,
        },
      };
      jest.spyOn(axios, 'put').mockRejectedValue(axiosError);
      await expect(service.update(valid_role_id, mockUpdateData)).rejects.toThrowError(BadRequestException);
    })

    it('should return HttpException for any internal server error', async () => {
      const errorResponseData = { message: 'Internal server error', status: HttpStatus.INTERNAL_SERVER_ERROR };
      const axiosError: AxiosError = {
        name: "AxiosError",
        message: "Internal Server Error",
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: errorResponseData,
          status: 500,
          statusText: "Internal Server Error",
          headers: {},
          config: undefined,
        },
      };
      jest.spyOn(axios, 'put').mockRejectedValue(axiosError);
      await expect(service.update(valid_role_id, mockUpdateData)).rejects.toThrowError(HttpException);
    })

    it('should return HttpException for any other error', async () => {
      const errorResponseData = { message: 'Service Unavailable', status: HttpStatus.SERVICE_UNAVAILABLE };
      const axiosError: AxiosError = {
        name: "AxiosError",
        message: "Network Error",
        isAxiosError: true,
        toJSON: () => ({}),
        response: {
          data: errorResponseData,
          status: 503,
          statusText: "Network Error",
          headers: {},
          config: undefined,
        },
      };
      jest.spyOn(axios, 'put').mockRejectedValue(axiosError);
      await expect(service.update(valid_role_id, mockUpdateData)).rejects.toThrowError(HttpException);
    })

    describe(("delete"), () => {
      it('should delete a role', async () => {
        jest.spyOn(axios, 'delete').mockResolvedValue(null);
        const result = await service.delete(valid_role_id);
        expect(result).toEqual(null);
      });

      it('should return Forbidden exception if DAL server is not reachable', async () => {
        jest.spyOn(axios, 'delete').mockRejectedValue(new ForbiddenException('API not available'));
        await expect(service.delete(valid_role_id)).rejects.toThrowError(ForbiddenException);
      });
  
      it('should return NotFoundException for any other axios error', async () => {
        const axiosError: AxiosError = {
          name: "AxiosError",
          message: "Request failed with status code 404",
          isAxiosError: true,
          toJSON: () => ({}),
          response: {
            data: {},
            status: 404,
            statusText: "Not Found",
            headers: {},
            config: undefined,
          },
        };
        jest.spyOn(axios, 'delete').mockRejectedValue(axiosError);
        await expect(service.delete(invalid_role_id)).rejects.toThrowError(NotFoundException);
      });

      it('should return HttpException for any internal server error', async () => {
        const errorResponseData = { message: 'Internal server error', status: HttpStatus.INTERNAL_SERVER_ERROR };
        const axiosError: AxiosError = {
          name: "AxiosError",
          message: "Internal Server Error",
          isAxiosError: true,
          toJSON: () => ({}),
          response: {
            data: errorResponseData,
            status: 500,
            statusText: "Internal Server Error",
            headers: {},
            config: undefined,
          },
        };
        jest.spyOn(axios, 'delete').mockRejectedValue(axiosError);
        await expect(service.delete(valid_role_id)).rejects.toThrowError(HttpException);
      });

      it('should return BadRequestException for making a bad request', async () => {
        const axiosError: AxiosError = {
          name: "AxiosError",
          message: "Request failed with status code 400",
          isAxiosError: true,
          toJSON: () => ({}),
          response: {
            data: {},
            status: 400,
            statusText: "Bad Request",
            headers: {},
            config: undefined,
          },
        };
        jest.spyOn(axios, 'delete').mockRejectedValue(axiosError);
        await expect(service.delete(invalid_role_id)).rejects.toThrowError(BadRequestException);
      })

      it('should return HttpException for any other error', async () => {
        const errorResponseData = { message: 'Service Unavailable', status: HttpStatus.SERVICE_UNAVAILABLE };
        const axiosError: AxiosError = {
          name: "AxiosError",
          message: "Network Error",
          isAxiosError: true,
          toJSON: () => ({}),
          response: {
            data: errorResponseData,
            status: 503,
            statusText: "Network Error",
            headers: {},
            config: undefined,
          },
        };
        jest.spyOn(axios, 'delete').mockRejectedValue(axiosError);
        await expect(service.delete(valid_role_id)).rejects.toThrowError(HttpException);
      })

    });
  });
});
