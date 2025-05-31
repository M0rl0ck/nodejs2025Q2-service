import { Injectable } from '@nestjs/common';
import { TrackStore } from '../interfaces/track-storage.interface';
import { Track } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { randomUUID } from 'crypto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TrackStorage implements TrackStore {
  private tracks: Map<string, Track> = new Map();
  getAllTracks(): Track[] {
    return Array.from(this.tracks.values());
  }

  getTrackById(id: string): Track | undefined {
    return this.tracks.get(id);
  }

  createTrack(createTrackDto: CreateTrackDto): Track {
    const track = {
      ...createTrackDto,
      id: randomUUID(),
    };
    this.tracks.set(track.id, track);
    return track;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto): Track | undefined {
    const track = this.tracks.get(id);
    if (!track) {
      return undefined;
    }
    const updatedTrack = { ...track, ...updateTrackDto };
    this.tracks.set(id, updatedTrack);
    return this.tracks.get(id);
  }

  deleteTrack(id: string): boolean {
    if (!this.tracks.has(id)) {
      return false;
    }
    this.tracks.delete(id);
    return true;
  }
}
