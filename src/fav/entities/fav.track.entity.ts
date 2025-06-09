import { Track } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FavTrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  trackId: string;

  @OneToOne(() => Track, (track) => track.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  track: Track;
}
