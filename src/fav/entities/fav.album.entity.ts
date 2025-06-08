import { Album } from 'src/album/entities/album.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FavAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  albumId: string;

  @OneToOne(() => Album, (album) => album.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  album: Album;
}
