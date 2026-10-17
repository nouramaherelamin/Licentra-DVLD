import { config } from './env.js';

/**
 * Shared Database Integration Point (Placeholder)
 * 
 * NOTE: Database implementation is currently POSTPONED.
 * All feature modules currently operate on the Repository Pattern with
 * in-memory mock datasets.
 * 
 * When Supabase/PostgreSQL is introduced in Phase 2:
 * 1. Initialize the PostgreSQL client/pool or Supabase client here.
 * 2. Export `db` or `supabase` client instance.
 * 3. Repositories will consume this client with zero changes to services/controllers.
 */

class DatabaseManager {
  constructor() {
    this.isConnected = false;
    this.driver = 'mock-in-memory';
  }

  async connect() {
    if (config.database.isConfigured) {
      console.log('ℹ️ Database configuration detected. Ready for future Supabase connection.');
      // When ready: initialize pg.Pool or createClient(supabaseUrl, supabaseKey)
    } else {
      console.log('ℹ️ Database connection is postponed. Running with mock repositories.');
    }
  }

  getDriver() {
    return this.driver;
  }
}

export const dbManager = new DatabaseManager();
