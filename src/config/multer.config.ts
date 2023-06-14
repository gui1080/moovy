import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig: MulterModuleOptions = {
    dest: 'src/uploads/audio_files/', 
    storage: diskStorage({
        destination: 'src/uploads/audio_files/',
        filename: (req, file, callback) => {
        const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        callback(null, `${randomName}${extname(file.originalname)}`);
        },
    }),
};