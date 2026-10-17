# Licentra Git & Monorepo Collaboration Workflow

This document sets the mandatory Git collaboration rules, branch naming standards, code review requirements, and merge conflict resolution policies for the **7-member Licentra engineering team**.

---

## 1. Core Architecture Principles

1. **Single Monorepo Repository**:
   - The entire frontend, backend, database migrations, and documentation reside in **one central GitHub repository** (`Licentra`).
   - Do NOT create separate GitHub repositories for individual team members.
2. **Feature-Based Folder Isolation**:
   - Frontend files must be kept inside your assigned folder: `frontend/src/members/member-X/`.
   - Backend files must be kept inside your assigned folder: `backend/src/members/member-X/`.
   - Never edit another team member's folder.
3. **Protected Main Branch**:
   - Direct commits and pushes to `main` are strictly prohibited via GitHub branch protection rules.
   - All code merges into `main` must happen through an approved GitHub Pull Request (PR).

---

## 2. Team Member Feature Branches

Each team member works on an isolated feature branch named after their assigned responsibility. Because 19 pages cannot be divided equally by 7, workload is **complexity-weighted**: members with fewer pages carry higher per-page UI complexity or more backend modules. For the full complexity breakdown, see [`ARCHITECTURE.md §5.1`](ARCHITECTURE.md#51-complexity-weighted-workload-assessment).

| Member | Focus Domain | Pages | Complexity Weight | Recommended Branch Name | Assigned Folder |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **Member 1** | Public Core & Inquiries | 3 | Medium | `feature/member-1-public-core` | `src/members/member-1/` |
| **Member 2** | Public Catalog & Guides | 4 | Medium-High | `feature/member-2-public-catalog` | `src/members/member-2/` |
| **Member 3** | Admin Insights & Governance | 2 | Medium-High | `feature/member-3-admin-analytics` | `src/members/member-3/` |
| **Member 4** | Admin Operations: People & Apps | 2 | **High** | `feature/member-4-admin-operations` | `src/members/member-4/` |
| **Member 5** | Admin Operations: Licenses & Tests | 2 | **High** | `feature/member-5-admin-licensing` | `src/members/member-5/` |
| **Member 6** | User Portal: Profile & Submissions | 3 | **High** | `feature/member-6-user-portal` | `src/members/member-6/` |
| **Member 7** | User Portal: Activity & Records | 3 | **High** | `feature/member-7-user-records` | `src/members/member-7/` |

---

## 3. Central Registration Files & Governance

Feature-based folder isolation ensures that members work in separate subdirectories, which minimizes merge conflicts across features. However, code collisions can still occur whenever shared central files or dependencies are touched. To maintain architectural integrity and resolve integration conflicts cleanly, central orchestration files have strict governance:

- **Frontend Router**: `frontend/src/app/router.jsx`
- **Backend App Registration**: `backend/src/app.js`

### Golden Rule:
> **Only the designated Integration Lead / Architect modifies central registration files.**
> Team members export their route definitions or components cleanly from their member folder. When a member submits a PR, the integration lead verifies that only files within `member-X/` were touched, or handles the one-line central import registration.

---

## 4. Pull Request & Code Review Process

1. **Ensure branch is up-to-date with `main`** before creating a PR.
2. **Open a GitHub Pull Request** targeting `main`:
   - Title: `feat(member-X): implement [feature description]`
   - PR description: List the pages/endpoints implemented and attach testing confirmation.
3. **Code Review Criteria**:
   - All code is confined to `members/member-X/`.
   - No hardcoded secrets or environment variables.
   - Adheres to API contracts ([`api-contracts.md`](api-contracts.md)).
   - Linter and build scripts pass (`npm run build:frontend`).
4. **Approval**: At least 1 peer approval + Integration Lead approval before merging.
5. **Merge Strategy**: Use **"Squash and merge"** or **"Rebase and merge"** to keep `main` git history clean and linear.

---

## 5. Daily Git Workflow & Conflict Resolution

### Starting Work
```bash
# 1. Checkout main and pull latest changes
git checkout main
git pull origin main

# 2. Checkout your feature branch
git checkout feature/member-1-public-core

# 3. Synchronize with latest main
git merge main
```

### Committing and Pushing Changes
```bash
# Stage only your member files
git add frontend/src/members/member-1/ backend/src/members/member-1/

# Commit with a descriptive conventional commit message
git commit -m "feat(member-1): add public contact inquiry endpoint and form"

# Push to your remote feature branch
git push origin feature/member-1-public-core
```

### Resolving Merge Conflicts
If `main` has changed and GitHub flags conflicts:

```bash
# 1. Update local main
git checkout main
git pull origin main

# 2. Switch back to your feature branch
git checkout feature/member-1-public-core

# 3. Merge main into your branch
git merge main

# 4. If Git reports conflicts, open the conflicted files
# Search for <<<<<<< HEAD markers, resolve the code cleanly, and save.

# 5. Stage the resolved files and finish the merge commit
git add .
git commit -m "merge: resolve conflicts with main"
git push origin feature/member-1-public-core
```

---

## 6. Shared Database Changes (Future Phase)

When database implementation begins:
- All schema alterations will be tracked exclusively in `database/migrations/` as numbered SQL files (e.g., `002_add_phone_index.sql`).
- Never apply direct manual DDL in Supabase studio without a matching migration file committed to git.
- Database migration files will be reviewed and deployed exclusively during the centralized merge into `main`.
