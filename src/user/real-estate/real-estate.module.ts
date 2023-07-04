import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/entities/images.entity';
import { RealEstate } from 'src/entities/real-estate.entity';
import { User } from 'src/entities/user.entity';
import { RealEstateController } from './real-estate.controller';
import { RealEstateService } from './real-estate.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, RealEstate, Image])],
  controllers: [RealEstateController],
  providers: [RealEstateService],
})
export class RealEstateModule {}
