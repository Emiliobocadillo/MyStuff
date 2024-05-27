import dotenv from "dotenv";
import { cleanEnv, str, port } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str(),
  MONGO_URI: str(),
  PORT: port({ default: 5000 }),
  JWT_SECRET: str(),
});

export default env;
