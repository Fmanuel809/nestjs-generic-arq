import { ConfigurableModuleBuilder } from '@nestjs/common';
import { IStorageOptions } from './interfaces/storage-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<IStorageOptions>()
    .setFactoryMethodName('createStorageOptions')
    .build();
