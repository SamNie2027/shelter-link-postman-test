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
    shelterModel.id.N = newId;
    console.log('Using new ID:' + shelterModel.id.N);
    try {
      const result = await this.dynamoDbService.postItem(
        this.tableName,
        shelterModel
      );
      return { ...result, id: newId };
    } catch (e) {
      throw new Error('Unable to post new shelter: ' + e);
    }

    // return this.dynamoDbService.putItem(this.tableName, shelterData);
  }

  private postInputToShelterModel = (
    input: NewShelterInput
  ): ShelterInputModel => {
    return {
      id: { N: 0 },
      name: { S: input.name },
      address: { M: input.address },
      latitude: { N: input.latitude },
      longitude: { N: input.longitude },
      description: { S: input.description },
      // rating: { S: input.rating },
      availability: { S: input.availability },
      phone_number: { S: input.phone_number },
      email_address: { S: input.email_address },
      hours: {
        Sunday: {
          opening_time: { S: input.hours.Sunday.opening_time },
          closing_time: { S: input.hours.Sunday.closing_time },
        },
        Monday: {
          opening_time: { S: input.hours.Monday.opening_time },
          closing_time: { S: input.hours.Monday.closing_time },
        },
        Tuesday: {
          opening_time: { S: input.hours.Tuesday.opening_time },
          closing_time: { S: input.hours.Tuesday.closing_time },
        },
        Wednesday: {
          opening_time: { S: input.hours.Wednesday.opening_time },
          closing_time: { S: input.hours.Wednesday.closing_time },
        },
        Thursday: {
          opening_time: { S: input.hours.Thursday.opening_time },
          closing_time: { S: input.hours.Thursday.closing_time },
        },
        Friday: {
          opening_time: { S: input.hours.Friday.opening_time },
          closing_time: { S: input.hours.Friday.closing_time },
        },
        Saturday: {
          opening_time: { S: input.hours.Saturday.opening_time },
          closing_time: { S: input.hours.Saturday.closing_time },
        },
      },
      // picture: { S: input.picture}
    };
  };
}

//   constructor(
//     @InjectRepository(Shelter)
//     private sheltersRepository: Repository<Shelter>,
//   ) {}

//   // get all shelters
//   findAll(): Promise<Shelter[]> {
//     return this.sheltersRepository.find();
//   }

//   // get shelters, order by distance
//   async findByProximity(lat: number, lon: number, limit = 10): Promise<Shelter[]> {
//     // Haversine formula for distance
//     const haversine = `
//       6371 * acos(
//         cos(radians(:lat)) * cos(radians(latitude))
//         * cos(radians(longitude) - radians(:lon))
//         + sin(radians(:lat)) * sin(radians(latitude))
//       )
//     `;

//     const shelters = await this.sheltersRepository
//       .createQueryBuilder('shelter')
//       .select('shelters.*')
//       .addSelect(`${haversine}`, 'distance')
//       .setParameter('lat', lat)
//       .setParameter('lon', lon)
//       .orderBy('distance', 'ASC')
//       .limit(limit)
//       .getRawMany();

//     return shelters.map(shelter => {
//       const { distance, ...shelterData } = shelter;
//       return {
//         ...shelterData,
//         distance: parseFloat(distance).toFixed(2)
//       };
//     });
//   }

//   // create
//   async create(shelterData: Partial<Shelter>): Promise<Shelter> {
//     const shelter = this.sheltersRepository.create(shelterData);
//     return await this.sheltersRepository.save(shelter);
//   }

//   // read
//   findOne(id: number): Promise<Shelter | null> {
//     return this.sheltersRepository.findOneBy({ id });
//   }

//   // update
//   async update(id: number, shelterData: Partial<Shelter>): Promise<Shelter> {
//     await this.sheltersRepository.update(id, shelterData);
//     return this.findOne(id);
//   }

//   // delete
//   async remove(id: number): Promise<void> {
//     await this.sheltersRepository.delete(id);
//   }
// }
