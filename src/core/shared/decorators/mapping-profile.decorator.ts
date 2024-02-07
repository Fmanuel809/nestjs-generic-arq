export const MAPPING_PROFILE = 'mapping_profile';
export const MappingProfile = (): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(MAPPING_PROFILE, true, target);
  };
};
