import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDocument } from 'src/users/schema/user.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
@UseGuards(JwtAuthGuard)
@Controller('api/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  listTasks(@Request() req) {
    const user = req.user as UserDocument;
    return this.tasksService.list(user._id);
  }

  @Get(':taskId')
  getTask(@Param('taskId') taskId: string, @Request() req) {
    const user = req.user as UserDocument;
    return this.tasksService.get(taskId, user._id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    const user = req.user as UserDocument;

    const newTask = await this.tasksService.create(createTaskDto, user._id);
    console.log(newTask);

    return newTask;
  }

  @Put(':taskId')
  updateTask(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('taskId') taskId: string,
    @Request() req,
  ) {
    const user = req.user as UserDocument;
    return this.tasksService.update(taskId, user._id, updateTaskDto);
  }

  @Patch(':taskId')
  toggleDone(@Param('taskId') taskId: string, @Request() req) {
    const user = req.user as UserDocument;
    return this.tasksService.toggleDone(taskId, user._id);
  }

  @Delete(':taskId')
  deleteTask(@Param('taskId') taskId: string, @Request() req) {
    const user = req.user as UserDocument;
    return this.tasksService.delete(taskId, user._id);
  }
}
