import { Injectable } from '@nestjs/common';
import { ShelterInputModel, ShelterModel } from './shelter.model';
import { DynamoDbService } from '../dynamodb';
import { NewShelterInput } from '../dtos/newShelterDTO';

@Injectable()
export class ShelterService {
  private readonly tableName = 'shelterlinkShelters';
  constructor(private readonly dynamoDbService: DynamoDbService) {}

  public async postShelter(shelterData: NewShelterInput) {
    const shelterModel = this.postInputToShelterModel(shelterData);
    const newId =
      ((await this.dynamoDbService.getHighestShelterId(this.tableName)) ?? 0) +
      1;
    shelterModel.shelterId.S = newId.toString();
    console.log('Using new ID:' + shelterModel.shelterId.S);
    console.log(shelterModel);
    try {
      const result = await this.dynamoDbService.postItem(
        this.tableName,
        shelterModel
      );
      return { ...result, id: newId };
    } catch (e) {
      throw new Error('Unable to post new shelter: ' + e);
    }
  }

  private postInputToShelterModel = (
    input: NewShelterInput
  ): ShelterInputModel => {
    return {
      shelterId: { S: '0' },
      name: { S: input.name },
      address: {
        M: {
          street: { S: input.address.street },
          city: { S: input.address.city },
          state: { S: input.address.state },
          zipCode: { S: input.address.zipCode },
          country: { S: input.address.country ?? '' },
        },
      },
      latitude: { N: input.latitude.toString() },
      longitude: { N: input.longitude.toString() },
      description: { S: input.description },
      // rating: { S: input.rating },
      availability: { S: input.availability },
      phone_number: { S: input.phone_number },
      email_address: { S: input.email_address },
      hours: {
        M: {
          Monday: {
            M: {
              opening_time: { S: input.hours.Monday.opening_time },
              closing_time: { S: input.hours.Monday.closing_time },
            },
          },
          Tuesday: {
            M: {
              opening_time: { S: input.hours.Tuesday.opening_time },
              closing_time: { S: input.hours.Tuesday.closing_time },
            },
          },
          Wednesday: {
            M: {
              opening_time: { S: input.hours.Wednesday.opening_time },
              closing_time: { S: input.hours.Wednesday.closing_time },
            },
          },
          Thursday: {
            M: {
              opening_time: { S: input.hours.Thursday.opening_time },
              closing_time: { S: input.hours.Thursday.closing_time },
            },
          },
          Friday: {
            M: {
              opening_time: { S: input.hours.Friday.opening_time },
              closing_time: { S: input.hours.Friday.closing_time },
            },
          },
          Saturday: {
            M: {
              opening_time: { S: input.hours.Saturday.opening_time },
              closing_time: { S: input.hours.Saturday.closing_time },
            },
          },
          Sunday: {
            M: {
              opening_time: { S: input.hours.Sunday.opening_time },
              closing_time: { S: input.hours.Sunday.closing_time },
            },
          },
          // picture: { S: input.picture}
        },
      },
    };
  };
}
