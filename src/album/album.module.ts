import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumStorage } from './store/album.storage';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'AlbumStore',
      useClass: AlbumStorage,
    },
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
