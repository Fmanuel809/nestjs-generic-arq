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
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [
    RestClientModule,
    AppConfigModule,
    TranslationModule.forRoot(
      process.env.APP_DEFAULT_LOCALE || LANGUAGES.ENGLISH,
    ),
    S3Module,
    MailPoolModule,
    SharedModule,
    AuthModule,
    TestModule,
    DatabaseModule.forRoot([
      // Add your models here
      //{ name: 'user', schema: UserSchema },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
