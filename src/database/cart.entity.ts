import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CartItem } from './cartItem.entity';
import { User } from './user.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID for the cart

  // @Column('uuid')
  // user_id: string; // UUID for the user

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date; // Timestamp for creation

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date; // Timestamp for the last update

  @Column({
    type: 'enum',
    enum: ['OPEN', 'ORDERED'],
    default: 'OPEN',
  })
  status: 'OPEN' | 'ORDERED'; // Enum type for the cart status

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
  items: CartItem[]; // Relation with CartItems

  @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User; // Relation with User
}
