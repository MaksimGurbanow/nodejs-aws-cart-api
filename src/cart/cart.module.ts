import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../database/cart.entity';
import { User } from '../database/user.entity';
import { CartItem } from '../database/cartItem.entity';

@Module({
  imports: [OrderModule, TypeOrmModule.forFeature([Cart, User, CartItem])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
