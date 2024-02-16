import { Module } from '@nestjs/common';
import { IStorageOptions } from './interfaces/storage-options.interface';
import { StorageDriver } from '../app-config/enums/storage-driver.enum';
import { MinioModule } from 'nestjs-minio-client';
import { STORAGE_OPTIONS } from './constants';
import { StorageService } from './providers/storage.service';

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class StorageModule {
  constructor() {}
  static forRoot(options: IStorageOptions = { driver: StorageDriver.LOCAL }) {
    const imports = [];
    const providers = [];
    if (options.driver === StorageDriver.S3) {
      const minioModule = MinioModule.register({
        endPoint: options.s3Config.endPoint,
        port: options.s3Config.port,
        useSSL: options.s3Config.useSSL,
        accessKey: options.s3Config.accessKey,
        secretKey: options.s3Config.secretKey,
      });
      imports.push(minioModule);
    }

    return {
      module: StorageModule,
      imports: [...imports],
      providers: [
        {
          provide: STORAGE_OPTIONS,
          useValue: options,
        },
        StorageService,
        ...providers,
      ],
      exports: [],
    };
  }
}
