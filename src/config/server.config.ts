import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
  port: process.env.SERVER_PORT,
  host: process.env.SERVER_HOST,
}));
