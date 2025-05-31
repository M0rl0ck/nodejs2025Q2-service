import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStore } from './interfaces/track-storage.interface';
import { NotFoundError } from 'src/errors/not-found.error';

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
    const track = this.storage.getTrackById(id);
    if (!track) {
      throw new NotFoundError();
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.storage.getTrackById(id);
    if (!track) {
      throw new NotFoundError();
    }
    return this.storage.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    const result = this.storage.deleteTrack(id);
    if (!result) {
      throw new NotFoundError();
    }
  }
}
