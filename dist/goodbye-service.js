"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goodbye = goodbye;
async function goodbye(event, _context, _callback) {
    // // Getting Application Configuration Values from SSM Parameter Store
    // const configParams: Map<string, string> = await getConfigParams();
    // AppConfig.log_group_name = _context.logGroupName;
    // AppConfig.log_stream_name = _context.logStreamName;
    // let response: ServiceResponse = null;
    // const counterInfoDal: CounterInfoDal = new CounterInfoDal(configParams);
    // // Get models from RDS
    // const queryParams = event?.queryStringParameters;
    // // NAMC Id is a required parameter
    // if (!queryParams?.namcId) {
    //   return {
    //     statusCode: 400,
    //     headers: { "Access-Control-Allow-Origin": "*" },
    //     isBase64Encoded: false,
    //     body: JSON.stringify({
    //       errorMessage: commonErrors.errors.MISSING_NAMC,
    //     }),
    //   } as ServiceResponse;
    // }
    // // Get Data from RDS
    // await counterInfoDal
    //   .getCounterInfo(queryParams)
    //   .then((result) => {
    //     response = {
    //       statusCode: 200,
    //       headers: { "Access-Control-Allow-Origin": "*" },
    //       isBase64Encoded: false,
    //       body: JSON.stringify(result),
    //     } as ServiceResponse;
    //   })
    //   .catch((err) => {
    //     response = handleError(err);
    //   });
    return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        isBase64Encoded: false,
        body: "GOODBYE FROM LAMBDA",
    };
}
//# sourceMappingURL=goodbye-service.js.map