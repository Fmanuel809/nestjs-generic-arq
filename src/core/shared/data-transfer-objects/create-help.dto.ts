import { AutoMap } from '@automapper/classes';

export class CreateHelpDto {
  @AutoMap()
  body: string;
}
