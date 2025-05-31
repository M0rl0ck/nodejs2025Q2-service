import { HttpException, HttpStatus } from '@nestjs/common';

export class ALBUM_NOT_FOUND_ERROR extends HttpException {
  constructor() {
    super('Album not found', HttpStatus.NOT_FOUND);
  }
}
