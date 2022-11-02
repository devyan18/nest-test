import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  listTasks() {
    return this.tasksService.list();
  }

  @Get(':taskId')
  getTask(@Param('taskId') taskId: string) {
    return this.tasksService.get(taskId);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':taskId')
  updateTask(
    @Body() createTaskDto: CreateTaskDto,
    @Param('taskId') taskId: string,
  ) {
    return this.tasksService.update(taskId, createTaskDto);
  }

  @Patch(':taskId')
  toggleDone(@Param('taskId') taskId: string) {
    return this.tasksService.toggleDone(taskId);
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId') taskId: string) {
    return this.tasksService.delete(taskId);
  }
}
