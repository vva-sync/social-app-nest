import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  saltRounds: process.env.PASSWORD_SALT_ROUNDS,
}));
