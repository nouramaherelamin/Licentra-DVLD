# Licentra — Authoritative API Contracts & Interface Specification

> **Document Status**: Authoritative Single Source of Truth (SSOT)  
> **Backend Architecture**: Node.js (ES Modules) + Express 4  
> **Data Layer**: In-Memory Mock Repositories (Database integration postponed to Phase 2)  
> **Frontend Client**: Centralized `apiClient.js` (`frontend/src/shared/api/apiClient.js`)  
> **Verification Command**: `npm test` from repository root (starts a temporary Express instance inline — no separate server needed)  
> **Last Verified Result**: 172 passed, 0 failed across all 32 endpoints


---

## 1. Architectural Principles & Implementation Status

> 📖 **Primary Architecture Reference**: For full system specifications, folder structures, team ownership, and security governance, refer to [**Master Architecture Blueprint (docs/ARCHITECTURE.md)**](ARCHITECTURE.md). For git merge guidelines, see [**Git Merge Workflow (docs/merge-workflow.md)**](merge-workflow.md).

All Licentra API endpoints adhere strictly to RESTful conventions, consistent JSON envelope schemas, and uniform HTTP status codes.

### 1.1 Architectural Status Legend

To avoid ambiguity regarding development maturity, all endpoints, services, and modules in Licentra are classified using these five standardized categories:

| Status Label | Meaning & Scope in Licentra |
| :--- | :--- |
| **Implemented and tested** | Backend routes, controllers, services, repositories, and middleware exist, execute against mock data, and pass automated end-to-end assertions in `backend/test-api.js` (172 passing). |
| **Implemented but not adequately tested** | Code is implemented and functional (e.g. frontend routing & layouts compiling in Vite, `apiClient.js` fetch wrapper, backend graceful shutdown), but lacks automated unit or integration tests. |
| **Scaffolded or placeholder only** | Components and routes exist and mount cleanly, but render placeholder UI (`PlaceholderPage`). All 19 frontend page components currently have this status. |
| **Planned** | Architected and documented features scheduled for future development (e.g., JWT auth, RBAC guards, rate limiting, real React page UI). |
| **Postponed** | Deliberately deferred to Phase 2 to prevent early blockers (Supabase PostgreSQL database connectivity and live persistence). |

### 1.2 Security & Access Control Reality

> [!CAUTION]
> ### 🚨 CRITICAL PROTOTYPE SECURITY WARNING
> **All `/api/admin/*` and `/api/portal/*` endpoints are currently unauthenticated mock prototypes.**
> - **Authentication Status**: Postponed (Phase 1). No passwords, JWTs, sessions, or tokens are required or verified.
> - **Authorization / RBAC Status**: Postponed (Phase 1). Zero role-based permissions are enforced; all callers have unrestricted access to mock endpoints.
> - **Frontend Route Hiding is NOT Security**: Concealing admin or portal links in the frontend SPA does NOT secure the underlying REST API. Any HTTP client can directly access these endpoints.
> - **Data Safety Directive**: **NEVER INGEST, PROCESS, OR STORE REAL CITIZEN RECORDS, NATIONAL IDS, OR PERSONALLY IDENTIFIABLE INFORMATION (PII) IN THIS BUILD.**
> - **Development Guard Active**: Responses to sensitive routes include `X-Licentra-Auth-Status: unauthenticated-mock-mode`, and `mockAuthGuard.js` blocks execution if `NODE_ENV=production` without explicit bypass.

### 1.3 Implementation Maturity Tiers
To prevent discrepancies between documentation and code, each endpoint in this contract distinguishes three development tiers:

1. **Route Registration**: The route is imported, mounted on Express `app`, and bound to an HTTP method and controller function.
2. **Mock Business Logic**: The controller delegates to a service and repository operating on in-memory collections, performing input validation, ID lookup, duplicate collision checks, or status updates. (Note: Route existence and mock handlers do NOT imply production-hardened business logic or transaction safety).
3. **Tested Behavior**: The endpoint is covered by automated end-to-end tests in `backend/test-api.js` asserting status codes, envelope structures, and error branches.

> [!NOTE]
> Database integration is explicitly **postponed** for Phase 1. In-memory arrays simulate persistent state during runtime. Server restarts reset state to initial mock seeds.

---

## 2. Standard JSON Response Envelopes

Every endpoint in Licentra returns one of two standard JSON envelopes.

### 2.1 Standard Success Envelope (HTTP 200 / 201)

Used for all single-resource retrievals, updates, submissions, creations, and collections.

