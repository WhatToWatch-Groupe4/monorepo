import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieDbService } from '../moviedb/moviedb.service';
import { MoviesController } from './movies.controller';
import { MovieService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService, MovieDbService, ConfigService],
      controllers: [MoviesController],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
