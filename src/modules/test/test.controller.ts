import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { TranslationService } from 'src/core/translation/translation.service';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from 'src/core/app-config/interfaces/database.interface';
import { ConfigKey } from 'src/core/app-config/enums/config-key.enum';
import { TransformResponse } from '../../core/shared/decorators/transform-response.decorator';
import { ResponseType } from 'src/core/shared/enums/response-type.enum';
import { HelpService } from 'src/core/shared/providers/help.service';
import { HelpConfig } from 'src/core/shared/decorators/help-key.decorator';
import { HelpController } from 'src/core/shared/base/help-controller.base';
import { MapperService } from 'src/core/shared/providers/mapper.service';
import { Test } from './test.entity';
import { TestDto } from './test.dto';

@Controller('api/test')
@HelpConfig({ helpKey: 'Test' })
export class TestController extends HelpController {
  constructor(
    private readonly testService: TestService,
    private readonly i18nService: TranslationService,
    private readonly configService: ConfigService,
    mapperService: MapperService,
    helpService: HelpService,
  ) {
    super(helpService, TestController, mapperService);
  }

  @Get()
  get(): Record<string, string> {
    const dbConfig = this.configService.get<IDatabaseConfig>(ConfigKey.Db);
    console.log(dbConfig);
    return { message: this.i18nService.translate('validations.required') };
  }

  @Get('all')
  @TransformResponse({ responseType: ResponseType.DEFAULT })
  async getAllTest() {
    const tests = await this.testService.getTests();
    return this.mapperService.mapArray(tests, Test, TestDto);
  }

  @Get('create')
  createTest(): Promise<any> {
    return this.testService.createTest({ name: 'test' });
  }
}
