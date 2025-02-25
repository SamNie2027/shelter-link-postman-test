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

    // If there is a rating, check that it's a number in the range (0, 5]
    if (shelterData.rating !== undefined) {
      const rating = shelterData.rating;
      if (rating <= 0 || rating > 5) {
        throw new Error('Rating must be a number in the range (0, 5]');
      }
    }

    // Make sure opening time is not after closing
    for (const day in shelterData.hours) {
      if (shelterData.hours.hasOwnProperty(day)) {
        const hours = shelterData.hours[day];
        if (hours) {
          const { opening_time, closing_time, is_closed } = hours;
          //if is_closed is True, set opening_time and closing_time to be an empty string
          if (is_closed) {
            shelterModel.hours.M[day].M.opening_time.S = '';
            shelterModel.hours.M[day].M.closing_time.S = '';
          } else {
            const [openingHour, openingMinute] = opening_time
              .split(':')
              .map(Number);
            const [closingHour, closingMinute] = closing_time
              .split(':')
              .map(Number);

            // Make sure opening time is not after closing
            if (
              openingHour > closingHour ||
              (openingHour === closingHour && openingMinute >= closingMinute)
            ) {
              throw new Error(
                `Opening time must be before closing time on ${day}`
              );
            }

            // Make sure hours are between 00:00 and 24:00
            if (
              openingHour < 0 ||
              openingHour > 23 ||
              closingHour < 0 ||
              closingHour > 23 ||
              openingMinute < 0 ||
              openingMinute > 59 ||
              closingMinute < 0 ||
              closingMinute > 59
            ) {
              throw new Error(
                `Hours must be between 00:00 and 24:00 on ${day}`
              );
            }

            // Make sure hours string follows HH:MM format
            if (
              opening_time.length !== 5 ||
              closing_time.length !== 5 ||
              opening_time[2] !== ':' ||
              closing_time[2] !== ':'
            ) {
              throw new Error(`Hours must follow HH:MM format on ${day}`);
            }
          }
        }
      }
    }

    const result = await this.dynamoDbService.postItem(
      this.tableName,
      shelterModel
    );
    return { ...result, id: newId };
  }

  /**
   * Retrieve all shelters from the database.
   * @returns The list of shelters.
   * @throws Error if the shelters cannot be retrieved.
   */
  public async getShelters(): Promise<ShelterModel[]> {
    try {
      const data = await this.dynamoDbService.scanTable(this.tableName);
      // console.log(data);
      return data.map((item) => this.shelterModelToOutput(item));
    } catch (e) {
      throw new Error('Unable to get shelters: ' + e);
    }
  }

  /**
   * Retrieve a specific shelter from the database.
   * @returns a specific shelter
   * @throws Error if the shelter cannot be retrieved
   */
  public async getShelter(shelterId: string) {
    try {
      const data = await this.dynamoDbService.scanTable(
        this.tableName,
        'shelterId = :id'
      );
      const shelter = data.find((item) => item.shelterId.S === shelterId);
      return this.shelterModelToOutput(data[0]);
    } catch (e) {
      throw new Error('Unable to get shelter: ' + e);
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
          Monday: input.hours.Monday
            ? {
                M: {
                  opening_time: { S: input.hours.Monday.opening_time },
                  closing_time: { S: input.hours.Monday.closing_time },
                },
              }
            : null,
          Tuesday: input.hours.Tuesday
            ? {
                M: {
                  opening_time: { S: input.hours.Tuesday.opening_time },
                  closing_time: { S: input.hours.Tuesday.closing_time },
                },
              }
            : null,
          Wednesday: input.hours.Wednesday
            ? {
                M: {
                  opening_time: { S: input.hours.Wednesday.opening_time },
                  closing_time: { S: input.hours.Wednesday.closing_time },
                },
              }
            : null,
          Thursday: input.hours.Thursday
            ? {
                M: {
                  opening_time: { S: input.hours.Thursday.opening_time },
                  closing_time: { S: input.hours.Thursday.closing_time },
                },
              }
            : null,
          Friday: input.hours.Friday
            ? {
                M: {
                  opening_time: { S: input.hours.Friday.opening_time },
                  closing_time: { S: input.hours.Friday.closing_time },
                },
              }
            : null,
          Saturday: input.hours.Saturday
            ? {
                M: {
                  opening_time: { S: input.hours.Saturday.opening_time },
                  closing_time: { S: input.hours.Saturday.closing_time },
                },
              }
            : null,
          Sunday: input.hours.Sunday
            ? {
                M: {
                  opening_time: { S: input.hours.Sunday.opening_time },
                  closing_time: { S: input.hours.Sunday.closing_time },
                },
              }
            : null,
        },
      },
      picture: { L: input.picture.map((url) => ({ S: url })) }, // Convert list of URLs to DynamoDB format
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
        Monday: input.hours.M.Monday
          ? {
              opening_time: input.hours.M.Monday.M.opening_time.S,
              closing_time: input.hours.M.Monday.M.closing_time.S,
            }
          : null,
        Tuesday: input.hours.M.Tuesday
          ? {
              opening_time: input.hours.M.Tuesday.M.opening_time.S,
              closing_time: input.hours.M.Tuesday.M.closing_time.S,
            }
          : null,
        Wednesday: input.hours.M.Wednesday
          ? {
              opening_time: input.hours.M.Wednesday.M.opening_time.S,
              closing_time: input.hours.M.Wednesday.M.closing_time.S,
            }
          : null,
        Thursday: input.hours.M.Thursday
          ? {
              opening_time: input.hours.M.Thursday.M.opening_time.S,
              closing_time: input.hours.M.Thursday.M.closing_time.S,
            }
          : null,
        Friday: input.hours.M.Friday
          ? {
              opening_time: input.hours.M.Friday.M.opening_time.S,
              closing_time: input.hours.M.Friday.M.closing_time.S,
            }
          : null,
        Saturday: input.hours.M.Saturday
          ? {
              opening_time: input.hours.M.Saturday.M.opening_time.S,
              closing_time: input.hours.M.Saturday.M.closing_time.S,
            }
          : null,
        Sunday: input.hours.M.Sunday
          ? {
              opening_time: input.hours.M.Sunday.M.opening_time.S,
              closing_time: input.hours.M.Sunday.M.closing_time.S,
            }
          : null,
      },
      picture: input.picture.L.map((url: { S: string }) => url.S),
    };

    if (input.rating !== undefined) {
      newShelterModel.rating = parseFloat(input.rating.N);
    }

    if (input.website !== undefined) {
      newShelterModel.website = input.website.S;
    }

    return newShelterModel;
  };

  /**
   * Delete a shelter by its ID.
   * @param shelterId The ID of the shelter to delete.
   * @returns True if deleted, false if shelter does not exist.
   */
  public async deleteShelter(shelterId: string): Promise<boolean> {
    try {
      return await this.dynamoDbService.deleteItem(this.tableName, {
        shelterId: { S: shelterId },
      });
    } catch (error) {
      throw new Error(`Failed to delete shelter: ${error.message}`);
    }
  }
}
