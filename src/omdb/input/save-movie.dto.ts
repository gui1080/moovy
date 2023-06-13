import { IsString, Length } from "class-validator";

export class SaveMovieDto {
    @IsString()
    @Length(5, 255)
    title: string;

    @IsString()
    @Length(5, 255)
    imdbID: string;

    @IsString()
    @Length(5, 255)
    poster: string;
}