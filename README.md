# Licentra — Driving & Vehicle License Department

> **Official Full-Stack Driving License Management Web Application**  
> Built with a **Feature-Based Monorepo Architecture** for a collaborative team of 7 developers.

---

> 📖 **Primary Technical Reference**:  
> For the complete, authoritative system architecture, 19-page directory specifications, REST API reference tables, and database roadmap, read [**Master Architecture Blueprint (docs/ARCHITECTURE.md)**](docs/ARCHITECTURE.md).

---

## 1. Project Overview

**Licentra** is an enterprise-grade digital driving license and vehicle department platform designed to modernize citizen license issuance, theory and practical testing, license renewals, replacements, and traffic administrative enforcement.

### Key Architectural Characteristics

- **Single Monorepo**: One React application, one Express server, one shared future database integration point.
- **Feature-Based Team Ownership**: Each of the 7 team members owns an isolated subfolder in both `frontend/src/members/member-X/` and `backend/src/members/member-X/`.
- **Isolated Feature Branches**: Team members develop their assigned features in isolated subdirectories to minimize code collisions. Integration conflicts in shared central files (`router.jsx`, `app.js`) are governed through the Integration Lead as described in [`docs/merge-workflow.md`](docs/merge-workflow.md).
- **Postponed Database Integration**: All business logic runs on the **Repository Pattern** with mock data collections. When PostgreSQL/Supabase is introduced in Phase 2, queries will be swapped primarily in repositories; schema evolution, foreign key constraints, and relational error handling will be coordinated across service layers.
- **The 19 Official Pages**: Across 3 core areas: Public Website (7), Admin Dashboard (6), and Citizen User Portal (6). All 19 page components are currently `PlaceholderPage` scaffolds awaiting member UI implementation.

### Architectural Status Legend

| Status Label | Definition & Scope in Licentra |
| :--- | :--- |
| **Implemented and tested** | Backend routes, controllers, services, repositories, and middleware exist, run against mock data, and pass automated test assertions in `backend/test-api.js` (172 passing). |
| **Implemented but not adequately tested** | Code exists and executes (e.g., layouts, API client, graceful shutdown), but lacks automated unit or integration tests. |
| **Scaffolded or placeholder only** | Components and routes exist and mount cleanly, but render placeholder UI (`PlaceholderPage`). **All 19 frontend page components currently have this status.** |
| **Planned** | Architected and documented; scheduled for future development phases (e.g., production React UI, JWT auth, RBAC, rate limiting). |
| **Postponed** | Deliberately deferred to Phase 2 to prevent early database or infrastructure blockers (Supabase PostgreSQL connectivity). |
| **Complete** | Architectural foundations, routing tables, directory structures, and monorepo scaffolding that are fully initialized and stable. |

---

## 2. The 3 System Areas & 19 Official Pages

The application is structured into 3 distinct functional areas comprising exactly 19 official pages:

### A. Public Website (7 Pages)
1. **Home** (`/`) — Landing page with hero banner, service shortcuts, and news highlights.
2. **About** (`/about`) — Department mission, vision, values, and road safety goals.
3. **Services** (`/services`) — Catalog of citizen licensing services, fees, and processing times.
4. **License Classes** (`/license-classes`) — Overview of the 7 driving license categories, eligibility, and fees.
5. **Driving Tests** (`/driving-tests`) — Public educational guide for Vision, Theory, and Practical road driving tests.
6. **News** (`/news`) — Traffic regulations updates, department news, and driving tips.
7. **Contact** (`/contact`) — Public inquiry form, department hotline, and branch locations.

### B. Admin Dashboard (6 Pages)
1. **Overview & Statistics** (`/admin`) — Executive KPI metrics, pass rates, and application trends.
2. **People Management** (`/admin/people`) — Civilian registry, national ID verification, and contact records.
3. **Applications Management** (`/admin/applications`) — Application review, status updates, and document approval.
4. **License Management** (`/admin/licenses`) — Issued licenses, suspensions/holds (detentions), and fine collection.
5. **Tests & Appointments** (`/admin/tests-appointments`) — Examination schedules and examiner score entry.
6. **Reports & Settings** (`/admin/reports-settings`) — System configuration, fee schedules, and appointment rules.

