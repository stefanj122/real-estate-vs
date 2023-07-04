import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { imagesStorage } from 'src/config/multer.config';
import { GetUser } from 'src/decorators/get-user.decorator';
import { RealEstate } from 'src/entities/real-estate.entity';
import { JWTPayloadT } from 'src/types/jwt-payload.type';
import { FileValidator } from 'src/validators/image.validator';
import { CreateRealEstateDto } from './dto/create-real-estate.dto';
import { UpdateRealEstateDto } from './dto/update-real-estate.dto';
import { RealEstateService } from './real-estate.service';

@ApiTags('app-real-estate')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  @Get('/:id')
  async getRealEstate(
    @Param('id') id: number,
    @GetUser() user: JWTPayloadT,
  ): Promise<{ realEstate: RealEstate; images: string[] }> {
    return await this.realEstateService.getRealEstate(id, user);
  }

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
  @Post('/:id/upload')
  @UseInterceptors(FilesInterceptor('images', 30, imagesStorage))
  async uploadImages(
    @Param('id') id: number,
    @UploadedFiles(FileValidator)
    images: Express.Multer.File[],
    @GetUser() user: JWTPayloadT,
  ): Promise<{ realEstate: RealEstate; images: string[] }> {
    return await this.realEstateService.uploadImages(id, images, user);
  }

  @Post()
  async createRealEstate(
    @Body() createRealEstateDto: CreateRealEstateDto,
    @GetUser() user: JWTPayloadT,
  ): Promise<RealEstate> {
    return await this.realEstateService.createRealEstate(
      createRealEstateDto,
      user,
    );
  }

  @HttpCode(204)
  @Delete('/:id')
  async deleteRealEstate(
    @Param('id') id: number,
    @GetUser() user: JWTPayloadT,
  ) {
    return await this.realEstateService.deleteRealEstate(id, user);
  }

  @Put('/:id')
  async updateRealEstate(
    @Param('id') id: number,
    @GetUser() user: JWTPayloadT,
    @Body() updateRealEstateDto: UpdateRealEstateDto,
  ) {
    return await this.realEstateService.updateRealEstate(
      id,
      user,
      updateRealEstateDto,
    );
  }
}
