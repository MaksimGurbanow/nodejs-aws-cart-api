import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItem {
  // @PrimaryGeneratedColumn('uuid')
  // id: string; // UUID for the cart item

  @PrimaryColumn('uuid')
  cart_id: string; // UUID for the cart

  @PrimaryColumn('uuid')
  product_id: string; // UUID for the product

  @Column('integer')
  count: number; // Quantity of the product in the cart

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart; // Relation with Cart
}
