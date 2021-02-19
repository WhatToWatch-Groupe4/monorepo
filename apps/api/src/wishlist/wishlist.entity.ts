import { Entity, PrimaryColumn } from 'typeorm';

@Entity('wishlists')
export class WishList {
  @PrimaryColumn()
  movieId: number;

  @PrimaryColumn()
  userUuid: string;

  constructor(idUser: string, idMovie: number) {
    this.userUuid = idUser;
    this.movieId = idMovie;
  }
}
