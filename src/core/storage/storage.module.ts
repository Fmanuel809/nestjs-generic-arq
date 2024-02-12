import { ConfigurableModuleAsyncOptions, Logger, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './config.module-definition';
import { IStorageOptions } from './interfaces/storage-options.interface';

@Module({})
export class StorageModule extends ConfigurableModuleClass {
  static registerAsync(
    options: ConfigurableModuleAsyncOptions<
      IStorageOptions,
      'createStorageOptions'
    > &
      Partial<object>,
  ) {
    const logger = new Logger(StorageModule.name);
    logger.debug('Storage module initialized');
    return {
      ...super.registerAsync(options),
    };
  }
}
