import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';

// import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    // private eventEmitter: EventEmitter2,
  ) {}

  // @OnEvent('artist.deleted')
  // onArtistDeleted(artistId: string) {
  //   this.storage.deleteArtist(artistId);
  // }

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumRepository.save(createAlbumDto);
  }

  async findAll() {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      return undefined;
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    if (!album) {
      return undefined;
    }
    return await this.albumRepository.update(id, updateAlbumDto);
  }

  async remove(id: string) {
    const result = await this.albumRepository.delete(id);
    if (!result) {
      return false;
    }
    // this.eventEmitter.emit('album.deleted', id);
    return true;
  }
}
