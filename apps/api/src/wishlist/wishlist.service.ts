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

  async insertWishList(userId: string, movieId: number): Promise<WishList> {
    return await this.wishListRepository.save({ idUser: userId, movieId });
  }

  async checkWish(userId: string, movieId: number): Promise<WishList | undefined> {
    return await this.wishListRepository.findOne({ movieId: movieId, userUuid: userId });
  }

  async deleteWishList(userId: string, movieId: number): Promise<void> {
    const wishListSelected = await this.wishListRepository.count({ movieId: movieId, userUuid: userId });
    if (wishListSelected > 0) {
      await this.wishListRepository.remove(await this.wishListRepository.find({ movieId: movieId, userUuid: userId }));
    }
  }

  async getWishList(user_id: string): Promise<WishList[]> {
    return this.wishListRepository.find({ userUuid: user_id });
  }
}
