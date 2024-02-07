import { IDateServiceOption } from './interfaces/date-service-option.interface';

export type ModuleConfig = {
  withMapper?: boolean;
  appModuleDir?: string;
  dateServiceOptions: IDateServiceOption;
};
