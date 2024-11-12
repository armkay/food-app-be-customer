import { AppConfig } from "../config/app-config";
import { environment } from "../environments/environment";

export const dbConst = {
  DATABASE_NAME: AppConfig.database_name,
  CARTS_TABLE: "carts",
  CUSTOMERS_TABLE: "customers",
  PRODUCTS_TABLE: "products",
};

export const commonErrors = {
  DB_ERROR: "This is a db error",
};

export const sqlStatements = {
  cartService: {
    CREATE_ANONYMOUS_CART: `INSERT INTO ${dbConst.CARTS_TABLE} (status) VALUES ('active') RETURNING cart_id;`,
    CREATE_CUSTOMER_CART: `INSERT INTO ${dbConst.CARTS_TABLE} (customer_id, status) VALUES ($1,'active');`,
    GET_CUSTOMER_CART: `SELECT cart_id from ${dbConst.CARTS_TABLE} WHERE customer_id = $1;`,
  },
  customerService: {
    GET_CUSTOMER_ID: `SELECT id FROM ${dbConst.CUSTOMERS_TABLE} WHERE name = $1;`,
    GET_CUSTOMER_BY_ID: `SELECT customer_id, customer_name, email, created_at, cognito_sub, updated_at FROM ${dbConst.CUSTOMERS_TABLE} WHERE cognito_sub=$1;`,
    CREATE_CUSTOMER:
      `INSERT INTO customers (customer_name, cognito_sub, email) ` +
      `VALUES ($1, $2, $3) ` +
      `ON CONFLICT (email) DO NOTHING ` +
      `RETURNING customer_id;`,
  },
  productService: {
    GET_ALL_PRODUCTS: `SELECT product_id, name, price, description FROM ${dbConst.PRODUCTS_TABLE};`,
  },
};
