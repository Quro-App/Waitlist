// @ts-ignore
import Database from 'better-sqlite3';
// @ts-ignore
import path from 'path';
// @ts-ignore
import fs from 'fs';

// Ensure database path is properly set
// @ts-ignore
const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'waitlist.db');
const dbDir = path.dirname(dbPath);

// Ensure the data directory exists
if (!fs.existsSync(dbDir)) {
  try {
    fs.mkdirSync(dbDir, { recursive: true });
  } catch (error) {
    console.error('Error creating database directory:', error);
    throw new Error('Failed to create database directory');
  }
}

// Initialize database with proper error handling
let db: Database.Database;
try {
  db = new Database(dbPath);
} catch (error) {
  console.error('Error connecting to database:', error);
  throw new Error('Failed to connect to database');
}

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ip_address TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export interface EmailEntry {
  id: number;
  email: string;
  created_at: string;
}

export interface Visit {
  id: number;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export function addEmail(email: string): { success: boolean; error?: string } {
  try {
    const stmt = db.prepare('INSERT INTO emails (email) VALUES (?)');
    stmt.run(email);
    return { success: true };
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      return { success: false, error: 'Email already registered' };
    }
    return { success: false, error: 'Failed to register email' };
  }
}

export function trackVisit(ipAddress?: string, userAgent?: string): void {
  const stmt = db.prepare('INSERT INTO visits (ip_address, user_agent) VALUES (?, ?)');
  stmt.run(ipAddress || null, userAgent || null);
}

export function getAllEmails(): EmailEntry[] {
  const stmt = db.prepare('SELECT * FROM emails ORDER BY created_at DESC');
  return stmt.all() as EmailEntry[];
}

export function getEmailCount(): number {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM emails');
  const result = stmt.get() as { count: number };
  return result.count;
}

export function getVisitCount(): number {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM visits');
  const result = stmt.get() as { count: number };
  return result.count;
}

export function getStats() {
  const emails = getAllEmails();
  const emailCount = getEmailCount();
  const visitCount = getVisitCount();
  
  // Get signups over time (last 30 days)
  const stmt = db.prepare(`
    SELECT DATE(created_at) as date, COUNT(*) as count 
    FROM emails 
    WHERE created_at >= datetime('now', '-30 days')
    GROUP BY DATE(created_at)
    ORDER BY date DESC
  `);
  const signupsByDay = stmt.all();

  return {
    emails,
    emailCount,
    visitCount,
    signupsByDay,
  };
}

export default db;

