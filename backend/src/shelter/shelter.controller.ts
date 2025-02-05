import { Controller, Post, Put, Body, Param, Query, Get } from '@nestjs/common';
import { NewShelterInput } from '../dtos/newShelterDTO';
import { UpdateShelterInput } from '../dtos/updateShelterDTO';
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

  @Post('/update')
  public async updateShelter(@Body() updateData: UpdateShelterInput) {
    return this.shelterService.updateShelter(updateData.shelterId, updateData);
  }

}
