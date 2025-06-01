import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStore } from './interfaces/track-storage.interface';

@Injectable()
export class TrackService {
  constructor(@Inject('TrackStore') private readonly storage: TrackStore) {}
  create(createTrackDto: CreateTrackDto) {
    return this.storage.createTrack(createTrackDto);
  }

  findAll() {
    return this.storage.getAllTracks();
  }

  findOne(id: string) {
    return this.storage.getTrackById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.storage.getTrackById(id);
    if (!track) {
      return undefined;
    }
    return this.storage.updateTrack(id, updateTrackDto);
  }

  remove(id: string): boolean {
    return this.storage.deleteTrack(id);
  }
}