```json
{
  "success": true,
  "data": { ... } | [ ... ] | null,
  "message": "Human-readable confirmation message",
  "meta": {
    "timestamp": "2026-10-17T03:30:00.000Z"
  }
}
```

- `success`: Always `true` for successful HTTP 2xx operations.
- `data`: Resource object, collection array, or `null`. Never omitted from JSON output.
- `message`: Descriptive confirmation string.
- `meta.timestamp`: ISO 8601 string of response generation time.

### 2.2 Collection & Pagination Specifications

#### Phase 1 (Current Implemented State)
- **All collection endpoints currently return full, unpaginated arrays in `data`**.
- `meta` contains `{ "timestamp": "..." }`.
- No pagination query parameters (`page`, `limit`) are consumed or enforced.
- **Do not assume or claim `meta.pagination` is returned in Phase 1.**

#### Phase 2 (Planned Database Pagination Specification)
When relational database integration commences in Phase 2, collection endpoints will support optional query parameters `?page=1&limit=10` and include pagination metadata:

```json
{
  "success": true,
  "data": [ ... ],
  "message": "Resource list retrieved",
  "meta": {
    "timestamp": "2026-10-17T03:30:00.000Z",
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalRecords": 45,
      "totalPages": 5
    }
  }
}
```

### 2.3 Standard Error Envelope (HTTP 4xx / 5xx)

