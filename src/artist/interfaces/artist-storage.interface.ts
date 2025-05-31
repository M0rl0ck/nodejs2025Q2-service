import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../entities/artist.entity';

interface ArtistStore {
  getAllArtists(): Artist[];
  getArtistById(id: string): Artist | undefined;
  createArtist(artist: CreateArtistDto): Artist;
  updateArtist(id: string, artist: UpdateArtistDto): Artist | undefined;
  deleteArtist(id: string): boolean;
}

export { ArtistStore };
