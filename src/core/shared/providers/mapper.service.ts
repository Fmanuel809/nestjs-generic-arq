import { Constructor, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MapperService {
  private readonly logger = new Logger(MapperService.name);
  constructor(@InjectMapper() private mapper: Mapper) {}

  map<S, D>(
    objectSource: S,
    source: Constructor<S>,
    destination: Constructor<D>,
  ): D {
    return this.mapper.map<S, D>(objectSource, source, destination);
  }

  async mapAsync<S, D>(
    objectSource: S,
    source: Constructor<S>,
    destination: Constructor<D>,
  ): Promise<D> {
    return await this.mapper.mapAsync<S, D>(objectSource, source, destination);
  }

  mapArray<S, D>(
    arraySource: S[],
    source: Constructor<S>,
    destination: Constructor<D>,
  ): D[] {
    return this.mapper.mapArray<S, D>(arraySource, source, destination);
  }

  async mapArrayAsync<S, D>(
    arraySource: S[],
    source: Constructor<S>,
    destination: Constructor<D>,
  ): Promise<D[]> {
    return await this.mapper.mapArrayAsync<S, D>(
      arraySource,
      source,
      destination,
    );
  }
}
