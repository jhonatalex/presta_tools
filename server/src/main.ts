import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('PrestaToolsAPI');
  const app = await NestFactory.create(AppModule);

  // 1. Configuración de CORS amplia para Frontend local y remoto
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 2. Pipes globales de validación y transformación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // 3. Documentación OpenAPI / Swagger
  const config = new DocumentBuilder()
    .setTitle('PrestaTools Backend REST API')
    .setDescription('Servidor Backend en NestJS + Prisma + TypeScript para la plataforma de alquiler de herramientas PrestaTools.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`=======================================================`);
  logger.log(`🚀 PrestaTools Backend activo en: http://localhost:${port}`);
  logger.log(`📚 Documentación Swagger en:      http://localhost:${port}/api/docs`);
  logger.log(`🛠️  Endpoints Legacy Frontend en:  http://localhost:${port}/api/tool/list`);
  logger.log(`=======================================================`);
}
bootstrap();
