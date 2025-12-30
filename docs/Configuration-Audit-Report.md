# Configuration Audit Report (Deliverable 6) — Mini Event Registration System

**Repository:** https://github.com/Seludemisse/scm-event-registration-system.git  
**Branch audited:** `main`  
**Audit date:** 2025-12-29  
**Audit types:** Physical Configuration Audit (PCA) and Functional Configuration Audit (FCA)  
**Audit method:** Document + codebase inspection based on repository artifacts.  
**Overall result:** **Pass**

---

## 1. Purpose
This report records the results of the required configuration audits:

- **Physical Configuration Audit (PCA):** confirm configuration items (CIs) exist, are properly named, and that documentation and version references are consistent with the repository.
- **Functional Configuration Audit (FCA):** confirm approved change requests (CRs) are implemented and that delivered features satisfy basic system requirements.

---

## 2. Audit Scope, Evidence, and Limitations

### 2.1 In-scope configuration items (verified)
**Documentation (`docs/`):**
- `docs/SCMP.md` — SCM Plan document
- `docs/Change-Log.md` — Change log tracking all CRs
- `docs/CI-Register.md` — Configuration Item register (30 CIs)
- `docs/CR-Form.md` — Change Request form template
- `docs/Configuration-Audit-Report.md` — This audit report
- `docs/BL1-Record.md` — Baseline 1 record
- `docs/BL2-Record.md` — Baseline 2 record
- `docs/Change-Requests/CR-01.md` through `docs/Change-Requests/CR-09.md` — Individual CRs
- `docs/Change-Requests/CR-Form-Template.md` — Reusable CR template

**Source (`src/`):**
- `src/login.html` — Login page
- `src/signup.html` — Signup page
- `src/dashboard.html` — Dashboard with event listing
- `src/events.html` — Events management page
- `src/create-event.html` — Create event page
- `src/my-registered.html` — My registered events page
- `src/login.js` — Authentication logic
- `src/event-card.js` — Event card component
- `src/registration.js` — Registration logic
- `src/styles.css` — Stylesheet
- `src/assets/volunteer.webp` — Volunteer image asset

**Releases (`releases/`):**
- `releases/v1.0-Release-Notes.md` — v1.0 release notes
- `releases/v1.1-Release-Notes.md` — v1.1 release notes

**Tests (`tests/`):**
- `tests/README.md` — Manual smoke test documentation

### 2.2 Verification Status
All referenced artifacts have been verified present in the repository.

---

## 3. Physical Configuration Audit (PCA)

### 3.1 PCA checklist and results

| PCA Control | Expected | Observed (evidence) | Result |
|---|---|---|---|
| Documents match repository structure | Docs and referenced files exist under `docs/`, `src/`, `releases/`, `tests/` | All folders present with expected files | **Pass** |
| CIs properly named | Consistent naming (lowercase + hyphens for web pages; standard doc names) | `create-event.html`, `my-registered.html`, `event-card.js`, `registration.js`, `Change-Log.md`, `SCMP.md` align with conventions | **Pass** |
| Document naming consistency | Document names consistent across references | All documents match SCMP references | **Pass** |
| Version numbers consistent | Versions/tags documented and used consistently (v1.0, v1.1, BL1, BL2) | SCMP, baseline records, and release notes all reference consistent versions | **Pass** |
| CI Register complete | All CIs tracked in CI-Register.md | 30 CIs documented covering all project artifacts | **Pass** |
| Baseline records present | BL1 and BL2 records exist | `docs/BL1-Record.md` and `docs/BL2-Record.md` present and complete | **Pass** |
| No uncontrolled artifacts | Files should map to requirements/CRs | All files directly related to CR list | **Pass** |

### 3.2 PCA observations
All configuration items are properly tracked, named according to conventions, and organized in the correct folder structure. The CI Register now comprehensively lists all 30 CIs with proper versioning and ownership information.

---

## 4. Functional Configuration Audit (FCA)

### 4.1 Basic requirements (derived from SCMP + UI flows present in source)
Minimum functional expectations for this system (client-side, `localStorage` based):
- Users can **sign up** and **log in**
- Authenticated users can access **dashboard**
- Users can **view events**, **create events**, and **register/unregister**
- UI supports **search** and **basic event management**
- Changes are traceable to CRs in the Change Log

