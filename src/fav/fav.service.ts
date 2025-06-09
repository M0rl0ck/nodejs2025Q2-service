import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavAlbum } from './entities/fav.album.entity';
import { FavArtist } from './entities/fav.artist.entity';
import { FavTrack } from './entities/fav.track.entity';

@Injectable()
export class FavService {
  constructor(
    @InjectRepository(FavAlbum)
    private readonly favAlbumRepository: Repository<FavAlbum>,
    @InjectRepository(FavTrack)
    private readonly favTrackRepository: Repository<FavTrack>,
    @InjectRepository(FavArtist)
    private readonly favArtistRepository: Repository<FavArtist>,
  ) {}

  async findAll() {
    const promiseArtists = this.favArtistRepository.find();
    const promiseAlbums = this.favAlbumRepository.find();
    const promiseTracks = this.favTrackRepository.find();
    const [favArtists, favAlbums, favTracks] = await Promise.all([
      promiseArtists,
      promiseAlbums,
      promiseTracks,
    ]);
    const artists = favArtists.map((artist) => artist.artist);
    const albums = favAlbums.map((album) => album.album);
    const tracks = favTracks.map((track) => track.track);
    return { artists, albums, tracks };
  }

  async addTrackToFav(trackId: string): Promise<boolean> {
    try {
      await this.favTrackRepository.save({ trackId });
      return true;
    } catch (error) {
      return false;
    }
  }

  async addAlbumToFav(albumId: string): Promise<boolean> {
    try {
      await this.favAlbumRepository.save({ albumId });
      return true;
    } catch (error) {
      return false;
    }
  }
  async addArtistToFav(artistId: string): Promise<boolean> {
    try {
      await this.favArtistRepository.save({ artistId });
      return true;
    } catch (error) {
      return false;
    }
  }
  async deleteTrackFromFav(trackId: string): Promise<boolean> {
    const favTrack = await this.favTrackRepository.findOne({
      where: { trackId },
    });
    if (!favTrack) {
      return false;
    }
    const result = await this.favTrackRepository.delete(favTrack.id);
    if (!result.affected) {
      return false;
    }
    return true;
  }
  async deleteAlbumFromFav(albumId: string): Promise<boolean> {
    const favAlbum = await this.favAlbumRepository.findOne({
      where: { albumId },
    });
    if (!favAlbum) {
      return false;
    }
    const result = await this.favAlbumRepository.delete(favAlbum.id);
    if (!result.affected) {
      return false;
    }
    return true;
  }
  async deleteArtistFromFav(artistId: string): Promise<boolean> {
    const favArtist = await this.favArtistRepository.findOne({
      where: { artistId },
    });
    if (!favArtist) {
      return false;
    }
    const result = await this.favArtistRepository.delete(favArtist.id);
    if (!result.affected) {
      return false;
    }
    return true;
  }
}
