import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

type HolidayDocument = HydratedDocument<Holiday>;

@Schema({ collection: 'CORE_Holidays' })
class Holiday {
  @Prop({ type: Types.ObjectId, auto: true })
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ type: Boolean, required: true, default: false })
  isMoveable: boolean;

  @Prop({ type: Date, required: false })
  holidayDate: Date;
}

const HolidaySchema = SchemaFactory.createForClass(Holiday);

export { Holiday, HolidaySchema, HolidayDocument };
