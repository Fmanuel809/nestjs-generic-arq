import { Module } from '@nestjs/common';
import { DATABASE_MODELS, DatabaseModel } from './collections';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './providers/mongoose-config.service';

@Module({})
export class DatabaseModule {
  static forRoot(models: DatabaseModel[]): any {
    return {
      module: DatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          useClass: MongooseConfigService,
        }),
        MongooseModule.forFeature(models || DATABASE_MODELS),
      ],
      providers: [
        {
          provide: 'DATABASE_MODELS',
          useValue: models || DATABASE_MODELS,
        },
      ],
      exports: [MongooseModule],
    };
  }
}
