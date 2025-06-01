import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackStore } from './interfaces/track-storage.interface';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class TrackService {
  constructor(
    @Inject('TrackStore') private readonly storage: TrackStore,
    private eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('artist.deleted')
  onArtistDeleted(artistId: string) {
    this.storage.deleteArtist(artistId);
  }

  @OnEvent('album.deleted')
  onAlbumDeleted(albumId: string) {
    this.storage.deleteAlbum(albumId);
  }

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
    const result = this.storage.deleteTrack(id);
    if (!result) {
      return false;
    }
    this.eventEmitter.emit('track.deleted', id);
    return true;
  }
}
