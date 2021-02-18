import { MovieDbService } from "./../moviedb/moviedb.service";
import { Injectable } from '@nestjs/common';
import { MovieDb } from 'moviedb-promise';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MovieService {
  constructor(public readonly movieDbService: MovieDbService) {}
}
