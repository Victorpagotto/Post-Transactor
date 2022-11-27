import { Pool, PoolClient, PoolConfig, QueryResultRow } from "pg";
import { IConnectorDB, IPSQueryParams } from "./types";

export default class DBManager implements IConnectorDB {
  protected pool: Pool;
  protected config: PoolConfig;
  constructor(config?: PoolConfig) {
    this.config = { ...config };
    this.pool = this._start();
  }

  private _start(): Pool {
    this.pool = new Pool({
      user: this.config.user || process.env.DB_USER,
      host: this.config.host || process.env.DB_HOST,
      database: this.config.database || process.env.DB_NAME,
      password: this.config.password || process.env.DB_PASSWORD,
      port: this.config.port || Number(process.env.DB_PORT),
    });
    this.pool.on('error', (_error, _client) => {
      throw new Error('Server error on pool or client.');
    });
    return this.pool
  }

  public async test(): Promise<void | boolean> {
    return this.pool.connect()
      .then((client) => {
        return client.query('SELECT NOW()')
        .then((_res) => {
          client.release();
          console.log(`DB set on port ${this.config.port || process.env.DB_PORT}`);
          return true;
        })
        .catch((err) => {
          client.release();
          console.error('Error on starting pool.', err);
          throw new Error('Internal server error on starting.');
        });
      });
  }

  private _queryErrorHandler(err: Error, params: IPSQueryParams) {
    if (!params.err) {
      console.error(`Error in query ${params.query} with values: ${params.values || 'No values'}`)
      throw new Error('Internal server error.')
    };
    params.err(err);
    return [];
  }

  public async drain(): Promise<void> {
    console.log(`DB connection to port ${this.config.port || process.env.DB_PORT} shut down.`);
    return this.pool.end();
  }

  public async query(params: IPSQueryParams): Promise<QueryResultRow[]> {
    return await this.pool.connect()
      .then((client) => {
        return client.query(params.query, params.values || [])
        .then(({ rows }) => {
          client.release();
          return rows;
        })
        .catch((err) => {
          client.release();
          return this._queryErrorHandler(err, params)
        })
      })
  }

  public async connect(): Promise<PoolClient> {
    return this.pool.connect();
  }
};