Used for client validation errors, missing resources, conflict collisions, and unhandled server exceptions.

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Detailed explanation of the failure condition",
    "details": []
  },
  "meta": {
    "timestamp": "2026-10-17T03:30:00.000Z"
  }
}
```

- `success`: Always `false` for HTTP 4xx and 5xx responses.
- `error.code`: Machine-readable error identifier string (e.g., `VALIDATION_ERROR`, `RESOURCE_NOT_FOUND`, `DUPLICATE_NATIONAL_ID`).
- `error.message`: Human-readable error message explaining why the request failed.
- `error.details`: Array of specific error items or empty array `[]`. Guaranteed to be an Array.
- `meta.timestamp`: ISO 8601 timestamp.

### 2.4 Standard HTTP Status Codes

| Code | Label | Meaning & Usage in Licentra |
| :--- | :--- | :--- |
| `200` | OK | Successful GET, PUT, or PATCH operation. |
| `201` | Created | Successful POST creation (e.g., new application, inquiry, booking, person). |
| `400` | Bad Request | Missing required body fields or invalid input (`VALIDATION_ERROR`). |
| `401` | Unauthorized | Missing or invalid citizen/admin credentials (reserved for Phase 2). |
| `403` | Forbidden | Insufficient role permissions (reserved for Phase 2). |
| `404` | Not Found | Resource ID does not exist or route is not registered (`*_NOT_FOUND`). |
| `409` | Conflict | Business rule conflict (e.g., duplicate National ID: `DUPLICATE_NATIONAL_ID`). |
| `500` | Internal Server Error | Unhandled runtime exception caught by central `errorHandler`. |

---

## 3. Master Endpoint Inventory (32 Registered Endpoints)

| # | HTTP Method | Endpoint Path | Module | Member | Request Body | Status Codes | Maturity Tier |
|---|---|---|---|---|---|---|---|
| 1 | `GET` | `/api/health` | System | System | None | `200` | Registered, Logic, Tested |
| 2 | `GET` | `/api/contact` | `contact` | Member 1 | None | `200` | Registered, Logic, Tested |
| 3 | `POST` | `/api/contact` | `contact` | Member 1 | `{ fullName, email, message, ... }` | `201`, `400` | Registered, Logic, Tested |
| 4 | `GET` | `/api/services` | `services` | Member 2 | None | `200` | Registered, Logic, Tested |
| 5 | `GET` | `/api/services/:id` | `services` | Member 2 | None | `200`, `404` | Registered, Logic, Tested |
| 6 | `GET` | `/api/license-classes` | `license-classes` | Member 2 | None | `200` | Registered, Logic, Tested |
| 7 | `GET` | `/api/license-classes/:id` | `license-classes` | Member 2 | None | `200`, `404` | Registered, Logic, Tested |
| 8 | `GET` | `/api/news` | `news` | Member 2 | None | `200` | Registered, Logic, Tested |
| 9 | `GET` | `/api/news/:id` | `news` | Member 2 | None | `200`, `404` | Registered, Logic, Tested |
| 10 | `GET` | `/api/admin/analytics/overview` | `analytics` | Member 3 | None | `200` | Registered, Logic, Tested |
| 11 | `GET` | `/api/admin/settings` | `settings` | Member 3 | None | `200` | Registered, Logic, Tested |
| 12 | `PUT` | `/api/admin/settings` | `settings` | Member 3 | `{ ...updates }` | `200`, `400` | Registered, Logic, Tested |
| 13 | `GET` | `/api/admin/people` | `people` | Member 4 | None | `200` | Registered, Logic, Tested |
| 14 | `GET` | `/api/admin/people/:id` | `people` | Member 4 | None | `200`, `404` | Registered, Logic, Tested |
| 15 | `POST` | `/api/admin/people` | `people` | Member 4 | `{ nationalId, firstName, lastName, ... }` | `201`, `400`, `409` | Registered, Logic, Tested |
| 16 | `GET` | `/api/admin/applications` | `applications` | Member 4 | None | `200` | Registered, Logic, Tested |
| 17 | `GET` | `/api/admin/applications/:id` | `applications` | Member 4 | None | `200`, `404` | Registered, Logic, Tested |
| 18 | `PATCH` | `/api/admin/applications/:id/status` | `applications` | Member 4 | `{ status }` | `200`, `400`, `404` | Registered, Logic, Tested |
| 19 | `GET` | `/api/admin/licenses` | `licenses` | Member 5 | None | `200` | Registered, Logic, Tested |
| 20 | `GET` | `/api/admin/licenses/:id` | `licenses` | Member 5 | None | `200`, `404` | Registered, Logic, Tested |
| 21 | `POST` | `/api/admin/licenses/:id/detain` | `licenses` | Member 5 | `{ fineAmount }` | `200`, `400`, `404` | Registered, Logic, Tested |
| 22 | `GET` | `/api/admin/tests/appointments` | `tests` | Member 5 | None | `200` | Registered, Logic, Tested |
| 23 | `POST` | `/api/admin/tests/appointments/:id/result` | `tests` | Member 5 | `{ passed, notes }` | `200`, `400`, `404` | Registered, Logic, Tested |
| 24 | `GET` | `/api/portal/profile/me` | `profile` | Member 6 | None | `200` | Registered, Logic, Tested |
| 25 | `PUT` | `/api/portal/profile/me` | `profile` | Member 6 | `{ ...updates }` | `200`, `400` | Registered, Logic, Tested |
| 26 | `GET` | `/api/portal/applications/my-applications` | `submissions` | Member 6 | None | `200` | Registered, Logic, Tested |
| 27 | `POST` | `/api/portal/applications/submit` | `submissions` | Member 6 | `{ licenseClassId, serviceTitle, ... }` | `201`, `400` | Registered, Logic, Tested |
| 28 | `GET` | `/api/portal/appointments/my-appointments` | `appointments` | Member 7 | None | `200` | Registered, Logic, Tested |
| 29 | `POST` | `/api/portal/appointments/book` | `appointments` | Member 7 | `{ testType, date, ... }` | `201`, `400` | Registered, Logic, Tested |
| 30 | `GET` | `/api/portal/licenses/my-licenses` | `licenses` | Member 7 | None | `200` | Registered, Logic, Tested |
| 31 | `GET` | `/api/portal/notifications` | `notifications` | Member 7 | None | `200` | Registered, Logic, Tested |
| 32 | `PATCH` | `/api/portal/notifications/:id/read` | `notifications` | Member 7 | None | `200`, `404` | Registered, Logic, Tested |

---

## 4. Comprehensive Endpoint Contract Specifications

### 4.1 System Monitoring

#### `GET /api/health`
- **Description**: Returns live operational status, environment, version, and database state.
- **Headers**: None required.
- **Request Parameters / Body**: None.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "status": "ok",
      "service": "Licentra Driving & Vehicle License Department API",
      "version": "1.0.0",
      "environment": "development",
      "database": "Postponed (Mock Repositories Active)"
    },
    "message": "Licentra API is operational",
    "meta": {
      "timestamp": "2026-10-17T03:30:00.000Z",
      "environment": "development",
      "version": "1.0.0"
    },
    "status": "ok"
  }
  ```
  *(Note: Top-level `status`, `service`, `version`, `timestamp`, `environment`, and `database` fields are mirrored on the root object for backward compatibility with external health monitors and curl scripts).*

---

### 4.2 Member 1: Public Core & Inquiries

