export const SELF_REGISTERED_MODEL = 'self_registered_model';
export const SelfRegisteredModel = (): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(SELF_REGISTERED_MODEL, true, target);
  };
};
