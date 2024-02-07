import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { MappingProfile } from 'src/core/shared/decorators/mapping-profile.decorator';
import { HelpDto } from '../data-transfer-objects/help.dto';
import { Help } from '../models/help.model';
import { CreateHelpDto } from '../data-transfer-objects/create-help.dto';

@Injectable()
@MappingProfile()
export class HelpProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, Help, HelpDto);
      createMap(
        mapper,
        CreateHelpDto,
        Help,
        forMember(
          (d) => d.helpKey,
          mapFrom(() => null),
        ),
      );
    };
  }
}
