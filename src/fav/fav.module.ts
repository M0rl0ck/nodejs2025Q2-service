import { Module } from '@nestjs/common';
import { FavService } from './fav.service';
import { FavController } from './fav.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavAlbum } from './entities/fav.album.entity';
import { FavArtist } from './entities/fav.artist.entity';
import { FavTrack } from './entities/fav.track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavAlbum, FavArtist, FavTrack])],
  controllers: [FavController],
  providers: [FavService],
})
export class FavModule {}
