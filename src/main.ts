import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { TokenService } from './models/token/token.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new AuthGuard(app.get(TokenService), app.get(Reflector)));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
