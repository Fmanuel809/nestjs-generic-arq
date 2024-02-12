import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

type SystemLogDocument = HydratedDocument<SystemLog>;

@Schema({ collection: 'CORE_SystemLog', timestamps: true })
class SystemLog {
  @Prop({ type: Types.ObjectId, auto: true })
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: String, required: true })
  stack: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  status: number;

  @Prop({ type: Object, required: true })
  request: Record<string, any>;

  @Prop({ type: Date, required: false })
  createdAt?: Date;
}

const SystemLogSchema = SchemaFactory.createForClass(SystemLog);

export { SystemLog, SystemLogSchema, SystemLogDocument };
