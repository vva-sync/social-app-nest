import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import User from './user.entity';

@Entity('user_passwords')
export class UserPassword {
    @PrimaryColumn()
    id: number;

    @Column({ nullable: false })
    password: string;

    @OneToOne(() => User)
    @JoinColumn({ name: "id", foreignKeyConstraintName: "FK_user_passwords_user" })
    user: User;
}
