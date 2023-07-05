import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entities/images.entity';
import { RealEstate } from 'src/entities/real-estate.entity';
import { makeImageUrl } from 'src/helpers/make-image-url.helper';
import { returnMessages } from 'src/helpers/messages-maper.helper';
import { JWTPayloadT } from 'src/types/jwt-payload.type';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(RealEstate)
    private readonly realEstateRepository: Repository<RealEstate>,
  ) {}
  public async uploadImages(
    id: number,
    images: Express.Multer.File[],
    user: JWTPayloadT,
  ): Promise<{ realEstate: RealEstate; images: Image[] & { path: string } }> {
    const arrOfPromises = [];

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
          name: image.filename,
          realEstate: { id },
        }),
      );
    });
    return Promise.all(arrOfPromises).then(
      (images: Image[] & { path: string }) => {
        images.forEach((image: Image & { path: string }) => {
          image.path = makeImageUrl(image, '285x190');
        });
        return { realEstate, images };
      },
    );
  }
}
