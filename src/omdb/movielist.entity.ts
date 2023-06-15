import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Audio } from '../user_audio_lib/audio.entity';
import { Expose } from "class-transformer";

// List of saved movies
// Is basically a list of movies retrieved from OMDB
// linked to a user id and username

@Entity()
export class MovieList {
    @PrimaryGeneratedColumn()
    id: number;
    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }

    @Column()
    title: string;

    @Column()
    imdbID: string;

    @Column()
    poster: string;

    @Column()
    user_id: number;

    @Column()  
    user_name: string;

    @OneToOne(() => Audio, { nullable: true })
    @JoinColumn()
    audio: Audio;

}