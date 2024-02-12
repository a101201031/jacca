import { DocumentBuilder } from '@nestjs/swagger';

export const buildSwaggerConfig = (title: string, description: string) =>
  new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();
