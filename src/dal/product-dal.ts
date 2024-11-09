import { AppConfig } from "../config/app-config";
import { dbConst, sqlStatements } from "../constants/food-app-constans";
import { ProductsModel } from "../model/product-model";
import { DbConnection } from "../utils/db-utils";

export class ProductDal {
  private readonly configParams: Map<string, string>;
  private dbConn = DbConnection.getInstance();

  constructor() {}

  /**
   * Method to fetch the rows for the get Counter Info Screen
   * @param queryParams Query params from the url. Must include namcId. Can also include
   * currentPage and numOfElement for pagination
   */
  public getProducts(): Promise<ProductsModel[]> {
    return new Promise<ProductsModel[]>(async (resolve, reject) => {
      try {
        let sql: string = `${sqlStatements.productService.GET_ALL_PRODUCTS}`;
        console.log(`SQL statement:  ${sql}`);
        const dbResult = await this.dbConn.executeSql(
          sql,
          dbConst.DATABASE_NAME
        );
        console.log(`DB response :: ${JSON.stringify(dbResult)}`);
        resolve(dbResult);
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
        resolve(`Cart Created ${dbResult}`);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }
}
