import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';

export class CreateRealEstateDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNumber()
  floor: number;

  @ApiProperty()
  @IsNumber()
  square: number;

  @ApiProperty()
  @IsNumber()
  numberOfBeds: number;

  @ApiProperty()
  @IsObject()
  options: object;
}
