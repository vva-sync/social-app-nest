import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { TokenRepository } from '../../../../src/models/token/token.repository';
import { TransactionInterceptor } from '../../../shared/transaction.interceptors';
import { AwsService } from '../../aws/aws.service';
import Token from '../../token/entity/token.entity';
import { TokenService } from '../../token/token.service';
import User from '../../user/entities/user.entity';
import { UserRepository } from '../../user/user.repository';
import { UserService } from '../../user/user.service';
import { AuthModule } from '../auth.module';
import { AuthService } from '../auth.service';

describe('AuthModule', () => {
  let app: INestApplication;
  let authService: AuthService;
  let tokenService: TokenService;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue({
        signup: jest.fn(),
        login: jest.fn(),
        logout: jest.fn(),
      })
      .overrideProvider(getRepositoryToken(User))
      .useValue({
        save: jest.fn(),
        findOne: jest.fn(),
      })
      .overrideProvider(getRepositoryToken(Token))
      .useValue({
        save: jest.fn(),
        findOne: jest.fn(),
      })
      .overrideProvider(TokenService)
      .useValue({
        refreshAccessToken: jest.fn(),
      })
      .overrideProvider(UserService)
      .useValue({
        findUserByEmail: jest.fn(),
      })
      .overrideProvider(AwsService)
      .useValue({})
      .overrideProvider(TokenRepository)
      .useValue({})
      .overrideProvider(UserRepository)
      .useValue({})
      .overrideInterceptor(TransactionInterceptor)
      .useValue({})
      .compile();


    app = moduleFixture.createNestApplication();
    authService = moduleFixture.get<AuthService>(AuthService);
    tokenService = moduleFixture.get<TokenService>(TokenService);

    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should call signup', async () => {
    const signupSpy = jest.spyOn(authService, 'signup');

    const result = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({});

    expect(signupSpy).toHaveBeenCalledTimes(1);
    expect(result.status).toBe(201);
  });

  it('should call login', async () => {
    const loginSpy = jest.spyOn(authService, 'login');

    const result = await request(app.getHttpServer())
      .post('/auth/login')
      .send({});

    expect(loginSpy).toHaveBeenCalledTimes(1);
    expect(result.status).toBe(201);
  });

  it('should call logout', async () => {
    const logoutSpy = jest.spyOn(authService, 'logout');

    const result = await request(app.getHttpServer())
      .post('/auth/logout')
      .send({});

    expect(logoutSpy).toHaveBeenCalledTimes(1);
    expect(result.status).toBe(201);
  });

  it('should call refreshAccessToken', async () => {
    const refreshAccessTokenSpy = jest.spyOn(
      tokenService,
      'refreshAccessToken',
    );

    const result = await request(app.getHttpServer())
      .post('/auth/token')
      .send({});

    expect(refreshAccessTokenSpy).toHaveBeenCalledTimes(1);
    expect(result.status).toBe(201);
  });
});
