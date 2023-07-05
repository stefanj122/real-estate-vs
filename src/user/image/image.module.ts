import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entities/images.entity';
import { RealEstate } from 'src/entities/real-estate.entity';
import { ImageController } from './image.conrtoller';
import { ImageService } from './image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Image, RealEstate])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
