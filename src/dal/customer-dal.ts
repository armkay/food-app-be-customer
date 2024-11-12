import { dbConst, sqlStatements } from "../constants/food-app-constans";
import { DbConnection } from "../utils/db-utils";

export class CustomerDal {
  private readonly configParams: Map<string, string>;
  private dbConn = DbConnection.getInstance();

  constructor() {}

  /**
   * Method to fetch the rows for the get Counter Info Screen
   * @param queryParams Query params from the url. Must include namcId. Can also include
   * currentPage and numOfElement for pagination
   */
  public getCustomerId(customer_name: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const sqlParams: any[] = [customer_name];
        console.log(`customer_name : ${customer_name}`);
        let sql: string = `${sqlStatements.customerService.GET_CUSTOMER_ID}`;
        console.log(`SQL PARAMS :: ${JSON.stringify(sqlParams)}`);
        console.log(`SQL statement:  ${sql}`);
        const dbResult = await this.dbConn.executeSql(
          sql,
          dbConst.DATABASE_NAME,
          sqlParams
        );
        console.log(`DB-RESULT :: ${JSON.stringify(dbResult[0].id)}`);
        resolve(JSON.stringify(dbResult[0]));
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }

  public retrieveCustomerById(cognitoSub: any): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const sqlParams: any[] = [cognitoSub];
        console.log(`customer Data : ${cognitoSub} `);
        let sql: string = `${sqlStatements.customerService.GET_CUSTOMER_BY_ID}`;
        console.log(`SQL PARAMS :: ${JSON.stringify(sqlParams)}`);
        console.log(`SQL statement:  ${sql}`);
        const dbResult = await this.dbConn.executeSql(
          sql,
          dbConst.DATABASE_NAME,
          sqlParams
        );
        console.log(`DB-RESULT :: ${JSON.stringify(dbResult)}`);
        resolve(JSON.stringify(dbResult[0]));
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }

  public async createCustomer(postBody: any): Promise<string> {
    try {
      const cognitoSub = postBody.cognito_sub;
      const email = postBody.email;
      const customerName = postBody.customer_name;
      const sqlParams: any[] = [customerName, cognitoSub, email];
      const sql: string = `${sqlStatements.customerService.CREATE_CUSTOMER}`;

      console.log(`SQL PARAMS :: ${JSON.stringify(sqlParams)}`);
      console.log(`SQL statement: ${sql}`);

      const dbResult = await this.dbConn.executeSql(
        sql,
        dbConst.DATABASE_NAME,
        sqlParams
      );

      console.log(`DB-RESULT :: ${JSON.stringify(dbResult[0])}`);
      return dbResult[0];
    } catch (error: any) {
      console.error("Error querying database:", error);
      throw new Error("Failed to create customer.");
    }
  }
}
