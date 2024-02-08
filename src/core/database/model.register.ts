import { Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { SELF_REGISTERED_MODEL } from './register-model.decorator';
import { DatabaseModel } from './collections';
import mongoose from 'mongoose';

export const ModelRegisterLogger = new Logger('ModelRegister');

/**
 * The models to be registered automatically
 *
 * @export
 * @type DatabaseModel[]
 */
export const AUTO_REGISTER_MODELS: DatabaseModel[] = [];

/**
 * Recursively registers database models by scanning a directory for files with specific extensions.
 * Automatically adds valid models to the AUTO_REGISTER_MODELS array.
 * It uses `@SelfRegisteredModel` decorator to identify valid models.
 *
 * @export
 * @param {string} directory
 */
export const registerDatabaseModels = (directory) => {
  if (fs.existsSync(directory)) {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isDirectory()) {
        registerDatabaseModels(filePath);
      } else if (
        file.endsWith('.model.js') ||
        file.endsWith('.model.ts') ||
        file.endsWith('.entity.js') ||
        file.endsWith('.entity.ts')
      ) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const exported = require(filePath);
        const collenction: DatabaseModel = {
          name: null,
          schema: null,
        };
        for (const key in exported) {
          if (exported.hasOwnProperty(key)) {
            const Class = exported[key];

            if (Class instanceof mongoose.Schema) {
              collenction.schema = Class;
            } else {
              const isMappingProfile = Reflect.getMetadata(
                SELF_REGISTERED_MODEL,
                Class,
              );

              if (isMappingProfile) {
                collenction.name = Class.name;
              }
            }
          }
        }
        if (collenction.name && collenction.schema) {
          AUTO_REGISTER_MODELS.push(collenction);
        } else {
          ModelRegisterLogger.error(
            `Class ${file} does not have a valid schema or does not have the @SelfRegisteredModel decorator. Skipping...`,
          );
        }
      }
    });
  } else {
    ModelRegisterLogger.error(
      `Directory ${directory} does not exist. Skipping mapping profile registration...`,
    );
  }
};
