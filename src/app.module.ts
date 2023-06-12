import { Module } from '@nestjs/common';
import { OmdbService } from './omdb/omdb.service'
import { OmdbController } from './omdb/omdb.controller'

@Module({
  imports: [],
  controllers: [OmdbController],
  providers: [OmdbService],
})
export class AppModule {}
