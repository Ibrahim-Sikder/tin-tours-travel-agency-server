/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace NodeJS {
    export type ProcessEnv = {
      [x: string]: any
      PORT: number
      DATABASE_URL_LOCAL: string
      DATABASE_URL: string
      NODE_ENV: string
      JWT_ACCESS_SECRETE:string
      JWT_EXPIRES_IN:string
    }
  }