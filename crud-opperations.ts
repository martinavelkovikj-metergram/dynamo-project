import { DynamoDB } from "aws-sdk";
import * as dotenv from "dotenv";

dotenv.config();

const configOptions: DynamoDB.ClientConfiguration = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};
const dynamodb = new DynamoDB(configOptions);

export async function createItem(
  id: string,
  name: string, 
  age: number
): Promise<void> {
  const params: DynamoDB.PutItemInput = {
    TableName: "martina-table",
    Item: {
      id: { S: id },
      name: { S: name },
      age: { N: age.toString() },
    },
  };

  try {
    await dynamodb.putItem(params).promise();
    console.log("Item created successfully");
  } catch (error) {
    console.error("Error creating item:", error);
  }
}

export async function getItem(id: string): Promise<void> {
  const params: DynamoDB.GetItemInput = {
    TableName: "martina-table",
    Key: {
      id: { S: id },
    },
  };

  try {
    const result = await dynamodb.getItem(params).promise();
    console.log("Item retrieved successfully:", result.Item);
  } catch (error) {
    console.error("Error getting item:", error);
  }
}

export async function updateItem(id: string, name: string): Promise<void> {
  const params: DynamoDB.UpdateItemInput = {
    TableName: "martina-table",
    Key: {
      id: { S: id },
    },
    UpdateExpression: "SET #name = :name",
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":name": { S: name },
    },
  };

  try {
    await dynamodb.updateItem(params).promise();
    console.log("Item updated successfully");
  } catch (error) {
    console.error("Error updating item:", error);
  }
}

export async function deleteItem(id: string): Promise<void> {
  const params: DynamoDB.DeleteItemInput = {
    TableName: "martina-table",
    Key: {
      id: { S: id },
    },
  };

  try {
    await dynamodb.deleteItem(params).promise();
    console.log("Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}
