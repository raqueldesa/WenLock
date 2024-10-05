import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Acesse a variável de ambiente para a porta
  const port = configService.get<number>('BACKEND_PORT') || 3000;
  await app.listen(port);
  console.log('Server running on port', port);
}
bootstrap();
