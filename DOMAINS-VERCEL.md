# Domain Strategy, Cloudflare Registrar & Vercel Guide — Action Sciage

All domain checks below were verified live against official Verisign (`.com`), AFNIC (`.fr`), SWITCH (`.ch`), and DENIC (`.de`) RDAP registries on **2026-11-22**.

---

## 1. What to Buy on Cloudflare Registrar vs Keep at IONOS

**Important Cloudflare Registrar Note:** Cloudflare Registrar supports **`.com`** domains at wholesale cost, but **does NOT currently support `.fr`, `.de`, or `.ch`** direct registration/transfers.

| Role | Domain | Registry Status | Where to Manage |
| :--- | :--- | :--- | :--- |
| **Global Primary Canonical** | **`actionsciage.com`** | **AVAILABLE** | **Buy on Cloudflare Registrar** |
| **Hyphenated International Alias** | **`action-sciage.com`** | **AVAILABLE** | **Buy on Cloudflare Registrar** (`301` -> `actionsciage.com`) |
| **Optional Local SEO Alias** | `sciagebetonalsace.com` (or `sciagealsace.com`) | **AVAILABLE** | **Optional `.com` on Cloudflare Registrar** (`301` -> `actionsciage.com/fr`) |
| **Existing French Brand Domain** | **`action-sciage.fr`** | **ACTIVE (Owned)** | **Keep registered on IONOS** (point web DNS to Vercel or Cloudflare DNS Free) |

---

## 2. CRITICAL — Keeping `contact@action-sciage.fr` Email Live

Whether you manage DNS at IONOS or move DNS (via Free Cloudflare DNS NS) for `action-sciage.fr`:
- **NEVER delete or alter** your `MX`, `SPF` (`TXT`), `DKIM`, or mail records for `action-sciage.fr`.
- Set web records only:
  - `A` `@` -> `76.76.21.21` (Vercel)
  - `CNAME` `www` -> `cname.vercel-dns.com.`
  - Remove any stale `AAAA` record on `@`.
- **Important if using Cloudflare DNS Proxy:** Set the **Cloudflare Proxy toggle to DNS Only (Grey Cloud)** on `@` and `www` so Vercel provisions Let's Encrypt TLS cleanly without redirect loops.

---

## 3. Deploying on Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new) and import `emestud/action-sciage`.
2. Leave **Framework Preset** as `Other`, **Build Command** empty, **Output Directory** as `.`.
3. Under **Project -> Settings -> Domains**, attach `actionsciage.com`, `www.actionsciage.com`, `action-sciage.com`, `www.action-sciage.com`, `action-sciage.fr`, and `www.action-sciage.fr`.
4. Submit `https://actionsciage.com/sitemap.xml` in **Google Search Console**.
