import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environments } from './environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(environments.PORT);
}
bootstrap();
