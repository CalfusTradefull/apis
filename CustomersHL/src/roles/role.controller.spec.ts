import { Test, TestingModule } from '@nestjs/testing';
import { AppConfig } from "../config/AppConfig";
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleDTO, mockRoleDTO } from './role.entity';

describe('RoleController', () => {
  let controller: RoleController;
  let service: RoleService;
  jest.mock('axios');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        RoleService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
          }, 
        {
          provide: "APP_CONFIG",
          useValue: AppConfig,
        },
      ],
    }).compile();

    controller = module.get<RoleController>(RoleController);
    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

  const valid_role_id = 'valid-role-id';
  const invalid_role_id = 'invalid-role-id';

  describe('getRoles', () => {
    it('should get list of all roles', async () => {
      jest.spyOn(service, 'getRoles').mockResolvedValue([mockReturnedRole]);
      expect(await controller.getRoles()).toEqual([mockReturnedRole]);
    })

    it('should return ForbiddenException if server is not reachable', async () => {
      jest.spyOn(service, 'getRoles').mockRejectedValue(new ForbiddenException('API not available'));
      expect(controller.getRoles()).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('should return HttpException if internal server error', async () => {
      jest.spyOn(service, 'getRoles').mockRejectedValue(new HttpException("Internal Server error", HttpStatus.INTERNAL_SERVER_ERROR));
      expect(controller.getRoles()).rejects.toBeInstanceOf(HttpException);
    });

    it('should return HttpException if any other error occurs', async () => {
      jest.spyOn(service, 'getRoles').mockRejectedValue(new HttpException("Network error", HttpStatus.SERVICE_UNAVAILABLE));
      expect(controller.getRoles()).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('getRoleByRoleID', () => {
    it('should get a role', async () => {
      jest.spyOn(service, 'getRole').mockResolvedValue(mockReturnedRole);
      expect(await controller.getRoleByRoleID(valid_role_id)).toEqual(mockReturnedRole);
    })

    it('should return ForbiddenException if server is not reachable', async () => {
      jest.spyOn(service, 'getRole').mockRejectedValue(new ForbiddenException('API not available'));
      expect(controller.getRoleByRoleID(valid_role_id)).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('should return NotFoundException if role not found', async () => {
      jest.spyOn(service, 'getRole').mockRejectedValue(new NotFoundException('Role not found for the given roleid.'));
      expect(controller.getRoleByRoleID(valid_role_id)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should return HttpException if internal server error', async () => {
      jest.spyOn(service, 'getRole').mockRejectedValue(new HttpException("Internal Server error", HttpStatus.INTERNAL_SERVER_ERROR));
      expect(controller.getRoleByRoleID(valid_role_id)).rejects.toBeInstanceOf(HttpException);
    });

    it('should return HttpException if any other error occurs', async () => {
      jest.spyOn(service, 'getRole').mockRejectedValue(new HttpException("Network error", HttpStatus.SERVICE_UNAVAILABLE));
      expect(controller.getRoleByRoleID(valid_role_id)).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('create', () => {
    it('should create a role', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockReturnedRole);
      expect(await controller.create(mockRole)).toEqual(mockReturnedRole);
    })

    it('should return ForbiddenException if server is not reachable', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new ForbiddenException('API not available'));
      expect(controller.create(mockRole)).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('should return HttpException if internal server error', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new HttpException("Internal Server error", HttpStatus.INTERNAL_SERVER_ERROR));
      expect(controller.create(mockRole)).rejects.toBeInstanceOf(HttpException);
    });

    it('should return HttpException if any other error occurs', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new HttpException("Network error", HttpStatus.SERVICE_UNAVAILABLE));
      expect(controller.create(mockRole)).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('update', () => {
    it('should update a role', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedRole);
      expect(await controller.update(valid_role_id, mockUpdateData)).toEqual(mockUpdatedRole);
    })

    it('should return ForbiddenException if server is not reachable', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new ForbiddenException('API not available'));
      expect(controller.update(valid_role_id, mockUpdateData)).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('should return NotFoundException if role not found', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException('Role not found for the given roleid.'));
      expect(controller.update(invalid_role_id, mockUpdateData)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should return HttpException if internal server error', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new HttpException("Internal Server error", HttpStatus.INTERNAL_SERVER_ERROR));
      expect(controller.update(valid_role_id, mockUpdateData)).rejects.toBeInstanceOf(HttpException);
    });

    it('should return HttpException if any other error occurs', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new HttpException("Network error", HttpStatus.SERVICE_UNAVAILABLE));
      expect(controller.update(valid_role_id, mockUpdateData)).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('delete', () => {
    it('should delete a role', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(null);
      expect(await controller.delete(valid_role_id)).toEqual(null);
      expect(await controller.delete(valid_role_id)).toBeNull();
    })

    it('should return ForbiddenException if server is not reachable', async () => {
      jest.spyOn(service, 'delete').mockRejectedValue(new ForbiddenException('API not available'));
      expect(controller.delete(valid_role_id)).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('should return NotFoundException if role not found', async () => {
      jest.spyOn(service, 'delete').mockRejectedValue(new NotFoundException('Role not found for the given roleid.'));
      expect(controller.delete(invalid_role_id)).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should return HttpException if internal server error', async () => {
      jest.spyOn(service, 'delete').mockRejectedValue(new HttpException("Internal Server error", HttpStatus.INTERNAL_SERVER_ERROR));
      expect(controller.delete(valid_role_id)).rejects.toBeInstanceOf(HttpException);
    });

    it('should return HttpException if any other error occurs', async () => {
      jest.spyOn(service, 'delete').mockRejectedValue(new HttpException("Network error", HttpStatus.SERVICE_UNAVAILABLE));
      expect(controller.delete(valid_role_id)).rejects.toBeInstanceOf(HttpException);
    });
  });

});