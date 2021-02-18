import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MovieDbService } from '../moviedb/moviedb.service';
import { TrendingResponse } from 'moviedb-promise/dist/request-types';

@Injectable()
export class MovieService {
  constructor(public movieDbService: MovieDbService) {}

  async findAll(): Promise<TrendingResponse> {
    try {
      return await this.movieDbService.api
        .trending({
          media_type: 'all',
          time_window: 'week',
        })
        .then((res) => {
          return res;
        });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