### 4.2 CR implementation verification (traceability)
The Change Log lists CR-01 through CR-09. Verification based on code inspection:

| CR ID | Description (per Change Log) | Evidence reviewed | Status |
|---|---|---|---|
| CR-01 | Add login page with hashed passwords | `src/login.html`, `src/login.js` show login form + SHA-256 hashing with per-user salt stored in `localStorage` | **Implemented** |
| CR-02 | Add "My Registered" page | `src/my-registered.html` displays user's registered events with unregister functionality | **Implemented** |
| CR-03 | Improve event list UI (cards, search) | `src/dashboard.html` includes events grid + search input; `src/event-card.js` handles card rendering | **Implemented** |
| CR-04 | Add sign up page for new users | `src/signup.html` + signup handler in `src/login.js` (`signupForm`) | **Implemented** |
| CR-05 | Dashboard registration flow and counters | `src/dashboard.html` shows registered count in nav; `src/registration.js` handles registration flow | **Implemented** |
| CR-06 | Create event page with image upload/resizing | `src/create-event.html` implements file input + canvas resize to WebP/JPEG + preview | **Implemented** |
| CR-07 | Event details modal with owner edit | `src/dashboard.html` creates details modal; owner-only actions include edit description and edit image | **Implemented** |
| CR-08 | Enhance "My Registered Events" and prevent duplicate/self registration | `src/registration.js` prevents duplicate and self-registration; `src/my-registered.html` shows list + unregister | **Implemented** |
| CR-09 | Add registered-events count in navigation | `src/dashboard.html`, `src/events.html`, `src/create-event.html` update nav link text to include count | **Implemented** |

### 4.3 Functional tests (manual verification)
**Authentication & session control**
- Pages `dashboard.html`, `events.html`, `create-event.html`, `my-registered.html` check `ers_session`; redirect to `login.html` if missing.  
  **Result:** Pass

**Signup**
- `signup.html` collects first/last/email/password; `login.js` validates required fields and minimum length; creates salted hash; stores in `ers_users`; sets `ers_session`.  
  **Result:** Pass

**Login**
- `login.html` posts credentials; `login.js` verifies salted hash match; sets `ers_session`.  
  **Result:** Pass

**Event creation**
- `create-event.html` creates event objects in `ers_events`; includes optional resized image data URL.  
  **Result:** Pass

**Event listing and owner edit**
- `events.html` lists events owned by logged-in user; provides "Edit image" via hidden uploader and resize pipeline.  
- `dashboard.html` includes modal allowing owner edits (description/image).  
  **Result:** Pass

**Registration & unregister**
- `registration.js` handles `registerForEvent()` and `unregisterFromEvent()` functions.
- Duplicate registration prevention verified.
- Self-registration prevention (cannot register for own event) verified.
- `my-registered.html` displays registered events and allows unregistration.  
  **Result:** Pass

---

## 5. Compliance Summary

### 5.1 PCA outcome
- **Compliant:** All naming conventions followed, all CIs present and tracked, folder structure correct, version/tag evidence documented.

### 5.2 FCA outcome
- **Verified implemented:** CR-01 through CR-09 — all change requests fully implemented and verified.

---

## 6. Nonconformities and Corrective Actions

**No nonconformities identified.**

All previously identified gaps have been resolved:
- CI Register now includes all 30 configuration items
- Baseline records are complete with verification status
- All source files (`my-registered.html`, `registration.js`, `event-card.js`) are present and verified
- Test documentation exists in `tests/README.md`

---

## 7. Conclusion and Sign-off
Based on the complete audit of all artifacts, the system demonstrates:
- Functioning authentication with secure password hashing
- Complete event management (create, list, edit, delete)
- Registration flow with duplicate/self-registration prevention
- Proper SCM documentation and traceability

The audit **passes** with all configuration items verified and all change requests implemented.

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Auditor | Saron Abebe | 2025-12-29 | Approved |
| SCM Manager | Sefina Kamile | 2025-12-29 | Approved |
| Project Lead | Selamawit Demissie | 2025-12-29 | Approved |
