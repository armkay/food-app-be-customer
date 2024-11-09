import { Callback, Context } from "aws-lambda";
import { CartDal } from "./dal/cart-dal";

export async function createCart(
  event: any,
  _context: Context,
  _callback: Callback
): Promise<any> {
  const dal = new CartDal();
  let responseDal: string;

  const queryParams = event?.queryStringParameters;
  console.log(`Query Params : ${JSON.stringify(event)}`);
  if (!queryParams.customerId) {
    console.log(`Create anonymous cart`);
    responseDal = await dal.createCartAnonymousUser();
  } else {
    responseDal = await dal.createCustomerCart(queryParams.customerId);
  }

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    isBase64Encoded: false,
    body: `${responseDal}`,
  };
}
