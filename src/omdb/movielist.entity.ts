import { User } from "src/users/user.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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