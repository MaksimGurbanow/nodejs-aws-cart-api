import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID for the cart item

  @Column('uuid')
  cart_id: string; // UUID for the cart

  @Column('uuid')
  product_id: string; // UUID for the product

  @Column('int')
  quantity: number; // Quantity of the product in the cart

  @CreateDateColumn()
  created_at: Date; // Timestamp for creation

  @UpdateDateColumn()
  updated_at: Date; // Timestamp for the last update

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart; // Relation with Cart
}
