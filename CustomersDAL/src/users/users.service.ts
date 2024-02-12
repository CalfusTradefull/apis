import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // get all users
  async findall(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // get one user
  async findOne(user_id: string): Promise<User> {
    return await this.usersRepository.findOne({ where : { user_id } });
  }

  //create user
  async create(user: User): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  // update user
  async update(user_id: string, user: User): Promise<User> {
    await this.usersRepository.update(user_id, user);
    return await this.usersRepository.findOne( { where : { user_id} } );
  }

  // delete user
  async delete(user_id: string): Promise<void> {
    await this.usersRepository.delete(user_id);
  }
}
