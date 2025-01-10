// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Review } from './review.entity';

// @Injectable()
// export class ReviewsService {
//   constructor(
//     @InjectRepository(Review)
//     private reviewsRepository: Repository<Review>,
//   ) {}

//   // get all shelters
//   findAll(): Promise<Review[]> {
//     return this.reviewsRepository.find();
//   }

//   // create
//   async create(reviewData: Partial<Review>): Promise<Review> {
//     const review = this.reviewsRepository.create(reviewData);
//     return await this.reviewsRepository.save(review);
//   }

//   // read
//   findOne(id: number): Promise<Review | null> {
//     return this.reviewsRepository.findOneBy({ id });
//   }

//   // update
//   async update(id: number, reviewData: Partial<Review>): Promise<Review> {
//     await this.reviewsRepository.update(id, reviewData);
//     return this.findOne(id);
//   }

//   // delete
//   async remove(id: number): Promise<void> {
//     await this.reviewsRepository.delete(id);
//   }
// }
