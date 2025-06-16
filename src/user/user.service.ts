import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { User } from './entities/user.entity';
import { createResponseUserDto } from 'src/utils/createResponseUserDto';
import { INCORRECT_PASS } from './errors/pass-incorrect.error';
import { NotFoundError } from '../errors/not-found.error';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const password = await bcrypt.hash(
      createUserDto.password,
      +process.env.CRYPT_SALT,
    );
    const newUser = {
      ...createUserDto,
      password: password,
    };
    const user = await this.UserRepository.save(newUser);
    return createResponseUserDto(user);
  }

  async findAll() {
    const users = await this.UserRepository.find();
    return users.length
      ? users.map((user) =>
          !!user.password ? createResponseUserDto(user) : user,
        )
      : [];
  }

  async findOne(id: string) {
    const user = await this.UserRepository.findOneBy({ id });
    return user ? createResponseUserDto(user) : undefined;
  }

  async findOneByLogin(login: string) {
    const user = await this.UserRepository.findOneBy({ login });
    return user ? user : undefined;
  }

  async update(id: string, updateUserDto: UpdateUserPasswordDto) {
    const user = await this.UserRepository.findOneBy({ id });
    if (!user) {
      return undefined;
    }
    if (!bcrypt.compareSync(updateUserDto.oldPassword, user.password)) {
      throw new INCORRECT_PASS();
    }
    const newUser = await this.UserRepository.save({
      id,
      password: updateUserDto.newPassword,
    });
    return createResponseUserDto(newUser);
  }

  async remove(id: string) {
    const result = await this.UserRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundError();
    }
  }
}
