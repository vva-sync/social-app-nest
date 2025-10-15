import { ConfigService, registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_POST,
    pass: process.env.MAIL_PASS,
  },
}));

export const getMailConfig = (configService: ConfigService) => ({
  transport: {
    host: configService.get<string>('mail.host'),
    port: parseInt(configService.get<string>('mail.port')),
    secure: false,
    auth: {
      user: configService.get<string>('mail.auth.user'),
      pass: configService.get<string>('mail.auth.pass'),
    },
  },
});