#### `GET /api/contact`
- **Description**: Retrieves all submitted public contact and support inquiries.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "inq-001",
        "fullName": "Sara Mohamed",
        "email": "sara@example.com",
        "phone": "+20 100 123 4567",
        "subject": "International License Inquiries",
        "message": "Can I apply for an international driving license online?",
        "createdAt": "2024-10-14T10:00:00Z",
        "status": "Pending"
      }
    ],
    "message": "Inquiries retrieved successfully",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `POST /api/contact`
- **Description**: Submits a new citizen inquiry or support message.
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "fullName": "Sara Mohamed",
    "email": "sara@example.com",
    "message": "How do I renew my driving license online?",
    "phone": "+20 100 123 4567",
    "subject": "License Renewal"
  }
  ```
  - `fullName` *(required, string)*
  - `email` *(required, string)*
  - `message` *(required, string)*
  - `phone` *(optional, string)*
  - `subject` *(optional, string)*
- **Success Response (HTTP 201 Created)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "inq-1729135800000",
      "fullName": "Sara Mohamed",
      "email": "sara@example.com",
      "message": "How do I renew my driving license online?",
      "phone": "+20 100 123 4567",
      "subject": "License Renewal",
      "createdAt": "2026-10-17T03:30:00.000Z",
      "status": "Pending"
    },
    "message": "Inquiry submitted successfully",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response (HTTP 400 Bad Request)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Full name, email, and message are required fields.",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

---

### 4.3 Member 2: Public Catalog & Information

#### `GET /api/services`
- **Description**: Retrieves all department driving license service categories, descriptions, statutory fees, and turnaround estimates.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "srv-001",
        "title": "First Driving License",
        "description": "Apply for your first driving license and start your journey.",
        "category": "Issuance",
        "fees": 650,
        "currency": "EGP",
        "estimatedDays": 7
      }
    ],
    "message": "Services retrieved successfully",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `GET /api/services/:id`
- **Description**: Retrieves single service details by ID (e.g., `srv-001`).
- **Path Parameters**: `id` *(string)* — e.g., `srv-001`.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "srv-001",
      "title": "First Driving License",
      "description": "Apply for your first driving license and start your journey.",
      "category": "Issuance",
      "fees": 650,
      "currency": "EGP",
      "estimatedDays": 7
    },
    "message": "Service details retrieved",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response (HTTP 404 Not Found)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "SERVICE_NOT_FOUND",
      "message": "Service with ID 'srv-999' not found",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `GET /api/license-classes`
- **Description**: Retrieves catalog of all 7 driving license categories with age limits, validity years, and fees.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": [
      { "id": 1, "code": "Class 1", "title": "Light Motorcycle", "minAge": 18, "validityYears": 5, "fees": 310, "currency": "EGP" },
      { "id": 2, "code": "Class 2", "title": "Heavy Motorcycle", "minAge": 21, "validityYears": 10, "fees": 450, "currency": "EGP" },
      { "id": 3, "code": "Class 3", "title": "Private Vehicle", "minAge": 18, "validityYears": 10, "fees": 630, "currency": "EGP" },
      { "id": 4, "code": "Class 4", "title": "Taxi / Limousine", "minAge": 21, "validityYears": 10, "fees": 520, "currency": "EGP" },
      { "id": 5, "code": "Class 5", "title": "Agricultural Vehicle", "minAge": 18, "validityYears": 10, "fees": 350, "currency": "EGP" },
      { "id": 6, "code": "Class 6", "title": "Bus", "minAge": 21, "validityYears": 10, "fees": 520, "currency": "EGP" },
      { "id": 7, "code": "Class 7", "title": "Heavy Vehicle", "minAge": 21, "validityYears": 10, "fees": 550, "currency": "EGP" }
    ],
    "message": "License classes retrieved successfully",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `GET /api/license-classes/:id`
- **Description**: Retrieves single license class details by numeric ID (e.g. `3`) or code (e.g. `Class 3`).
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": 3,
      "code": "Class 3",
      "title": "Private Vehicle",
      "minAge": 18,
      "validityYears": 10,
      "fees": 630,
      "currency": "EGP"
    },
    "message": "License class details retrieved",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response (HTTP 404 Not Found)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "CLASS_NOT_FOUND",
      "message": "License class '99' not found",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `GET /api/news`
- **Description**: Retrieves department news updates, traffic safety announcements, and procedural changes.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "news-001",
        "title": "10 Essential Driving Safety Tips for New Drivers",
        "date": "19 Oct 2024",
        "summary": "Learn the most important tips to stay safe on Egyptian highways and urban streets.",
        "readTime": "4 min read"
      }
    ],
    "message": "News articles retrieved successfully",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `GET /api/news/:id`
- **Description**: Retrieves single news article by ID.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "news-001",
      "title": "10 Essential Driving Safety Tips for New Drivers",
      "date": "19 Oct 2024",
      "summary": "Learn the most important tips to stay safe on Egyptian highways and urban streets.",
      "readTime": "4 min read"
    },
    "message": "News article details retrieved",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response (HTTP 404 Not Found)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "NEWS_NOT_FOUND",
      "message": "News item 'news-999' not found",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

---

### 4.4 Member 3: Admin Insights & System Parameters

#### `GET /api/admin/analytics/overview`
- **Description**: Executive dashboard KPI statistics and license class distribution percentages.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "kpis": {
        "totalApplications": 2583,
        "applicationsTrend": "+12%",
        "issuedLicenses": 1964,
        "issuedLicensesTrend": "+8%",
        "scheduledTests": 487,
        "scheduledTestsTrend": "-4%",
        "passedTests": 392,
        "passedTestsTrend": "+15%",
        "activeDrivers": 500000,
        "activeDriversTrend": "+6%",
        "overallPassRate": 81,
        "failedTests": 95
      },
      "classesDistribution": [
        { "label": "Class 1 (Motorcycle)", "percentage": 18 },
        { "label": "Class 3 (Private Vehicle)", "percentage": 28 }
      ]
    },
    "message": "Analytics metrics retrieved successfully",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `GET /api/admin/settings`
- **Description**: Retrieves global department parameters, test fee defaults, hotline, and auto-lock rules.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "departmentName": "Licentra Driving & Vehicle License Department",
      "country": "Egypt",
      "currency": "EGP",
      "autoLockAppointmentsHours": 24,
      "defaultVisionTestFee": 50,
      "defaultTheoryTestFee": 100,
      "defaultPracticalTestFee": 150,
      "supportHotline": "+20 123 456 7890",
      "systemStatus": "Operational"
    },
    "message": "Settings retrieved successfully",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `PUT /api/admin/settings`
- **Description**: Updates global system settings and statutory fees.
- **Headers**: `Content-Type: application/json`
- **Request Body**: Non-empty object with fields to update:
  ```json
  {
    "autoLockAppointmentsHours": 48,
    "defaultVisionTestFee": 60
  }
  ```
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "departmentName": "Licentra Driving & Vehicle License Department",
      "country": "Egypt",
      "currency": "EGP",
      "autoLockAppointmentsHours": 48,
      "defaultVisionTestFee": 60,
      "defaultTheoryTestFee": 100,
      "defaultPracticalTestFee": 150,
      "supportHotline": "+20 123 456 7890",
      "systemStatus": "Operational"
    },
    "message": "Settings updated successfully",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response (HTTP 400 Bad Request)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Settings update payload must be a non-empty object.",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

---

### 4.5 Member 4: Admin Operations (People & Applications)

#### `GET /api/admin/people`
- **Description**: Retrieves all civilian registry records.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "per-001",
        "nationalId": "29876543210123",
        "firstName": "Ahmed",
        "secondName": "Mohamed",
        "thirdName": "Ali",
        "lastName": "Hassan",
        "email": "ahmed.m@example.com",
        "phone": "+20 101 234 5678",
        "gender": "Male",
        "dateOfBirth": "1995-04-12",
        "nationality": "Egyptian"
      }
    ],
    "message": "People records retrieved",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `GET /api/admin/people/:id`
- **Description**: Retrieves single person by internal ID (`per-001`) or 14-digit National ID (`29876543210123`).
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "per-001",
      "nationalId": "29876543210123",
      "firstName": "Ahmed",
      "lastName": "Hassan",
      "email": "ahmed.m@example.com"
    },
    "message": "Person details retrieved",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response (HTTP 404 Not Found)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "PERSON_NOT_FOUND",
      "message": "Person with identifier 'per-999' not found",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `POST /api/admin/people`
- **Description**: Registers a new citizen into the civilian registry.
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "nationalId": "29801011234567",
    "firstName": "Nour",
    "lastName": "Ibrahim",
    "email": "nour@example.com",
    "phone": "+20 109 876 5432",
    "gender": "Female",
    "dateOfBirth": "1998-05-20"
  }
  ```
  - `nationalId` *(required, string)*
  - `firstName` *(required, string)*
  - `lastName` *(required, string)*
