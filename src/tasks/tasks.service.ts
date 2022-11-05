import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './schema/tasks.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async list(userId: string): Promise<TaskDocument[]> {
    return this.taskModel.find({ user: userId }).populate('user').exec();
  }

  async get(taskId: string, userId: string): Promise<TaskDocument> {
    return this.taskModel.findOne({ _id: taskId, user: userId }).exec();
  }

  async create(task: CreateTaskDto, userId: string): Promise<TaskDocument> {
    return this.taskModel.create({ ...task, user: userId });
  }

  async update(
    taskId: string,
    userId: string,
    task: CreateTaskDto,
  ): Promise<TaskDocument> {
    return this.taskModel
      .findOneAndUpdate({ _id: taskId, user: userId }, task, { new: true })
      .exec();
  }

  async delete(taskId: string, userId: string): Promise<TaskDocument> {
    return this.taskModel
      .findOneAndDelete({ _id: taskId, user: userId })
      .exec();
  }

  async toggleDone(taskId: string, userId: string): Promise<TaskDocument> {
    const task = await this.get(taskId, userId);
    return this.taskModel
      .findByIdAndUpdate(taskId, { done: !task.done }, { new: true })
      .exec();
  }
}
