import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishList } from './wishlist.entity';

@Injectable()
export class WishListService {
  constructor(
    @InjectRepository(WishList)
    private wishListRepository: Repository<WishList>
  ) {}

  async insertWishList(user_id: string, movieId: number): Promise<WishList>{
    const wishListReceived = new WishList(user_id, movieId);
    return await this.wishListRepository.save(wishListReceived);
  }
}
