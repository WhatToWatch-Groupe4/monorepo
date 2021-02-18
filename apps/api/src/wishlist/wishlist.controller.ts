import { WishListService } from './wishlist.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { WishList } from './wishlist.entity';
import { CreateWishListDto } from './create-wishlist.dto';

@Controller('wishlist')
export class WishListController {
  constructor(private readonly wishlistService: WishListService) {}

  @Post()
  async createWishList(@Body() createWishList: CreateWishListDto): Promise<WishList>{
    return this.wishlistService.insertWishList(createWishList.userId, createWishList.movieId);
  }
}
