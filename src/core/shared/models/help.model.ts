import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

type HelpDocument = HydratedDocument<Help>;

@Schema({ collection: 'CORE_System_Help' })
class Help {
  @Prop({ type: Types.ObjectId, auto: true })
  _id?: Types.ObjectId;

  @Prop({ type: String, required: true, unique: true })
  helpKey: string;

  @Prop({ type: String, required: true })
  body: string;
}

const HelpSchema = SchemaFactory.createForClass(Help);

export { Help, HelpSchema, HelpDocument };
