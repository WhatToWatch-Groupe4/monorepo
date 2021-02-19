import { Injectable } from '@nestjs/common';
import { MovieDb } from 'moviedb-promise';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MovieDbService {
  public readonly api: MovieDb;

  constructor(config: ConfigService) {
    this.api = new MovieDb(config.get<string>('MOVIEDB_API_KEY'));
  }
}
