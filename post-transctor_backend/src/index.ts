import app from "./app";
import 'dotenv/config';

new app().start(Number(process.env.DB_PORT) || 3001);