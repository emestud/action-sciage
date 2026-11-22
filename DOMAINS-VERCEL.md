# Domain Strategy, Cloudflare Registrar & Vercel Guide — Action Sciage

Live status verified on **2026-11-22**.

---

## 1. Domain & DNS Status

| Role | Domain | Status | Where Managed |
| :--- | :--- | :--- | :--- |
| **Global Primary Canonical** | **`actionsciage.com`** | **ACTIVE (Cloudflare + Vercel Live)** | Cloudflare Registrar -> Vercel (`200 OK` on `/fr`) |
| **Hyphenated International Alias** | **`action-sciage.com`** | **ACTIVE (`308` -> `actionsciage.com`)** | Cloudflare Registrar -> Vercel |
| **Existing French Brand Domain** | **`action-sciage.fr`** | **Registered at IONOS (Email Active)** | IONOS (`vercel.json` pre-configured `301` -> `actionsciage.com`) |
| **Optional Local SEO Aliases** | `sciagebetonalsace.com`, `sciagealsace.com`, `demolitionalsace.com` | **AVAILABLE** | Optional `.com` on Cloudflare Registrar (`301` -> `/fr`) |

> [!NOTE]
> Live SSL check on `2026-11-22` showed `www.actionsciage.com` missing a matching TLS SAN (`curl: (60)`). In Cloudflare DNS add `CNAME www -> cname.vercel-dns.com.` (Grey Cloud / DNS Only) and attach `www.actionsciage.com` under **Vercel -> Project -> Settings -> Domains** (pointing to `actionsciage.com`). On Vercel, also point `action-sciage.com` directly to `actionsciage.com` to skip the intermediate `www.action-sciage.com` hop.

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

## 3. Post-Launch SEO Actions (Unlocked Now)

1. **Google Search Console:** Add Domain Property `actionsciage.com` (auto-verified via Cloudflare DNS) and submit `https://actionsciage.com/sitemap.xml`.
2. **Google Business Profile & Socials:** Update Lucas Gaidella's Action Sciage (Wittenheim) website URL on Google Business Profile and Facebook (`facebook.com/actionsciage/`) to `https://actionsciage.com/fr`.
3. **Optional `action-sciage.fr` cutover:** Point `action-sciage.fr` web records (`A @ -> 76.76.21.21`, `CNAME www -> cname.vercel-dns.com.`) to Vercel while leaving IONOS `MX` / `SPF` / `DKIM` untouched; `vercel.json` already permanently `301`-redirects all legacy URLs (`/societe`, `/contact`, `/actualites-2`, etc.) to `actionsciage.com`.
