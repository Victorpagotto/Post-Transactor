import app from "./app";
import 'dotenv/config';

new app().start(Number(process.env.APP_BACK_PORT || '3001'));