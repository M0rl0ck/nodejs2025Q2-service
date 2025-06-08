// import { Album } from 'src/album/entities/album.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4
  @Column()
  name: string;
  @Column()
  grammy: boolean;

  // @OneToMany(() => Album, (album) => album.artistId, {
  //   nullable: true,
  //   onDelete: 'SET NULL',
  // })
  // albums: Album[];
}
