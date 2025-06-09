import { Artist } from 'src/artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FavArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  artistId: string;

  @OneToOne(() => Artist, (artist) => artist.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  artist: Artist;
}
