import { Callback, Context } from "aws-lambda";
import { CartDal } from "./dal/cart-dal";

export async function createCart(
  event: any,
  _context: Context,
  _callback: Callback
): Promise<any> {
  const dal = new CartDal();
  let responseDal: string;

  responseDal = await dal.creatCartAnonymousUser();

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    isBase64Encoded: false,
    body: `${responseDal}`,
  };
}
