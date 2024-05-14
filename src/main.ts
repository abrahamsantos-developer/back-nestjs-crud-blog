

import * as dotenv from 'dotenv';
dotenv.config();

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   //loggea todas las requests entrantes
   app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
  });

  app.enableCors({
    origin: process.env.FRONTEND_URL,  //especifica Origen del frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Metodos
    allowedHeaders: 'Content-Type, Accept',  // Headers
  });

  // Config pipes de validación
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,            // elimina propiedades que no esta decoradas con validador
  transform: true,            // transformapayloads a instancias de DTO
  forbidNonWhitelisted: false, // bloquea la solicitud si contiene propiedades no permitidas
  disableErrorMessages: false // es opcional. oculta mensajes de error en producción
}));

  //Swagger doc
  const config = new DocumentBuilder()
    .setTitle('Posts API')
    .setDescription('API for managing blog posts')
    .setVersion('1.0')
    .addTag('posts')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5500);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
