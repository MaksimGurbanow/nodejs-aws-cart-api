import { Module } from '@nestjs/common';

import { UsersService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../database/cart.entity';
import { User } from '../database/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
