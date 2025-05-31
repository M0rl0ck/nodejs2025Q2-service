import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStore } from './interfaces/artist-storage.interface';
import { NotFoundError } from 'src/errors/not-found.error';

@Injectable()
export class ArtistService {
  constructor(@Inject('ArtistStore') private readonly storage: ArtistStore) {}
  create(createArtistDto: CreateArtistDto) {
    return this.storage.createArtist(createArtistDto);
  }

  findAll() {
    return this.storage.getAllArtists();
  }

  findOne(id: string) {
    const artist = this.storage.getArtistById(id);
    if (!artist) {
      throw new NotFoundError();
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.storage.updateArtist(id, updateArtistDto);
    if (!artist) {
      throw new NotFoundError();
    }
    return artist;
  }

  remove(id: string) {
    const result = this.storage.deleteArtist(id);
    if (!result) {
      throw new NotFoundError();
    }
  }
}
