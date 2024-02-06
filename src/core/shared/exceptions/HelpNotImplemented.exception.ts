import { HttpException, HttpStatus } from '@nestjs/common';

export class HelpNotImplementedException extends HttpException {
  constructor() {
    super('Help Not Implemented', HttpStatus.NOT_IMPLEMENTED, {
      cause: 'help_service',
    });
  }
}
