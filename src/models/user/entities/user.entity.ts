import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Post } from '../../post/entity/post.entity';
import Token from '../../token/entity/token.entity';
import { UserConfirmation } from './user-confirmation.entity';
import { UserPassword } from './user-passwords.entity';
import { UserPhoto } from './user-photo.entity';

@Entity()
@Index("idx_user_last_name_username", ["last_name", "username"])
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

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToOne(() => Token, (token) => token.user)
  token: Token;

  @OneToOne(() => UserPassword, (userPassword) => userPassword.id)
  password: UserPassword;

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
