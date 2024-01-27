import { Module } from '@nestjs/common';
import { RestClientModule } from './core/rest-client/rest-client.module';
import { AppConfigModule } from './core/app-config/app-config.module';
import { TranslationModule } from './core/translation/translation.module';
import { S3Module } from './core/s3/s3.module';
import { MailPoolModule } from './core/mail-pool/mail-pool.module';
import { SharedModule } from './core/shared/shared.module';
import { AuthModule } from './core/auth/auth.module';
import { TestModule } from './modules/test/test.module';
import { LANGUAGES } from './core/translation/constants/languages.const';

@Module({
  imports: [
    RestClientModule,
    AppConfigModule,
    TranslationModule.forRoot(LANGUAGES.ENGLISH),
    S3Module,
    MailPoolModule,
    SharedModule,
    AuthModule,
    TestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
