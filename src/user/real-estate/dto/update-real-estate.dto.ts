import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateRealEstateDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  street: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  type: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  floor: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  square: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  numberOfBeds: number;

  @ApiProperty()
  @IsOptional()
  @IsObject()
  options: object;
}
