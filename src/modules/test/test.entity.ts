import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { SelfRegisteredModel } from 'src/core/database/register-model.decorator';

type TestDocument = HydratedDocument<Test>;

@Schema()
@SelfRegisteredModel()
class Test {
  @Prop({ type: Types.ObjectId, auto: true })
  _id?: Types.ObjectId;

  @AutoMap()
  @Prop({ type: String, required: true })
  name: string;
}

const TestSchema = SchemaFactory.createForClass(Test);

export { Test, TestSchema, TestDocument };
