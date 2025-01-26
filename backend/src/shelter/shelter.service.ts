import { Injectable } from '@nestjs/common';
import { ShelterInputModel, ShelterModel } from './shelter.model';
import { DynamoDbService } from '../dynamodb';
import { NewShelterInput } from '../dtos/newShelterDTO';

@Injectable()
export class ShelterService {
  private readonly tableName = 'shelterlinkShelters';
  constructor(private readonly dynamoDbService: DynamoDbService) {}

  /**
   * Add a new shelter to the database.
   * @param shelterData The data for the new shelter.
   * @returns The new shelter's ID.
   * @throws Error if the shelter cannot be added.
   */
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

  /**
   * Retrieve all shelters from the database.
   * @returns The list of shelters.
   * @throws Error if the shelters cannot be retrieved.
   */
  public async getShelters(): Promise<ShelterModel[]> {
    try {
      const data = await this.dynamoDbService.scanTable(this.tableName);
      return data.map((item) => this.shelterModelToOutput(item));
    } catch (e) {
      throw new Error('Unable to get shelters: ' + e);
    }
  }

  /**
   * Converts the input data to a shelter model suitable for DynamoDB.
   * @param input The input data for the new shelter.
   * @returns The shelter model.
   */
  private postInputToShelterModel = (
    input: NewShelterInput
  ): ShelterInputModel => {
    const newShelterModel: ShelterInputModel = {
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
        },
      },
      picture: { S: input.picture },
    };

    if (input.rating !== undefined) {
      newShelterModel.rating = { N: input.rating.toString() };
    }

    if (input.website !== undefined) {
      newShelterModel.website = { S: input.website };
    }

    return newShelterModel;
  };

  /**
   * Converts a shelter model from DynamoDB to a ShelterModel.
   * @param input The input shelter model from DynamoDB.
   * @returns The ShelterModel.
   */
  private shelterModelToOutput = (input: ShelterInputModel): ShelterModel => {
    const newShelterModel: ShelterModel = {
      shelterId: input.shelterId.S,
      name: input.name.S,
      address: {
        street: input.address.M.street.S,
        city: input.address.M.city.S,
        state: input.address.M.state.S,
        zipCode: input.address.M.zipCode.S,
        country: input.address.M.country.S,
      },
      latitude: parseFloat(input.latitude.N),
      longitude: parseFloat(input.longitude.N),
      description: input.description.S,
      phone_number: input.phone_number.S,
      email_address: input.email_address.S,
      hours: {
        Monday: {
          opening_time: input.hours.M.Monday.M.opening_time.S,
          closing_time: input.hours.M.Monday.M.closing_time.S,
        },
        Tuesday: {
          opening_time: input.hours.M.Tuesday.M.opening_time.S,
          closing_time: input.hours.M.Tuesday.M.closing_time.S,
        },
        Wednesday: {
          opening_time: input.hours.M.Wednesday.M.opening_time.S,
          closing_time: input.hours.M.Wednesday.M.closing_time.S,
        },
        Thursday: {
          opening_time: input.hours.M.Thursday.M.opening_time.S,
          closing_time: input.hours.M.Thursday.M.closing_time.S,
        },
        Friday: {
          opening_time: input.hours.M.Friday.M.opening_time.S,
          closing_time: input.hours.M.Friday.M.closing_time.S,
        },
        Saturday: {
          opening_time: input.hours.M.Saturday.M.opening_time.S,
          closing_time: input.hours.M.Saturday.M.closing_time.S,
        },
        Sunday: {
          opening_time: input.hours.M.Sunday.M.opening_time.S,
          closing_time: input.hours.M.Sunday.M.closing_time.S,
        },
      },
      picture: input.picture.S,
    };

    if (input.rating !== undefined) {
      newShelterModel.rating = parseFloat(input.rating.N);
    }

    if (input.website !== undefined) {
      newShelterModel.website = input.website.S;
    }

    return newShelterModel;
  };
}
