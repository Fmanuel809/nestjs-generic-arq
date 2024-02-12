import { Controller, Delete, Get } from '@nestjs/common';
import { SystemLogService } from './providers/system-log.service';

@Controller('api/system-log')
export class SharedController {
  constructor(private readonly systemLogService: SystemLogService) {}

  @Get()
  async findAll() {
    return await this.systemLogService.findAll();
  }

  /**
   * Purge the system logs older than 30 days
   */
  @Delete('purge')
  async purge() {
    return await this.systemLogService.purge();
  }
}
