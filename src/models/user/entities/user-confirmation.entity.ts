import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './user.entity';

@Entity()
export class UserConfirmation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activationLink: string;

  @Column()
  isActivated: boolean;

  @OneToOne(() => User, (user) => user.confirmation)
  @JoinColumn()
  user: User;
}
