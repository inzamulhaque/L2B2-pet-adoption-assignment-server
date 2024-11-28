import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,

  super_admin: {
    name: process.env.SUPER_ADMIN_NAME,
    username: process.env.SUPER_ADMIN_USERNAME,
    email: process.env.SUPER_ADMIN_EMAIL,
    password: process.env.SUPER_ADMIN_PASSWORD,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
};
