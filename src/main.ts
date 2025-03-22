import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.get(AppService).setBaseConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
