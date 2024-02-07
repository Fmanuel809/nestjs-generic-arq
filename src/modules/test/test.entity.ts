import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

type TestDocument = HydratedDocument<Test>;

@Schema()
class Test {
  @Prop({ type: Types.ObjectId, auto: true })
  _id?: Types.ObjectId;

  @AutoMap()
  @Prop({ type: String, required: true })
  name: string;
}

const TestSchema = SchemaFactory.createForClass(Test);

export { Test, TestSchema, TestDocument };
