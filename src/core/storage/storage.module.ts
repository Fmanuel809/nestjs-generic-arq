import { Module } from '@nestjs/common';
import { IStorageOptions } from './interfaces/storage-options.interface';
import { StorageDriver } from '../app-config/enums/storage-driver.enum';
import { MinioModule } from 'nestjs-minio-client';

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class StorageModule {
  constructor() {}
  static register(options: IStorageOptions = { driver: StorageDriver.LOCAL }) {
    const imports = [];
    if (options.driver === StorageDriver.S3) {
      imports.push({
        module: MinioModule,
        imports: [],
        providers: [
          {
            provide: 'MINIO_CONNECTION_OPTIONS',
            useValue: {
              endPoint: options.s3Config.endPoint,
              port: options.s3Config.port,
              useSSL: options.s3Config.useSSL,
              accessKey: options.s3Config.accessKey,
              secretKey: options.s3Config.secretKey,
            },
          },
        ],
        exports: [],
      });
    }

    return {
      module: StorageModule,
      imports: [],
      providers: [
        {
          provide: 'STORAGE_OPTIONS',
          useValue: options,
        },
      ],
      exports: [],
    };
  }
}
