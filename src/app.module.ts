import { Module } from '@nestjs/common';
import { OmdbService } from './omdb/omdb.service'
import { OmdbController } from './omdb/omdb.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './users/auth.module';
import { MovieList } from './omdb/movielist.entity';

@Module({
  imports: [
      TypeOrmModule.forRoot(typeOrmConfig),
      AuthModule,
      TypeOrmModule.forFeature([MovieList]),
    ],
  controllers: [OmdbController],
  providers: [OmdbService],
})
export class AppModule {}
