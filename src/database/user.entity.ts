import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID for the user

  @Column({ type: 'varchar', length: 255 })
  email: string; // User's email

  @Column({ type: 'varchar', length: 255 })
  password: string; // User's hashed password

  @CreateDateColumn()
  created_at: Date; // Timestamp for creation

  @UpdateDateColumn()
  updated_at: Date; // Timestamp for the last update
}