### C. User Portal (6 Pages)
*(Navigating to `/portal` redirects automatically to `/portal/profile`)*
1. **My Profile** (`/portal/profile`) — Personal civilian details, address, and uploaded documents.
2. **Submit Application** (`/portal/submit-application`) — Multi-step wizard to file for new licenses or renewals.
3. **My Applications** (`/portal/my-applications`) — Real-time tracking of filed applications and payment receipts.
4. **Appointments** (`/portal/appointments`) — Citizen test booking and appointment schedule.
5. **My Licenses** (`/portal/my-licenses`) — Digital driving license cards and QR verification codes.
6. **Notifications** (`/portal/notifications`) — System alerts, appointment reminders, and approval notices.

---

## 3. Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend** | React.js + Vite | React 18, Vite 6 | Single-Page Application (SPA) with React Router v6 |
| **Backend** | Node.js + Express.js | Express 4, Node 20+ | Modular RESTful API with ES Modules (`type: "module"`) |
| **Styling** | Vanilla CSS Tokens | Custom | Design tokens inspired by modern public service portals |
| **Database** | PostgreSQL (Supabase) | Phase 2 | **Postponed for Phase 1** (In-memory mock repositories active) |
| **API Client** | Native Fetch Client | Custom (`apiClient.js`) | Pre-configured environment-driven client (`VITE_API_BASE_URL`) |

---

## 4. Team Member Assignments (7 Members / 19 Pages)

