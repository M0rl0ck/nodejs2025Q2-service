import { Injectable } from '@nestjs/common';
import { Fav } from '../entities/fav.entity';
import { FavStore } from '../interfaces/fav-storage.interface';
@Injectable()
export class FavStorage implements FavStore {
  private fav: Fav = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getFav(): Fav {
    return this.fav;
  }

  addTrackToFav(trackId: string) {
    if (!this.fav.tracks.includes(trackId)) {
    }
    this.fav.tracks.push(trackId);
  }

  addAlbumToFav(albumId: string) {
    if (!this.fav.albums.includes(albumId)) {
      this.fav.albums.push(albumId);
    }
  }

  addArtistToFav(artistId: string) {
    if (!this.fav.artists.includes(artistId)) {
      this.fav.artists.push(artistId);
    }
  }

  deleteTrackFromFav(trackId: string): boolean {
    const index = this.fav.tracks.indexOf(trackId);
    if (index === -1) {
      return;
    }
    this.fav.tracks.splice(index, 1);
    return true;
  }

  deleteAlbumFromFav(albumId: string): boolean {
    const index = this.fav.albums.indexOf(albumId);
    if (index === -1) {
      return false;
    }
    this.fav.albums.splice(index, 1);
    return true;
  }

  deleteArtistFromFav(artistId: string): boolean {
    const index = this.fav.artists.indexOf(artistId);
    if (index === -1) {
      return false;
    }
    this.fav.artists.splice(index, 1);
    return true;
  }
}
