import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

import * as helmet from 'helmet';

import { MainModule } from '@src/MainModule';
import { CustomLogger } from '@src/infrastructure/logger/CustomLogger';
import {
  LoggerMiddleware,
  AllExceptionsFilterToRFC7807,
} from '@interface/index';

const PORT = +process.env.PRE_PORT || 3000;
const MS_PREFIX = process.env.MS_PREFIX || '';

(async () => {
  const app = await NestFactory.create(
    MainModule,
    (process.env.NODE_ENV === 'local' ? {} : { logger: false }),
  );

  const customLogger = app.get(CustomLogger);

  app.setGlobalPrefix(MS_PREFIX);
  app.use(helmet());
  app.useLogger(customLogger);
  app.use(LoggerMiddleware(customLogger));
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => new BadRequestException(errors),
    validationError: {
      target: false,
      value: false,
    },
  }));

  app.useGlobalFilters(new AllExceptionsFilterToRFC7807());

  const options = new DocumentBuilder()
    .setTitle('travel-ms')
    .setDescription('This project notify price to clients about travels')
    .setVersion('1.0.0')
    .addTag('travels')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(`${MS_PREFIX}/v1/api-docs`, app, document);

  await app.listen(PORT);

  customLogger.info(`Server running at PORT: ${PORT}`);
})();
