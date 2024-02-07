import { AutoMap } from '@automapper/classes';

export class HelpDto {
  @AutoMap()
  helpKey: string;

  @AutoMap()
  body: string;
}
