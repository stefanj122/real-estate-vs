import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { imagesStorage } from 'src/config/multer.config';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Image } from 'src/entities/images.entity';
import { RealEstate } from 'src/entities/real-estate.entity';
import { JWTPayloadT } from 'src/types/jwt-payload.type';
import { FileValidator } from 'src/validators/image.validator';
import { ImageService } from './image.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('app-image')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiParam({ name: 'id', description: 'Real estate id' })
  @Post('/:id/upload')
  @UseInterceptors(FilesInterceptor('images', 30, imagesStorage))
  async uploadImages(
    @Param('id') id: number,
    @UploadedFiles(FileValidator)
    images: Express.Multer.File[],
    @GetUser() user: JWTPayloadT,
  ): Promise<{ realEstate: RealEstate; images: Image[] & { path: string } }> {
    return await this.imageService.uploadImages(id, images, user);
  }
}
