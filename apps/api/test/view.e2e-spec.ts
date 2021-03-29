import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ViewsService } from './../src/views/views.service';
import { getConnection } from 'typeorm';

describe('ViewController (e2e)', () => {
  let app: INestApplication;
  let viewService: ViewsService;

  const user1 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTcwMjY1OTgsImlhdCI6MTYxNzAwOTYzNSwiYXV0aF90aW1lIjoxNjE3MDA4NDM0LCJqdGkiOiJlZWQ0YTYzNC1iMjNiLTQwMzUtODFiYy0zNjM5NjljNDMxZGMiLCJpc3MiOiJ0ZXN0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImZpcnN0dXNlcm1vY2siLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJ3ZWIiLCJub25jZSI6ImViOGQ3YWYzLWNkMWYtNGEyZS04N2QxLTI5MGVjNmNhZjA5MCIsInNlc3Npb25fc3RhdGUiOiI4N2M0NWIxOS1jZWYxLTQ3NmUtYjI1YS03MDUzYTM0NTE3OGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImdyb3VwcyI6W10sInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20ifQ.sbaOzqlGEVfhEs6c6OMA7-J1kX9LAx1igr_58jl9O1A';

  const user2 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTcwMjY2MTksImlhdCI6MTYxNzAwOTYzNSwiYXV0aF90aW1lIjoxNjE3MDA4NDM0LCJqdGkiOiJlZWQ0YTYzNC1iMjNiLTQwMzUtODFiYy0zNjM5NjljNDMxZGMiLCJpc3MiOiJ0ZXN0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6InNlY29uZHVzZXJtb2NrIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoid2ViIiwibm9uY2UiOiJlYjhkN2FmMy1jZDFmLTRhMmUtODdkMS0yOTBlYzZjYWYwOTAiLCJzZXNzaW9uX3N0YXRlIjoiODdjNDViMTktY2VmMS00NzZlLWIyNWEtNzA1M2EzNDUxNzhlIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6W119LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6W119fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJncm91cHMiOltdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIn0.IAhNpjPV619uBs29VHx79xsQOdfnu0d3wVihU-9LwhY';

  const firstView = {
    user_uuid: 'firstusermock',
    movie: 527774,
    token: user1,
  };
  const secondView = {
    user_uuid: 'secondusermock',
    movie: 577922,
    token: user2,
  };
  const thirdView = {
    user_uuid: 'firstusermock',
    movie: 577922,
    token: user1,
  };

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
      .set('Authorization', 'Bearer ' + firstView.token) // Works.
      .expect(200)
      .expect((res) => {
        expect(res.body[0]).toHaveProperty('movie', 527774);
      });
  });

  it('/:movie (GET)', () => {
    return request(app.getHttpServer())
      .get('/views/' + firstView.movie)
      .set('Authorization', 'Bearer ' + firstView.token) // Works.
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
      });
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/views')
      .set('Authorization', 'Bearer ' + thirdView.token) // Works.
      .send(thirdView)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('user_uuid', thirdView.user_uuid);
        expect(res.body).toHaveProperty('movie', thirdView.movie);
      });
  });

  it('/:id (DELETE)', async () => {
    await viewService.create(thirdView.user_uuid, thirdView.movie);
    return request(app.getHttpServer())
      .delete('/views/' + thirdView.movie)
      .set('Authorization', 'Bearer ' + thirdView.token) // Works.
      .expect(204);
  });
});
