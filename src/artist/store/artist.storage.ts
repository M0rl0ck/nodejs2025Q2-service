import { Injectable } from '@nestjs/common';
import { ArtistStore } from '../interfaces/artist-storage.interface';
import { Artist } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { randomUUID } from 'node:crypto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
class ArtistStorage implements ArtistStore {
  private artists: Map<string, Artist> = new Map();

  getAllArtists(): Artist[] {
    return Array.from(this.artists.values());
  }

  getArtistById(id: string): Artist | undefined {
    return this.artists.get(id);
  }

  createArtist(newArtist: CreateArtistDto): Artist {
    const artist = {
      ...newArtist,
      id: randomUUID(),
    };
    this.artists.set(artist.id, artist);
    return artist;
  }

  updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Artist | undefined {
    const artist = this.getArtistById(id);
    if (!artist) {
      return undefined;
    }
    const updatedArtist = {
      ...artist,
      ...updateArtistDto,
    };
    this.artists.set(id, updatedArtist);
    return updatedArtist;
  }

  deleteArtist(id: string): boolean {
    if (!this.getArtistById(id)) {
      return false;
    }
    this.artists.delete(id);
    return true;
  }
}

export { ArtistStorage };
