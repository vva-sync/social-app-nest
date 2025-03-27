import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('post_photo')
export class PostPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  caption: string;

  @Column({ default: 0 })
  display_order: number;

  @ManyToOne(() => Post, (post) => post.photos)
  post: Post;
}
