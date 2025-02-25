import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  ScanCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DayOfWeek } from './types';

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

  public async scanTable(
    tableName: string,
    filterExpression?: string,
    expressionAttributeValues?: { [key: string]: any },
    expressionAttributeNames?: { [key: string]: any }
  ): Promise<any[]> {
    // By default, scan the entire table
    const params: any = {
      TableName: tableName,
    };

    try {
      const data = await this.dynamoDbClient.send(new ScanCommand(params));
      return data.Items || [];
    } catch (error) {
      console.error('DynamoDB Scan Error:', error);
      throw new Error(`Unable to scan table ${tableName}`);
    }
  }

  public async getHighestShelterId(
    tableName: string
  ): Promise<number | undefined> {
    const params: any = {
      TableName: tableName,
      ProjectionExpression: 'shelterId', // Project only the id attribute
    };

    try {
      const data = await this.dynamoDbClient.send(new ScanCommand(params));
      const shelterIds = data.Items.map((item) =>
        parseInt(item.shelterId.S, 10)
      ); // Convert to numbers

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

    console.log(item.name);

    try {
      const result = await this.dynamoDbClient.send(command);
      return result;
    } catch (error) {
      console.log(`Error posting item to table ${tableName}`);
      throw new Error(error);
    }
  }
  public async getItem(
    tableName: string,
    key: { [key: string]: any }
  ): Promise<any | null> {
    const params = {
      TableName: tableName,
      Key: key,
    };

    try {
      const result = await this.dynamoDbClient.send(new GetItemCommand(params));
      return result.Item ?? null; // Return the item if found, otherwise null
    } catch (error) {
      console.error('DynamoDB GetItem Error:', error);
      throw new Error(`Unable to get item from ${tableName}: ${error.message}`);
    }
  }

  /**
   * Handles a singular entry in update expression given the current index is on a list
   * @param i the current index
   * @param attributeNames exact same value as passed in updateAttributes
   * @param attributeValues exact same value as passed in updateAttributes
   */
  private updateAttributesHandleList(i: number, currVal: string, ExpressionAttributeValues, names: string[]) {
    let nestedList = currVal.substring(2, currVal.toString().length - 3).split("\",\"");

    // Value as a list, I tried building onto an object dynamically so these 
    // lengths don't need to be checked like this but that didn't seem to work.
    if (nestedList.length === 1) {
      ExpressionAttributeValues[`:${names[names.length - 1]}`] = { "L": [{ "S": nestedList[0] }] };
    } else if (nestedList.length === 2) {
      ExpressionAttributeValues[`:${names[names.length - 1]}`] = {
        "L":
          [{ "S": nestedList[0] }, { "S": nestedList[1] }]
      };
    } else if (nestedList.length === 3) {
      ExpressionAttributeValues[`:${names[names.length - 1]}`] = {
        "L":
          [{ "S": nestedList[0] }, { "S": nestedList[1] }, { "S": nestedList[2] }]
      };
    }
  }

  /**
   * Validate input for the updateAttributes method
   * @param Key 
   * @param tableName 
   * @param shelterId 
   * @param attributeNames 
   * @param attributeValues 
   */
  private async validateInputForUpdate(Key, tableName: string, shelterId: string, 
    attributeNames: string[], attributeValues: (string | number)[]) {
      if (attributeNames.length !== attributeValues.length) {
        const err = `Error updating attributes of shelter ${shelterId} to table ${tableName}: 
          attributeNames and attributeValues must be the same length`;
        console.log(err);
        throw new Error(err)
      }

      const existingItem = await this.getItem(tableName, Key);
      if (!existingItem) {
        throw new NotFoundException(`Shelter with ID ${shelterId} not found.`);
      }  
  }

  /**
   * Handles one iteration for non-number cases given that the value is a string
   * @param i the index to check the names or values list
   * @param closeOrOpenTimeCount keeps track of how many times opening_time or closing_time were seen so far
   * @param UpdateExpression update expression param for db call
   * @param ExpressionAttributeNames expression attribute names for db call
   * @param ExpressionAttributeValues expression attribute values for db call
   * @param attributeNames the attribute names passed from the application's service
   * @param attributeValues the attribute values passed from the application's service
   * @returns The new values for modified params that are not pass by reference
   */
  private handleNonNumberCasesForUpdateAttributes(i: number, closeOrOpenTimeCount: number, 
    UpdateExpression: string, 
    ExpressionAttributeNames, 
    ExpressionAttributeValues,
    attributeNames: string[],
    attributeValues: (string | number)[]): 
    { closeOrOpenTimeCount: number, UpdateExpression: string} {
    let currVal = attributeValues[i] as string

    // each variable in a map: e.g. item1.item2 have to have 
    // separate aliases, which is why it is split up and defined here
    let names = attributeNames[i].split('.');
    for (let name of names) {
      UpdateExpression += `#${name}.`
      ExpressionAttributeNames[`#${name}`] = name;
    }

    //Remove the last . in the update expression: e.g. item1.item2. -> item1.item2
    UpdateExpression = UpdateExpression.substring(0, UpdateExpression.length - 1);

    if (closeOrOpenTimeCount === 0) {
    //Value alias which is named just for the very last item in the map, so
    //it will look like item1.item2 = :item2, 
    UpdateExpression += ` = :${names[names.length - 1]}, `;
    } else {
      UpdateExpression += ` = :${names[names.length - 1]}${closeOrOpenTimeCount}, `;
    }

    //Checking to see if a list was passed in as a value
    if (currVal.toString().includes("[\"") && currVal.toString().includes("\"]")) {
      this.updateAttributesHandleList(i, currVal, ExpressionAttributeValues, names);
    } else {
      //Non-list case, still includes nested values
      if (closeOrOpenTimeCount === 0) {
        ExpressionAttributeValues[`:${names[names.length - 1]}`] = { "S": attributeValues[i] };
      } else {
        ExpressionAttributeValues[`:${names[names.length - 1]}${closeOrOpenTimeCount}`] = { "S": attributeValues[i] };
      }
      closeOrOpenTimeCount++;
    }

    return {closeOrOpenTimeCount, UpdateExpression};
  }

  /**
   * Updates the attribute of the specified name to the specified value
   * within the table
   * @param tableName Name of the table
   * @param shelterId id of the shelter (key of the shelter)
   * @param hourUpdates A list of day maps: e.g. { "Friday": {"opening_time": "05:00", "closing_time": "10:00"}} is one item
   * @param attributeName The name of the attribute:
   *                      Must be given with its parent separated by periods, 
   *                      e.g. "address.zipCode"
   *                      For lists, must have format "[\"item1\", \"item2\", ... ]" 
   * @param attributeValue The desired new value of the attribute
   */
  public async updateAttributes(tableName: string, shelterId: string, hourUpdates: any[], attributeNames: string[], attributeValues: (any)[]) {
    const Key = { shelterId: { S: shelterId + "" }};
    this.validateInputForUpdate(Key, tableName, shelterId, attributeNames, attributeValues);

    let closeOrOpenTimeCount = 0;

    // Helped by https://stackoverflow.com/questions/55825544/how-to-dynamically-update-an-attribute-in-a-dynamodb-item
    // Looping through the input and adding to the update expression so everything is updated in one call
    let UpdateExpression = "SET ";
    let ExpressionAttributeNames = {};
    let ExpressionAttributeValues = {};


    for (let i = 0; i < hourUpdates.length; i++) {

      
    }
    for (let i = 0; i < attributeNames.length; i++) {
      //non-number cases
      if (typeof attributeValues[i] === 'string') {
        let res = this.handleNonNumberCasesForUpdateAttributes(i, closeOrOpenTimeCount, 
          UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues, attributeNames, attributeValues);
        UpdateExpression = res.UpdateExpression;
        closeOrOpenTimeCount = res.closeOrOpenTimeCount;
      } else {
        
        //number cases; data inputted still needs quotation marks
        UpdateExpression += `#${attributeNames[i]} = :${attributeNames[i]}, `;
        ExpressionAttributeNames[`#${attributeNames[i]}`] = attributeNames[i];
        ExpressionAttributeValues[`:${attributeNames[i]}`] = { "N": `${attributeValues[i]}` };
      }
    }

    //Removing the trailing comma -> e.g. "..., item1.item2 = :item2, " -> "..., item1.item2 = :item2"
    UpdateExpression = UpdateExpression.substring(0, UpdateExpression.length - 2);

    console.log(`Attribute Names (input): ${attributeNames}`);
    console.log(`Attribute Values (input): ${attributeValues}`);
    console.log(`Table Name: ${tableName}`);

    console.log(`Update Expression: ${UpdateExpression}`);
    console.log(`Expression Attribute Names: ${JSON.stringify(ExpressionAttributeNames)}`);
    console.log(`Expression Attribute Values: ${JSON.stringify(ExpressionAttributeValues)}`);
    console.log(`Key: ${JSON.stringify(Key)}`);

    const command = new UpdateItemCommand({
      TableName: tableName,
      ReturnValues: "UPDATED_NEW",
      Key,
      UpdateExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues,
    });
    console.log("past command");
    try {
      const result = await this.dynamoDbClient.send(command);
      return result;
    } catch (error) {
      console.log(`Error updating ${attributeNames} to ${attributeValues} for shelter ${shelterId} to table ${tableName}`);
      throw new Error(error);
    }
  }
}
