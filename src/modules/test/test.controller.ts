import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { TranslationService } from 'src/core/translation/translation.service';

@Controller('api/test')
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly i18nService: TranslationService,
  ) {}

  @Get()
  get(): Record<string, string> {
    return { message: this.i18nService.translate('validations.required') };
  }
}
