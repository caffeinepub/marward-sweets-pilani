# Specification

## Summary
**Goal:** Rebrand the app as “Marward Sweets Pilani”, add a working Instagram contact link, and provide owner-only tools to add sweets and update prices.

**Planned changes:**
- Update all user-facing shop name text across header, footer, and home/landing content to “Marward Sweets Pilani”.
- Replace placeholder social link(s) with an Instagram link to https://instagram.com/marward_sweets_pilani that opens in a new tab with `rel="noopener noreferrer"`, and display the handle as “@marward_sweets_pilani”.
- Add backend persistence for a mutable sweets catalog plus authenticated, owner-only methods to add a sweet and update a sweet’s price.
- Add an owner-only “Owner/Manage Catalog” UI (Internet Identity sign-in required) to add new sweets (name, description, category, price, image path) and update prices, with catalog views updating without hard refresh after changes.

**User-visible outcome:** The app shows “Marward Sweets Pilani” branding everywhere, provides a working Instagram contact link/handle, and the signed-in owner can add sweets and change prices with updates reflected immediately in the catalog and sweet details.
