import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistStore } from './interfaces/artist-storage.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ArtistStore') private readonly storage: ArtistStore,
    private eventEmitter: EventEmitter2,
  ) {}
  create(createArtistDto: CreateArtistDto) {
    return this.storage.createArtist(createArtistDto);
  }

  findAll() {
    return this.storage.getAllArtists();
  }

  findOne(id: string) {
    return this.storage.getArtistById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.storage.updateArtist(id, updateArtistDto);
  }

  remove(id: string): boolean {
    const result = this.storage.deleteArtist(id);
    if (!result) {
      return false;
    }
    this.eventEmitter.emit('artist.deleted', id);
    return true;
  }
}
