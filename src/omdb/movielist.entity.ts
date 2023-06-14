import { User } from "src/users/user.entity";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

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

}