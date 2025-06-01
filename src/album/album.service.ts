import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import type { AlbumStore } from './interfaces/album-storage.interface';

@Injectable()
export class AlbumService {
  constructor(@Inject('AlbumStore') private readonly storage: AlbumStore) {}
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
    return this.storage.deleteAlbum(id);
  }
}
