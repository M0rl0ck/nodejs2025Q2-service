import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { Track } from '../entities/track.entity';

interface TrackStore {
  getAllTracks(): Track[];
  getTrackById(id: string): Track | undefined;
  createTrack(track: CreateTrackDto): Track;
  updateTrack(id: string, track: UpdateTrackDto): Track | undefined;
  deleteTrack(id: string): boolean;
}

export { TrackStore };
