import { Callback, Context } from "aws-lambda";
import { ProductDal } from "./dal/product-dal";
import { ProductsModel } from "./model/product-model";

export async function getProducts(
  event: any,
  _context: Context,
  _callback: Callback
): Promise<any> {
  const dal = new ProductDal();
  let responseDal: ProductsModel[];

  responseDal = await dal.getProducts();

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    isBase64Encoded: false,
    body: JSON.stringify(responseDal),
  };
}
