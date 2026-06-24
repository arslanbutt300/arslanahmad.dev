# Brain & Bricks — Project Achievements

> A premium duo studio website built with Astro 6, Tailwind v4, and GSAP. Hosted on Cloudflare Workers. Domain `brainandbricks.com`.

**Last updated:** 2026-06-23
**Status:** Production
**Live URL:** https://brainandbricks.com

---

## 🎯 What This Is

A unified brand and portfolio site for **two brothers, two crafts**:

- **Arslan Ahmad** — Principal iOS Engineer (6+ years, 12+ apps shipped)
- **Muhammad Bilal** — Sr Quality Inspector (12+ years precast QC, UAE & Bahrain)

One domain, dual portfolios, shared blog. Code and concrete, designed to last.

---

## 🏗️ Tech Stack

| Layer | Choice | Why |
|---|---|---|
| **Framework** | Astro 6 | Static-first, MDX-native, blazing fast |
| **Styling** | Tailwind CSS v4 + CSS variables | Theme tokens via `:root` allow runtime swaps |
| **Smooth scroll** | Lenis v1 | Industry standard 2026 |
| **Animations** | GSAP + ScrollTrigger | Timelines, scroll-reveal, parallax |
| **3D effects** | CSS transforms + SVG | No external libraries — pure CSS |
| **Content** | Astro Content Collections (MDX) | Type-safe blog & projects |
| **Deploy** | Cloudflare Workers + Wrangler | Edge-deployed static |
| **Email** | Cloudflare Email Routing | hello@brainandbricks.com → Gmail |
| **Repo** | GitHub `arslanbutt300/arslanahmad.dev` | Cloudflare auto-deploys on push |

---

## 🎨 Brand System

### Name
**Brain & Bricks** — two brothers, two crafts, one foundation.

### Logo
3D isometric cube with code symbol `</>` on left face, brick pattern on right face, green accent dot above. Theme-reactive — colors update via CSS variables.

### Taglines
- Hero: *"Built with brain and bricks."*
- About: *"Where intelligence meets structure."*
- Footer: *"Code and concrete, designed to last."*

### Theme System — 9 switchable themes

Each theme is a CSS variable scope. One body class swaps the entire site palette instantly. Persisted via `localStorage`.

#### Dark (6)
| Theme | Accent | Vibe |
|---|---|---|
| **Vercel Mint** ⭐ default | `#00D084` | Premium SaaS, Linear/Vercel |
| Purple × Brick | `#9D94FF` | Original brand identity |
| Neon Mint | `#00FFD1` | Cyberpunk / hacker |
| Ocean Amber | `#4F9CF9` | Corporate trust |
| Sunset Violet | `#C084FC` | Creative bold |
| Cyber Rose | `#FF3D8B` | Futuristic statement |

#### Light (3)
| Theme | Accent | Vibe |
|---|---|---|
| Porcelain Cream | `#5B52C8` | Warm editorial |
| Frosted Sky | `#2563EB` | Cool SaaS-clean |
| Sandstone Mint | `#0D9488` | Designer studio |

User can switch via the **🎨** button bottom-right of every page.

---

## 📄 Pages Shipped

| Route | Purpose |
|---|---|
| `/` | Brand home — Maxel/Linear-style hero with portrait + halo + rotating cube backdrop, About both brothers, Projects, Services, Contact |
| `/arslan` | Arslan's portfolio — Skills, Experience (NDA-anonymized), Personal projects, AI-First section, Security expertise, Education |
| `/bilal` | Bilal's portfolio — Competencies, Experience timeline (4 jobs), Key projects, Education, Credentials with custom SVG icons |
| `/blog` | Multi-author publication — category filter (All / iOS & Dev / Precast & QC) with counts, persisted URL state |
| `/blog/[...slug]` | Blog post — category-aware footer ("Arslan writes about iOS" vs "Bilal writes about precast"), author byline links to portfolio |
| `/labs` | Experimental projects gallery |

---

## ✨ Premium Hero Pattern

The hero uses a **Maxel-style premium SaaS layout**:

