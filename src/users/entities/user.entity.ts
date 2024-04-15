import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
