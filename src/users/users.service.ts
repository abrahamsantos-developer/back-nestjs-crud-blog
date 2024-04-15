// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }

  async findAll() {
    return this.usersRepository.findAllUsers();
  }

  async findOne(username: string) {
    return this.usersRepository.findUserByUsername(username);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.updateUser(id, updateUserDto);
  }

  async remove(id: string) {
    await this.usersRepository.deleteUser(id);
  }
}
