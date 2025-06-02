import { Module } from '@nestjs/common';
import { FavService } from './fav.service';
import { FavController } from './fav.controller';
import { FavStorage } from './store/fav.storage';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [FavController],
  providers: [
    FavService,
    {
      provide: 'FavStore',
      useClass: FavStorage,
    },
  ],
  imports: [AlbumModule, ArtistModule, TrackModule],
})
export class FavModule {}
