import { Callback, Context } from "aws-lambda";
import { common_success, common_error } from "./utils/common-response";
import { CustomerDal } from "./dal/customer-dal";
import { GetCustomerIdEvent } from "./model/customer-model";

export async function getCustomerId(
  event: any,
  _context: Context,
  _callback: Callback
): Promise<any> {
  const dal = new CustomerDal();
  let responseDal: string;

  const queryParams = event.queryStringParameters;

  if (queryParams) {
    console.log(`queryParams defined`);
  } else {
    console.log(`query params not defined`);
  }

  console.log(`${JSON.stringify(queryParams)}`);
  if (!queryParams.user_name) {
    return common_error(`Failed to Retrieve ID for customer`, 500);
  } else {
    responseDal = await dal.getCustomerId(queryParams.user_name);
  }

  return common_success(responseDal);
}

export async function retrieveCustomerById(
  event: any,
  _context: Context,
  _callback: Callback
): Promise<any> {
  const dal = new CustomerDal();
  let responseDal: string;

  const queryParams = event?.queryStringParameters;
  if (!queryParams.cognito_sub) {
    return common_error(`Cognito Sub not provided in params`);
  } else {
    console.log(`${JSON.stringify(queryParams.cognito_sub)}`);
  }

  responseDal = await dal.retrieveCustomerById(queryParams.cognito_sub);

  return common_success(responseDal ? responseDal : []);
}

export async function createCustomer(
  event: any,
  _context: Context
): Promise<any> {
  const dal = new CustomerDal();
  let responseDal: any;

  try {
    console.log(`EVENT BODY :: ${event.body}`);
    const postBody: GetCustomerIdEvent = JSON.parse(event.body);
    if (!postBody) {
      return common_error("Error in Event Body");
    }
    console.log(postBody.cognito_sub);

    console.log(`Request Body: ${JSON.stringify(postBody)}`);

    // Use try/catch instead of .then() and .catch()
    responseDal = await dal.createCustomer(postBody);
    if (responseDal) {
      return common_success(JSON.stringify(responseDal));
    } else {
      throw `Customer Not Created`;
    }
  } catch (error) {
    console.error("Error processing customer creation:", error);
    return common_error(error.message, 500);
  }
}
