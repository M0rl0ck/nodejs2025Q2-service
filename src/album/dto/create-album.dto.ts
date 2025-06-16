import { IsNotEmpty, IsPositive, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  year: number;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist
}
