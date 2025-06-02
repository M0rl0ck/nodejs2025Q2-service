import { Fav } from '../entities/fav.entity';

interface FavStore {
  getFav(): Fav;
  addTrackToFav(trackId: string): void;
  addAlbumToFav(albumId: string): void;
  addArtistToFav(artistId: string): void;
  deleteTrackFromFav(trackId: string): boolean;
  deleteAlbumFromFav(albumId: string): boolean;
  deleteArtistFromFav(artistId: string): boolean;
}

export { FavStore };
