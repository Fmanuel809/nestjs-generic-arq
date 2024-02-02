import { Module } from '@nestjs/common';
import { SHARED_PROVIDERS } from './providers';

@Module({
  imports: [],
  providers: [...SHARED_PROVIDERS],
  exports: [],
})
export class SharedModule {}
