import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Album } from '../entities/album.entity';
import { AlbumStore } from '../interfaces/album-storage.interface';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AlbumStorage implements AlbumStore {
  private albums: Map<string, Album> = new Map();
  createAlbum(createAlbumDto: CreateAlbumDto): Album {
    const album = { ...createAlbumDto, id: randomUUID() };
    this.albums.set(album.id, album);
    return album;
  }
  getAllAlbums(): Album[] {
    return Array.from(this.albums.values());
  }
  getAlbumById(id: string): Album {
    const album = this.albums.get(id);
    if (!album) {
      return undefined;
    }
    return album;
  }
  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.albums.get(id);
    if (!album) {
      return undefined;
    }
    const updatedAlbum = { ...album, ...updateAlbumDto };
    this.albums.set(id, updatedAlbum);
    return updatedAlbum;
  }
  deleteAlbum(id: string): boolean {
    const res = this.albums.get(id);
    if (!res) {
      return false;
    }
    this.albums.delete(id);
    return true;
  }
}
