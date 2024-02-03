import { Global, Module } from '@nestjs/common';
import { CORE_MODELS, DatabaseModel } from './collections';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './providers/mongoose-config.service';

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(models: DatabaseModel[] = []): any {
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
