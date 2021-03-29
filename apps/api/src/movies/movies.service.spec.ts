import { Test, TestingModule } from '@nestjs/testing';
import { MovieDbService } from '../moviedb/moviedb.service';
import { MovieService } from './movies.service';
import { ConfigService } from '@nestjs/config';

describe('MoviesService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService, MovieDbService, ConfigService],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
