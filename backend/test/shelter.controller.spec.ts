import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ShelterController } from '../src/shelter/shelter.controller';
import { ShelterService } from '../src/shelter/shelter.service';
import { NewShelterInput } from '../src/dtos/newShelterDTO';

const mockShelterService = {
    postShelter: jest.fn(),
    getShelter: jest.fn(),
    deleteShelter: jest.fn(),
};

describe('ShelterController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [ShelterController],
            providers: [{ provide: ShelterService, useValue: mockShelterService }],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should post a shelter successfully', async () => {
        const mockReqBody: NewShelterInput = {
            name: 'Curry Student Center',
            address: {
                street: '360 Huntington Ave',
                city: 'Boston',
                state: 'MA',
                zipCode: '02115',
                country: 'United States',
            },
            latitude: 42.338925,
            longitude: -71.088128,
            description:
                'The John A. and Marcia E. Curry Student Center is the crossroads for community life at Northeastern University, serving all members of the University',
            rating: 4.6,
            phone_number: '617-373-2000',
            email_address: 'cie@northeastern.edu',
            website: 'https://calendar.northeastern.edu/curry_student_center',
            hours: {
                Monday: { opening_time: '07:00', closing_time: '24:00' },
                Tuesday: null,
                Wednesday: { opening_time: '07:00', closing_time: '24:00' },
                Thursday: { opening_time: '07:00', closing_time: '24:00' },
                Friday: { opening_time: '07:00', closing_time: '23:00' },
                Saturday: { opening_time: '08:00', closing_time: '23:00' },
                Sunday: { opening_time: '10:00', closing_time: '24:00' },
            },
            picture: [
                'https://th.bing.com/th/id/OIP.OqpRP8dl-udJN9VAHIiCUQHaE8?rs=1&pid=ImgDetMain',
                'https://mir-s3-cdn-cf.behance.net/project_modules/fs/bd609234077806.56c3572f1b380.jpg',
                'https://www.pcadesign.com/wp-content/uploads/NU-Curry-Dining_5-1536x1114.jpg',
            ],
            availability: '',
        };

        mockShelterService.postShelter.mockResolvedValue({
            $metadata: {
                httpStatusCode: 200,
                requestId: '18I3TTSM5018GTL29UV9O48VENVV4KQNSO5AEMVJF66Q9ASUAAJG',
                attempts: 1,
                totalRetryDelay: 0,
            },
            id: 11,
        });

        const response = await request(app.getHttpServer())
            .post('/shelter')
            .send(mockReqBody);

        expect(response.status).toBe(200);
        expect(mockShelterService.postShelter).toHaveBeenCalledWith(mockReqBody);
    });

    describe('GET /', () => {
        it('should get all shelters successfully', async () => {
            const mockReqBody = {};
            const response = await request(app.getHttpServer())
                .get('/')
                .send(mockReqBody);

            expect(response.status).toBe(200);
            expect(mockShelterService.getShelter).toHaveBeenCalledWith(mockReqBody);
        })
    })


    describe('GET /:shelterId', () => {
        it('should get a specific shelter successfully', async () => {
            const mockReqBody = {
                shelterId: '1'
            }
            const response = await request(app.getHttpServer())
                .get('/:1')
                .send(mockReqBody);

            expect(response.status).toBe(200);
            expect(mockShelterService.getShelter).toHaveBeenCalledWith(mockReqBody);
        })
    })

    describe('DELETE /:shelterId', () => {
        it('should delete a specific shelter successfully', async () => {
            const mockReqBody = {
                shelterId: '1'
            }
            const response = await request(app.getHttpServer())
            .delete('/:1')
            .send(mockReqBody);

        expect(response.status).toBe(200);
        expect(mockShelterService.getShelter).toHaveBeenCalledWith(mockReqBody);
        })
    })
});



