import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItem } from './cartItem.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID for the cart

  @Column('uuid')
  user_id: string; // UUID for the user

  @CreateDateColumn()
  created_at: Date; // Timestamp for creation

  @UpdateDateColumn()
  updated_at: Date; // Timestamp for the last update

  @Column({
    type: 'enum',
    enum: ['OPEN', 'ORDERED'],
    default: 'OPEN',
  })
  status: 'OPEN' | 'ORDERED'; // Enum type for the cart status

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[]; // Relation with CartItems
}
