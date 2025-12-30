# Test Documentation

## Overview
This document records the manual smoke tests performed for the Mini Event Registration System to verify functionality against approved change requests (CR-01 through CR-09).

## Test Environment
- **Browser:** Chrome/Firefox/Edge (latest versions)
- **Storage:** localStorage (client-side)
- **Test Date:** 2025-12-29
- **Tester:** Saron Abebe

---

## Test Cases

### TC-01: User Signup (CR-04)
| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Navigate to `signup.html` | Signup form displayed | Pass |
| 2 | Enter valid first name, last name, email, password | Fields accept input | Pass |
| 3 | Click "Sign Up" button | User created, redirected to dashboard | Pass |
| 4 | Attempt signup with existing email | Error message displayed | Pass |
| 5 | Attempt signup with password < 6 characters | Validation error shown | Pass |

### TC-02: User Login (CR-01)
| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Navigate to `login.html` | Login form displayed | Pass |
| 2 | Enter valid credentials | User authenticated, redirected to dashboard | Pass |
| 3 | Enter invalid password | Error message displayed | Pass |
| 4 | Enter non-existent email | Error message displayed | Pass |

### TC-03: Session Management
| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | After login, navigate to dashboard | Dashboard loads with user session | Pass |
| 2 | Click "Log Out" | Session cleared, redirected to login | Pass |
| 3 | Directly access `dashboard.html` without session | Redirected to login | Pass |

### TC-04: Event Creation (CR-06)
| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Navigate to `create-event.html` | Create event form displayed | Pass |
| 2 | Fill in event details (title, date, location, description) | Fields accept input | Pass |
| 3 | Upload event image | Image preview shown, resized automatically | Pass |
| 4 | Click "Create Event" | Event saved, appears in events list | Pass |

### TC-05: Event Listing and Search (CR-03)
| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Navigate to dashboard | Events displayed as cards | Pass |
| 2 | Enter search term in search box | Events filtered by title/description | Pass |
| 3 | Clear search | All events displayed again | Pass |

### TC-06: Event Registration (CR-05)
| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Click "Register" on an event card | Registration successful, button changes to "Registered" | Pass |
| 2 | Check navigation badge | Registered count incremented | Pass |
| 3 | Attempt to register for same event again | Blocked with message "Already registered" | Pass |

### TC-07: Self-Registration Prevention (CR-08)
| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | View own created event | "Register" button not shown or disabled | Pass |
| 2 | Attempt to register for own event via console | Registration blocked | Pass |

### TC-08: My Registered Events (CR-02, CR-08)
| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Navigate to `my-registered.html` | List of registered events displayed | Pass |
| 2 | Click "Unregister" on an event | Event removed from list | Pass |
| 3 | Check navigation badge | Registered count decremented | Pass |

### TC-09: Event Details Modal (CR-07)
| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Click on event card to view details | Modal opens with event details | Pass |
| 2 | As event owner, edit description | Save button appears, changes saved | Pass |
| 3 | As event owner, change image | New image uploaded and displayed | Pass |
| 4 | As non-owner, attempt edit | Edit options not visible | Pass |

### TC-10: Navigation Counter (CR-09)
| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Check navigation on dashboard | "My Registered Events (n)" shows correct count | Pass |
| 2 | Check navigation on events page | Same count displayed | Pass |
| 3 | Check navigation on create-event page | Same count displayed | Pass |
| 4 | Register/unregister and refresh | Count updates correctly | Pass |

---

## Test Summary

| Category | Total | Passed | Failed |
|----------|-------|--------|--------|
| Authentication | 9 | 9 | 0 |
| Event Management | 8 | 8 | 0 |
| Registration | 10 | 10 | 0 |
| Navigation | 4 | 4 | 0 |
| **Total** | **31** | **31** | **0** |

---

## Conclusion
All test cases passed. The system meets the functional requirements defined in CR-01 through CR-09.

**Tested By:** Saron Abebe  
**Date:** 2025-12-29  
**Status:** Approved for Release
