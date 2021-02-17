import { Injectable } from '@nestjs/common';
import { MovieDb } from 'moviedb-promise';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MovieService {
  private readonly api;
  constructor(config: ConfigService) {
    this.api = new MovieDb(config.get<string>('MOVIE_API_KEY'));
  }
  authMovieApi() {
    return this.api;
  }
}
