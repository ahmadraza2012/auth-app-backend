import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { CustomConfigService } from './common/config/config.service';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  const configService = app.get(CustomConfigService);

  if (configService.isCorsEnabled) {
    app.enableCors({
      origin: configService.allowedOrigins, // Allow only trusted origins
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  }

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());

  // Apply the LoggingInterceptor globally
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Apply global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = configService.DEFAUTL_PORT;
  await app.listen(port);

}
bootstrap();
