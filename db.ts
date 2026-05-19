import { Pool } from 'pg';
import dotenv from 'dotenv';
import dns from 'dns';

// Fix for Node.js 18+ resolving IPv6 first, which causes issues with Supabase databases
if (dns && typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

dotenv.config();

let dbUrl = process.env.DATABASE_URL || '';

try {
  const parsedUrl = new URL(dbUrl);
  let password = parsedUrl.password;
  
  if (password) {
    let decodedPassword = decodeURIComponent(password);
    
    // If user left brackets from [YOUR-PASSWORD] like [dhanraj@026]
    if (decodedPassword.startsWith('[')) {
      decodedPassword = decodedPassword.substring(1);
    }
    if (decodedPassword.endsWith(']')) {
      decodedPassword = decodedPassword.substring(0, decodedPassword.length - 1);
    }
    
    parsedUrl.password = encodeURIComponent(decodedPassword);
    dbUrl = parsedUrl.toString();
  }
} catch (e) {
  console.warn("Could not parse databases URL enhancements", e);
}

const isLocal = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1');

let pool: Pool | any = {
  query: async () => ({ rows: [] }),
  connect: async () => { throw new Error('Database pool not initialized. Check your DATABASE_URL format.'); }
};

try {
  const dbConfig: any = {
    ...(isLocal ? {} : { ssl: { rejectUnauthorized: false } })
  };
  
  if (dbUrl) {
    dbConfig.connectionString = dbUrl;
  }
  
  pool = new Pool(dbUrl ? dbConfig : undefined);
} catch (err: any) {
  console.error("❌ CRITICAL: Failed to initialize PostgreSQL Pool. Your DATABASE_URL is likely malformed or invalid.", err.message);
}

export let dbConnected = false;

export const query = async (text: string, params?: any[]) => {
  if (!process.env.DATABASE_URL) {
    console.warn("Database query skipped because DATABASE_URL is not provided.");
    return { rows: [] };
  }
  return pool.query(text, params);
};

export async function initDb() {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL is not set. Skipping database initialization.');
    return;
  }
  
  let client;
  try {
    client = await pool.connect();
    dbConnected = true;
  } catch (e: any) {
    if (e.message.includes('password authentication failed')) {
      console.error('\n❌ DATABASE CONNECTION ERROR ❌');
      console.error('Password authentication failed for the database user.');
      console.error('Please check your DATABASE_URL environment variable.');
      console.error('If you are using Supabase, ensure you have replaced "[YOUR-PASSWORD]" with your actual database password.');
      console.error('If your password contains special characters, ensure it is URL-encoded or try wrapping it safely, e.g., %5B for [, %40 for @, %5D for ].');
      console.error('You can reset your password in the Supabase Dashboard -> Settings -> Database.\n');
    } else {
      console.error('Failed to connect to database. Make sure DATABASE_URL is valid and the database is accessible.', e.message);
    }
    dbConnected = false;
    return;
  }
  
  try {
    await client.query('BEGIN');

    // Create purchases table
    await client.query(`
      CREATE TABLE IF NOT EXISTS purchases (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        device_type VARCHAR(255) NOT NULL,
        mac_address VARCHAR(255),
        plan_name VARCHAR(255) NOT NULL,
        devices INTEGER NOT NULL,
        total numeric(10, 2) NOT NULL,
        payment_method VARCHAR(255) NOT NULL
      );
    `);

    // Create free_trials table
    await client.query(`
      CREATE TABLE IF NOT EXISTS free_trials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        device VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        mac_address VARCHAR(255),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create promos table
    await client.query(`
      CREATE TABLE IF NOT EXISTS promos (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        discount_percentage INTEGER NOT NULL,
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create admin_users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(255),
        role VARCHAR(50) DEFAULT 'admin',
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      );
    `);

    // Create subscription_plans table
    await client.query(`
      CREATE TABLE IF NOT EXISTS subscription_plans (
        id SERIAL PRIMARY KEY,
        devices INTEGER NOT NULL,
        duration VARCHAR(255) NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        sub_text VARCHAR(255)
      );
    `);

    await client.query('COMMIT');
    console.log('Database initialized successfully.');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('Failed to initialize database schema:', e);
  } finally {
    client.release();
  }
}
