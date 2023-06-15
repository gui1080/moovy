import { Expose } from 'class-transformer';
import { MovieList } from 'src/omdb/movielist.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, BeforeInsert, JoinColumn } from 'typeorm';

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

    @OneToOne(() => MovieList, movie => movie.id)
    @JoinColumn()
    movie: MovieList;
}


