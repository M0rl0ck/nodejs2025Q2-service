import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Fav {
  @PrimaryColumn()
  id: string = 'favorite';

  @Column('uuid', { array: true, default: [] })
  artistId: string[];

  @OneToMany(() => Artist, (artist) => artist.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  artist: Artist[]; // favorite artists ids

  @OneToMany(() => Album, (album) => album.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  albums: Album[]; // favorite albums ids

  @OneToMany(() => Track, (track) => track.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  tracks: Track[]; // favorite tracks ids
}