- **Success Response (HTTP 201 Created)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "per-1729135800000",
      "nationalId": "29801011234567",
      "firstName": "Nour",
      "lastName": "Ibrahim"
    },
    "message": "Person record created",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response — Missing Fields (HTTP 400 Bad Request)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "National ID, first name, and last name are required.",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response — Duplicate National ID (HTTP 409 Conflict)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "DUPLICATE_NATIONAL_ID",
      "message": "A person with National ID '29876543210123' already exists.",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `GET /api/admin/applications`
- **Description**: Retrieves all submitted license applications across all applicants.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "app-1258",
        "applicantName": "Ahmed Mohamed",
        "nationalId": "29876543210123",
        "licenseClass": "Class 3 - Private Vehicle",
        "applicationType": "New License",
        "status": "Under Review",
        "date": "15 Oct 2024",
        "paidFees": 630
      }
    ],
    "message": "Applications retrieved",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `GET /api/admin/applications/:id`
- **Description**: Retrieves full details of a specific application by ID (e.g. `app-1258`).
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "app-1258",
      "applicantName": "Ahmed Mohamed",
      "status": "Under Review"
    },
    "message": "Application details retrieved",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response (HTTP 404 Not Found)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "APPLICATION_NOT_FOUND",
      "message": "Application 'app-9999' not found",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `PATCH /api/admin/applications/:id/status`
