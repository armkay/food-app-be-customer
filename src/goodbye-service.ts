import { Callback, Context } from "aws-lambda";

export async function goodbye(
  event: any,
  _context: Context,
  _callback: Callback
): Promise<any> {
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    isBase64Encoded: false,
    body: "GOODBYE FROM LAMBDA",
  };
}
