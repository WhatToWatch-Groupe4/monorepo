import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ViewsService } from './../src/views/views.service';
import { getConnection } from 'typeorm';

describe('ViewController (e2e)', () => {
  let app: INestApplication;
  let viewService: ViewsService;
  const firstView = { user_uuid: 'firstusermock', movie: 527774 };
  const secondView = { user_uuid: 'secondusermock', movie: 577922 };
  const thirdView = { user_uuid: 'firstusermock', movie: 577922 };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await getConnection().synchronize(true);

    viewService = app.get<ViewsService>(ViewsService);
    await Promise.all([
      viewService.create(firstView.user_uuid, firstView.movie),
      viewService.create(secondView.user_uuid, secondView.movie),
    ]);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/views')
      .expect(200)
      .query({ user_uuid: firstView.user_uuid })
      .expect((res) => {
        expect(res.body[0]).toHaveProperty('movie', 527774);
      });
  });

  it('/:movie (GET)', () => {
    return request(app.getHttpServer())
      .get('/views/' + firstView.movie)
      .query({ user_uuid: firstView.user_uuid })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
      });
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/views')
      .send(thirdView)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('user_uuid', thirdView.user_uuid);
        expect(res.body).toHaveProperty('movie', thirdView.movie);
      });
  });

  it('/:id (DELETE)', async () => {
    const view = await viewService.create('secondusermock', 527774);
    return request(app.getHttpServer())
      .delete('/views/' + view.id)
      .expect(200);
  });
});
