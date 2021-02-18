import { Entity, PrimaryColumn } from 'typeorm';

@Entity('wishlists')
export class WishList {
  @PrimaryColumn()
  idMovie: number;

  @PrimaryColumn()
  idUser: string;

  constructor(idUser: string, idMovie: number) {
    this.idUser = idUser;
    this.idMovie = idMovie;
  }
}
