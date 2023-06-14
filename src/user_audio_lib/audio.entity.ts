import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Audio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('bytea', { nullable: true })
    data: Buffer;

    @Column({unique:true})
    filename: string;

    @Column()
    originalname: string;

    @Column()
    mimetype: string;

    @Column()
    size: number;

    @Column()
    made_by_username: string;

    @Column()
    made_by_userid: number;

    @Column()
    about_imdbID: string;

}
