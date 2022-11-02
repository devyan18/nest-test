import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schema/tasks.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async list(): Promise<TaskDocument[]> {
    return this.taskModel.find().exec();
  }

  async get(taskId: string): Promise<TaskDocument> {
    return this.taskModel.findById(taskId).exec();
  }

  async create(task: Task): Promise<TaskDocument> {
    const newTask = this.taskModel.create(task);
    return newTask;
  }

  async update(taskId: string, task: Task): Promise<TaskDocument> {
    return this.taskModel.findByIdAndUpdate(taskId, task, { new: true }).exec();
  }

  async delete(taskId: string): Promise<TaskDocument> {
    return this.taskModel.findByIdAndDelete(taskId).exec();
  }

  async toggleDone(taskId: string): Promise<TaskDocument> {
    const task = await this.get(taskId);
    return this.taskModel
      .findByIdAndUpdate(taskId, { done: !task.done }, { new: true })
      .exec();
  }
}
