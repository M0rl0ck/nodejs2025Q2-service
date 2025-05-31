import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { NotFoundError } from 'src/errors/not-found.error';
import { ALBUM_NOT_FOUND_ERROR } from './errors/album-not-found.error';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return this.albumService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new ALBUM_NOT_FOUND_ERROR();
      }
      throw error;
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      return this.albumService.update(id, updateAlbumDto);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new ALBUM_NOT_FOUND_ERROR();
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return this.albumService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new ALBUM_NOT_FOUND_ERROR();
      }
      throw error;
    }
  }
}
