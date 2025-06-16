import { ResponseUserDto } from 'src/user/dto/responseUser.dto';
import { User } from 'src/user/entities/user.entity';

export const createResponseUserDto = (user: User): ResponseUserDto => {
  return {
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
