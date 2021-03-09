import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('MovieController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('page', 1);
        expect(res.body).toHaveProperty('total_pages');
      });
  });

  it('/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/movies/527774')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('imdb_id', 'tt5109280');
      });
  });
});
