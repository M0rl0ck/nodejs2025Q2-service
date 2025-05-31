import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';
import { User } from '../entities/user.entity';

interface UserStorage {
  getAllUsers(): User[];
  getUserById(id: string): User;
  createUser(user: CreateUserDto): User;
  updateUser(id: string, user: UpdateUserPasswordDto): User;
  deleteUser(id: string): boolean;
}

export type { UserStorage };
