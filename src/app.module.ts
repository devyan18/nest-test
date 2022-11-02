import { Module } from '@nestjs/common';
import { environments } from './environments';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule, MongooseModule.forRoot(environments.MONGO_URI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
