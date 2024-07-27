import {
    BadRequestException,
    INestApplication,
    ValidationPipe,
  } from '@nestjs/common';
  import { ValidationError } from 'class-validator';
  import _ from 'lodash';
  import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
  
  const setUpApplication = (app: INestApplication) => {
    app.setGlobalPrefix('api');
  
    // setup documents
    const config = new DocumentBuilder()
      .setTitle('Booking API')
      .setDescription('Booking API')
      .setVersion('1.0')
      .build();
  
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  
    // setup cors
    app.enableCors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: [
        'Content-Type',
        'Accept',
        'Authorization',
        'X-Requested-With',
      ],
    });
  
    // setup validation
    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (validationErrors: ValidationError[] = []) => {
          return new BadRequestException(validationErrors);
        },
        validationError: {
          target: false,
        },
        transform: true,
      }),
    );
  
    // setup port
    const appPort =  _.parseInt(process.env.APP_PORT) || 3000;
    const appName = process.env.APP_NAME || 'Service';
  
    return {
      port: appPort,
      logInfo: () =>
        console.table({
          port: appPort,
          name: appName,
        }),
    };
  };
  
  export default setUpApplication;