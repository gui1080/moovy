import { IsString, Length } from "class-validator";

export class SaveMovieDto {
    @IsString()
    @Length(5, 255)
    title: string;

    @Length(5, 25)
    imdbID: string;

    @IsString()
    @Length(5, 255)
    poster: string;
}