import { HttpException, HttpStatus } from '@nestjs/common';

export class MinIOException extends HttpException {
  constructor(error: Error) {
    super(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
