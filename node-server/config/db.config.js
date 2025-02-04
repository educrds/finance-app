import mariadb from 'mariadb';
import dotenv from 'dotenv';

const process = dotenv.config();
let dbConfig = {
  host: process.parsed.HOST,
  database: process.parsed.DATABASE,
  user: process.parsed.USER,
  port: process.parsed.PORT,
  password: process.parsed.PASSWORD,
  connectionLimit: 3,
  bigIntAsNumber: true
}

if(process.env.NODE_ENV === 'production') {
  console.log('Connecting to RDS database');
  dbConfig = {
    ...dbConfig,
    host: process.parsed.RDS_HOSTNAME,
    database: process.parsed.RDS_DATABASE,
    user: process.parsed.RDS_USER,
    port: process.parsed.RDS_PORT,
    password: process.parsed.RDS_PASSWORD,
  }
}

const pool = mariadb.createPool(dbConfig);

export async function executeQuery(query, ...params) {
  let conn;

  try {
    conn = await pool.getConnection();
    return await conn.query(query, ...params);
  } catch (error) {
    throw error;
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

export async function executeBatch(query, ...params) {
  let conn;

  try {
    conn = await pool.getConnection();

    return await conn.batch(query, ...params);
  } catch (error) {
    throw error;
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

export async function executeTransaction(queries) {
  let conn;

  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    for (const { query, params } of queries) {
      if (Array.isArray(params[0])) {
        await conn.batch(query, ...params);
      } else {
        await conn.query(query, ...params);
      }
    }

    await conn.commit();
  } catch (error) {
    if (conn) {
      await conn.rollback();
    }
    throw error;
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

