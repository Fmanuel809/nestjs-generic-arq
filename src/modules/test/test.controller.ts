import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { TranslationService } from 'src/core/translation/translation.service';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from 'src/core/app-config/interfaces/database.interface';
import { ConfigKey } from 'src/core/app-config/enums/config-key.enum';

@Controller('api/test')
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly i18nService: TranslationService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  get(): Record<string, string> {
    const dbConfig = this.configService.get<IDatabaseConfig>(ConfigKey.Db);
    console.log(dbConfig);
    return { message: this.i18nService.translate('validations.required') };
  }

  @Get('all')
  getAllTest(): Promise<any> {
    return this.testService.getTests();
  }

  @Get('create')
  createTest(): Promise<any> {
    return this.testService.createTest({ name: 'test' });
  }
}
