import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { requestLogger } from './middleware/requestLogger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { mockAuthGuard } from './middleware/mockAuthGuard.js';

// Central Feature Route Imports (Clean separation by member)
import member1ContactRoutes from './members/member-1/contact/contact.routes.js';

import member2ServicesRoutes from './members/member-2/services/services.routes.js';
import member2LicenseClassesRoutes from './members/member-2/license-classes/license-classes.routes.js';
import member2NewsRoutes from './members/member-2/news/news.routes.js';

import member3AnalyticsRoutes from './members/member-3/analytics/analytics.routes.js';
import member3SettingsRoutes from './members/member-3/settings/settings.routes.js';

import member4PeopleRoutes from './members/member-4/people/people.routes.js';
import member4ApplicationsRoutes from './members/member-4/applications/applications.routes.js';

import member5LicensesRoutes from './members/member-5/licenses/licenses.routes.js';
import member5TestsRoutes from './members/member-5/tests/tests.routes.js';

import member6ProfileRoutes from './members/member-6/profile/profile.routes.js';
import member6SubmissionsRoutes from './members/member-6/submissions/submissions.routes.js';

import member7AppointmentsRoutes from './members/member-7/appointments/appointments.routes.js';
import member7LicensesRoutes from './members/member-7/licenses/licenses.routes.js';
import member7NotificationsRoutes from './members/member-7/notifications/notifications.routes.js';

export const createApp = () => {
  const app = express();

  // Global Middleware
  app.use(cors({
    origin: [config.clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);

  // Health Check Endpoint
  app.get('/api/health', (req, res) => {
    const healthData = {
      status: 'ok',
      service: 'Licentra Driving & Vehicle License Department API',
      version: '1.0.0',
      environment: config.nodeEnv,
      security: {
        authentication: 'Postponed (Mock Unauthenticated Mode)',
        authorization: 'Postponed (Zero RBAC Enforced)',
        realDataSafe: false,
      },
      database: config.database.isConfigured ? 'Configured' : 'Postponed (Mock Repositories Active)',
    };

    return res.status(200).json({
      success: true,
      data: healthData,
      message: 'Licentra API is operational',
      meta: {
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv,
        version: '1.0.0',
      },
      // Backward-compatible root-level properties
      status: 'ok',
      service: healthData.service,
      version: healthData.version,
      timestamp: new Date().toISOString(),
      environment: healthData.environment,
      database: healthData.database,
    });
  });

  // Central Feature Route Registration
  // Member 1 - Public Core
  app.use('/api/contact', member1ContactRoutes);

  // Member 2 - Public Catalog & Information
  app.use('/api/services', member2ServicesRoutes);
  app.use('/api/license-classes', member2LicenseClassesRoutes);
  app.use('/api/news', member2NewsRoutes);

  // Security Guard for Sensitive Endpoint Categories (Admin & Portal)
  // Enforces development headers and fail-safe production mode block
  app.use(['/api/admin', '/api/portal'], mockAuthGuard);

  // Member 3 - Admin Insights & System Parameters
  app.use('/api/admin/analytics', member3AnalyticsRoutes);
  app.use('/api/admin/settings', member3SettingsRoutes);

  // Member 4 - Admin Operations (People & Applications)
  app.use('/api/admin/people', member4PeopleRoutes);
  app.use('/api/admin/applications', member4ApplicationsRoutes);

  // Member 5 - Admin Operations (Licenses & Tests)
  app.use('/api/admin/licenses', member5LicensesRoutes);
  app.use('/api/admin/tests', member5TestsRoutes);

  // Member 6 - User Portal (Profile & Application Filing)
  app.use('/api/portal/profile', member6ProfileRoutes);
  app.use('/api/portal/applications', member6SubmissionsRoutes);

  // Member 7 - User Portal (Appointments, Licenses & Notifications)
  app.use('/api/portal/appointments', member7AppointmentsRoutes);
  app.use('/api/portal/licenses', member7LicensesRoutes);
  app.use('/api/portal/notifications', member7NotificationsRoutes);

  // 404 Handler for unmatched routes
  app.use(notFoundHandler);

  // Centralized Error Handling Middleware
  app.use(errorHandler);

  return app;
};

export default createApp;
