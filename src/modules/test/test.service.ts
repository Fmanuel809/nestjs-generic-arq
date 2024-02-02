import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Test } from './test.entity';

@Injectable()
export class TestService {
  constructor(@InjectModel(Test.name) private testModel: Model<Test>) {}

  async createTest(test: Test): Promise<Test> {
    test._id = null;
    const createdTest = new this.testModel(test);
    return createdTest.save();
  }

  async getTests(): Promise<Test[]> {
    return this.testModel.find().exec();
  }
}
