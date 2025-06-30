import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // All API routes will be prefixed with /api
  app.enableCors(); // Enable CORS for frontend communication
  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
