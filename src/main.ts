import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('TF Customer HL  APIS')
    .setDescription('You can onboard User with the APIs')
    .setVersion('1.0')
    .addServer('http://localhost:3001/', 'Local environment')
    .addServer('https://staging.tradefull.com/', 'Staging')
    .addServer('https://production.tradefull.com/', 'Production')
    .addTag('Customer HL  APIS')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3001);
}
bootstrap();
