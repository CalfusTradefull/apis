import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // console.log(process.env.PG_HOST);
  // console.log(process.env.DB_TYPE);
  // console.log(process.env.PG_PORT);
  // console.log(__dirname + '/**/*.entity{.ts,.js}');
  await app.listen(3000);
}
bootstrap();
