import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { environments } from 'src/environments';
import { UserSchema } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/users.service';
import { Task, TaskSchema } from './schema/tasks.schema';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    JwtModule.register({
      secret: environments.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService, JwtStrategy, UsersService, AuthService],
})
export class TasksModule {}
