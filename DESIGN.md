# DESIGN.md: SLB-C Yayasan 88 Palembang (Modern Visual Edition)

## Design Read
Reading this as: modern, visual-first school profile landing page for parents of children with intellectual disabilities (Tunagrahita/C) in Palembang, in a crisp contemporary editorial photography style, dial ENERGY 3 / RHYTHM 3 / MOTION 2.

## Three Dials
- **Dial:** ENERGY 3 / RHYTHM 3 / MOTION 2
- **ENERGY 3 (Bold & Welcoming):** High-impact visual photography, generous breathing room, crisp pure-white canvas punctuated by a deep charcoal showcase band, and punchy short copy that parents can scan in seconds.
- **RHYTHM 3 (Varied):** Distinct visual composition per section: full-bleed photographic split hero with floating school badge, large-format visual gallery of school programs, sleek dark charcoal Visi & Jenjang interactive showcase, photographic highlight showcase with interactive modal for the complete 26-item facility directory, compact leadership & educator spotlight with expandable full roster modal, and split modern WhatsApp consultation + map section.
- **MOTION 2 (Purposeful):** Smooth hover zoom on photography frames, crisp state transitions on tabs and modals, and subtle scroll reveals (`IntersectionObserver`), disabled cleanly under `prefers-reduced-motion: reduce`.

## Visual Identity & Motif
- **Identity Motif:** Crisp rounded photography frames (`20px` radius) paired with tight-tracked `Bricolage Grotesque` display numerals and berry-magenta (`#B81D5E`) focal markers drawn directly from the official `88` school emblem.
- **Theme Decision (R-21):** Fixed crisp light canvas (`#FFFFFF` / `#F5F4F7`) with one deliberate dark contrast showcase band (`#141216`) for visual rhythm and hierarchy.

## Verified Color Palette (WCAG 2.x AA/AAA Checked)
Core colors: 2 (Crisp White + Deep Charcoal) + 1 Primary Brand Color (Berry-Magenta from the official `88` logo) + 1 Supporting Accent (Deep Emerald from the campus courtyard & WhatsApp CTA).

| Token | Hex | Role | Verified Contrast |
|---|---|---|---|
| `--bg-white` | `#FFFFFF` | Primary crisp page canvas | Base |
| `--bg-stone` | `#F5F4F7` | Subtle alternate surface | Base |
| `--bg-dark` | `#141216` | High-contrast modern showcase band & footer | 18.62:1 with white |
| `--bg-rose-tint` | `#FDF1F6` | Soft highlight for brand accents | 5.66:1 with `--brand-berry` |
| `--bg-emerald-tint` | `#ECF7F2` | Soft highlight for emerald tags & form feedback | 6.78:1 with `--brand-emerald` |
| `--ink-primary` | `#141216` | Primary headings & body copy | 18.62:1 on white |
| `--ink-muted` | `#524D57` | Secondary text & captions | 8.21:1 on white |
| `--brand-berry` | `#B81D5E` | Primary brand identity (official logo `88`) | 6.22:1 with white |
| `--brand-berry-soft` | `#F472A8` | High-contrast rose accent on dark showcase band | 6.93:1 on `#141216` |
| `--brand-emerald` | `#146145` | Secondary organic accent & WhatsApp CTA | 7.43:1 with white |
| `--border-subtle` | `#E6E3EA` | Clean hairline dividers | Decorative |
| `--border-control` | `#76707C` | Form input borders & interactive outlines | 4.80:1 on white |

## Typography
- **Display / Headings:** `Bricolage Grotesque` (Google Fonts). Contemporary expressive grotesque with warm curves and tight display tracking (`-0.03em`) that feels modern, human, and confident rather than dated or corporate.
- **Body / UI:** `Plus Jakarta Sans` (Google Fonts). Crisp, friendly Indonesian-designed sans-serif for effortless scanning on mobile and desktop.

## Decision Log (R-31 One-Line Reasons)
- **Why this color palette?** Preserves the authentic magenta `88` logo and green campus identity while replacing dated beige with crisp pure white and a sleek charcoal showcase band.
- **Why cut ~65% of surface text and move full tables into modals?** Parents scan landing pages visually; keeping the main scroll short and photographic makes the page inviting while keeping 100% of the PDF's 26 facilities and 13 staff accessible in one click.
- **Why this typography?** `Bricolage Grotesque` delivers unmistakable 2026 visual energy with warm human proportions, paired with `Plus Jakarta Sans` for sharp readability.
- **Why 4 temporary documentary photos alongside the 2 real school assets?** Gives the page rich, authentic visual storytelling immediately (confirmed by the user under R-23), clearly structured so real school photos can drop right in later.
- **Why selective elevation?** Shadows sit only on the primary consultation card and interactive modals so photographic frames stay crisp and grounded.
