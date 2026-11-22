# Domain Strategy & Vercel Deployment Guide — Action Sciage

All domain checks below were verified live against official Verisign (`.com`), AFNIC (`.fr`), SWITCH (`.ch`), DENIC (`.de`), and EURid (`.eu`) RDAP registries on **2026-11-22**.

---

## 1. Recommended Domain Portfolio

| Role | Domain | Registry Status | Why It Matters |
| :--- | :--- | :--- | :--- |
| **Global Primary Canonical** | **`actionsciage.com`** | **AVAILABLE** | Cleanest zero-hyphen trilingual domain for **FR / EN / DE** Three-Borders operations (Alsace, Basel, Südbaden). |
| **Defensive International Alias** | **`action-sciage.com`** | **AVAILABLE** | Protects the hyphenated `.com` and permanently redirects (`301`) to `https://actionsciage.com`. |
| **French Historic Domain** | **`action-sciage.fr`** | **ACTIVE (Owned)** | Lucas's existing official domain on IONOS; `vercel.json` routes `/` directly to `/fr` and 301-redirects legacy WordPress URLs. |
| **Optional Cross-Border Aliases** | `actionsciage.fr`, `actionsciage.ch`, `actionsciage.de` | **AVAILABLE** | Optional expansion domains to capture zero-hyphen FR / CH / DE traffic directly. |

---

## 2. CRITICAL — Preserving `contact@action-sciage.fr` Email on IONOS

When migrating `action-sciage.fr` from WordPress/IONOS hosting to **Vercel**:

- **DO NOT** change IONOS nameservers (`NS` records).
- **DO NOT** delete or modify existing `MX`, `TXT` (SPF/DKIM), or mail subdomain records (`mail`, `autodiscover`, etc.) on IONOS.
- **ONLY update these web DNS records** in the IONOS DNS Zone for `action-sciage.fr`:
  1. Remove any stale `AAAA` record on `@` (`apex`) if present.
  2. Set `A` record `@` -> `76.76.21.21` (Vercel Anycast IP).
  3. Set `CNAME` record `www` -> `cname.vercel-dns.com.` (or `A` `www` -> `76.76.21.21` if IONOS prefers).

Doing this keeps `contact@action-sciage.fr` running on IONOS mail servers with zero downtime while serving the fast static site from Vercel.

---

## 3. Deploying to Vercel via GitHub (`emestud/action-sciage`)

1. Open [https://vercel.com/new](https://vercel.com/new) and import `emestud/action-sciage`.
2. Configure Build Settings:
   - **Framework Preset:** `Other`
   - **Build Command:** *(leave empty)*
   - **Output Directory:** `.`
3. Click **Deploy** (deploys globally in ~5 seconds).
4. Open **Project -> Settings -> Domains** and attach:
   - `actionsciage.com` & `www.actionsciage.com`
   - `action-sciage.com` & `www.action-sciage.com`
   - `action-sciage.fr` & `www.action-sciage.fr`
5. Vercel automatically provisions Let's Encrypt TLS certificates for every attached domain.
