import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IStorageOptions,
  StorageOptionsFactory,
} from '../interfaces/storage-options.interface';
import { ConfigKey } from 'src/core/app-config/enums/config-key.enum';

@Injectable()
export class StorageConfigFactory implements StorageOptionsFactory {
  private readonly logger = new Logger('StorageConfigFactory');
  constructor(private readonly cnfService: ConfigService) {}

  createStorageOptions(): IStorageOptions {
    this.logger.log('Creating storage options');
    const appConfig = this.cnfService.get(ConfigKey.App);
    const s3Config = this.cnfService.get(ConfigKey.S3);

    if (!appConfig || !s3Config) {
      throw new Error('Missing required configuration');
    }

    const storageOptions: IStorageOptions = {
      driver: appConfig.storageDriver,
      s3Config: {
        accessKey: s3Config.accessKey,
        secretKey: s3Config.secretKey,
        endPoint: s3Config.endPoint,
        port: +s3Config.port,
        useSSL: s3Config.useSSL === 'true',
      },
    };

    this.logger.log(
      `App Storage was configured with ${storageOptions.driver} driver.`,
    );

    return storageOptions;
  }
}
