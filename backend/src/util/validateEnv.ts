import dotenv from 'dotenv';
import { cleanEnv, str, port } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  MONGO_URI: str(),
  PORT: port({ default: 5000 }),
});

export default env;