1. **Layered backplate**:
   - Animated mesh gradient bg
   - Subtle grid overlay
   - Floating particles (~35 spawned via JS)
   - Right-side radial spotlight echoing the photo position
2. **Rotating 3D cube** behind portrait (theme-reactive via CSS vars)
3. **Radial green glow** (50% opacity blur) — the signature "premium halo"
4. **Conic rim light arc** for cinematic edge lighting
5. **Portrait with double-mask** (radial vignette + linear bottom fade) — dissolves seamlessly into bg, **zero rectangular edges**
6. **Bottom theme-color overlay** ties feet into bg
7. **3 floating tech tags** with `backdrop-filter: blur(14px)`
8. **Glassmorphism stats card** with backdrop blur + inset highlight
9. **Continuous floating animation** (6s ease loop) + hover lift + mouse-follow parallax

Same pattern applied to `/arslan` and `/bilal` with brand-color variations.

---

## 📝 Blog Content (4 posts shipped)

| Author | Title | Category |
|---|---|---|
| Arslan | Building a Ghost Trail Engine with CoreLocation | iOS |
| Bilal | Pre-Pour vs Post-Pour Inspections | Precast |
| Bilal | Mix Design Trials — Lessons from 12 Years in the Concrete Lab | Precast |
| Bilal | Hollow Core Slabs — What Production Inspectors Actually Look For | Precast |

Posts auto-classify by tags. Category filter on `/blog` works with persisted URL state (`?cat=ios`, `?cat=precast`).

---

## 🚀 Performance & UX

- ✅ **9 pages, 3.5 sec build time**
- ✅ **Static HTML** — instant initial render
- ✅ **Eager-loaded hero image** with `fetchpriority="high"`
- ✅ **GSAP scroll triggers** for progressive reveal
- ✅ **3D tilt cards** on hover (mouse-tracked perspective transforms)
- ✅ **Magnetic cursor glow** following mouse (mix-blend: screen)
- ✅ **Lenis smooth scroll** synced with GSAP ticker
- ✅ **Fully responsive** — mobile (375px) → desktop (1440px+)
- ✅ **Hamburger drawer nav** on mobile

---

## 🌍 Live Infrastructure

### Domain
- `brainandbricks.com` — registered on Cloudflare Registrar (~$12.20/year)
- Auto-renew enabled
- DNS managed by Cloudflare

### Hosting
- Cloudflare Workers (with `wrangler.toml` for asset deploy)
- Custom domain attached to worker
- Auto-deploys from GitHub `main` branch
- Build: `npm run build` → `dist/`
- Deploy: `npx wrangler deploy`

