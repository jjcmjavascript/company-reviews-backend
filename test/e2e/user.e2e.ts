import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { resetDb } from '../helpers/resetdb';
import { UserModule } from '@modules/users/user.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
  });

  describe('/user (POST)', () => {
    it('should return 401 for incorrect credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({ email: 'test@example.com', password: 'WrongPassword' });

      expect(response.status).toBe(400);
      expect(response.body.message.includes('Name is required')).toBe(true);
    });

    it('/user (POST) should return 201', async () => {
      const user = {
        email: 'test2@example.com',
        password: 'WrongPassword',
        name: 'test',
      };

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(user);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('name');
      expect(response.body?.name).toBe(user.name);
    });
  });

  afterAll(async () => {
    await app.close();
    resetDb();
  });
});
