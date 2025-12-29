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
