import { IConnectorDB, IPSQueryParams } from './types';
import Connector from './Connector';
import { PoolConfig } from 'pg';

const config: PoolConfig = {};

const connector = new Connector({ ...config });

export { IConnectorDB, IPSQueryParams }
export default connector;