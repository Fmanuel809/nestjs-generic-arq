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
    data._id = null;
    const createdData = new this.model(data);
    return await createdData.save();
  }

  /**
   * Purge the system logs older than 30 days
   */
  async purge() {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return await this.model.deleteMany({ createdAt: { $lt: date } });
  }
}
