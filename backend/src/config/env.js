import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  allowInsecureMockMode: process.env.ALLOW_INSECURE_MOCK_MODE === 'true',
  auth: {
    // Explicit: Authentication & RBAC are POSTPONED in Phase 1
    isConfigured: false,
    mode: 'mock-unauthenticated',
  },
  database: {
    // Postponed: connection settings ready for future Supabase/PostgreSQL integration
    url: process.env.DATABASE_URL || '',
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseKey: process.env.SUPABASE_KEY || '',
    isConfigured: Boolean(process.env.DATABASE_URL || process.env.SUPABASE_URL),
  },
};
