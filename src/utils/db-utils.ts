import {
  GetSecretValueCommandOutput,
  SecretsManager,
} from "@aws-sdk/client-secrets-manager";
import { AppConfig } from "../config/app-config";
import { Pool } from "pg";

export interface IDbConnection {
  executeSql: (
    sql: string,
    database?: string,
    params?: any[]
  ) => Promise<any[]>;
}

// AWS database connection configuration
export class DbConnection implements IDbConnection {
  private static instance: DbConnection;
  private readonly LOGGER: any;
  private readonly secretsManager: SecretsManager;
  private readonly secretName: string;
  private username: string;
  private password: string;
  private host: string;
  private port: string;
  private database: string;
  private pool: Pool;
  private readonly ssl: any;

  private constructor() {
    console.log(`begin Secret ${JSON.stringify(this.secretName)}`);
    this.secretsManager = new SecretsManager({ region: AppConfig.region });
    this.secretName = AppConfig.secret_name;
    console.log(`got here ${JSON.stringify(this.secretName)}`);
  }

  // Create instance if it doesn't already exist
  public static getInstance(): IDbConnection {
    if (!DbConnection.instance) {
      DbConnection.instance = new DbConnection();
      console.log(`db connection ${JSON.stringify(DbConnection.instance)}`);
    }
    return DbConnection.instance;
  }

  /**
   * Method to execute a given sql statement
   * @param sql The sql statement to execute
   * @param database The database to execute the statement on
   * @param params Any parameters if the sql statement is parametrized
   */
  public async executeSql(
    sql: string,
    database?: any,
    params?: any[]
  ): Promise<any[]> {
    if (database) {
      console.log(`DATABASE : ${database}`);
      this.database = database;
    }
    if (
      !this.username ||
      !this.password ||
      !this.host ||
      !this.port ||
      !this.database
    ) {
      await this.getConnection();
    }
    let client;
    // try executing query through client pool
    try {
      client = await this.pool.connect();
      let result;
      if (params) {
        result = await client.query(sql, params);
      } else {
        result = await client.query(sql);
      }
      await client.release();
      return result.rows;
    } catch (err) {
      console.log("Error querying database", err);
      throw err;
    }
  }

  public async getConnection() {
    let secret: GetSecretValueCommandOutput;
    // try getting Secrets from secret manager
    try {
      console.log(`Getting secret`);
      secret = await this.secretsManager.getSecretValue({
        SecretId: this.secretName,
      });
      console.log(`Got secret ${JSON.stringify(secret)}`);
      const { username, password, host, port } = JSON.parse(
        secret.SecretString
      );

      this.username = username;
      this.password = password;
      this.host = host;
      this.port = port;

      this.pool = new Pool({
        database: this.database,
        user: this.username,
        password: this.password,
        host: this.host,
        port: this.port,
        ssl: {
          rejectUnauthorized: false,
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
