# Country dedicated page — template documentation

This document describes the **New Zealand** country page as the **canonical template** for future country pages (`/all-country/[slug]`). Use it when adding another country so structure, typography, motion, and asset layout stay consistent while you swap **theme** (colors, motifs, copy, images).

---

## 1. Reference implementation

| Piece | Location |
|--------|-----------|
| **Route (server)** | `src/app/all-country/new-zealand/page.tsx` |
| **UI (client)** | `src/components/NewZealandPageClient.tsx` |
| **Static assets** | `public/country-dedicated-page/New_Zealand/` (folder name uses underscore + Pascal-style country segment) |
| **Scroll animations** | `src/hooks/useScrollAnimation.ts` (`sectionHeaderVariants`, `staggerContainerVariants`, `cardRevealVariants`) |
| **Layout wrapper** | `src/components/PageLayout.tsx` (Header, `pt-16 lg:pt-20`, Footer, mobile nav) |
| **Breadcrumb** | `src/components/Breadcrumb.tsx` — hero uses `variant="dark"` on dark imagery |

The client component is a **single file** that exports one default component and defines sections as local functions. For a new country you typically **duplicate the file** (e.g. `AustraliaPageClient.tsx`), rename, replace data and theme tokens, then add `src/app/all-country/australia/page.tsx` that mirrors the NZ server page.

---

## 2. Global design system (site-wide)

These apply to every country page unless you intentionally override.

### 2.1 Font

