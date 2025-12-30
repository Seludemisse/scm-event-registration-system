# Tests (Manual)

This project uses manual smoke tests (no automated test runner).

## Smoke Test Steps
1. Open `src/signup.html` → create a new account → verify redirect to dashboard.
2. Logout → open `src/login.html` → login → verify redirect.
3. Create an event (optional image) → verify it appears in events list.
4. Register for an event → verify “My Registered Events (N)” increments.
5. Unregister from “My Registered Events” → verify count decrements.
