import { Artist } from 'src/artist/entities/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column()
  name: string;
  @Column()
  year: number;
  // @Column({ nullable: true, type: 'uuid' })
  @ManyToOne(() => Artist, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artistId: string | null; // refers to Artist

  // @ManyToOne(() => Artist, (artist) => artist.albums)
  // artist: Artist;
}
