"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goodbye = goodbye;
async function goodbye(event, _context, _callback) {
    return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        isBase64Encoded: false,
        body: "GOODBYE FROM LAMBDA",
    };
}
//# sourceMappingURL=goodbye-service.js.map