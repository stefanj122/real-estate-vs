import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entities/images.entity';
import { RealEstate } from 'src/entities/real-estate.entity';
import { makeImageUrl } from 'src/helpers/make-image-url.helper';
import { returnMessages } from 'src/helpers/messages-maper.helper';
import { JWTPayloadT } from 'src/types/jwt-payload.type';
import { Repository } from 'typeorm';
import { CreateRealEstateDto } from './dto/create-real-estate.dto';
import { UpdateRealEstateDto } from './dto/update-real-estate.dto';

@Injectable()
export class RealEstateService {
  constructor(
    @InjectRepository(RealEstate)
    private readonly realEstateRepository: Repository<RealEstate>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  public async getRealEstate(
    id: number,
    user: JWTPayloadT,
  ): Promise<{ realEstate: RealEstate; images: string[] }> {
    const imagesPath = [];

    const realEstate = await this.realEstateRepository.findOne({
      where: {
        user: { id: user.id },
        id: id,
      },
      relations: { images: true },
    });

    if (!realEstate) {
      throw new NotFoundException(returnMessages.RealEstateNotFound);
    }
    realEstate.images.forEach((image) => {
      imagesPath.push(makeImageUrl(image, '285x190'));
    });

    return { realEstate, images: imagesPath };
  }

  public async createRealEstate(
    createRealEstateDto: CreateRealEstateDto,
    user: JWTPayloadT,
  ): Promise<RealEstate> {
    return await this.realEstateRepository.save({
      ...createRealEstateDto,
      user: { id: user.id },
    });
  }

  public async deleteRealEstate(id: number, user: JWTPayloadT): Promise<void> {
    const realEstate = await this.realEstateRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!realEstate) {
      throw new NotFoundException(returnMessages.RealEstateNotFound);
    }

    if (realEstate.user.id !== user.id) {
      throw new UnauthorizedException(returnMessages.UserNotAuthorized);
    }
    await this.realEstateRepository.delete({ id: id, user: { id: user.id } });
  }

  public async updateRealEstate(
    id: number,
    user: JWTPayloadT,
    updateRealEstateDto: UpdateRealEstateDto,
  ) {
    let realEstate = await this.realEstateRepository.findOneBy({
      id,
      user: { id: user.id },
    });

    if (!realEstate) {
      throw new NotFoundException(returnMessages.RealEstateNotFound);
    }
    realEstate = { ...realEstate, ...updateRealEstateDto };
    return await this.realEstateRepository.save(realEstate);
  }

  public async uploadImages(
    id: number,
    images: Express.Multer.File[],
    user: JWTPayloadT,
  ): Promise<{ realEstate: RealEstate; images: string[] }> {
    const arrOfPromises = [];
    const imagesPath = [];

    const realEstate = await this.realEstateRepository.findOneBy({
      id,
      user: { id: user.id },
    });
    if (!realEstate) {
      throw new NotFoundException(returnMessages.RealEstateNotFound);
    }
    images.forEach((image) => {
      arrOfPromises.push(
        this.imageRepository.save({
          name: image.originalname,
          realEstate: { id },
        }),
      );
    });
    return Promise.all(arrOfPromises).then((images: Image[]) => {
      images.forEach((image) => {
        imagesPath.push(makeImageUrl(image, '285x190'));
      });
      return { realEstate, images: imagesPath };
    });
  }
}
