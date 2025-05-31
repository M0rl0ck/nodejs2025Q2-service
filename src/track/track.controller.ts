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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { NotFoundError } from 'src/errors/not-found.error';
import { TRACK_NOT_FOUND_ERROR } from './errors/not-found-track.error';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return this.trackService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new TRACK_NOT_FOUND_ERROR();
      }
      throw error;
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return this.trackService.update(id, updateTrackDto);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new TRACK_NOT_FOUND_ERROR();
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return this.trackService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new TRACK_NOT_FOUND_ERROR();
      }
      throw error;
    }
  }
}
