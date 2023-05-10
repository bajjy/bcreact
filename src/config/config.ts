import * as dotenv from 'dotenv';
import path from 'path';
import userList from '../../users.json';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const config = {
  node_env: process.env['NODE_ENV'],
  port: process.env['PORT'],
  client_id: process.env['CLIENT_ID'],
  client_secret: process.env['CLIENT_SECRET'],
  access_token: process.env['ACCESS_TOKEN'],
  store_hash: process.env['STORE_HASH'],
  api_path: process.env['API_PATH'],
  key_token: process.env['KEY_TOKEN'],
  userList,
};

export default config;
