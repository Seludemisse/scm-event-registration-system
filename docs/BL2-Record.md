# Baseline Record — BL2

**Project:** Mini / Campus Event Registration System  
**Baseline ID:** BL2  
**Date:** 2025-12-29  
**Branch:** `main`  
**Tag:** `BL2`  

## Purpose
Baseline BL2 captures the working prototype implementing CR-01 through CR-09.

## Contents (CIs)
**Docs**
- `docs/SCMP.md`
- `docs/Change-Log.md`
- `docs/CI-Register.md`
- `docs/Configuration-Audit-Report.md`
- `docs/Change-Requests/CR-01.md` through `docs/Change-Requests/CR-09.md`

**Source**
- `src/login.html`, `src/signup.html`, `src/login.js`, `src/styles.css`
- `src/dashboard.html`, `src/events.html`, `src/create-event.html`
- `src/my-registered.html`, `src/event-card.js`, `src/registration.js`
- `src/assets/volunteer.webp`

## Verification
Manual smoke tests recorded in `tests/README.md`.
# Baseline 2 (BL2) Record

## Baseline Identification
- **Baseline ID:** BL2
- **Date:** 2025-12-29
- **Repository:** scm-event-registration-system
- **Branch:** main
- **Git Tag:** BL2
- **Commit:** TBD

## Scope / Contents
This baseline captures the working prototype with approved change requests implemented, including:
- Authentication (signup/login) using localStorage with salted SHA-256 password hashing
- Dashboard event listing with search and registration flow
- “My Registered Events” list with unregister support and duplicate/self-registration prevention
- Create Event flow with optional image upload + resizing
- Event details modal with owner-only editing (description/image)
- Navigation registered-events count badge/text

## Included Change Requests
- CR-01 through CR-09 (see `Change-Log.md`)

## Verification / Audit Notes
- Functional smoke test: TBD
- CI presence check vs CI Register: TBD

## Approvals
- **SCM Manager:** Sefina Kamile
- **Reviewer/QA:** Saron Abebe
- **Date Approved:** 2025-12-29