> **Workload principle**: Distribution is **complexity-weighted**, not page-count-equal. 19 pages cannot be divided evenly by 7. Members with fewer pages carry more backend modules, more API endpoints, or higher per-page UI complexity. For the complete complexity analysis, see [**§5.1 of ARCHITECTURE.md**](docs/ARCHITECTURE.md#51-complexity-weighted-workload-assessment).

| Member | Focus Domain | Pages (Count) | Frontend Pages & Routes | Backend API Routes | Backend Modules | Complexity Weight |
| :--- | :--- | :---: | :--- | :--- | :---: | :---: |
| **Member 1** | Public Core & Inquiries | 3 | • Home (`/`) — data-aggregation landing page<br>• About (`/about`) — static informational<br>• Contact (`/contact`) — validated inquiry form | `/api/contact` | 1 | Medium |
| **Member 2** | Public Catalog & Guides | 4 | • Services (`/services`)<br>• License Classes (`/license-classes`)<br>• Driving Tests (`/driving-tests`) \* frontend-only guide<br>• News (`/news`) | `/api/services`<br>`/api/license-classes`<br>`/api/news` | 3 | Medium-High |
| **Member 3** | Admin Insights & Governance | 2 | • Overview & Statistics (`/admin`) — KPI charting dashboard<br>• Reports & Settings (`/admin/reports-settings`) — config editor | `/api/admin/analytics`<br>`/api/admin/settings` | 2 | Medium-High |
| **Member 4** | Admin Operations: People & Apps | 2 | • People Management (`/admin/people`) — paginated table + registration<br>• Applications Management (`/admin/applications`) — status workflow | `/api/admin/people`<br>`/api/admin/applications` | 2 | **High** |
| **Member 5** | Admin Operations: Licenses & Tests | 2 | • License Management (`/admin/licenses`) — detention/fine actions<br>• Tests & Appointments (`/admin/tests-appointments`) — exam scheduler | `/api/admin/licenses`<br>`/api/admin/tests` | 2 | **High** |
| **Member 6** | User Portal: Profile & Submissions | 3 | • My Profile (`/portal/profile`) — editable citizen details<br>• Submit Application (`/portal/submit-application`) — **multi-step wizard**<br>• My Applications (`/portal/my-applications`) — status tracker | `/api/portal/profile`<br>`/api/portal/applications` | 2 | **High** |
| **Member 7** | User Portal: Activity & Records | 3 | • Appointments (`/portal/appointments`) — calendar booking<br>• My Licenses (`/portal/my-licenses`) — **digital ID + QR**<br>• Notifications (`/portal/notifications`) — alert feed | `/api/portal/appointments`<br>`/api/portal/licenses`<br>`/api/portal/notifications` | 3 | **High** |

> \* `Driving Tests` is a **frontend-only** public educational guide with no dedicated backend module in Member 2's folder. This offsets Member 2's higher page count.

---

## 5. Directory Structure Overview

```text
Licentra/
├── docs/
│   ├── ARCHITECTURE.md       # Master Technical Architecture Blueprint (SSOT)
│   ├── api-contracts.md      # REST API conventions and standard response envelopes
│   └── merge-workflow.md     # Team Git branching, PR, and conflict-resolution rules
├── database/
│   └── README.md             # Target PostgreSQL schema, ERD, and migration plan
├── frontend/
│   ├── src/
│   │   ├── app/ (App.jsx, router.jsx)
│   │   ├── layouts/ (PublicLayout, AdminLayout, UserLayout, Layouts.css)
│   │   ├── shared/ (apiClient.js, PlaceholderPage.jsx)
│   │   └── members/ (member-1 through member-7)
│   │       └── [*Page.jsx] — All 19 page components are currently PlaceholderPage scaffolds (full UI to be built per-member)
├── backend/
│   ├── src/
│   │   ├── config/ (env.js, database.js)
│   │   ├── middleware/ (requestLogger, errorHandler, notFoundHandler, mockAuthGuard)
│   │   ├── shared/ (httpStatus.js, response.js)
│   │   └── members/ (member-1 through member-7)
├── .env.example
├── package.json
└── README.md
```

---

## 6. Quick Start & Execution Guide

### Prerequisites

- Node.js: `v18+` or `v20+`
- npm: `v9+` or `v10+`

### Step 1: Install Dependencies

From the workspace root, run:

```bash
npm run install:all
```

### Step 2: Environment Configuration (Optional)

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

*(Note: The system runs out-of-the-box with default fallback values even without creating `.env` files).*

### Step 3: Run the Application

```bash
# Option A: Run Frontend & Backend concurrently from root
npm run dev

# Option B: Run Backend only (Port 5000)
npm run dev:backend

# Option C: Run Frontend only (Port 5173)
npm run dev:frontend
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **API Health Check**: `http://localhost:5000/api/health`

### Step 4: Production Build & Validation

```bash
# Build frontend bundle
npm run build:frontend

# Preview frontend production build
npm run preview:frontend

# Start production backend server
npm run start:backend
```

---

## 7. Security Architecture & Prototype Access Control

> [!CAUTION]
> ### 🚨 CRITICAL DATA PRIVACY & SECURITY WARNING
> **Licentra is currently operating in Phase 1 Prototype / Mock Mode.**  
> - **Production Authentication is POSTPONED**: No passwords, JWTs, sessions, or credentials are verified.
> - **Role-Based Access Control (RBAC) is POSTPONED**: All `/api/admin/*` and `/api/portal/*` endpoints are unauthenticated.
> - **Frontend Route Hiding is NOT Security**: Showing or hiding sidebar links in React does NOT secure the underlying API.
> - **DATA SAFETY RULE**: **UNDER NO CIRCUMSTANCES MUST REAL CITIZEN RECORDS, NATIONAL IDS, OR PERSONALLY IDENTIFIABLE INFORMATION (PII) BE ENTERED, TESTED, OR STORED IN THIS SYSTEM BEFORE PHASE 2 PRODUCTION SECURITY CONTROLS ARE IMPLEMENTED.**

### 7.1 Current Security Posture

| Dimension | Current Phase 1 Status | Planned Phase 2 Control |
|---|---|---|
| **Authentication** | **Mock Unauthenticated Mode** (Zero token/credential verification) | Supabase Auth / JWT Access + Refresh Tokens with bcrypt password hashing |
| **Authorization / RBAC** | **Postponed** (All callers have unrestricted access to mock APIs) | Role guards (`Admin`, `Officer`, `Examiner`, `Citizen`) attached to Express routes |
| **Identity Context** | **Simulated Identities** (`usr-noura` citizen, `System Administrator` admin) | Authenticated session context extracted from validated bearer tokens |
| **Data Persistence** | **In-Memory Arrays** (Reset on process restart) | PostgreSQL relational tables with Row-Level Security (RLS) policies |
| **Production Fail-Safe** | **Active Guard** (`mockAuthGuard` blocks production execution without explicit bypass) | Production-ready configuration with strict HTTPS, secrets, and CORS |

### 7.2 Protected Endpoint Categories & Sensitivity Tiers

1. **Tier 1 — High-Risk Admin Operations (System Governance & Mutations)**:
   - `PUT /api/admin/settings` (Department fees, appointment lock hours)
   - `POST /api/admin/licenses/:id/detain` (Suspension, impoundment, fines)
   - `PATCH /api/admin/applications/:id/status` (Application approval/rejection)
   - `POST /api/admin/tests/appointments/:id/result` (Examiner scoring, pass/fail)
   - `POST /api/admin/people` (Civilian registry registration)
2. **Tier 2 — Citizen PII & Confidential Records**:
   - `GET /api/admin/people`, `GET /api/admin/people/:id` (National ID, names, phone, address, DOB)
   - `GET /api/admin/applications`, `GET /api/admin/licenses` (Citizen records and suspension flags)
   - `GET /api/portal/profile/me`, `PUT /api/portal/profile/me` (Personal profile details)
   - `GET /api/portal/licenses/my-licenses` (Digital ID cards and QR codes)
   - `GET /api/portal/applications/my-applications`, `POST /api/portal/applications/submit` (Filing records)
   - `GET /api/portal/appointments/my-appointments`, `POST /api/portal/appointments/book` (Test bookings)
   - `GET /api/portal/notifications`, `PATCH /api/portal/notifications/:id/read` (Citizen inbox)
3. **Tier 3 — Public Domain Information**:
   - `GET /api/health`, `GET /api/services`, `GET /api/license-classes`, `GET /api/news`, `POST /api/contact`

### 7.3 Fail-Safe Guard & Deployment Safeguards

To ensure unauthenticated mock mode cannot silently be exposed in production:
- **Server Startup Gate**: In `backend/src/server.js`, setting `NODE_ENV=production` causes an immediate fatal exit unless explicitly bypassed with `ALLOW_INSECURE_MOCK_MODE=true`.
- **API Guard Middleware**: `mockAuthGuard` intercepts all `/api/admin/*` and `/api/portal/*` requests, injecting `X-Licentra-Auth-Status: unauthenticated-mock-mode` and returning HTTP 503 `SECURITY_CONFIGURATION_ERROR` in production if unbypassed.
- **Frontend UI Guard**: A prominent amber security banner is rendered across the Admin Dashboard and User Portal shells alerting testers that mock identity is simulated.

### 7.4 Required Production Controls

Before moving to production with live citizen records, the application must implement:
1. **Cryptographic Authentication**: JWT dual-token model (short-lived access tokens + httpOnly secure refresh tokens).
2. **Password Hashing**: Bcrypt with salt rounds ≥ 12 (or Argon2id) for all user credentials.
3. **Role-Based Authorization (RBAC)**: Express route guards enforcing `Admin`, `Officer`, `Examiner`, or `Citizen` roles.
4. **Ownership Enforcement**: Verification that citizen portal actions match `req.user.personId` to prevent IDOR attacks.
5. **Input Validation**: Strict schema validation (Zod/Joi) across all 32 endpoints to prevent injection.
6. **Infrastructure Hardening**: Helmet HTTP security headers, CORS origin locking, and rate limiting (`express-rate-limit`).
7. **Database Row-Level Security**: Supabase PostgreSQL RLS policies ensuring database-level data boundary enforcement.

*For complete implementation specifications, see [**Master Architecture Blueprint (§12.4)**](docs/ARCHITECTURE.md#124-required-production-controls-phase-2-requirements).*

### 7.5 Prioritized Security Roadmap

Phase 2 security implementation follows this priority sequence:
- **Priority 0 (Critical - Production Blockers)**: User credentials table, bcrypt hashing, login/refresh endpoints, `requireAuth` & `requireRole` middleware, citizen ownership verification.
- **Priority 1 (High - Staging & API Hardening)**: Request schema validation, rate limiting, Helmet security headers, strict `.env` boot validator.
- **Priority 2 (Medium - Compliance & Assurance)**: Tamper-evident audit logging, PII redaction in logs, database RLS policies, automated security test suites, dependency scanning.

*For the complete itemized checklist, see [**Master Architecture Blueprint (§12.5)**](docs/ARCHITECTURE.md#125-prioritized-security-implementation-checklist-phase-2-roadmap).*

---

## 8. Documentation Index

- [**Master Technical Architecture (docs/ARCHITECTURE.md)**](docs/ARCHITECTURE.md) — Comprehensive technical blueprint, request flow, full API table, database roadmap, folder catalog, and Section 12 Security Checklist.
- [**Authoritative API Contracts (docs/api-contracts.md)**](docs/api-contracts.md) — Single Source of Truth for all 32 REST endpoints, request/response JSON envelopes, and status codes.
- [**Git & Monorepo Merge Workflow (docs/merge-workflow.md)**](docs/merge-workflow.md) — Branch naming standards, PR requirements, conflict resolution, and folder ownership policies.
- [**Database Architecture & Roadmap (database/README.md)**](database/README.md) — PostgreSQL schema definitions, ER diagrams, and Supabase integration roadmap.

## Repository Structure

- `frontend/` — Frontend application.
- `backend/` — Backend API and server-side logic.
- `database/` — Database scripts and schema.
- `docs/` — Project documentation and architecture references.

## Prerequisites

Before running Licentra, make sure you have:

- Node.js and npm installed.
- Git installed to clone the repository.
- A code editor such as Visual Studio Code.
- The environment variables configured according to the project documentation.

Refer to the project documentation for setup instructions.
