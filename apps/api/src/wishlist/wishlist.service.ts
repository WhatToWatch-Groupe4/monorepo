import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishList } from './wishlist.entity';

@Injectable()
export class WishListService {
  constructor(
    @InjectRepository(WishList)
    private wishListRepository: Repository<WishList>,
  ) {}

  async insertWishList(user_id: string, movieId: number): Promise<WishList> {
    const wishListReceived = new WishList(user_id, movieId);
    return await this.wishListRepository.save(wishListReceived);
  }

  async checkWish(user_id: string, movieId: number): Promise<WishList>{
    return await this.wishListRepository.findOneOrFail({ idMovie: movieId, idUser: user_id });
  }

  async deleteWishList(userId: string, movieId: number): Promise<void> {
    const wishListSelected = await this.wishListRepository.count({ idMovie: movieId, idUser: userId });
    if (wishListSelected > 0) {
      await this.wishListRepository.remove(await this.wishListRepository.find({ idMovie: movieId, idUser: userId }));
    }
  }

  async getWishList(user_id: string): Promise<WishList[]> {
    return this.wishListRepository.find({ idUser: user_id });
  }
}
