import { DatabaseModel } from './collections';

/**
 * Configuration for the database module
 *
 * @export
 * @type DatabaseModuleConfig
 */
export type DatabaseModuleConfig = {
  /**
   * If set to true, the application will automatically register all models found on the module dir.
   * If set to false, you will need to register the models manually using `models` property.
   */
  autoRegisterModels: boolean;

  /**
   * The directory where all modules are located, it is required when autoRegisterModels is set to true.
   * If not provided, it will search on 'src/modules', it does not exist, the application will throw an error.
   */
  appModuleDir?: string;

  /**
   * The directory where all models are located, if it is provided, it will used to search for models.
   * It causes the `appModuleDir` to be ignored. It is for performance reasons, so it does not need to search the entire module directory.
   *
   * `Note:` Use it when you have a lot of modules and your models are located in a specific directory.
   */
  modelDir?: string;

  /**
   * The models to be registered, it is required when autoRegisterModels is set to false.
   * If not provided, the application will throw an error when using `@InjectModel` from `@nestjs/mongoose`.
   * if autoRegisterModels is set to true, this property will be ignored.
   */
  models?: DatabaseModel[];
};
