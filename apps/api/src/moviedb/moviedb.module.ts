import { MovieDbService } from "./moviedb.service";
import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [MovieDbService],
  exports: [MovieDbService]
})
export class MoviesDbModule {}