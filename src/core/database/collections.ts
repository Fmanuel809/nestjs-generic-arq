import { SystemLog, SystemLogSchema } from '../shared/models/system-log.model';

export const CORE_MODELS = [{ name: SystemLog.name, schema: SystemLogSchema }];

export type DatabaseModel = {
  name: string;
  schema: any;
};
