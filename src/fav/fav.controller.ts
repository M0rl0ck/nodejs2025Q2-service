import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavService } from './fav.service';
import { UNPROCESSABLE_ENTITY_ERROR } from './errors/unprocessable-entity.error';

@Controller('favs')
export class FavController {
  constructor(private readonly favService: FavService) {}

  @Get()
  findAll() {
    return this.favService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = this.favService.addTrackToFav(id);
    if (!res) {
      throw new UNPROCESSABLE_ENTITY_ERROR('Track');
    }
    return {
      message: 'Track added to fav',
    };
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = this.favService.addAlbumToFav(id);
    if (!res) {
      throw new UNPROCESSABLE_ENTITY_ERROR('Album');
    }
    return {
      message: 'Album added to fav',
    };
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = this.favService.addArtistToFav(id);
    if (!res) {
      throw new UNPROCESSABLE_ENTITY_ERROR('Artist');
    }
    return {
      message: 'Artist added to fav',
    };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = this.favService.deleteTrackFromFav(id);
    if (!res) {
      throw new NotFoundException('Track');
    }
    return res;
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = this.favService.deleteAlbumFromFav(id);
    if (!res) {
      throw new NotFoundException('Album');
    }
    return res;
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = this.favService.deleteArtistFromFav(id);
    if (!res) {
      throw new NotFoundException('Artist');
    }
    return res;
  }
}