- **Family:** [Noto Sans JP](https://fonts.google.com/noto/specimen/Noto+Sans+JP) (Google Fonts), weights 300–900.
- **Configured in:** `src/app/globals.css` via `@theme { --font-sans: 'Noto Sans JP', system-ui, sans-serif; }`.
- **Body:** `antialiased` on `<body>` in `src/app/layout.tsx`.
- **Practice:** Rely on Tailwind `font-sans` (default). Use **`font-black`** (900) for hero and section titles, **`font-bold`** for subheads and labels, **`font-medium`** for small pills.

### 2.2 Brand tokens (CSS variables in `globals.css`)

| Token | Role |
|--------|------|
| `--color-primary` | Emerald `#059669` (site-wide “かえる留学” green) |
| `--color-accent` | Amber `#F59E0B` |
| Text | `--color-text-primary` (slate-ish), secondary/muted for body |

Country pages **layer Tailwind** (`slate-*`, `emerald-*`, `amber-*`, etc.) on top of this. NZ uses **emerald** as the primary accent; another country might use **blue**, **red**, **violet**, etc., but keep **one primary accent + one secondary** (e.g. amber/sky) for harmony.

### 2.3 Typography scale (patterns used on the template)

| Role | Typical classes |
|------|------------------|
| Hero title | `text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight` |
| Hero subtitle | `text-lg sm:text-xl lg:text-2xl font-bold` |
| Hero body | `text-sm sm:text-base` + `leading-relaxed` |
| Section H2 | `text-2xl lg:text-3xl` or `lg:text-4xl font-black text-slate-800` |
| Accent word in H2 | `text-{accent}-600` (NZ: `emerald-600`) |
| Section subcopy | `text-sm text-slate-500` |
| Eyebrow / pill label | `text-xs font-medium` inside `rounded-full px-3 py-1` |
| Card title | `text-xs sm:text-sm` to `text-base lg:text-lg font-black` or `font-bold` |
| Card body | `text-[11px] sm:text-xs` to `text-sm lg:text-base text-slate-500/600` + `leading-relaxed` |

### 2.4 Shape, depth, spacing

- **Cards:** `rounded-xl` / `rounded-2xl`, often `shadow-sm` → `hover:shadow-md` or `shadow-lg`.
- **Images:** `rounded-2xl`, `ring-4 ring-white` for “premium” photo frames.
- **Section padding:** `py-12 lg:py-16` or `py-14 lg:py-20`.
- **Content width:** `max-w-6xl` or `max-w-7xl` centered; narrow sections (`timeline`, CTA copy) use `max-w-4xl`.
- **Horizontal padding:** `px-4 sm:px-6 lg:px-8`.

---

## 3. Page composition order (do not reorder lightly)

The template **intentionally** follows this **narrative flow**:

1. **Hero** — First impression, country name, JP value prop, CTAs, mascot.
2. **`MountainDivider`** → `color="white"` — Blends hero into next section.
3. **Country appeal** — Three deep reasons (alternating image/text).
4. **`MountainDivider`** → `color="slate"` — Ties to fun facts background family.
5. **Fun facts** — Light, scannable “あるある” with decorative background.
6. **`MountainDivider`** → `color="white"` **`flip`** — Enters testimonials on white.
7. **Testimonials** — Social proof carousel (Sanity-driven).
8. **`MountainDivider`** → `color="emerald"` — Bridges to lifestyle block.
9. **“One day” timeline** — Emotional day-in-the-life story.
10. **`MountainDivider`** → `color="white"` **`flip`**
11. **City highlights** — Destinations, photos, per-city CTA.
12. **`MountainDivider`** → `color="slate"`
13. **Gallery** — Postcard-style draggable strip.
14. **CTA** — Full-width gradient closing with mascot.

**Dividers:** `MountainDivider` is an SVG silhouette whose `fill` depends on `color` (`white`, `slate`, `emerald`) so the **next section’s background** feels continuous. When adding a country, either reuse it or replace with a **theme-specific** divider (e.g. waves, skyline) but keep the **same insertion points** between sections.

---

## 4. Server page responsibilities

`page.tsx` should:

1. Set **`export const revalidate`** (NZ uses `60` seconds) for Sanity (or your CMS) cache.
2. **Fetch** review/voice documents (see NZ GROQ query).
3. **Shuffle/limit** reviews if you want variety (NZ takes 15 random-ish items).
4. Render **only** the country client component, passing `reviews={reviews}`.

If there are no reviews, `TestimonialSection` returns **`null`** — the whole block disappears; dividers still run, which is acceptable, or you can add placeholder copy later.

---

## 5. Section-by-section specification

### 5.1 Hero

- **Layout:** Full-width `section`, `min-h-[520px] lg:min-h-[620px]`, `flex items-center`, `overflow-hidden`.
- **Background:** Next.js `<Image fill priority />` hero photo + layered gradients (`from-black/70`, bottom vignette, optional brand tint e.g. `from-emerald-900/15`).
- **Foreground:** `z-10`, `max-w-7xl`, two-column feel on large screens: **copy left** (`lg:text-left`), **mascot right** (`lg:items-end`).
- **Breadcrumb:** First row; `variant="dark"`; items: `{ label: "留学国一覧", href: "/all-country" }`, then current country.
- **Badge:** Small pill, `backdrop-blur`, border, accent text (NZ: emerald).
- **H1:** English (or local + English); optional animated underline SVG (NZ draws path under “Zealand” in `#34d399`).
- **H2 + paragraph:** Japanese value proposition.
- **Stat chips:** `rounded-full`, `bg-white/10`, `border-white/10`.
- **CTAs:** Primary button (accent solid + shadow), secondary outline on glass.
- **Mascot:** Large responsive sizes, soft `blur-3xl` glow behind, gentle `framer-motion` loop; speech bubble with tail.

**Theming:** Replace gradients, underline stroke, badge colors, and stat labels per country.

---

### 5.2 Country appeal (3 cards)

- **Section bg:** `bg-gradient-to-br from-white via-white to-{accent}-50/30`.
- **Header:** Centered; eyebrow pill + H2 + short line; optional **mascot peek** positioned with `absolute` (hidden on smallest breakpoints if needed).
- **Decor:** Country-specific SVGs (NZ: `FloatingSilverFern`, `KoruSpiral`) at low opacity, `hidden lg:block` where appropriate.
- **Cards:** For each item, **zigzag** on desktop: even index `lg:flex-row`, odd `lg:flex-row-reverse`.
- **Image column (~55%):** `aspect-[4/3]`, gradient blur halo, numbered badge `ring-4 ring-white`, hover scale on image.
- **Text column (~50%):** Overlaps slightly with negative margin (`lg:-ml-8` / `lg:-mr-8`); inner card uses **soft gradient bg** (`from-*-50/80`) and **badge** with Lucide icon + emoji + title; body `text-slate-600`.

**Data shape (`appealItems`):** `title`, `emoji`, `description`, `image`, `icon` (Lucide), `gradient` (Tailwind `from-* to-*`), `cardBg`, `badgeColor`.

---

### 5.3 Fun facts

- **Section bg:** `bg-slate-50`.
- **Background art:** Scattered low-opacity images from `public/.../fun_facts/*.png` (see `NZFunFactsScatteredBackground`: deterministic pseudo-random positions for SSR safety; **42** instances in reference).
- **Z-index:** Background `z-0`, decor `z-[1]`, content `z-10`.
- **Header:** Mascot + speech-bubble style label + H2.
- **Grid:** `grid-cols-1 sm:grid-cols-2`, compact **horizontal cards**: left strip (tint + vertical gradient + icon image), right title + fact.

**Data shape (`nzFunFacts`):** `image`, `title`, `fact`, `color` (gradient for bar), `bg` (Tailwind bg class for strip).

**New country:** Add `fun_facts/` PNGs, update array, rename section component and copy; keep the **scattered background** pattern but point at the new folder.

---

### 5.4 Testimonials

- **Section bg:** `white` with soft `blur-3xl` emerald/amber blobs in corners.
- **Header:** Pill, H2, link to `/all-reviews` in pill button style.
- **Carousel:** Embla + `embla-carousel-autoplay`; slide widths `85%` / `60%` / `35%` by breakpoint; **center slide** emphasized (`scale`, `opacity`, slight `blur` on sides); `ReviewCard` for each item.
- **Edges:** Gradient fade masks left/right.

**Theming:** Swap `emerald-*` on pills and fades for your accent.

---

### 5.5 “One day” timeline (留学の1日)

- **Section bg:** Soft multi-stop gradient (NZ: `from-emerald-50/60 via-white to-amber-50/30`).
- **Width:** `max-w-4xl` (readable column).
- **Timeline:** Vertical `gradient` line; each row: **icon tile** (`rounded-2xl`, colored bg class) + **white card** (`border-slate-100`, hover border accent).
- **Motion:** Per-row `whileInView` with staggered delay.

**Data shape:** `time`, `label`, `desc`, `icon` (Lucide), `color` (Tailwind classes for tile).

---

### 5.6 City highlights

- **Section bg:** `white`; decor ferns/koru optional.
- **Per city:** Same **zigzag** alternation as appeal section; **hero image** `aspect-[16/10]` with gradient overlay, emoji + city name on image; optional “passport stamp” on hover; side column with **white card** (subtitle, description, gradient CTA button) + **3-up grid** of place thumbnails.

**Data shape:** `name`, `emoji`, `subtitle`, `description`, `featuredImage`, `places[]`, `gradient`.

**Asset convention:** `city_highlights/{city_slug}/...` under the country folder.

---

### 5.7 Gallery (postcards)

- **Section bg:** `slate-50`.
- **Carousel:** Embla `dragFree`, `loop`; slides ~70% / 45% / 30% width.
- **Card styling:** White frame, padding, `aspect-[3/2]` image; footer line with label + small country tag.
- **Rotation:** Array like `postcardRotations` applies slight `rotate` per index; hover straightens and lifts (`y`).

**Data shape:** `{ src, label }[]` — reuse appeal/city assets where possible.

---

### 5.8 Final CTA

- **Section bg:** Strong gradient (`from-emerald-600 via-emerald-500 to-teal-600` for NZ).
- **Background motion:** Large blurred circles scaling slowly; optional **watermark** SVG (NZ: giant `SilverFern` at ~4% opacity).
- **Content:** Centered; mascot; glass speech bubble; H2 + supporting line; primary **inverted** button (white bg, accent text); secondary outline; trust chips row.

---

## 6. NZ-specific decorations (replace per country)

| Component | Role |
|-----------|------|
| `MountainDivider` | Section seams; color matches outgoing/incoming bg |
| `SilverFern` | NZ cultural motif; CTA watermark, hero accents |
| `FloatingSilverFern` | Slow float + rotate loop |
| `KoruSpiral` | Slow rotate; corner decor |

For **Australia**, **Canada**, etc., introduce **your own** small SVGs or icons (map silhouette, national symbol) with the **same rules**: low opacity, `pointer-events-none`, `hidden lg:block` for heavy decor, don’t compete with text.

---

## 7. Motion conventions

- **Imports:** `framer-motion` (`motion`, `useAnimation` not required in template).
- **Scroll sections:** `motion.div` with `variants={sectionHeaderVariants}`, `initial="hidden"`, `whileInView="visible"`, `viewport={{ once: true, margin: "-50px" }}` (tweak margin per density).
- **Stagger lists:** Parent `staggerContainerVariants`, children `cardRevealVariants`.
- **Hero:** `initial` / `animate` on load (not `whileInView`).
- **Springs:** Speech bubbles and mascot use `type: "spring"` with tuned `stiffness` / `damping`.

Keep durations in the **0.4–0.8s** range for reveals; infinite loops **3–8s** for ambient motion.

---

## 8. Asset folder layout (recommended)

Under `public/country-dedicated-page/<CountryFolder>/`:

```
Hero section/          # hero_bg, mascot (note: NZ uses a space in folder name — prefer consistent slug-like names for new countries)
country-appeal/        # jpeg/png for the three appeal cards
fun_facts/             # small illustrations for fact cards + scattered bg
city_highlights/
  <city>/
    <city>-<country>-city.png   # featured
    <city>-place-1.png ...
gallery/               # optional extra shots
```

Use **consistent naming** (`auckland-nz-city.png`) and optimize images for web before committing.

---

## 9. Imports and dependencies (client page)

- **UI:** `@/components/ui/button`, `@/components/PageLayout`, `@/components/Breadcrumb`, `@/components/ReviewCard`
- **Utils:** `cn` from `@/lib/utils`
- **Carousel:** `embla-carousel-react`, `embla-carousel-autoplay`
- **Icons:** `lucide-react`
- **Images:** `next/image` for photos; plain `<img>` acceptable for small decorative / many duplicate bg sprites if you need to avoid Image domain config

---

## 10. Accessibility and content notes

- Give **real `alt` text** on meaningful images; hero country image and appeal photos should describe content. Mascot / decorative can use `alt=""` where appropriate.
- Keep **contrast** on hero text (darkening gradients is easier than lightening text).
- **Japanese** is primary for body copy; **English** in hero H1 is optional per brand.
- Avoid relying on emoji alone for critical meaning (decorative use is fine).

---

## 11. Checklist — new country page

1. [ ] Copy `NewZealandPageClient.tsx` → `XxxPageClient.tsx`; global find-replace country strings and **accent color** classes (`emerald` → your palette).
2. [ ] Replace **decor components** or restyle existing ones to match culture (don’t leave NZ ferns on non-NZ pages).
3. [ ] Add `public/country-dedicated-page/<Country>/` assets; update all paths in data arrays.
4. [ ] Add `src/app/all-country/<slug>/page.tsx` mirroring NZ (fetch reviews, pass props).
5. [ ] Wire **Breadcrumb** labels and `metadata` if you add `layout.tsx` or `generateMetadata` for SEO.
6. [ ] Register route in **留学国一覧** (`/all-country`) and navigation if applicable.
7. [ ] Run lint; verify **testimonials** hidden state when `reviews.length === 0`.
8. [ ] Test mobile: hero stack, 1-col fun facts, carousel touch, timeline readability.

---

## 12. Quick reference — section → background → divider after

| Section | Section background | Next divider |
|---------|-------------------|--------------|
| Hero | Image + dark gradients | `white` |
| Appeal | White → emerald tint | `slate` |
| Fun facts | `slate-50` + sprites | `white` + `flip` |
| Testimonials | `white` | `emerald` |
| One day | Emerald/amber/white gradient | `white` + `flip` |
| Cities | `white` | `slate` |
| Gallery | `slate-50` | *(none — straight to CTA)* |
| CTA | Emerald/teal gradient | *(page ends)* |

---

*Last aligned with `NewZealandPageClient.tsx` and `src/app/all-country/new-zealand/page.tsx` in the kaeru-next-opus repo. Update this doc when you change the template structure.*
