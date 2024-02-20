import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { MODULE_KEY, STORAGE_OPTIONS } from '../constants';
import { IStorageOptions } from '../interfaces';
import { MinioService } from 'nestjs-minio-client';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from 'src/core/app-config/interfaces/app-config.interface';
import { ConfigKey } from 'src/core/app-config/enums/config-key.enum';
import { MinIOException } from '../exceptions';
import { RETENTION_MODES, RETENTION_VALIDITY_UNITS } from '../types';

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(MODULE_KEY, { timestamp: true });
  constructor(
    @Inject(STORAGE_OPTIONS) private readonly options: IStorageOptions,
    private readonly minioService: MinioService,
    private readonly cnfService: ConfigService,
  ) {}

  onModuleInit() {
    const appName = this.cnfService.get<IAppConfig>(ConfigKey.App).appName;
    const bucketName = this._cleanBucketName(appName);

    this.minioService.client
      .bucketExists(bucketName)
      .then((exists) => {
        const objectLocking = this.options.s3Config.objectLocking;
        if (!exists) {
          this.minioService.client.makeBucket(bucketName, 'us-east-1', {
            ObjectLocking: objectLocking,
          });
        }

        this.logger.log(
          `App Storage has been initialized with ${this.options.driver} driver. Bucket name: ${bucketName}`,
        );
        if (objectLocking)
          this.minioService.client.setObjectLockConfig(bucketName, {
            mode: RETENTION_MODES.GOVERNANCE,
            unit: RETENTION_VALIDITY_UNITS.YEARS,
            validity: this.options.s3Config.retentionPeriod,
          });
      })
      .catch((error) => this._manageError(error, true));
  }

  private _cleanBucketName(input: string): string {
    return input
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9.-]/g, '')
      .replace(/(\.{2,}|-\.|\.-)/g, '-')
      .substring(0, 63)
      .replace(/-+$/, '')
      .replace(/-s3alias$/, '')
      .replace(/^xn--/, '');
  }

  private _manageError(error: Error, onModuleInit = false) {
    if (onModuleInit) {
      this.logger.error(
        `An error occurred while initializing the storage service: ${error.message}`,
      );
    } else {
      throw new MinIOException(error);
    }
  }
}
