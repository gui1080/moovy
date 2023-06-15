import { EntityRepository, Repository } from 'typeorm';
import { Audio } from './audio.entity';

@EntityRepository(Audio)
export class AudioRepository extends Repository<Audio> {}
