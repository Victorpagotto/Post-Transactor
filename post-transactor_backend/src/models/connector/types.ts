import { Pool } from "pg";

interface IPSQueryParams {
  query: string,
  values?: Array<unknown>,
  err?: (err: Error) => void,
};

interface IConnectorDB {
  query(params: IPSQueryParams): Promise<Array<Record<string, unknown>>>; // Generates a simple query. Transaction ones still need to be made manually.
  drain(): void; //  Shuts down the pool.
}

export { IPSQueryParams, IConnectorDB }