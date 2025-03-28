import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';

@Entity('user_photo')
export class UserPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  isMain: boolean;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;
}
