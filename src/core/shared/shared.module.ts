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
import {
  MAPPIG_PROFILES,
  mappingProfileLogger,
  registerMappingProfiles,
} from './mapping-profile-register';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { MapperService } from './providers/mapper.service';
import { MappingErrorHandler } from './exceptions/MappingError.exception';
import * as path from 'path';

const DEFFAULT_CONFIG: ModuleConfig = {
  withMapper: true,
  appModuleDir: 'modules',
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
  static forRoot(config = DEFFAULT_CONFIG): any {
    if (config.withMapper) {
      mappingProfileLogger.log('Registering mapping profiles...');
      registerMappingProfiles(
        path.join(__dirname, `../../${config.appModuleDir}`),
      );
      if (MAPPIG_PROFILES.length === 0) {
        mappingProfileLogger.warn('No mapping profiles found.');
      } else {
        mappingProfileLogger.log(
          `${MAPPIG_PROFILES.length} mapping profiles registered.`,
        );
      }
    }

    return {
      module: SharedModule,
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
          errorHandler: new MappingErrorHandler(),
        }),
      ],
      providers: [
        {
          provide: MODULE_CONFIG,
          useValue: config,
        },
        ...SHARED_PROVIDERS,
        ...MAPPIG_PROFILES,
      ],
      exports: [DateService, UtilService, HelpService, MapperService],
    };
  }
}
