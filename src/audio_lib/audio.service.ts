import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audio } from './audio.entity';
import { User } from 'src/users/user.entity';
import { readFileSync } from 'fs';

@Injectable()
export class AudioService {
    constructor(
        @InjectRepository(Audio)
        private readonly audioRepository: Repository<Audio>,
    ) {}

    async storeAudio(file: Express.Multer.File, user: User, imdbID): Promise<string> {

        // audio file itself as binary
        const audioData = readFileSync(file.path);

        // Store the file in the database and return the audio URL
        const audio = this.audioRepository.create({
            filename: file.filename,
            data: audioData,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            made_by_username: user.username,
            about_imdbID: imdbID
        });
        await this.audioRepository.save(audio);
        return `/audio/${audio.id}`;
    }
}
