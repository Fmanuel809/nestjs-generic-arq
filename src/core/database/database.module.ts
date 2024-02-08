import { Global, Module } from '@nestjs/common';
import { CORE_MODELS } from './collections';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './providers/mongoose-config.service';
import { DatabaseModuleConfig } from './database-module.config';
import {
  AUTO_REGISTER_MODELS,
  ModelRegisterLogger,
  registerDatabaseModels,
} from './model.register';
import * as path from 'path';

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(config: DatabaseModuleConfig): any {
    let models = [];
    if (config.autoRegisterModels) {
      ModelRegisterLogger.log(
        `Auto registering models from directory: '${
          config.appModuleDir || 'modules'
        }'.`,
      );
      const _dir = config.appModuleDir || 'modules';
      if (config.modelDir && config.modelDir !== '') {
        registerDatabaseModels(
          path.join(__dirname, `../../${config.modelDir}`),
        );
      } else {
        registerDatabaseModels(path.join(__dirname, `../../${_dir}`));
      }
      ModelRegisterLogger.log(
        `Models registered: ${AUTO_REGISTER_MODELS.length} models.`,
      );
      models = AUTO_REGISTER_MODELS;
    } else {
      models = config.models || [];
    }
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          useClass: MongooseConfigService,
        }),
        MongooseModule.forFeature([...models, ...CORE_MODELS]),
      ],
      providers: [
        {
          provide: 'DATABASE_MODELS',
          useValue: models,
        },
      ],
      exports: [MongooseModule],
    };
  }
}
