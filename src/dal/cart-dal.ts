import { AppConfig } from "../config/app-config";
import { dbConst, sqlStatements } from "../constants/food-app-constans";
import { CustomerCart } from "../model/cart-model";
import { DbConnection } from "../utils/db-utils";
import { v4 as uuidv4 } from "uuid";

export class CartDal {
  private readonly configParams: Map<string, string>;
  private dbConn = DbConnection.getInstance();

  constructor() {}

  /**
   * Method to fetch the rows for the get Counter Info Screen
   * @param queryParams Query params from the url. Must include namcId. Can also include
   * currentPage and numOfElement for pagination
   */
  public createCartAnonymousCart(): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        let sql: string = `${sqlStatements.cartService.CREATE_ANONYMOUS_CART}`;
        console.log(`SQL :: ${sql}`);
        const dbResult = await this.dbConn.executeSql(
          sql,
          dbConst.DATABASE_NAME
        );
        console.log(JSON.stringify(dbResult));
        resolve(dbResult[0].cart_id);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }

  /**
   * Method to fetch the rows for the get Counter Info Screen
   * @param queryParams Query params from the url. Must include namcId. Can also include
   * currentPage and numOfElement for pagination
   */
  public createCustomerCart(customerId: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const sqlParams: any[] = [customerId];
        let sql: string = `${sqlStatements.cartService.CREATE_CUSTOMER_CART}`;
        console.log(`SQL statement:  ${sql}`);
        const dbResult = await this.dbConn.executeSql(
          sql,
          dbConst.DATABASE_NAME,
          sqlParams
        );
        resolve(`${dbResult}`);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }

  /**
   * Method to fetch the rows for the get Counter Info Screen
   * @param queryParams Query params from the url. Must include namcId. Can also include
   * currentPage and numOfElement for pagination
   */
  public getCustomerCart(customerId: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const sqlParams: any[] = [customerId];
        let sql: string = `${sqlStatements.cartService.GET_CUSTOMER_CART}`;
        console.log(`SQL statement:  ${sql}`);
        const dbResult = await this.dbConn.executeSql(
          sql,
          dbConst.DATABASE_NAME,
          sqlParams
        );
        resolve(dbResult[0]);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }
}
