// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// // import { Shelter } from './shelter.entity';

// @Injectable()
// export class SheltersService {
//   constructor(
//     @InjectRepository(Shelter)
//     private sheltersRepository: Repository<Shelter>
//   ) {}

//   // get all shelters
//   findAll(): Promise<Shelter[]> {
//     return this.sheltersRepository.find();
//   }

//   // get shelters, order by distance
//   async findByProximity(
//     lat: number,
//     lon: number,
//     limit = 10
//   ): Promise<Shelter[]> {
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

//     return shelters.map((shelter) => {
//       const { distance, ...shelterData } = shelter;
//       return {
//         ...shelterData,
//         distance: parseFloat(distance).toFixed(2),
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
