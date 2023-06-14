import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }

    @Column({unique:true})
    username: string;

    @Column()
    password: string;

    @Column({unique:true})
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

}