import { Holiday, HolidaySchema } from '../shared/models/holiday.model';
import { SystemLog, SystemLogSchema } from '../shared/models/system-log.model';

export const CORE_MODELS = [
  { name: SystemLog.name, schema: SystemLogSchema },
  { name: Holiday.name, schema: HolidaySchema },
];

export type DatabaseModel = {
  name: string;
  schema: any;
};
