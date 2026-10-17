/**
 * Licentra API Comprehensive Automated Verification Suite
 * Tests all 32 registered endpoints, envelope shapes, status codes, and error responses.
 */

import http from 'http';
import { createApp } from './src/app.js';

let passedCount = 0;
let failedCount = 0;
const results = [];

function assert(condition, testName, details = '') {
  if (condition) {
    passedCount++;
    results.push({ status: 'PASS', testName });
    console.log(`  \x1b[32m✔ PASS\x1b[0m ${testName}`);
  } else {
    failedCount++;
    results.push({ status: 'FAIL', testName, details });
    console.error(`  \x1b[31m✖ FAIL\x1b[0m ${testName} - ${details}`);
  }
}

function assertSuccessEnvelope(json, testName) {
  assert(
    json && json.success === true && json.data !== undefined && typeof json.message === 'string' && json.meta && typeof json.meta.timestamp === 'string',
    `${testName} returns standard success envelope: { success: true, data, message, meta }`,
    `Received: ${JSON.stringify(json)}`
  );
}

function assertErrorEnvelope(json, testName, expectedCode = null) {
  const hasShape =
    json &&
    json.success === false &&
    json.error &&
    typeof json.error.code === 'string' &&
    typeof json.error.message === 'string' &&
    Array.isArray(json.error.details) &&
    json.meta &&
    typeof json.meta.timestamp === 'string';

  assert(hasShape, `${testName} returns standard error envelope: { success: false, error: { code, message, details }, meta }`, `Received: ${JSON.stringify(json)}`);

  if (expectedCode && json?.error?.code) {
    assert(
      json.error.code === expectedCode,
      `${testName} error code matches '${expectedCode}' (got '${json.error.code}')`,
      `Received code: ${json.error.code}`
    );
  }
}