- **Description**: Updates review milestone status (`Approved`, `Rejected`, `Under Review`, `Pending Payment`).
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "status": "Approved"
  }
  ```
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "app-1258",
      "status": "Approved"
    },
    "message": "Application status updated",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response (HTTP 400 Bad Request)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Status field is required.",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

---

### 4.6 Member 5: Admin Operations (Licenses & Tests)

#### `GET /api/admin/licenses`
- **Description**: Retrieves all issued licenses with status flags (`isActive`, `isDetained`, `fineAmount`).
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "lic-9001",
        "licenseNumber": "EG-2987654321",
        "driverName": "Noura Mohamed",
        "nationalId": "29876543219999",
        "licenseClass": "Class 3 - Private Vehicle",
        "issueDate": "2023-03-15",
        "expirationDate": "2033-03-15",
        "isActive": true,
        "isDetained": false,
        "fineAmount": 0
      }
    ],
    "message": "Licenses retrieved successfully",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `GET /api/admin/licenses/:id`
- **Description**: Retrieves single license by internal ID or official license number.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "lic-9001",
      "licenseNumber": "EG-2987654321",
      "driverName": "Noura Mohamed",
      "isActive": true,
      "isDetained": false
    },
    "message": "License details retrieved",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response (HTTP 404 Not Found)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "LICENSE_NOT_FOUND",
      "message": "License 'lic-9999' not found",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `POST /api/admin/licenses/:id/detain`
- **Description**: Suspends/detains an active driving license, sets `isDetained = true`, sets `isActive = false`, and assesses a statutory fine.
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "fineAmount": 750
  }
  ```
  *(Note: `fineAmount` defaults to `500` if omitted in the payload).*
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "lic-9001",
      "licenseNumber": "EG-2987654321",
      "isActive": false,
      "isDetained": true,
      "fineAmount": 750
    },
    "message": "License detained successfully",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response (HTTP 400 Bad Request)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Fine amount must be a non-negative number.",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `GET /api/admin/tests/appointments`
- **Description**: Retrieves scheduled test appointments across examination centers.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "apt-T458",
        "applicantName": "Ahmed Samir",
        "nationalId": "29606061234567",
        "testType": "Practical Street Test",
        "date": "15 Oct 2024",
        "time": "10:00 AM",
        "center": "Nasr City Center",
        "status": "Scheduled",
        "fee": 150
      }
    ],
    "message": "Test appointments retrieved",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `POST /api/admin/tests/appointments/:id/result`
