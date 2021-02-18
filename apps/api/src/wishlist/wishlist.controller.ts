import { WishListService } from "./wishlist.service";
import { Controller} from '@nestjs/common';

@Controller('wishlist')
export class WishListController {

  constructor(private readonly wishlistService: WishListService) {}
}