import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Album } from '../entities/album.entity';

interface AlbumStore {
  getAllAlbums(): Album[];
  getAlbumById(id: string): Album | undefined;
  createAlbum(album: CreateAlbumDto): Album;
  updateAlbum(id: string, album: UpdateAlbumDto): Album | undefined;
  deleteAlbum(id: string): boolean;
  deleteArtist(artistId: string): void;
}

export { AlbumStore };
