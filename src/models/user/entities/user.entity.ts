import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Token from '../../token/entity/token.entity';
import { Post } from '../../post/entity/post.entity';
import { UserPhoto } from './user-photo.entity';
import { UserConfirmation } from './user-confirmation.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({})
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToOne(() => Token, (token) => token.user)
  token: Token;

  @OneToOne(() => UserConfirmation, (userConfirmation) => userConfirmation.user)
  confirmation: UserConfirmation;

  @OneToMany(() => Post, (post) => post.creator)
  created_posts: Post[];

  @OneToMany(() => Post, (post) => post.owner)
  own_posts: Post[];

  @OneToMany(() => UserPhoto, (userPhoto) => userPhoto.user)
  photos: UserPhoto[];
}

export default User;
