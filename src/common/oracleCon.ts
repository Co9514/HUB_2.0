import dotenv from 'dotenv';
dotenv.config();
import oracle from 'oracledb';
class DB_CONNECT {
  public async connection() {
    try {
      const db = await oracle.getConnection({
        connectString: process.env.ORACLEDB_CONNECTIONSTRING,
        user: process.env.ORACLEDB_USER,
        password: process.env.ORACLEDB_PASSWORD,
      });
      return db;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export default new DB_CONNECT();
