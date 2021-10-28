import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity('reviews')
export class Review {
  @PrimaryColumn()
  userId!: string;

  @PrimaryColumn()
  bookId!: number;

  @Column({ nullable: false })
  rating!: string;

  @Column({ nullable: true })
  comment!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.reviews, { primary: true })
  user!: User;

  @ManyToOne(() => Book, (book) => book.reviews, { primary: true })
  book!: Book;
}
