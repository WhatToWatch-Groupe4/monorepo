import { WishListService } from "./wishlist.service";
import { WishListController } from "./wishlist.controller";
import { Module } from '@nestjs/common';

@Module({
  imports:[],
  controllers: [WishListController],
  providers: [WishListService],
})
export class WishListModule {}