async function runTests() {
  const app = createApp();
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`\n\x1b[36m=======================================================`);
  console.log(`Licentra API Verification Test Suite (Port: ${port})`);
  console.log(`=======================================================\x1b[0m\n`);

  try {
    // ----------------------------------------------------
    // 1. Health & System Monitoring
    // ----------------------------------------------------
    console.log('\x1b[34m[1. System Monitoring & Health]\x1b[0m');
    {
      const res = await fetch(`${baseUrl}/api/health`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/health returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/health');
      assert(json.data.status === 'ok', 'GET /api/health data.status is ok');
      assert(json.status === 'ok', 'GET /api/health root status is ok (backward compatibility)');
      assert(Boolean(json.data.version), 'GET /api/health includes version');
      assert(Boolean(json.data.database), 'GET /api/health includes database status');
    }

    // ----------------------------------------------------
    // 2. Member 1 - Public Core (Contact)
    // ----------------------------------------------------
    console.log('\n\x1b[34m[2. Member 1 - Public Core & Contact]\x1b[0m');
    {
      const res = await fetch(`${baseUrl}/api/contact`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/contact returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/contact');
      assert(Array.isArray(json.data), 'GET /api/contact returns collection array');
    }
    {
      const payload = {
        fullName: 'Test Inquirer',
        email: 'test@example.com',
        phone: '+20 100 000 0000',
        subject: 'General Question',
        message: 'How can I renew my private license online?',
      };
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      assert(res.status === 201, 'POST /api/contact valid payload returns HTTP 201');
      assertSuccessEnvelope(json, 'POST /api/contact');
      assert(json.data.fullName === payload.fullName, 'POST /api/contact persists inquiry fields');
    }
    {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: 'Incomplete' }),
      });
      const json = await res.json();
      assert(res.status === 400, 'POST /api/contact missing fields returns HTTP 400');
      assertErrorEnvelope(json, 'POST /api/contact missing fields', 'VALIDATION_ERROR');
    }

    // ----------------------------------------------------
    // 3. Member 2 - Public Catalog (Services, License Classes, News)
    // ----------------------------------------------------
    console.log('\n\x1b[34m[3. Member 2 - Public Catalog]\x1b[0m');
    {
      const res = await fetch(`${baseUrl}/api/services`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/services returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/services');
      assert(Array.isArray(json.data) && json.data.length >= 5, 'GET /api/services returns services array');
    }
    {
      const res = await fetch(`${baseUrl}/api/services/srv-001`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/services/srv-001 returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/services/srv-001');
      assert(json.data.id === 'srv-001', 'GET /api/services/srv-001 returns matching service ID');
    }
    {
      const res = await fetch(`${baseUrl}/api/services/srv-nonexistent`);
      const json = await res.json();
      assert(res.status === 404, 'GET /api/services/srv-nonexistent returns HTTP 404');
      assertErrorEnvelope(json, 'GET /api/services/srv-nonexistent', 'SERVICE_NOT_FOUND');
    }
    {
      const res = await fetch(`${baseUrl}/api/license-classes`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/license-classes returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/license-classes');
      assert(Array.isArray(json.data) && json.data.length === 7, 'GET /api/license-classes returns all 7 license classes');
    }
    {
      const res = await fetch(`${baseUrl}/api/license-classes/3`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/license-classes/3 returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/license-classes/3');
      assert(json.data.id === 3, 'GET /api/license-classes/3 returns class 3 details');
    }
    {
      const res = await fetch(`${baseUrl}/api/license-classes/999`);
      const json = await res.json();
      assert(res.status === 404, 'GET /api/license-classes/999 returns HTTP 404');
      assertErrorEnvelope(json, 'GET /api/license-classes/999', 'CLASS_NOT_FOUND');
    }
    {
      const res = await fetch(`${baseUrl}/api/news`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/news returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/news');
      assert(Array.isArray(json.data) && json.data.length >= 3, 'GET /api/news returns news array');
    }
    {
      const res = await fetch(`${baseUrl}/api/news/news-001`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/news/news-001 returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/news/news-001');
      assert(json.data.id === 'news-001', 'GET /api/news/news-001 returns article data');
    }
    {
      const res = await fetch(`${baseUrl}/api/news/news-nonexistent`);
      const json = await res.json();
      assert(res.status === 404, 'GET /api/news/news-nonexistent returns HTTP 404');
      assertErrorEnvelope(json, 'GET /api/news/news-nonexistent', 'NEWS_NOT_FOUND');
    }

    // ----------------------------------------------------
    // 4. Member 3 - Admin Insights & Settings
    // ----------------------------------------------------
    console.log('\n\x1b[34m[4. Member 3 - Admin Insights & Settings]\x1b[0m');
    {
      const res = await fetch(`${baseUrl}/api/admin/analytics/overview`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/admin/analytics/overview returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/admin/analytics/overview');
      assert(Boolean(json.data.kpis) && Array.isArray(json.data.classesDistribution), 'GET /api/admin/analytics/overview includes KPIs and distribution');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/settings`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/admin/settings returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/admin/settings');
      assert(Boolean(json.data.departmentName) && typeof json.data.defaultVisionTestFee === 'number', 'GET /api/admin/settings returns settings object');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autoLockAppointmentsHours: 48 }),
      });
      const json = await res.json();
      assert(res.status === 200, 'PUT /api/admin/settings with valid updates returns HTTP 200');
      assertSuccessEnvelope(json, 'PUT /api/admin/settings');
      assert(json.data.autoLockAppointmentsHours === 48, 'PUT /api/admin/settings persists updated setting');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const json = await res.json();
      assert(res.status === 400, 'PUT /api/admin/settings with empty body returns HTTP 400');
      assertErrorEnvelope(json, 'PUT /api/admin/settings empty body', 'VALIDATION_ERROR');
    }

    // ----------------------------------------------------
    // 5. Member 4 - Admin Operations (People & Applications)
    // ----------------------------------------------------
    console.log('\n\x1b[34m[5. Member 4 - Admin People & Applications]\x1b[0m');
    {
      const res = await fetch(`${baseUrl}/api/admin/people`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/admin/people returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/admin/people');
      assert(Array.isArray(json.data), 'GET /api/admin/people returns people array');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/people/per-001`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/admin/people/per-001 returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/admin/people/per-001');
      assert(json.data.id === 'per-001', 'GET /api/admin/people/per-001 returns person record');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/people/per-nonexistent`);
      const json = await res.json();
      assert(res.status === 404, 'GET /api/admin/people/per-nonexistent returns HTTP 404');
      assertErrorEnvelope(json, 'GET /api/admin/people/per-nonexistent', 'PERSON_NOT_FOUND');
    }
    {
      const newPerson = {
        nationalId: `999000${Date.now()}`.slice(0, 14),
        firstName: 'Farida',
        lastName: 'Salem',
        email: 'farida.salem@example.com',
        phone: '+20 109 876 5432',
      };
      const res = await fetch(`${baseUrl}/api/admin/people`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPerson),
      });
      const json = await res.json();
      assert(res.status === 201, 'POST /api/admin/people returns HTTP 201');
      assertSuccessEnvelope(json, 'POST /api/admin/people');
      assert(json.data.nationalId === newPerson.nationalId, 'POST /api/admin/people creates person record');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/people`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: 'NoNationalId' }),
      });
      const json = await res.json();
      assert(res.status === 400, 'POST /api/admin/people missing required fields returns HTTP 400');
      assertErrorEnvelope(json, 'POST /api/admin/people missing fields', 'VALIDATION_ERROR');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/people`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nationalId: '29876543210123', // Already exists in mockPeople
          firstName: 'Duplicate',
          lastName: 'User',
        }),
      });
      const json = await res.json();
      assert(res.status === 409, 'POST /api/admin/people duplicate nationalId returns HTTP 409');
      assertErrorEnvelope(json, 'POST /api/admin/people duplicate nationalId', 'DUPLICATE_NATIONAL_ID');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/applications`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/admin/applications returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/admin/applications');
      assert(Array.isArray(json.data), 'GET /api/admin/applications returns applications array');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/applications/app-1258`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/admin/applications/app-1258 returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/admin/applications/app-1258');
      assert(json.data.id === 'app-1258', 'GET /api/admin/applications/app-1258 returns application details');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/applications/app-nonexistent`);
      const json = await res.json();
      assert(res.status === 404, 'GET /api/admin/applications/app-nonexistent returns HTTP 404');
      assertErrorEnvelope(json, 'GET /api/admin/applications/app-nonexistent', 'APPLICATION_NOT_FOUND');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/applications/app-1258/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Approved' }),
      });
      const json = await res.json();
      assert(res.status === 200, 'PATCH /api/admin/applications/:id/status returns HTTP 200');
      assertSuccessEnvelope(json, 'PATCH /api/admin/applications/:id/status');
      assert(json.data.status === 'Approved', 'PATCH /api/admin/applications/:id/status updates status');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/applications/app-1258/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const json = await res.json();
      assert(res.status === 400, 'PATCH /api/admin/applications/:id/status missing status returns HTTP 400');
      assertErrorEnvelope(json, 'PATCH /api/admin/applications/:id/status missing status', 'VALIDATION_ERROR');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/applications/app-nonexistent/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Rejected' }),
      });
      const json = await res.json();
      assert(res.status === 404, 'PATCH /api/admin/applications/nonexistent/status returns HTTP 404');
      assertErrorEnvelope(json, 'PATCH /api/admin/applications/nonexistent/status', 'APPLICATION_NOT_FOUND');
    }

    // ----------------------------------------------------
    // 6. Member 5 - Admin Licenses & Tests
    // ----------------------------------------------------
    console.log('\n\x1b[34m[6. Member 5 - Admin Licenses & Tests]\x1b[0m');
    {
      const res = await fetch(`${baseUrl}/api/admin/licenses`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/admin/licenses returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/admin/licenses');
      assert(Array.isArray(json.data), 'GET /api/admin/licenses returns licenses array');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/licenses/lic-9001`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/admin/licenses/lic-9001 returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/admin/licenses/lic-9001');
      assert(json.data.id === 'lic-9001', 'GET /api/admin/licenses/lic-9001 returns license record');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/licenses/lic-nonexistent`);
      const json = await res.json();
      assert(res.status === 404, 'GET /api/admin/licenses/lic-nonexistent returns HTTP 404');
      assertErrorEnvelope(json, 'GET /api/admin/licenses/lic-nonexistent', 'LICENSE_NOT_FOUND');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/licenses/lic-9001/detain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fineAmount: 750 }),
      });
      const json = await res.json();
      assert(res.status === 200, 'POST /api/admin/licenses/:id/detain returns HTTP 200');
      assertSuccessEnvelope(json, 'POST /api/admin/licenses/:id/detain');
      assert(json.data.isDetained === true && json.data.fineAmount === 750, 'POST /api/admin/licenses/:id/detain marks license detained with fine');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/licenses/lic-9001/detain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fineAmount: -100 }),
      });
      const json = await res.json();
      assert(res.status === 400, 'POST /api/admin/licenses/:id/detain invalid negative fine returns HTTP 400');
      assertErrorEnvelope(json, 'POST /api/admin/licenses/:id/detain invalid fine', 'VALIDATION_ERROR');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/licenses/lic-nonexistent/detain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fineAmount: 500 }),
      });
      const json = await res.json();
      assert(res.status === 404, 'POST /api/admin/licenses/nonexistent/detain returns HTTP 404');
      assertErrorEnvelope(json, 'POST /api/admin/licenses/nonexistent/detain', 'LICENSE_NOT_FOUND');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/tests/appointments`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/admin/tests/appointments returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/admin/tests/appointments');
      assert(Array.isArray(json.data), 'GET /api/admin/tests/appointments returns appointments array');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/tests/appointments/apt-T458/result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passed: true, notes: 'Candidate displayed excellent vehicle control.' }),
      });
      const json = await res.json();
      assert(res.status === 200, 'POST /api/admin/tests/appointments/:id/result returns HTTP 200');
      assertSuccessEnvelope(json, 'POST /api/admin/tests/appointments/:id/result');
      assert(json.data.status === 'Passed', 'POST /api/admin/tests/appointments/:id/result records Passed status');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/tests/appointments/apt-T458/result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const json = await res.json();
      assert(res.status === 400, 'POST /api/admin/tests/appointments/:id/result missing passed returns HTTP 400');
      assertErrorEnvelope(json, 'POST /api/admin/tests/appointments/:id/result missing passed', 'VALIDATION_ERROR');
    }
    {
      const res = await fetch(`${baseUrl}/api/admin/tests/appointments/apt-nonexistent/result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passed: false, notes: 'Failed parking test.' }),
      });
      const json = await res.json();
      assert(res.status === 404, 'POST /api/admin/tests/appointments/nonexistent/result returns HTTP 404');
      assertErrorEnvelope(json, 'POST /api/admin/tests/appointments/nonexistent/result', 'APPOINTMENT_NOT_FOUND');
    }

    // ----------------------------------------------------
    // 7. Member 6 - User Portal (Profile & Submissions)
    // ----------------------------------------------------
    console.log('\n\x1b[34m[7. Member 6 - User Portal Profile & Submissions]\x1b[0m');
    {
      const res = await fetch(`${baseUrl}/api/portal/profile/me`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/portal/profile/me returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/portal/profile/me');
      assert(Boolean(json.data.id) && Boolean(json.data.fullName), 'GET /api/portal/profile/me returns profile data');
    }
    {
      const res = await fetch(`${baseUrl}/api/portal/profile/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: 'Rehab City, Cairo, Egypt' }),
      });
      const json = await res.json();
      assert(res.status === 200, 'PUT /api/portal/profile/me returns HTTP 200');
      assertSuccessEnvelope(json, 'PUT /api/portal/profile/me');
      assert(json.data.address === 'Rehab City, Cairo, Egypt', 'PUT /api/portal/profile/me persists address update');
    }
    {
      const res = await fetch(`${baseUrl}/api/portal/profile/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const json = await res.json();
      assert(res.status === 400, 'PUT /api/portal/profile/me empty body returns HTTP 400');
      assertErrorEnvelope(json, 'PUT /api/portal/profile/me empty body', 'VALIDATION_ERROR');
    }
    {
      const res = await fetch(`${baseUrl}/api/portal/applications/my-applications`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/portal/applications/my-applications returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/portal/applications/my-applications');
      assert(Array.isArray(json.data), 'GET /api/portal/applications/my-applications returns submissions array');
    }
    {
      const payload = {
        licenseClassId: 3,
        serviceTitle: 'Private Vehicle Driving License',
        fee: 630,
      };
      const res = await fetch(`${baseUrl}/api/portal/applications/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      assert(res.status === 201, 'POST /api/portal/applications/submit returns HTTP 201');
      assertSuccessEnvelope(json, 'POST /api/portal/applications/submit');
      assert(json.data.serviceTitle === payload.serviceTitle, 'POST /api/portal/applications/submit creates application');
    }
    {
      const res = await fetch(`${baseUrl}/api/portal/applications/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: 'missing class or service' }),
      });
      const json = await res.json();
      assert(res.status === 400, 'POST /api/portal/applications/submit missing class/service returns HTTP 400');
      assertErrorEnvelope(json, 'POST /api/portal/applications/submit missing class/service', 'VALIDATION_ERROR');
    }

    // ----------------------------------------------------
    // 8. Member 7 - User Portal Records (Appointments, Licenses, Notifications)
    // ----------------------------------------------------
    console.log('\n\x1b[34m[8. Member 7 - User Portal Records]\x1b[0m');
    {
      const res = await fetch(`${baseUrl}/api/portal/appointments/my-appointments`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/portal/appointments/my-appointments returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/portal/appointments/my-appointments');
      assert(Array.isArray(json.data), 'GET /api/portal/appointments/my-appointments returns appointments array');
    }
    {
      const newBooking = {
        testType: 'Practical Driving Test',
        date: '2025-05-10',
        time: '10:00 AM',
        center: 'Nasr City Center',
      };
      const res = await fetch(`${baseUrl}/api/portal/appointments/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking),
      });
      const json = await res.json();
      assert(res.status === 201, 'POST /api/portal/appointments/book returns HTTP 201');
      assertSuccessEnvelope(json, 'POST /api/portal/appointments/book');
      assert(json.data.testType === newBooking.testType, 'POST /api/portal/appointments/book creates booking');
    }
    {
      const res = await fetch(`${baseUrl}/api/portal/appointments/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ center: 'Nasr City' }), // missing testType and date
      });
      const json = await res.json();
      assert(res.status === 400, 'POST /api/portal/appointments/book missing required fields returns HTTP 400');
      assertErrorEnvelope(json, 'POST /api/portal/appointments/book missing fields', 'VALIDATION_ERROR');
    }
    {
      const res = await fetch(`${baseUrl}/api/portal/licenses/my-licenses`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/portal/licenses/my-licenses returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/portal/licenses/my-licenses');
      assert(Array.isArray(json.data), 'GET /api/portal/licenses/my-licenses returns licenses array');
      if (json.data.length > 0) {
        assert(Boolean(json.data[0].qrVerificationCode), 'License record includes qrVerificationCode for digital card');
      }
    }
    {
      const res = await fetch(`${baseUrl}/api/portal/notifications`);
      const json = await res.json();
      assert(res.status === 200, 'GET /api/portal/notifications returns HTTP 200');
      assertSuccessEnvelope(json, 'GET /api/portal/notifications');
      assert(Array.isArray(json.data), 'GET /api/portal/notifications returns notifications array');
    }
    {
      const res = await fetch(`${baseUrl}/api/portal/notifications/notif-001/read`, {
        method: 'PATCH',
      });
      const json = await res.json();
      assert(res.status === 200, 'PATCH /api/portal/notifications/notif-001/read returns HTTP 200');
      assertSuccessEnvelope(json, 'PATCH /api/portal/notifications/notif-001/read');
      assert(json.data.isRead === true, 'PATCH /api/portal/notifications/notif-001/read marks notification as read');
    }
    {
      const res = await fetch(`${baseUrl}/api/portal/notifications/notif-nonexistent/read`, {
        method: 'PATCH',
      });
      const json = await res.json();
      assert(res.status === 404, 'PATCH /api/portal/notifications/notif-nonexistent/read returns HTTP 404');
      assertErrorEnvelope(json, 'PATCH /api/portal/notifications/notif-nonexistent/read', 'NOTIFICATION_NOT_FOUND');
    }

    // ----------------------------------------------------
    // 9. Central 404 Handler for Unmatched Route
    // ----------------------------------------------------
    console.log('\n\x1b[34m[9. Central Route Not Found (404 Handler)]\x1b[0m');
    {
      const res = await fetch(`${baseUrl}/api/unregistered-route-xyz`);
      const json = await res.json();
      assert(res.status === 404, 'GET /api/unregistered-route-xyz returns HTTP 404');
      assertErrorEnvelope(json, 'GET /api/unregistered-route-xyz', 'RESOURCE_NOT_FOUND');
    }

    // ----------------------------------------------------
    // 10. Security Controls & Fail-Safe Production Guard
    // ----------------------------------------------------
    console.log('\n\x1b[34m[10. Security Controls & Fail-Safe Guards]\x1b[0m');
    {
      const res = await fetch(`${baseUrl}/api/admin/people`);
      const authHeader = res.headers.get('x-licentra-auth-status');
      const warningHeader = res.headers.get('x-licentra-security-warning');
      assert(authHeader === 'unauthenticated-mock-mode', 'Sensitive endpoint includes X-Licentra-Auth-Status: unauthenticated-mock-mode');
      assert(Boolean(warningHeader && warningHeader.includes('Mock development mode active')), 'Sensitive endpoint includes X-Licentra-Security-Warning header');
    }
    {
      const res = await fetch(`${baseUrl}/api/portal/profile/me`);
      const authHeader = res.headers.get('x-licentra-auth-status');
      assert(authHeader === 'unauthenticated-mock-mode', 'Portal endpoint includes X-Licentra-Auth-Status: unauthenticated-mock-mode');
    }
    {
      const res = await fetch(`${baseUrl}/api/health`);
      const json = await res.json();
      assert(Boolean(json.data.security), 'Health endpoint exposes explicit security status metadata');
      assert(json.data.security.realDataSafe === false, 'Health endpoint explicitly marks realDataSafe: false');
    }
    {
      // Test Fail-Safe: Production mode blocks sensitive endpoints without explicit bypass
      const { config } = await import('./src/config/env.js');
      const originalEnv = config.nodeEnv;
      const originalBypass = config.allowInsecureMockMode;

      try {
        config.nodeEnv = 'production';
        config.allowInsecureMockMode = false;

        const prodRes = await fetch(`${baseUrl}/api/admin/people`);
        const prodJson = await prodRes.json();
        assert(prodRes.status === 503, 'Fail-safe: Production mode blocks unauthenticated admin routes with HTTP 503');
        assertErrorEnvelope(prodJson, 'Fail-safe: Production mode error envelope', 'SECURITY_CONFIGURATION_ERROR');

        // Test with bypass flag enabled
        config.allowInsecureMockMode = true;
        const bypassRes = await fetch(`${baseUrl}/api/admin/people`);
        assert(bypassRes.status === 200, 'Fail-safe: Explicit ALLOW_INSECURE_MOCK_MODE permits staging demonstration');
      } finally {
        config.nodeEnv = originalEnv;
        config.allowInsecureMockMode = originalBypass;
      }
    }

    // Summary
    console.log('\n\x1b[36m=======================================================');
    console.log(`Test Execution Finished: ${passedCount} Passed, ${failedCount} Failed`);
    console.log(`=======================================================\x1b[0m\n`);

    if (failedCount > 0) {
      process.exitCode = 1;
    }
  } finally {
    server.close();
  }
}

runTests().catch((err) => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});
