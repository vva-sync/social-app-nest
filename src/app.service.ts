import { INestApplication, Injectable, ValidationPipe } from '@nestjs/common';

@Injectable()
export class AppService {
  setBaseConfig(app: INestApplication) {
    app.setGlobalPrefix('api/v1/social');
    app.useGlobalPipes(new ValidationPipe());
  }
}
