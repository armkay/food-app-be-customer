import { Callback, Context } from "aws-lambda";
import { common_success, common_error } from "./utils/common-response";
import { CustomerDal } from "./dal/customer-dal";

export async function getCustomerId(
  event: any,
  _context: Context,
  _callback: Callback
): Promise<any> {
  const dal = new CustomerDal();
  let responseDal: string;

  const queryParams = event?.queryStringParameters;
  console.log(`${JSON.stringify(queryParams)}`);
  if (!queryParams.user_name) {
    return common_error(`Failed to Retrieve ID for customer`, 500);
  } else {
    responseDal = await dal.getCustomerId(queryParams.user_name);
  }

  return common_success(responseDal);
}
