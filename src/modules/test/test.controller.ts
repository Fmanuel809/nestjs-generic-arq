import { Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { TranslationService } from 'src/core/translation/translation.service';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from 'src/core/app-config/interfaces/database.interface';
import { ConfigKey } from 'src/core/app-config/enums/config-key.enum';
import { TransformResponse } from '../../core/shared/decorators/dropdown-response.decorator';
import { ResponseType } from 'src/core/shared/enums/response-type.enum';
import { IPaginatedData } from 'src/core/shared/interfaces/paginated-data.interface';
import { HelpService } from 'src/core/shared/providers/help.service';
import { HelpConfig } from 'src/core/shared/decorators/help-key.decorator';

@Controller('api/test')
@HelpConfig({ helpKey: 'Test' })
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly i18nService: TranslationService,
    private readonly configService: ConfigService,
    public helpService: HelpService,
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

  @Get('help')
  async getHelp(): Promise<any> {
    return await this.helpService.get(TestController);
  }

  @Post('help')
  async storeHelp(): Promise<any> {
    return await this.helpService.store(
      {
        helpKey: 'Test',
        body: `<!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ejemplo HTML con Estilos y Scripts</title>
        
            <!-- Estilos CSS -->
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
        
                header {
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                }
        
                section {
                    margin: 20px;
                }
        
                .boton {
                    display: inline-block;
                    padding: 10px 20px;
                    font-size: 16px;
                    background-color: #28a745;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                }
        
                .boton:hover {
                    background-color: #218838;
                }
            </style>
        
        </head>
        <body>
        
            <!-- Encabezado -->
            <header>
                <h1>Ejemplo HTML con Estilos y Scripts</h1>
            </header>
        
            <!-- Contenido -->
            <section>
                <p>¡Bienvenido a mi página de prueba!</p>
                <button onclick="saludar()">Haz clic para saludar</button>
            </section>
        
            <!-- Script JavaScript -->
            <script>
                function saludar() {
                    alert('¡Hola! Este es un saludo desde JavaScript.');
                }
            </script>
        
        </body>
        </html>        
      `,
      },
      TestController,
    );
  }
}
