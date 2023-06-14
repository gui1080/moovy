import { IsString, Length } from "class-validator";

export class DeleteMovieDto {

    @Length(5, 25)
    imdbID: string;
}