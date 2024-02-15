import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './userrole.entity';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private userrolesRepository: Repository<UserRole>,
  ) {}

  // get all users
  async findall(): Promise<UserRole[]> {
    return await this.userrolesRepository.find();
  }

  // get one user
  async findOne(user_role_id: string): Promise<UserRole> {
    return await this.userrolesRepository.findOne({ where : { user_role_id } });
  }

  //create user
  async create(user: UserRole): Promise<UserRole> {
    const newUserRole = this.userrolesRepository.create(user);
    return await this.userrolesRepository.save(newUserRole);
  }

  // update user
  async update(user_role_id: string, user: UserRole): Promise<UserRole> {
    await this.userrolesRepository.update(user_role_id, user);
    return await this.userrolesRepository.findOne( { where : { user_role_id} } );
  }

  // delete user
  async delete(user_role_id: string): Promise<void> {
    await this.userrolesRepository.delete(user_role_id);
  }
}
