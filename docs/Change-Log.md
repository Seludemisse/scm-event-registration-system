# Change Log

| CR ID | Date       | Description                                                                 | Status       |
|------ |------------|------------------------------------------------------------------------------|--------------|
| CR-01 | 2025-12-22 | Authentication: Login and Sign Up with salted SHA-256 password hashing       | Implemented  |
| CR-02 | 2025-12-22 | Events: Create event (image upload/resizing), event list UI, details modal   | Implemented  |
| CR-03 | 2025-12-24 | Dashboard: Registration flow, counters, and “My Registered” page             | Implemented  |

Notes (batched under umbrella CRs for traceability):
- CR-01 includes:
  - 2025-12-15: Add login page with hashed passwords
  - 2025-12-22: Add sign up page for new users
- CR-02 includes:
  - 2025-12-18: Improve event list UI (cards, search)
  - 2025-12-25: Create event page with image upload/resizing
  - 2025-12-28: Event details modal with owner edit (image/description)
- CR-03 includes:
  - 2025-12-16: Add “My Registered” page (registrations on dashboard)
  - 2025-12-24: Dashboard registration flow and counters
  - 2025-12-29: Enhance “My Registered Events” (list + unregister) and prevent duplicate/self registration
  - 2025-12-29: Add registered-events count beside “My Registered Events” in the nav
  - 2025-12-29: Add details modal on My Registered page

## Release mapping
- v1.0: CR-01, CR-02
- v1.1: CR-03

## Branching
Development work was performed on feature branches (primarily `feature-login` for course deliverables) and merged into the stable `main` branch via pull requests.
