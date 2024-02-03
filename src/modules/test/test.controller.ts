import { Controller, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { TranslationService } from 'src/core/translation/translation.service';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from 'src/core/app-config/interfaces/database.interface';
import { ConfigKey } from 'src/core/app-config/enums/config-key.enum';
import { TransformResponse } from '../../core/shared/decorators/dropdown-response.decorator';
import { ResponseType } from 'src/core/shared/enums/response-type.enum';
import { IPaginatedData } from 'src/core/shared/interfaces/paginated-data.interface';

@Controller('api/test')
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly i18nService: TranslationService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  get(): Record<string, string> {
    const dbConfig = this.configService.get<IDatabaseConfig>(ConfigKey.Db);
    console.log(dbConfig);
    return { message: this.i18nService.translate('validations.required') };
  }

  @Get('all')
  @TransformResponse(ResponseType.PAGINATED)
  getAllTest(): IPaginatedData<Record<string, any>> {
    return {
      data: [
        {
          _id: 1,
          name: 'test',
        },
        {
          _id: 2,
          name: 'test2',
        },
        {
          _id: 3,
          name: 'test3',
        },
      ],
      meta: {
        currentPage: 1,
        totalPages: 1,
        pageSize: 10,
        totalCount: 3,
        hasPrevious: false,
        hasNext: false,
      },
    };
  }

  @Get('create')
  createTest(): Promise<any> {
    return this.testService.createTest({ name: 'test' });
  }
}
