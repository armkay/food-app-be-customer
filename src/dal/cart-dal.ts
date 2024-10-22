import { AppConfig } from "../config/app-config";
import { dbConst, sqlStatements } from "../constants/food-app-constans";
import { DbConnection } from "../utils/db-utils";

export class CartDal {
  private readonly configParams: Map<string, string>;
  private dbConn = DbConnection.getInstance();

  constructor() {}

  /**
   * Method to fetch the rows for the get Counter Info Screen
   * @param queryParams Query params from the url. Must include namcId. Can also include
   * currentPage and numOfElement for pagination
   */
  public creatCartAnonymousUser(): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const sqlParams: any[] = [];
        let sql: string = `${sqlStatements.cartService.CREATE_ANONYMOUS_CART}`;
        console.log(`SQL statement:  ${sql}`);
        const dbResult = await this.dbConn.executeSql(
          sql,
          dbConst.DATABASE_NAME
        );
        resolve(`Cart Created ${dbResult}`);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }
}
