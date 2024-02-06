import { Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TranslationService } from 'src/core/translation/translation.service';
import { IHelpConfig } from '../interfaces/help-config.interface';
import { HELP_CONFIG } from '../decorators/help-key.decorator';
import { HelpNotImplementedException } from '../exceptions/HelpNotImplemented.exception';
import { InjectModel } from '@nestjs/mongoose';
import { Help } from '../models/help.model';
import { UtilService } from './util.service';

@Injectable()
export class HelpService {
  private readonly logger = new Logger(HelpService.name);
  private helpConfig: IHelpConfig;
  constructor(
    private reflector: Reflector,
    private readonly i18nService: TranslationService,
    private readonly utilService: UtilService,
    @InjectModel(Help.name) private readonly helpModel: any,
  ) {}

  async get(controller: any): Promise<Help> {
    this._setHelpConfig(controller);
    return await this.helpModel.findOne({ helpKey: this.helpConfig.helpKey });
  }

  async store(model: Help, controller: any): Promise<any> {
    this._setHelpConfig(controller);

    model.body = this.utilService.sanitizeAndMinifyHtml(model.body);

    return await this.helpModel.findOneAndUpdate(
      { helpKey: this.helpConfig.helpKey },
      model,
      { new: true, upsert: true },
    );
  }

  private _setHelpConfig(controller: any): void {
    const helpConfig = this.reflector.get<IHelpConfig>(HELP_CONFIG, controller);

    if (!helpConfig) {
      this.logger.error('Help Config Not Found');
      throw new HelpNotImplementedException();
    }

    this.helpConfig = helpConfig;
  }
}
