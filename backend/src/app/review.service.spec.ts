import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ReviewsService } from './review.service';
import { Review } from './review.entity';
import { Rating } from './rating';

const mockReviewRepository = () => ({
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn(),
});

describe('ReviewService', () => {
  let service: ReviewsService;
  let reviewRepository: Repository<Review>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: getRepositoryToken(Review),
          useFactory: mockReviewRepository,
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    reviewRepository = module.get<Repository<Review>>(getRepositoryToken(Review));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of shelters', async () => {
      const result = [new Review(), new Review()];
      jest.spyOn(reviewRepository, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
      expect(reviewRepository.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should successfully create a review', async () => {
      const reviewData = { reviewText: 'Good shelter!' };
      const review = new Review();
      jest.spyOn(reviewRepository, 'create').mockReturnValue(review);
      jest.spyOn(reviewRepository, 'save').mockResolvedValue(review);

      expect(await service.create(reviewData)).toBe(review);
      expect(reviewRepository.create).toHaveBeenCalledWith(reviewData);
      expect(reviewRepository.save).toHaveBeenCalledWith(review);
    });
  });

  describe('findOne', () => {
    it('should return a shelter by ID', async () => {
      const shelter = new Review();
      jest.spyOn(reviewRepository, 'findOneBy').mockResolvedValue(shelter);

      expect(await service.findOne(1)).toBe(shelter);
      expect(reviewRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('update', () => {
    it('should update and return the updated shelter', async () => {
      const originalRating = new Rating(5, 4, 3);
      const newRating = new Rating(5, 5, 5);
      const reviewData = { rating: originalRating, reviewText: 'Pretty, pretty good shelter' };
      const reviewData1 = { rating: newRating, reviewText: 'Pretty, pretty good shelter' };
      const newReview = new Review();
      newReview.rating = originalRating;
      newReview.reviewText = 'Pretty, pretty good shelter'
      jest.spyOn(reviewRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(service, 'findOne').mockResolvedValue(newReview);

      expect(await service.update(0, reviewData1)).toBe(newReview);
      expect(reviewRepository.update).toHaveBeenCalledWith(0, reviewData1);
    });
  });

  describe('remove', () => {
    it('should delete a shelter by ID', async () => {
      jest.spyOn(reviewRepository, 'delete').mockResolvedValue(undefined);

      await service.remove(1);
      expect(reviewRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
