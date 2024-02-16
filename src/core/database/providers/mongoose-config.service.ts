/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigKey } from 'src/core/app-config/enums/config-key.enum';
import { IDatabaseConfig } from 'src/core/app-config/interfaces/database.interface';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  private readonly logger = new Logger(MongooseConfigService.name, { timestamp: true });
  constructor(private readonly cnfService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    this.logger.log('Creating mongoose options');
    const dbConfig: IDatabaseConfig = this.cnfService.get(ConfigKey.Db);
    let dbUri = `mongodb://${encodeURIComponent(dbConfig.host)}:${encodeURIComponent(dbConfig.port)}/`;
    if (dbConfig.hasAuthentication) {
        dbUri = `mongodb://${encodeURIComponent(dbConfig.username)}:${encodeURIComponent(dbConfig.password)}@${encodeURIComponent(dbConfig.host)}:${encodeURIComponent(dbConfig.port)}/?authSource=${encodeURIComponent(dbConfig.authDataBase)}`;
    }
    return {
      uri: dbUri,
      dbName: dbConfig.database,   
    };
  }
}