### Email Routing
| Custom Address | Forwards to |
|---|---|
| `hello@brainandbricks.com` | `arslanbutt300@gmail.com` |
| `arslan@brainandbricks.com` | `arslanbutt300@gmail.com` |
| `contact@brainandbricks.com` | `arslanbutt300@gmail.com` |
| `bilal@brainandbricks.com` | `arslanbutt300@gmail.com` (will reroute to Bilal's Gmail) |
| **Catch-all** | `arslanbutt300@gmail.com` (typos, future addresses) |

---

## 🧱 Architecture Choices Worth Documenting

### Why CSS variables instead of Tailwind themes
Tailwind v4 has theme support, but for *runtime* theme swaps (user-controlled, persisted), CSS variables in `.theme-*` body classes are simpler and faster — no rebuild, no JS class shuffling beyond one body class.

### Why mix-blend-mode for portraits instead of bg removal
The user's photos already had dark vignette backgrounds. `mix-blend-mode: lighten` blends those into any theme's dark bg without needing AI bg removal. Faster, free, and works across all 9 themes automatically. Plus a radial + linear stacked mask kills any remaining rectangular feel.

### Why NDA-anonymize Ozoned Digital projects
Arslan's day-job projects (Jubilee Active, Jubilee Agent, JForce) are client-confidential. Portfolio shows the work category and tech stack without naming clients — protects the relationship while still showcasing capability.

### Why a single domain instead of subdomains for personal portfolios
- Single SSL cert, single deploy, single bill
- SEO benefit — all traffic strengthens one domain
- Cleaner shareable URLs: `brainandbricks.com/arslan` vs `arslan.brainandbricks.com`

---

## 🎁 What's Special About This Build

1. **Two-author duo branding** — rarely seen in personal sites
2. **9 themes, all theme-reactive** (including the rotating cube logo)
3. **Custom 3D cube logo** built in SVG, themable via CSS variables
4. **Premium SaaS hero** rivaling Linear, Vercel, Framer aesthetics
5. **Category-aware blog** — single publication, two voices, auto-routed
6. **Glassmorphism stats** with backdrop blur and inset highlights
7. **Mobile-first responsive** — hamburger drawer, photo-first stacking
8. **AI-first development** — built almost entirely through AI-paired coding

---

## 📦 Repository Structure (key files)

```
arslanahmad.dev/
├── src/
│   ├── components/
│   │   ├── Hero.astro                  # Premium SaaS hero
│   │   ├── Nav.astro                   # Clean nav + mobile drawer
│   │   ├── Footer.astro
│   │   ├── About.astro                 # Two brothers cards
│   │   ├── Projects.astro              # Featured FootSteps + NDA card
│   │   ├── Services.astro              # iOS + QC services
│   │   ├── BlogPreview.astro
│   │   ├── Contact.astro
│   │   └── ThemeSwitcher.astro         # 9-theme floating switcher
│   ├── content/
│   │   └── blog/                       # MDX posts (Arslan + Bilal)
│   ├── layouts/
│   │   └── BaseLayout.astro            # Theme class + Lenis + GSAP
│   ├── pages/
│   │   ├── index.astro                 # Home
│   │   ├── arslan.astro                # Arslan's portfolio
│   │   ├── bilal.astro                 # Bilal's portfolio
│   │   ├── labs.astro
│   │   └── blog/
│   │       ├── index.astro             # Category-filtered list
│   │       └── [...slug].astro         # Category-aware post template
│   └── styles/
│       ├── global.css                  # Tokens + utilities + animations
│       └── themes.css                  # 9 theme variants
├── public/
│   ├── arslan-cutout.png               # Hero portrait (used on / and /arslan)
│   ├── bilal-avatar.svg                # Generic person silhouette for Bilal
│   └── favicon.svg                     # Cube logo
├── astro.config.mjs                    # site: brainandbricks.com
├── wrangler.toml                       # Cloudflare deploy config
└── PROJECT.md                          # This file
```

---

## ⏭️ What's Pending

- [ ] **Bilal's real photo** — currently using SVG silhouette avatar. When Bilal provides his portrait, swap `bilal-avatar.svg` → `bilal-cutout.png` in `/bilal.astro`.
- [ ] **Bilal's email routing target** — currently routes to Arslan's Gmail. Update to Bilal's email (`mdbilal8924@gmail.com`) once confirmed.
- [ ] **Formspree form ID** — `Contact.astro:23` has `YOUR_FORM_ID` placeholder. Sign up at formspree.io and paste real ID.
- [ ] **LinkedIn URLs** — both brothers' LinkedIn profiles are `#` placeholders in Footer + Contact.
- [ ] **Spline 3D hero scene** — original Phase 5 plan included a Spline scene. Current cube backdrop is a great substitute; can revisit later.
- [ ] **footsteps.brainandbricks.com** — subdomain marketing site for FootSteps app (separate Astro project, deploy as second Worker).
- [ ] **Bilal's full project history** — credential cards are populated; if Bilal wants individual project case studies, add them to `/bilal` page.

---

## 🛠️ Local Development

```bash
cd /Users/macbook/Desktop/arslanahmad.dev
npm install
npm run dev          # localhost:4321
npm run build        # generates dist/
npx wrangler deploy  # pushes to Cloudflare Workers
```

Or simply `git push origin main` — Cloudflare auto-deploys on every push.

---

*Built with brain and bricks. Code and concrete, designed to last.*
