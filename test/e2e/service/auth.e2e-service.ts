// test/helpers/auth-test.service.ts
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

export class AuthTestService {
  constructor(private app: INestApplication) {}

  async createUser(user: { name: string; email: string; password: string }) {
    const response = await request(this.app.getHttpServer())
      .post('/users')
      .send(user);

    if (response.status !== 201) {
      throw new Error(`Failed to create user: ${response.body.message}`);
    }
    return response.body;
  }

  async loginUser(user: { email: string; password: string }) {
    const response = await request(this.app.getHttpServer())
      .post('/auth/login')
      .send(user);

    if (response.status !== 200) {
      throw new Error(`Failed to login: ${response.body.message}`);
    }
    return {
      cookies: response.headers['set-cookie'],
      body: response.body,
    };
  }
}