- **Description**: Records examiner pass/fail evaluation and evaluation notes.
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "passed": true,
    "notes": "Candidate passed parallel parking and highway merge test cleanly."
  }
  ```
  - `passed` *(required, boolean)*
  - `notes` *(optional, string)*
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "apt-T458",
      "status": "Passed",
      "resultNotes": "Candidate passed parallel parking and highway merge test cleanly."
    },
    "message": "Test result recorded successfully",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response (HTTP 400 Bad Request)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Field 'passed' is required and must be a boolean (true/false).",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

---

### 4.7 Member 6: Citizen Portal (Profile & Submissions)

#### `GET /api/portal/profile/me`
- **Description**: Retrieves logged-in citizen profile data and summary counters.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "usr-noura",
      "fullName": "Noura Mohamed Ahmed",
      "nationalId": "2987654321",
      "email": "noura.m@gmail.com",
      "phone": "+20 123 456 7890",
      "address": "Nasr City, Cairo, Egypt",
      "activeApplicationsCount": 2,
      "activeLicensesCount": 1,
      "completedTestsCount": 3,
      "status": "Active Account"
    },
    "message": "User profile retrieved successfully",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `PUT /api/portal/profile/me`
- **Description**: Updates citizen contact info, address, or phone numbers.
- **Headers**: `Content-Type: application/json`
- **Request Body**: Non-empty object with fields to update:
  ```json
  {
    "address": "5th Settlement, New Cairo, Egypt",
    "phone": "+20 100 999 8888"
  }
  ```
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "usr-noura",
      "fullName": "Noura Mohamed Ahmed",
      "address": "5th Settlement, New Cairo, Egypt",
      "phone": "+20 100 999 8888"
    },
    "message": "User profile updated successfully",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response (HTTP 400 Bad Request)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Profile update payload must be a non-empty object.",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `GET /api/portal/applications/my-applications`
- **Description**: Retrieves all driving license applications filed by current user.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "user-app-01",
        "serviceTitle": "Private Vehicle Driving License (Class 3)",
        "applicationNumber": "APP-2024-10-098",
        "status": "Under Review",
        "submittedAt": "15 Oct 2024",
        "feePaid": 630,
        "stepsCompleted": 2,
        "totalSteps": 4
      }
    ],
    "message": "User applications retrieved",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `POST /api/portal/applications/submit`
- **Description**: Submits a new citizen license application via multi-step wizard.
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "licenseClassId": 3,
    "serviceTitle": "Private Vehicle Driving License (Class 3)",
    "fee": 630
  }
  ```
  - `licenseClassId` or `serviceTitle` *(at least one is required)*
- **Success Response (HTTP 201 Created)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "user-app-1729135800000",
      "serviceTitle": "Private Vehicle Driving License (Class 3)",
      "applicationNumber": "APP-2024-5412",
      "status": "Submitted",
      "submittedAt": "17/10/2026",
      "feePaid": 630,
      "stepsCompleted": 1,
      "totalSteps": 4
    },
    "message": "Application submitted successfully",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response (HTTP 400 Bad Request)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Please select a license class or service to submit.",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

---

### 4.8 Member 7: Citizen Portal (Appointments, Licenses & Notifications)

#### `GET /api/portal/appointments/my-appointments`
- **Description**: Retrieves citizen scheduled and past driving test appointments.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "usr-apt-01",
        "testType": "Practical Driving Test",
        "date": "20 Oct 2024",
        "time": "10:00 AM",
        "center": "Nasr City Traffic & Licensing Center",
        "status": "Confirmed",
        "fee": 150,
        "appointmentNumber": "APT-78921"
      }
    ],
    "message": "User appointments retrieved",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `POST /api/portal/appointments/book`
- **Description**: Books a new vision, theory, or practical driving test appointment.
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "testType": "Vision Test",
    "date": "2025-05-15",
    "time": "09:30 AM",
    "center": "Nasr City Traffic Center"
  }
  ```
  - `testType` *(required, string)*
  - `date` *(required, string)*
- **Success Response (HTTP 201 Created)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "usr-apt-1729135800000",
      "testType": "Vision Test",
      "date": "2025-05-15",
      "time": "09:30 AM",
      "center": "Nasr City Traffic Center",
      "status": "Confirmed",
      "appointmentNumber": "APT-38914"
    },
    "message": "Appointment booked successfully",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response (HTTP 400 Bad Request)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Test type and date are required to book an appointment.",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `GET /api/portal/licenses/my-licenses`
- **Description**: Retrieves citizen digital license cards with QR verification strings.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "usr-lic-01",
        "licenseNumber": "EG-2987654321",
        "holderName": "Noura Mohamed Ahmed",
        "nationalId": "2987654321",
        "licenseClass": "Class 3 - Private Vehicle",
        "issueDate": "15 Mar 2023",
        "expiryDate": "15 Mar 2033",
        "status": "Active",
        "donorStatus": "Organ Donor (Yes)",
        "bloodType": "O+",
        "qrVerificationCode": "LIC-EG-2987654321-VERIFIED"
      }
    ],
    "message": "User licenses retrieved",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `GET /api/portal/notifications`
- **Description**: Retrieves citizen inbox notifications and system alerts.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "notif-001",
        "title": "Test Appointment Confirmed",
        "message": "Your Practical Driving Test is scheduled for 20 Oct 2024 at 10:00 AM at Nasr City Center.",
        "date": "14 Oct 2024 02:15 PM",
        "isRead": false,
        "type": "appointment"
      }
    ],
    "message": "Notifications retrieved",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### `PATCH /api/portal/notifications/:id/read`
- **Description**: Marks a specific notification as read.
- **Success Response (HTTP 200)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "notif-001",
      "isRead": true
    },
    "message": "Notification marked as read",
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```
- **Error Response (HTTP 404 Not Found)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "NOTIFICATION_NOT_FOUND",
      "message": "Notification 'notif-999' not found",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

