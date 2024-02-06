import { SetMetadata } from '@nestjs/common';
import { IHelpConfig } from '../interfaces/help-config.interface';

export const HELP_CONFIG = 'help_config';
export const HelpConfig = (helpConfig: IHelpConfig) =>
  SetMetadata(HELP_CONFIG, helpConfig);
