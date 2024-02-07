import { Body, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { MapperService } from '../providers/mapper.service';
import { HelpService } from '../providers/help.service';
import { Help } from '../models/help.model';
import { HelpDto } from '../data-transfer-objects/help.dto';
import { CreateHelpDto } from '../data-transfer-objects/create-help.dto';

export class HelpController {
  protected helpService: HelpService;
  protected controller: any;
  protected mapperService: MapperService;

  constructor(
    helpService: HelpService,
    controller: any,
    mapperService: MapperService,
  ) {
    this.helpService = helpService;
    this.controller = controller;
    this.mapperService = mapperService;
  }

  @Get('help')
  async getHelp(): Promise<any> {
    const help = await this.helpService.get(this.controller);
    return this.mapperService.map(help, Help, HelpDto);
  }

  @Post('help')
  async storeHelp(@Body() help: CreateHelpDto): Promise<any> {
    if (
      !help?.body ||
      help?.body === '' ||
      help?.body === null ||
      help?.body === undefined
    ) {
      throw new HttpException('Help body is required', HttpStatus.BAD_REQUEST);
    }
    const mapperModel = this.mapperService.map(help, CreateHelpDto, Help);
    const res = await this.helpService.store(mapperModel, this.controller);
    return this.mapperService.map(res, Help, HelpDto);
  }
}
