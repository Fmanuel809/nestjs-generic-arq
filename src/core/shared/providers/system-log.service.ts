import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SystemLog } from '../models/system-log.model';

@Injectable()
export class SystemLogService {
  constructor(
    @InjectModel(SystemLog.name) private readonly model: Model<SystemLog>,
  ) {}
  async findAll() {
    return await this.model.find().exec();
  }

  async create(data: Partial<SystemLog>) {
    const createdData = new this.model(data);
    return await createdData.save();
  }
}
