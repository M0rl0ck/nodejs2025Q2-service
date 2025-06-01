import { Inject, Injectable } from '@nestjs/common';
import { FavStore } from './interfaces/fav-storage.interface';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class FavService {
  constructor(
    @Inject('FavStore') private readonly favStorage: FavStore,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  @OnEvent('track.deleted')
  deleteTrack(trackId: string) {
    this.deleteTrackFromFav(trackId);
  }

  @OnEvent('album.deleted')
  deleteAlbum(albumId: string) {
    this.deleteAlbumFromFav(albumId);
  }

  @OnEvent('artist.deleted')
  deleteArtist(artistId: string) {
    this.deleteArtistFromFav(artistId);
  }

  findAll() {
    const fav = this.favStorage.getFav();

    const artists = fav.artists
      .map((artistId) => {
        try {
          return this.artistService.findOne(artistId);
        } catch (error) {
          return null;
        }
      })
      .filter(Boolean);

    const albums = fav.albums
      .map((albumId) => {
        try {
          return this.albumService.findOne(albumId);
        } catch (error) {
          return null;
        }
      })
      .filter(Boolean);

    const tracks = fav.tracks
      .map((trackId) => {
        try {
          return this.trackService.findOne(trackId);
        } catch (error) {
          return null;
        }
      })
      .filter(Boolean);
    return { artists, albums, tracks };
  }

  addTrackToFav(trackId: string): boolean {
    const track = this.trackService.findOne(trackId);
    if (!track) {
      return false;
    }
    this.favStorage.addTrackToFav(trackId);
    return true;
  }

  addAlbumToFav(albumId: string): boolean {
    const album = this.albumService.findOne(albumId);
    if (!album) {
      return false;
    }
    this.favStorage.addAlbumToFav(albumId);
    return true;
  }
  addArtistToFav(artistId: string): boolean {
    const artist = this.artistService.findOne(artistId);
    if (!artist) {
      return false;
    }
    this.favStorage.addArtistToFav(artistId);
    return true;
  }
  deleteTrackFromFav(trackId: string): boolean {
    return this.favStorage.deleteTrackFromFav(trackId);
  }
  deleteAlbumFromFav(albumId: string): boolean {
    return this.favStorage.deleteAlbumFromFav(albumId);
  }
  deleteArtistFromFav(artistId: string): boolean {
    return this.favStorage.deleteArtistFromFav(artistId);
  }
}
