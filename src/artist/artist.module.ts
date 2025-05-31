import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistStorage } from './store/artist.storage';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistStore',
      useClass: ArtistStorage,
    },
  ],
})
export class ArtistModule {}
