import { config } from '../config/env.js';
import { sendError } from '../shared/utils/response.js';
import { HttpStatus } from '../shared/constants/httpStatus.js';

/**
 * Development Mock Authentication & Security Guard Middleware
 * 
 * In Phase 1, authentication, database persistence, and RBAC are postponed.
 * All admin and citizen portal routes run against in-memory mock repositories
 * with hardcoded or simulated identities.
 * 
 * Security Guard Directives:
 * 1. Attaches explicit security headers so API consumers and developers
 *    cannot mistake mock behavior for authenticated production endpoints.
 * 2. Fail-Safe Production Lock: Prevents running sensitive endpoints in
 *    production mode unless explicitly bypassed via ALLOW_INSECURE_MOCK_MODE=true.
 */
export const mockAuthGuard = (req, res, next) => {
  // Always attach clear, auditable security indicator headers
  res.setHeader('X-Licentra-Auth-Status', 'unauthenticated-mock-mode');
  res.setHeader(
    'X-Licentra-Security-Warning',
    'Mock development mode active - No authentication or RBAC enforced. Do NOT use with real citizen data.'
  );

  // Fail-Safe: Refuse to serve sensitive endpoints in production without real auth
  if (config.nodeEnv === 'production' && !config.allowInsecureMockMode) {
    return sendError(
      res,
      'Access Denied: Production execution blocked. Production authentication and database controls are not yet implemented.',
      HttpStatus.SERVICE_UNAVAILABLE,
      'SECURITY_CONFIGURATION_ERROR',
      [
        'Authentication and database layers are postponed in Phase 1.',
        'Production mode requires real JWT and RBAC security controls.',
        'To bypass this safeguard for staging demonstrations only, set ALLOW_INSECURE_MOCK_MODE=true in environment.',
      ]
    );
  }

  next();
};

export default mockAuthGuard;
