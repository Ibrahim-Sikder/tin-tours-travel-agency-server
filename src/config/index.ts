import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(process.cwd(), '.env'),
})

export default {
  port: process.env.PORT,
  database_url_local: process.env.DATABASE_URL_LOCAL,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  jwt_access_token: process.env.JWT_ACCESS_SECRETE,
  jwt_expires_in:process.env.JWT_EXPIRES_IN,
  jwt_refresh_token: process.env.JWT_REFRESH_EXPIRES_IN,
  jwt_refresh_expires_in:process.env.JWT_REFRESH_EXPIRES_IN
}