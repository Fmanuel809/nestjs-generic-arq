import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

type SystemLogDocument = HydratedDocument<SystemLog>;

@Schema({ collection: 'CORE_SystemLog' })
class SystemLog {
  @Prop({ type: Types.ObjectId, auto: true })
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;
}

const SystemLogSchema = SchemaFactory.createForClass(SystemLog);

export { SystemLog, SystemLogSchema, SystemLogDocument };
