import { Callback, Context } from "aws-lambda";
import { CartDal } from "./dal/cart-dal";
import {
  getCartIdForSession,
  validateSessionToken,
  createSessionCartMapping,
} from "./utils/session-manager";

export async function createCart(
  event: any,
  _context: Context,
  _callback: Callback
): Promise<any> {
  const dal = new CartDal();
  const queryParams = event?.queryStringParameters;
  let responseDal: string;

  try {
    // Step 1: Validate the session token
    const sessionToken = validateSessionToken(queryParams.sessionToken);

    // Step 2: Check if an existing cart ID is associated with the session token
    const existingCartId = await getCartIdForSession(sessionToken);

    if (existingCartId) {
      console.log(
        `Existing cart found for session token: ${JSON.stringify(sessionToken)}`
      );
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        isBase64Encoded: false,
        body: JSON.stringify({ cartId: existingCartId }),
      };
    }

    console.log(
      `Query Params : ${JSON.stringify(event.queryStringParameters)}`
    );
    const customer_id = queryParams.customer_id;
    let cartId;
    if (customer_id) {
      cartId = await createCustomerCart(sessionToken, customer_id, dal);
    } else {
      cartId = await createAnonymousCart(sessionToken, dal);
    }
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      isBase64Encoded: false,
      body: JSON.stringify({ cartId }),
    };
  } catch (error) {
    console.error("Error processing cart creation:", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      isBase64Encoded: false,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
}

async function createAnonymousCart(
  sessionToken: string,
  dal: CartDal
): Promise<string> {
  const newCartId = await dal.createCartAnonymousCart();
  await createSessionCartMapping(sessionToken, newCartId);
  console.log(`Anonymous cart created with ID: ${JSON.stringify(newCartId)}`);
  return newCartId;
}

async function createCustomerCart(
  sessionToken: string,
  customerId: string,
  dal: CartDal
): Promise<string> {
  const newCartId = await dal.createCustomerCart(customerId);
  await createSessionCartMapping(sessionToken, newCartId);
  console.log(
    `Customer cart created with ID: ${newCartId} for customerId: ${customerId}`
  );
  return newCartId;
}

export async function getCustomerCart(
  event: any,
  _context: Context,
  _callback: Callback
): Promise<any> {
  const dal = new CartDal();
  let responseDal: any;
  let custId: string;

  const queryParams = event?.queryStringParameters;
  console.log(`Query Params : ${JSON.stringify(event)}`);
  if (queryParams.cust_id) {
    custId = queryParams.cust_id;
    console.log(`GET CART for USER: ${custId}`);
    responseDal = await dal.getCustomerCart(custId);
  } else {
    console.log(`No Cart`);
    responseDal = { cust_id: custId, cart_id: "NO CART" };
  }

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    isBase64Encoded: false,
    body: `${JSON.stringify(responseDal)}`,
  };
}

// export async function createCustomerCart(
//   event: any,
//   _context: Context,
//   _callback: Callback
// ): Promise<any> {
//   const dal = new CartDal();
//   let responseDal: any;
//   let custId: string;

//   const queryParams = event?.queryStringParameters;
//   console.log(`Query Params : ${JSON.stringify(event)}`);
//   if (queryParams.customer_id) {
//     responseDal = await dal.createCustomerCart(queryParams.customer_id);
//     console.log(
//       `Customer cart created with ID: ${responseDal} for customerId: ${queryParams.customer_id}`
//     );
//   } else {
//     console.log(`Could Not Create Customer Cart`);
//     responseDal = { cust_id: queryParams.customer_id, cart_id: "NO CART" };
//   }

//   return {
//     statusCode: 200,
//     headers: { "Access-Control-Allow-Origin": "*" },
//     isBase64Encoded: false,
//     body: `${JSON.stringify(responseDal)}`,
//   };
// }
