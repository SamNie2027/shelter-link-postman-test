import { Controller, Post, Put, Body, Param, Query, Get } from '@nestjs/common';
import { NewShelterInput } from '../dtos/newShelterDTO';
import { ShelterService } from './shelter.service';

@Controller('shelter')
export class ShelterController {
  constructor(private readonly shelterService: ShelterService) {}

  @Post()
  public async postShelter(@Body() shelterData: NewShelterInput) {
    return this.shelterService.postShelter(shelterData);
  }

  @Get()
  public async getShelters() {
    return this.shelterService.getShelters();
  }

  @Get(':shelterId')
  public async getShelter(@Param('shelterId') shelterId: string) {
    return this.shelterService.getShelter(shelterId);
  }
}

