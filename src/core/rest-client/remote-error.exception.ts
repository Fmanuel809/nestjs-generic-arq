import { HttpException, HttpStatus } from '@nestjs/common';

export class RemoteErrorException extends HttpException {
  constructor(response: Record<string, any>) {
    super(response, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
