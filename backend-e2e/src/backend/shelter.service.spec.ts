import { Test, TestingModule } from '@nestjs/testing';
import { ShelterService } from '../../../backend/src/shelter/shelter.service';
import { DynamoDbService } from '../../../backend/src/dynamodb'; // Import your DynamoDB service
import { NewShelterInput } from 'backend/src/dtos/newShelterDTO';

const mockDynamoDB = {
    scanTable: jest.fn(),
    getHighestShelterId: jest.fn(),
    postItem: jest.fn(),
    getItem: jest.fn(),
    deleteItem: jest.fn(),
};

const postReqSuccess: NewShelterInput = {
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

const postReqZeroFailure = {
    name: postReqSuccess.name,
    address: postReqSuccess.address,
    latitude: postReqSuccess.latitude,
    longitude: postReqSuccess.longitude,
    description: postReqSuccess.description,
    rating: 0,
    phone_number: postReqSuccess.phone_number,
    email_address: postReqSuccess.email_address,
    website: postReqSuccess.website,
    hours: postReqSuccess.hours,
    picture: postReqSuccess.picture,
    availability: postReqSuccess.availability
}

const postSubReqZeroFailure = {
    name: postReqSuccess.name,
    address: postReqSuccess.address,
    latitude: postReqSuccess.latitude,
    longitude: postReqSuccess.longitude,
    description: postReqSuccess.description,
    rating: -1,
    phone_number: postReqSuccess.phone_number,
    email_address: postReqSuccess.email_address,
    website: postReqSuccess.website,
    hours: postReqSuccess.hours,
    picture: postReqSuccess.picture,
    availability: postReqSuccess.availability
}

const postFiveRatingSuccess = {
    name: postReqSuccess.name,
    address: postReqSuccess.address,
    latitude: postReqSuccess.latitude,
    longitude: postReqSuccess.longitude,
    description: postReqSuccess.description,
    rating: 5,
    phone_number: postReqSuccess.phone_number,
    email_address: postReqSuccess.email_address,
    website: postReqSuccess.website,
    hours: postReqSuccess.hours,
    picture: postReqSuccess.picture,
    availability: postReqSuccess.availability
}

const postDynamoDBReqBodySuccess = {
    shelterId: { S: '2' },
    name: { S: 'Curry Student Center' },
    address: {
        M: {
            street: {
                "S": "360 Huntington Ave"
            },
            city: {
                "S": "Boston"
            },
            state: {
                "S": "MA"
            },
            zipCode: {
                "S": "02115"
            },
            country: {
                "S": "United States"
            }
        }
    },
    latitude: { N: '42.338925' },
    longitude: { N: '-71.088128' },
    description: {
        S: 'The John A. and Marcia E. Curry Student Center is the crossroads for community life at Northeastern University, serving all members of the University'
    },
    phone_number: { S: '617-373-2000' },
    email_address: { S: 'cie@northeastern.edu' },
    hours: {
        M: {
            "Monday": {
                "M": {
                    "closing_time": {
                        "S": "24:00",
                    },
                    "opening_time": {
                        "S": "07:00",
                    },
                },
            },
            "Tuesday": null,
            "Wednesday": {
                "M": {
                    "closing_time": {
                        "S": "24:00",
                    },
                    "opening_time": {
                        "S": "07:00",
                    },
                },
            },
            "Thursday": {
                "M": {
                    "closing_time": {
                        "S": "24:00",
                    },
                    "opening_time": {
                        "S": "07:00",
                    },
                },
            },
            "Friday": {
                "M": {
                    "closing_time": {
                        "S": "23:00"
                    },
                    "opening_time": {
                        "S": "07:00"
                    }
                }
            },
            "Saturday": {
                "M": {
                    "closing_time": {
                        "S": "23:00"
                    },
                    "opening_time": {
                        "S": "08:00"
                    }
                }
            },
            "Sunday": {
                "M": {
                    "closing_time": {
                        "S": "24:00",
                    },
                    "opening_time": {
                        "S": "10:00",
                    },
                },
            },
        }
    },
    picture: {
        L: [{ "S": "https://th.bing.com/th/id/OIP.OqpRP8dl-udJN9VAHIiCUQHaE8?rs=1&pid=ImgDetMain" },
        { "S": "https://mir-s3-cdn-cf.behance.net/project_modules/fs/bd609234077806.56c3572f1b380.jpg" },
        { "S": "https://www.pcadesign.com/wp-content/uploads/NU-Curry-Dining_5-1536x1114.jpg" }]
    },
    rating: { N: '4.6' },
    website: { S: 'https://calendar.northeastern.edu/curry_student_center' }
}

const postDynamoDBReqBodyFiveRatingSuccess = {
    shelterId: postDynamoDBReqBodySuccess.shelterId,
    name: postDynamoDBReqBodySuccess.name,
    address: postDynamoDBReqBodySuccess.address,
    latitude: postDynamoDBReqBodySuccess.latitude,
    longitude: postDynamoDBReqBodySuccess.longitude,
    description: postDynamoDBReqBodySuccess.description,
    phone_number: postDynamoDBReqBodySuccess.phone_number,
    email_address: postDynamoDBReqBodySuccess.email_address,
    hours: postDynamoDBReqBodySuccess.hours,
    picture: postDynamoDBReqBodySuccess.picture,
    rating: { N: '5'},
    website: postDynamoDBReqBodySuccess.website
}

const postReturnSuccess = {
    '$metadata': {
        httpStatusCode: 200,
        requestId: 'N1ME4EVFLIRR03DBC07449TFONVV4KQNSO5AEMVJF66Q9ASUAAJG',
        extendedRequestId: undefined,
        cfId: undefined,
        attempts: 1,
        totalRetryDelay: 0
    },
    id: 2
};

describe('ShelterService', () => {
    let service: ShelterService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ShelterService,
                {
                    provide: DynamoDbService, // Mocking the dependency
                    useValue: mockDynamoDB
                },
            ],
        }).compile();

        service = module.get<ShelterService>(ShelterService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });


    describe('postShelter', () => {
        it('should successfully post a shelter', async () => {
            mockDynamoDB.getHighestShelterId.mockResolvedValue(1);
            mockDynamoDB.postItem.mockResolvedValue(postReturnSuccess);

            const response = await service.postShelter(postReqSuccess);

            expect(mockDynamoDB.getHighestShelterId).toHaveBeenCalledWith('shelterlinkShelters');
            expect(mockDynamoDB.postItem).toHaveBeenCalledWith('shelterlinkShelters', postDynamoDBReqBodySuccess);
            expect(response).toStrictEqual(postReturnSuccess);
        });

        it('should correctly fail if dynamoDB returns an error for getHighestShelterId', async() => {
            mockDynamoDB.getHighestShelterId.mockRejectedValue(new Error('highest shelter id error'));
            await expect(service.postShelter(postReqSuccess)).rejects.toThrow('highest shelter id error');
            expect(mockDynamoDB.getHighestShelterId).toHaveBeenCalledWith('shelterlinkShelters');
        });

        it('should correctly fail if dynamoDB returns an error for postItem', async() => {
            mockDynamoDB.getHighestShelterId.mockResolvedValue(1);
            mockDynamoDB.postItem.mockRejectedValue(new Error('dynamodb post item error'));
            await expect(service.postShelter(postReqSuccess)).rejects.toThrow('dynamodb post item error');
            expect(mockDynamoDB.postItem).toHaveBeenCalledWith('shelterlinkShelters', postDynamoDBReqBodySuccess);
        });

        it('should reject an input with rating less than 0', async() => {
            mockDynamoDB.getHighestShelterId.mockResolvedValue(1);

            await expect(service.postShelter(postSubReqZeroFailure)).rejects.toThrow('Rating must be a number in the range (0, 5]');
        });

        it('should reject an input with rating of 0', async() => {
            mockDynamoDB.getHighestShelterId.mockResolvedValue(1);

            await expect(service.postShelter(postReqZeroFailure)).rejects.toThrow('Rating must be a number in the range (0, 5]');
        });

        it('should successfully post a shetler with rating of 5', async() => {
            mockDynamoDB.getHighestShelterId.mockResolvedValue(1);
            mockDynamoDB.postItem.mockResolvedValue(postReturnSuccess);

            const response = await service.postShelter(postFiveRatingSuccess);

            expect(mockDynamoDB.getHighestShelterId).toHaveBeenCalledWith('shelterlinkShelters');
            expect(mockDynamoDB.postItem).toHaveBeenCalledWith('shelterlinkShelters', postDynamoDBReqBodyFiveRatingSuccess);
            expect(response).toStrictEqual(postReturnSuccess);
        });
    });

});