---

### 4.9 Central Routing & Unhandled Exception Fallbacks

#### Unmatched Routes (`notFoundHandler`)
- **Trigger**: Any HTTP request targeting an unregistered path (e.g. `GET /api/nonexistent`).
- **Response (HTTP 404 Not Found)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "RESOURCE_NOT_FOUND",
      "message": "Cannot GET /api/nonexistent - Endpoint not found",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

#### Unhandled Exceptions (`errorHandler`)
- **Trigger**: Any uncaught Error thrown during controller or service execution.
- **Response (HTTP 500 Internal Server Error)**:
  ```json
  {
    "success": false,
    "error": {
      "code": "INTERNAL_SERVER_ERROR",
      "message": "An unexpected internal server error occurred",
      "details": []
    },
    "meta": { "timestamp": "2026-10-17T03:30:00.000Z" }
  }
  ```

---

## 5. Frontend API Client (`apiClient.js`) Integration Standard

Frontend modules consume backend endpoints exclusively via `frontend/src/shared/api/apiClient.js`.

### 5.1 Client Design
- Automatically prefixes relative endpoint paths with `VITE_API_BASE_URL` (default `http://localhost:5000/api`).
- Automatically serializes request bodies to JSON when objects are passed.
- Sets standard `'Content-Type': 'application/json'` header.

### 5.2 Error Propagation Standard
When an endpoint responds with HTTP 4xx or 5xx, or when `data.success === false`, `apiClient` throws an enhanced `Error` object containing:
- `error.message`: Extracted from `data.error.message` (or fallback `data.message` / HTTP status string).
- `error.status`: HTTP numeric status code (e.g., `400`, `404`, `409`).
- `error.code`: Machine-readable error code (e.g., `VALIDATION_ERROR`, `DUPLICATE_NATIONAL_ID`).
- `error.details`: Array of specific field-level validation errors.
- `error.meta`: Response metadata object.
- `error.data`: Full raw response payload.

### 5.3 Typical Frontend Consumption Pattern
```javascript
import apiClient from '../../../shared/api/apiClient.js';

// GET request
try {
  const response = await apiClient.get('/services');
  console.log(response.data); // array of services
} catch (err) {
  console.error(err.code, err.message, err.status);
}

// POST request with error handling
try {
  const result = await apiClient.post('/admin/people', {
    nationalId: '29876543210123',
    firstName: 'Ahmed',
    lastName: 'Hassan',
  });
  console.log('Created person:', result.data);
} catch (err) {
  if (err.status === 409) {
    alert(`Conflict: ${err.message}`);
  } else {
    alert(`Failed: ${err.message}`);
  }
}
```

---

## 6. Continuous Verification & Testing

To ensure code and contracts remain synchronized:

```bash
# Run backend API contract test suite
npm test
# Or from backend directory
cd backend && npm test
```

The test runner:
1. Instantiates the complete Express application on an ephemeral port.
2. Validates all 32 registered endpoints.
3. Tests both valid payloads (HTTP 200/201) and error branches (HTTP 400, 404, 409).
4. Asserts that 100% of responses adhere to `{ success: true, data, message, meta }` or `{ success: false, error: { code, message, details }, meta }`.

---

## 7. Cross-References & Documentation Index

- [**Master Technical Architecture (docs/ARCHITECTURE.md)**](ARCHITECTURE.md) — Comprehensive technical blueprint, request flow, full API table, database roadmap, folder catalog, and Section 12 Security Checklist.
- [**Git & Monorepo Merge Workflow (docs/merge-workflow.md)**](merge-workflow.md) — Branch naming standards, PR requirements, conflict resolution, and folder ownership policies.
- [**Database Architecture & Roadmap (database/README.md)**](../database/README.md) — PostgreSQL schema definitions, ER diagrams, and Supabase integration roadmap.
- [**Repository Quick Start (README.md)**](../README.md) — Monorepo setup, execution commands, and project overview.

