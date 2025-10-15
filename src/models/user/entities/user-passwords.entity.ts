import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import User from './user.entity';

@Entity('user_passwords')
export class UserPassword {
    @PrimaryColumn()
    @OneToOne(() => User)
    @JoinColumn()
    id: number;

    @Column()
    password: string;
}
