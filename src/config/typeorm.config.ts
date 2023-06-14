import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres', 
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123ronaldo',
    database: 'moovy_db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'], // every entity possible
    synchronize: true,
};