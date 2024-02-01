/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigKey } from 'src/core/app-config/enums/config-key.enum';
import { IDatabaseConfig } from 'src/core/app-config/interfaces/database.interface';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly cnfService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    const dbConfig: IDatabaseConfig = this.cnfService.get(ConfigKey.Db);
    const dbUri = `mongodb://${encodeURIComponent(dbConfig.username)}:${encodeURIComponent(dbConfig.password)}@${encodeURIComponent(dbConfig.host)}:${encodeURIComponent(dbConfig.port)}/?authSource=${encodeURIComponent(dbConfig.authDataBase)}`;
    return {
      uri: dbUri,
      dbName: dbConfig.database,   
    };
  }
}
