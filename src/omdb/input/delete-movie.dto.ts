import { IsString, Length } from "class-validator";

export class DeleteMovieDto {
    @IsString()
    @Length(5, 255)
    imdbID: string;
}