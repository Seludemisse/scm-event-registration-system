# Configuration Audit Report (Deliverable 6) — Mini Event Registration System

**Repository:** https://github.com/Seludemisse/scm-event-registration-system.git  
**Branch audited:** `feature-login` (default branch: `main`)  
**Audit date:** 2025-12-29  
**Audit types:** Physical Configuration Audit (PCA) and Functional Configuration Audit (FCA)  
**Audit method:** Document + codebase sampling based on repository artifacts provided (see Section 2).  
**Overall result:** **Pass with minor nonconformities** (corrective actions recommended in Section 6).

---

## 1. Purpose
This report records the results of the required configuration audits:

- **Physical Configuration Audit (PCA):** confirm configuration items (CIs) exist, are properly named, and that documentation and version references are consistent with the repository.
- **Functional Configuration Audit (FCA):** confirm approved change requests (CRs) are implemented and that delivered features satisfy basic system requirements.

---

## 2. Audit Scope, Evidence, and Limitations

### 2.1 In-scope configuration items (sampled)
**Documentation (`docs/`):**
- `docs/SCMP.md`
- `docs/Change-Log.md`

**Source (`src/`):**
- `src/login.html`
- `src/signup.html`
- `src/login.js`
- `src/styles.css`
- `src/dashboard.html`
- `src/events.html`
- `src/create-event.html`

### 2.2 Out-of-scope / not provided for direct inspection (impacts FCA confidence)
The SCMP references additional artifacts that were **not provided for inspection** in this audit package (examples):
- `docs/CI-Register.md`
- `docs/BL1-Record.md`, `docs/BL2-Record.md`
- `src/event-card.js`
- `src/registration.js`
- `src/my-registered.html` (implied by navigation links)

Where these items affect conclusions, results are marked as **“Not verified (evidence not provided)”** and listed as follow-up checks.

---

## 3. Physical Configuration Audit (PCA)

### 3.1 PCA checklist and results

| PCA Control | Expected | Observed (evidence) | Result |
|---|---|---|---|
| Documents match repository structure | Docs and referenced files exist under `docs/` and `src/` | `docs/SCMP.md` describes `docs/` and `src/` structure; sampled files exist and match described purpose | Pass (sampled) |
| CIs properly named | Consistent naming (lowercase + hyphens for web pages; standard doc names) | `create-event.html`, `my-registered.html` (linked), `Change-Log.md`, `SCMP.md` align with conventions described in SCMP | Pass (sampled) |
| Document naming consistency | Document names consistent across references | SCMP references `CI-Register.md`, `BL1-Record.md`, `BL2-Record.md`; not provided here to confirm exact names/paths | Not verified |
| Version numbers consistent | Versions/tags documented and used consistently (e.g., v1.0, BL1/BL2 tags) | SCMP describes semantic versions and baseline tags, but no tag evidence is included in the audit package | Not verified |
| No uncontrolled/unknown artifacts in sampled set | Files should map to requirements/CRs | Sampled files are directly related to CR list (login/signup/events/dashboard/create) | Pass (sampled) |

### 3.2 PCA observations (noted issues)
1. **Baseline and CI register evidence missing from the audit package.**  
   SCMP references baseline records and a CI register, but they were not provided for verification in this audit evidence set.

2. **Versioning is described but not evidenced.**  
   SCMP states baseline tags (BL1/BL2) and release tags (v1.0/v1.1). Without a tag list or baseline record content, consistency cannot be confirmed.

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
The Change Log lists CR-01 through CR-09. Verification below is based on sampled evidence.

| CR ID | Description (per Change Log) | Evidence reviewed | Status |
|---|---|---|---|
| CR-01 | Add login page with hashed passwords | `src/login.html`, `src/login.js` show login form + SHA-256 hashing with per-user salt stored in `localStorage` | Implemented (verified) |
| CR-02 | Add “My Registered” page (registrations on dashboard) | Navigation links reference `my-registered.html`; page content not provided | Not verified (evidence not provided) |
| CR-03 | Improve event list UI (cards, search) | `src/dashboard.html` includes events grid + search input; references `event-card.js` for card rendering (not provided) | Partially verified |
| CR-04 | Add sign up page for new users | `src/signup.html` + signup handler in `src/login.js` (`signupForm`) | Implemented (verified) |
| CR-05 | Dashboard registration flow and counters | `src/dashboard.html` shows registered count in nav (`My Registered Events (n)`); registration flow depends on `registration.js` (not provided) | Partially verified |
| CR-06 | Create event page with image upload/resizing | `src/create-event.html` implements file input + canvas resize to WebP/JPEG + preview | Implemented (verified) |
| CR-07 | Event details modal with owner edit (image/description) | `src/dashboard.html` creates details modal; owner-only actions include edit description and edit image | Implemented (verified) |
| CR-08 | Enhance “My Registered Events” (list + unregister) and prevent duplicate/self registration | Duplicate/self logic likely in `registration.js` (not provided); my-registered page not provided | Not verified (evidence not provided) |
| CR-09 | Add registered-events count beside “My Registered Events” in the nav | `dashboard.html`, `events.html`, `create-event.html` update nav link text to include count | Implemented (verified) |

