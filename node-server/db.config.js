import mariadb from 'mariadb'
import dotenv from 'dotenv'

const process = dotenv.config();

const pool = mariadb.createPool({
  host: process.parsed.HOST,
  database: process.parsed.DATABASE,
  user: process.parsed.USER,
  port: process.parsed.PORT,
  password: process.parsed.PASSWORD,
  connectionLimit: 3
})

export async function executeQuery(query, ...params){
  let conn;

  try {
    conn = await pool.getConnection();
    
    return await conn.query(query, ...params);
  } catch (error) {
    throw error;
  } finally {
    conn && conn.end();
  }
}

export async function executeBatch(query, ...params){
  let conn;

  try {
    conn = await pool.getConnection();
    
    return await conn.batch(query, ...params);
  } catch (error) {
    throw error;
  } finally {
    conn && conn.end();
  }
}