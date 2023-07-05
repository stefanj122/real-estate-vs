import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/decorators/get-user.decorator';
import { RealEstate } from 'src/entities/real-estate.entity';
import { JWTPayloadT } from 'src/types/jwt-payload.type';
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
  ): Promise<{ realEstate: RealEstate }> {
    return await this.realEstateService.getRealEstate(id, user);
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