### 4.3 Functional tests (manual reasoning from code paths; sampled)
**Authentication & session control**
- Pages `dashboard.html`, `events.html`, `create-event.html` check `ers_session`; redirect to `login.html` if missing.  
  **Result:** Pass (verified in sampled files).

**Signup**
- `signup.html` collects first/last/email/password; `login.js` validates required fields and minimum length; creates salted hash; stores in `ers_users`; sets `ers_session`.  
  **Result:** Pass.

**Login**
- `login.html` posts credentials; `login.js` verifies salted hash match; sets `ers_session`.  
  **Result:** Pass.

**Event creation**
- `create-event.html` creates event objects in `ers_events`; includes optional resized image data URL.  
  **Result:** Pass.

**Event listing and owner edit**
- `events.html` lists events owned by logged-in user; provides “Edit image” via hidden uploader and resize pipeline.  
- `dashboard.html` includes modal allowing owner edits (description/image).  
  **Result:** Pass.

**Registration & unregister**
- Dashboard uses `registration.js` and calls `registerForEvent(...)`; unregister and duplicate/self-registration prevention are claimed by CR-08 but cannot be confirmed without `registration.js` and `my-registered.html`.  
  **Result:** Not verified.

---

## 5. Compliance Summary

### 5.1 PCA outcome
- **Compliant (sampled):** naming conventions, presence of primary docs and core source pages.
- **Gaps:** CI Register and Baseline Records not verified; version/tag evidence not verified.

### 5.2 FCA outcome
- **Verified implemented:** CR-01, CR-04, CR-06, CR-07, CR-09.
- **Partially verified:** CR-03, CR-05 (dependencies not included in evidence set).
- **Not verified:** CR-02, CR-08 (missing `my-registered.html` and `registration.js` evidence).

---

## 6. Nonconformities and Corrective Actions

### NC-01 — Baseline and CI register verification missing
- **Type:** PCA nonconformity (evidence gap)
- **Risk:** Reduced traceability; baseline integrity cannot be audited.
- **Corrective action:** Ensure the following exist under `docs/` and match SCMP references, then include them in the next audit package:
  - `docs/CI-Register.md`
  - `docs/BL1-Record.md`
  - `docs/BL2-Record.md`

### NC-02 — Version/tag consistency not evidenced
- **Type:** PCA nonconformity (evidence gap)
- **Risk:** Releases/baselines may be described but not reproducible.
- **Corrective action:** Provide a tag list (e.g., screenshot/export of `git tag`) or add a short “Baseline/Release Tag Index” section to documentation.

### NC-03 — CR-02 and CR-08 cannot be functionally confirmed
- **Type:** FCA nonconformity (verification gap)
- **Risk:** “My Registered Events” and unregister/duplicate/self-registration prevention may not meet requirements.
- **Corrective action:** Include `src/my-registered.html` and `src/registration.js` in the audit evidence set; add minimal test notes demonstrating:
  - Attempt to register twice → blocked
  - Attempt to register for own event → blocked
  - Unregister flow removes event from registrations and updates counts

---

## 7. Conclusion and Sign-off
Based on the sampled artifacts provided, the system demonstrates functioning authentication, event creation with image resizing, event listing, and owner-only editing via a details modal. Navigation registration counters are implemented across sampled pages.

The audit **passes with minor nonconformities**, primarily due to missing evidence for baseline/version controls and missing artifacts required to confirm the “My Registered Events” and registration integrity features.

**Next audit recommendation:** Re-run PCA/FCA after adding CI Register + baseline records + tag evidence and including `my-registered.html` and `registration.js` in the audit package.
