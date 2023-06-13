import { User } from "src/users/user.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// List of saved movies
// Is basically a list of movies retrieved from OMDB
// linked to a user id and username

@Entity()
export class MovieList {
    @PrimaryGeneratedColumn()
    id: number;

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