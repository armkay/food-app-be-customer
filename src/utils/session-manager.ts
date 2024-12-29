import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { AppConfig } from "../config/app-config";

const ddbClient = new DynamoDBClient({ region: AppConfig.region });
const CARTS_TABLE = AppConfig.DYNAMO_TABLE_NAME;

/**
 * Validates the session token from the request headers.
 * @param headers - The HTTP request headers.
 * @returns The session token if it exists, otherwise throws an error.
 */
export function validateSessionToken(headers: any): string {
  const sessionToken = headers;
  console.log(`Session Token :: ${JSON.stringify(headers)}`);
  console.log(`CARTS TABLE :: ${CARTS_TABLE}`);
  if (!sessionToken) {
    throw new Error("Missing session token");
  }
  return sessionToken;
}

/**
 * Checks if a cart exists for the given session token in DynamoDB.
 * @param sessionToken - The session token to look up.
 * @returns The cart ID if it exists, otherwise null.
 */
export async function getCartIdForSession(
  sessionToken: string
): Promise<string | null> {
  console.log(`GETTING CART ID for the Session`);
  const getParams = {
    TableName: CARTS_TABLE,
    Key: { session_token: { S: sessionToken } },
  };
  console.log(`GOT PARAMS :: ${JSON.stringify(getParams)}`);

  try {
    console.log(`Calling dbbClient`);
    const existingCart = await ddbClient.send(new GetItemCommand(getParams));
    console.log(`Existing Cart ${existingCart}`);
    if (existingCart?.Item?.cart_id?.S) {
      console.log(`Cart found for session token: ${sessionToken}`);
      return existingCart.Item.cart_id.S;
    }
    console.log(`No cart found for session token: ${sessionToken}`);
    return null;
  } catch (error) {
    console.error("Error fetching cart from DynamoDB:", error);
    return null;
  }
}

/**
 * Creates a new session-cart mapping in DynamoDB.
 * @param sessionToken - The session token to associate with the new cart ID.
 * @param cartId - The new cart ID to store.
 */
export async function createSessionCartMapping(
  sessionToken: string,
  cartId: string
): Promise<void> {
  const putParams = {
    TableName: CARTS_TABLE,
    Item: {
      session_token: { S: sessionToken },
      cart_id: { S: cartId },
      created_at: { S: new Date().toISOString() },
    },
  };

  try {
    await ddbClient.send(new PutItemCommand(putParams));
    console.log(
      `Session-cart mapping created for session token: ${sessionToken}, cartId: ${cartId}`
    );
  } catch (error) {
    console.error("Error creating session-cart mapping in DynamoDB:", error);
  }
}
