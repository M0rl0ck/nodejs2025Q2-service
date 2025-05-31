import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import type { AlbumStore } from './interfaces/album-storage.interface';
import { NotFoundError } from 'src/errors/not-found.error';

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
      throw new NotFoundError();
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.storage.updateAlbum(id, updateAlbumDto);
    if (!album) {
      throw new NotFoundError();
    }
    return album;
  }

  remove(id: string) {
    const result = this.storage.deleteAlbum(id);
    if (!result) {
      throw new NotFoundError();
    }
  }
}
