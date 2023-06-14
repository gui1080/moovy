import { Module } from '@nestjs/common';
import { OmdbService } from './omdb/omdb.service'
import { OmdbController } from './omdb/omdb.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './users/auth.module';
import { MovieList } from './omdb/movielist.entity';
import { Audio } from './user_audio_lib/audio.entity';
import { AudioController } from './user_audio_lib/audio.controller';
import { AudioService } from './user_audio_lib/audio.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './config/multer.config';

@Module({
  imports: [
      MulterModule.register(multerConfig),
      TypeOrmModule.forRoot(typeOrmConfig),
      AuthModule,
      TypeOrmModule.forFeature([MovieList, Audio]),
    ],
  controllers: [OmdbController, AudioController],
  providers: [OmdbService, AudioService],
})
export class AppModule {}
