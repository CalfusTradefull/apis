import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  // get all roles
  async findall(): Promise<Role[]> {
    try {
      return await this.rolesRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error occurred while fetching roles', error);
    }
  }

  // get one role
  async findOne(role_id: string): Promise<Role> {
    try {
      const result = await this.rolesRepository.findOne({ where : { role_id } });
      if(!result) {
        throw new NotFoundException();
      }
      return result;
    } catch (error) {
      if(error instanceof NotFoundException) {
        throw new NotFoundException('Role not found for given roleid.');
      }
      throw new InternalServerErrorException('Error occurred while fetching role', error);
    }
  }

  //create role
  async create(role: Role): Promise<Role> {
    try {
      const newRole = this.rolesRepository.create(role);
      return await this.rolesRepository.save(newRole);
    } catch (error) {
      throw new InternalServerErrorException('Error occurred while creating role', error);
    }
  }

  // update role
  async update(role_id: string, role: Partial<Role>): Promise<Role> {
    try {
      const result = await this.rolesRepository.findOne({ where : { role_id } });
      if(!result) {
        throw new NotFoundException();
      }
      await this.rolesRepository.update(role_id, role);
      return await this.rolesRepository.findOne( { where : { role_id} } );
    } catch (error) {
      if(error instanceof NotFoundException) {
        throw new NotFoundException('Role not found for given roleid.');
      }
      throw new InternalServerErrorException('Error occurred while updating role', error);
    }
  }

  // delete role
  async delete(role_id: string): Promise<void> {
    try {
      const result = await this.rolesRepository.findOne({ where : { role_id } });
      if(!result) {
        throw new NotFoundException();
      }
      await this.rolesRepository.delete(role_id);
    } catch (error) {
      if(error instanceof NotFoundException) {
        throw new NotFoundException('Role not found for given roleid.');
      }
      throw new InternalServerErrorException('Error occurred while deleting role', error);
    }
  }
}
