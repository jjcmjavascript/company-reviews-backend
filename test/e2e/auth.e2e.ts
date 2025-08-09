import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/users/user.module';
import { resetDb } from '../helpers/resetdb';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
  });

  describe('/auth/login (POST)', () => {
    it('should return 401 for incorrect credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test@example.com', password: 'WrongPassword' });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Unauthorized');
    });
  });

  describe('/auth (POST)', () => {
    it('should return ok, with auth credentials', async () => {
      const tempUser = {
        name: 'test',
        email: 'test@example.com',
        password: 'myPassword--',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(tempUser);

      expect(response.status).toBe(201);

      const responseAuth = await request(app.getHttpServer())
        .post('/auth/login')
        .send(tempUser);

      expect(responseAuth.status).toBe(200);

      expect(responseAuth.headers).toHaveProperty('set-cookie');
      expect(responseAuth.headers['set-cookie']).toBeTruthy();
      expect(responseAuth.headers['set-cookie'].length).toBeGreaterThan(0);
      expect(
        responseAuth.headers['set-cookie'][0].includes('access_token='),
      ).toBeTruthy();
    });
  });

  afterAll(async () => {
    await app.close();
    resetDb();
  });
});
