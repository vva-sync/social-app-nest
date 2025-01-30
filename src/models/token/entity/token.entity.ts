import User from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}

export default Token;
