import { createApp } from './app.js';
import { config } from './config/env.js';
import { dbManager } from './config/database.js';

const startServer = async () => {
  try {
    // Fail-Safe Production Gate: Refuse to start in production without real auth/db
    if (config.nodeEnv === 'production' && !config.allowInsecureMockMode) {
      console.error('\x1b[31m================================================================');
      console.error('🚨 [FATAL SECURITY ERROR] PRODUCTION STARTUP BLOCKED');
      console.error('Licentra cannot run in PRODUCTION mode with unauthenticated mock repositories.');
      console.error('Production authentication, Supabase PostgreSQL, and RBAC are not yet implemented.');
      console.error('To run mock mode in non-production, set NODE_ENV=development.');
      console.error('To explicitly bypass this safeguard for staging demonstrations only, set:');
      console.error('  ALLOW_INSECURE_MOCK_MODE=true');
      console.error('================================================================\x1b[0m');
      process.exit(1);
    }

    // Shared Database Integration Point initialization (Phase 1: Mock Repositories)
    await dbManager.connect();

    const app = createApp();
    const server = app.listen(config.port, () => {
      console.log(`=================================================`);
      console.log(`🚀 Licentra Express Server running on port ${config.port}`);
      console.log(`📡 Health endpoint: http://localhost:${config.port}/api/health`);
      console.log(`🌍 Environment: ${config.nodeEnv}`);
      console.log(`🔒 Security Mode: Mock Unauthenticated Prototype`);
      console.log(`⚠️  WARNING: Do NOT ingest or process real citizen data!`);
      console.log(`=================================================`);
    });

    const shutdown = () => {
      console.log('Stopping Licentra server gracefully...');
      server.close(() => {
        console.log('Server stopped.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('Failed to start Licentra server:', error);
    process.exit(1);
  }
};

startServer();
