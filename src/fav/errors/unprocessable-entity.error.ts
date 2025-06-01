import { HttpException, HttpStatus } from '@nestjs/common';

export class UNPROCESSABLE_ENTITY_ERROR extends HttpException {
  constructor(message: string) {
    super(`${message} not exists`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
