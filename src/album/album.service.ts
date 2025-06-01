import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import type { AlbumStore } from './interfaces/album-storage.interface';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('AlbumStore') private readonly storage: AlbumStore,
    private eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('artist.deleted')
  onArtistDeleted(artistId: string) {
    this.storage.deleteArtist(artistId);
  }

  create(createAlbumDto: CreateAlbumDto) {
    return this.storage.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.storage.getAllAlbums();
  }

  findOne(id: string) {
    const album = this.storage.getAlbumById(id);
    if (!album) {
      return undefined;
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.storage.updateAlbum(id, updateAlbumDto);
    if (!album) {
      return undefined;
    }
    return album;
  }

  remove(id: string) {
    const result = this.storage.deleteAlbum(id);
    if (!result) {
      return false;
    }
    this.eventEmitter.emit('album.deleted', id);
    return true;
  }
}
