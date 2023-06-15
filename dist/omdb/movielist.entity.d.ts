import { Audio } from '../user_audio_lib/audio.entity';
export declare class MovieList {
    id: number;
    generateId(): void;
    title: string;
    imdbID: string;
    poster: string;
    user_id: number;
    user_name: string;
    audio: Audio;
}
