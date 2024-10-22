import { AppConfig } from "../config/app-config";
import { environment } from "../environments/environment";

export const dbConst = {
  DATABASE_NAME: AppConfig.database_name,
  CARTS_TABLE: "carts",
  CUSTOMERS_TABLE: "customers",
};

export const commonErrors = {
  DB_ERROR: "This is a db error",
};

export const sqlStatements = {
  cartService: {
    CREATE_ANONYMOUS_CART: `INSERT INTO ${dbConst.CARTS_TABLE} (cart_status) VALUES ('active');`,
  },
};
