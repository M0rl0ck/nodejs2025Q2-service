import { HttpException, HttpStatus } from '@nestjs/common';

export class USER_NOT_FOUND_ERROR extends HttpException {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}
