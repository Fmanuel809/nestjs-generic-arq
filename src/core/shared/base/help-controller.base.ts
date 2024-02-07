import { Get, Post } from '@nestjs/common';
import { HelpService } from '../providers/help.service';

export class HelpController {
  protected helpService: HelpService;
  protected controller: any;

  constructor(helpService: HelpService, controller: any) {
    this.helpService = helpService;
    this.controller = controller;
  }

  @Get('help')
  async getHelp(): Promise<any> {
    return await this.helpService.get(this.controller);
  }

  @Post('help')
  async storeHelp(): Promise<any> {
    return null;
  }
}
