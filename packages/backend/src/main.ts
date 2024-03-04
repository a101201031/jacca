import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigService } from './config';
import { buildSwaggerConfig } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const appConfig = app.get(AppConfigService);

  const swaggerConfig = buildSwaggerConfig(appConfig.name, 'jacca의 API Docs');
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(appConfig.port);
}
bootstrap();
