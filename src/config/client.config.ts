import { registerAs } from '@nestjs/config';

export default registerAs('client', () => ({
  host: process.env.CLIENT_HOST,
  port: parseInt(process.env.CLIENT_PORT),
}));
