import { Logger, Provider } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { MAPPING_PROFILE } from './decorators/mapping-profile.decorator';
import { AutomapperProfile } from '@automapper/nestjs';

export const mappingProfileLogger = new Logger('MappingProfileRegister', {
  timestamp: true,
});

export const MAPPIG_PROFILES: Provider[] = [];

export const registerMappingProfiles = (directory) => {
  if (fs.existsSync(directory)) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isDirectory()) {
        registerMappingProfiles(filePath);
      } else if (file.endsWith('.profile.js') || file.endsWith('.profile.ts')) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const exported = require(filePath);
        for (const key in exported) {
          if (exported.hasOwnProperty(key)) {
            const Class = exported[key];
            const isMappingProfile = Reflect.getMetadata(
              MAPPING_PROFILE,
              Class,
            );

            if (isMappingProfile) {
              const extendsProfile =
                Class.prototype instanceof AutomapperProfile;

              if (!extendsProfile) {
                mappingProfileLogger.error(
                  `Class ${Class.name} is decorated with @MappingProfile but does not extend AutomapperProfile. Skipping...`,
                );
              } else {
                MAPPIG_PROFILES.push({
                  provide: key,
                  useClass: Class,
                });
              }
            }
          }
        }
      }
    });
  } else {
    mappingProfileLogger.error(
      `Directory ${directory} does not exist. Skipping mapping profile registration...`,
    );
  }
};
