import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { TestDto } from './test.dto';
import { Test } from './test.entity';
import { MappingProfile } from 'src/core/shared/decorators/mapping-profile.decorator';

@Injectable()
@MappingProfile()
export class TestProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, Test, TestDto);
      createMap(mapper, TestDto, Test);
    };
  }
}
