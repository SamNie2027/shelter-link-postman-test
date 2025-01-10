import {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DynamoDbService {
  private readonly dynamoDbClient: DynamoDBClient;

  constructor() {
    this.dynamoDbClient = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  public async getHighestShelterId(
    tableName: string
  ): Promise<number | undefined> {
    const params: any = {
      TableName: tableName,
      ProjectionExpression: 'id', // Project only the id attribute
    };

    try {
      const data = await this.dynamoDbClient.send(new ScanCommand(params));
      const shelterIds = data.Items.map((item) => parseInt(item.id.N, 10)); // Convert to numbers

      // Handle potential parsing errors
      const validShelterIds = shelterIds.filter((id) => !isNaN(id));

      if (validShelterIds.length === 0) {
        return undefined; // No valid user IDs found
      }

      const highestShelterId = validShelterIds.reduce((max, current) =>
        Math.max(max, current)
      );
      return highestShelterId;
    } catch (error) {
      console.error('DynamoDB Scan Error:', error);
      throw new Error(`Unable to scan table ${tableName}`);
    }
  }

  public async postItem(tableName: string, item) {
    const command = new PutItemCommand({
      TableName: tableName,
      Item: item,
    });

    console.log(command);
    try {
      const result = await this.dynamoDbClient.send(command);
      return result;
    } catch (error) {
      console.log(`Error posting item to table ${tableName}`);
      throw new Error(error);
    }
  }
}
