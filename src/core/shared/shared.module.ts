import { Global, Module } from '@nestjs/common';
import { SHARED_PROVIDERS } from './providers';
import {
  DATE_FORMAT_ISO_8601_WITHOUT_TIMEZONE,
  MODULE_CONFIG,
} from './contants';
import { ModuleConfig } from './module-config.type';
import { LANGUAGES } from '../translation/constants/languages.const';
import { DateService } from './providers/date.service';
import { HelpService } from './providers/help.service';
import { UtilService } from './providers/util.service';

const DEFFAULT_CONFIG: ModuleConfig = {
  dateServiceOptions: {
    locale: process.env.APP_DEFAULT_LOCALE || LANGUAGES.ENGLISH,
    format: DATE_FORMAT_ISO_8601_WITHOUT_TIMEZONE,
    keepLocalTime: true,
    strict: true,
    omitWeekend: false,
    omitHoliday: false,
  },
};

@Global()
@Module({})
export class SharedModule {
  static forRoot(config?: ModuleConfig): any {
    return {
      module: SharedModule,
      providers: [
        {
          provide: MODULE_CONFIG,
          useValue: config || DEFFAULT_CONFIG,
        },
        ...SHARED_PROVIDERS,
      ],
      exports: [DateService, UtilService, HelpService],
    };
  }
}
