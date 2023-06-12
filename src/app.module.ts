import { Module } from '@nestjs/common';
import { OmdbService } from './omdb/omdb.service'
import { OmdbController } from './omdb/omdb.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './users/auth.module';

@Module({
  imports: [
      TypeOrmModule.forRootAsync(typeOrmConfig),
      AuthModule
    ],
  controllers: [OmdbController],
  providers: [OmdbService],
})
export class AppModule {}
