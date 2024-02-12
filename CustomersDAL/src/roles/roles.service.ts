import { Injectable } from '@nestjs/common';
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
    return await this.rolesRepository.find();
  }

  // get one role
  async findOne(role_id: string): Promise<Role> {
    return await this.rolesRepository.findOne({ where : { role_id } });
  }

  //create role
  async create(role: Role): Promise<Role> {
    const newRole = this.rolesRepository.create(role);
    return await this.rolesRepository.save(newRole);
  }

  // update role
  async update(role_id: string, role: Role): Promise<Role> {
    await this.rolesRepository.update(role_id, role);
    return await this.rolesRepository.findOne( { where : { role_id} } );
  }

  // delete role
  async delete(role_id: string): Promise<void> {
    await this.rolesRepository.delete(role_id);
  }
}
