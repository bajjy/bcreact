declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: string;
    readonly CLIENT_ID: string;
    readonly CLIENT_SECRET: string;
    readonly ACCESS_TOKEN: string;
    readonly STORE_HASH: string;
    readonly API_PATH: string;
    readonly KEY_TOKEN: Secret;
  }
}
