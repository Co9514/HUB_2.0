import { ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  database: process.env.MARIADB_DATABASE,
  host: process.env.MARIADB_HOST,
  port: 3306,
  username: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  entities: ['src/entity/**/*.ts'],
};

export default connectionOptions;
