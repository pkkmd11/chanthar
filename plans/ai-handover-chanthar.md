# AI Project Handover: ChanThar (ချမ်းသာ)

Copy/paste this entire message into your new AI chat (GitHub Copilot / Cursor / local LLM). It is tailored to the *actual* repo structure in this workspace.

---

## Role

You are a Senior Web Designer and Developer specializing in luxury/artisan branding and Myanmar (Burmese) digital typography.

## Project Context

- **Brand:** ChanThar (ချမ်းသာ) – premium Myanmar brand for traditional hand-rolled cheroots.
- **Visual vibe:** Premium artisan; materials feel like teak wood + leaf + gold.
- **Deployment:** Netlify via GitHub.
- **Actual tech stack in this repo:** Hugo site in [`site/`](site:1) + Webpack pipeline for JS/SCSS in [`src/`](src:1). See scripts in [`package.json`](package.json:7) and Hugo build config in [`site/hugo.toml`](site/hugo.toml:1).

## Constraints (must follow)

1. **Bilingual (English + Burmese Unicode) without reload**
   - Implement a small client-side text swapper using `data-i18n` keys.
   - Do **not** introduce a heavy i18n framework.

2. **Burmese typography safety**
   - Burmese must use **line-height >= 1.8** to prevent clipping/crowding.
   - Current global `--line-height` is `1.5` in [`src/css/imports/_variables.scss`](src/css/imports/_variables.scss:15) — this must be adapted for Burmese.

3. **Premium minimalist UI**
   - Teak brown + leaf green + subtle gold accents.
   - High contrast, accessible focus states.
   - No “template look” (currently still the Kaldi coffee demo content).

4. **CMS compatibility**
   - Content is edited via Decap CMS config at [`site/static/admin/config.yml`](site/static/admin/config.yml:1).
   - Media uploads land in [`site/static/img`](site/static/admin/config.yml:5) and are referenced as `/img/...` in front matter.

## Current Status (what exists right now)

- Products page template: [`site/layouts/section/products.html`](site/layouts/section/products.html:1)
  - Uses partials like [`site/layouts/partials/4-up.html`](site/layouts/partials/4-up.html:1) and an image grid.
- Products content (still coffee placeholder): [`site/content/products/_index.md`](site/content/products/_index.md:1)
- Global head loads Nunito Sans from Google Fonts: [`site/layouts/partials/head.html`](site/layouts/partials/head.html:15)
- Global navigation: [`site/layouts/partials/nav.html`](site/layouts/partials/nav.html:1)
- JS entrypoint for the site is [`src/index.js`](src/index.js:1) (currently only mobile menu toggle).

## Goal

Create a clean, single-page **Product Showcase** section on the Products page containing **two premium Product Cards**:

1. **Retail** (for individual customers)
2. **Wholesale** (for shops/distributors)

Each card should support:

- image (`/img/...`)
- title (EN + MY)
- short description (EN + MY)
- 3 highlight bullets (EN + MY)
- pack size label (EN + MY) (example: 20 sticks / တစ်ထုပ် ၂၀ လိပ်)
- optional “from” price label (EN + MY) (avoid hard numbers if not provided)
- CTA button text (EN + MY) + link (likely to Contact page)

## Recommended Implementation Plan (in this repo)

### 1) Content model (front matter)

Add a new front matter block to [`site/content/products/_index.md`](site/content/products/_index.md:1), for example:

```yaml
showcase:
  heading_en: Product Showcase
  heading_my: ချမ်းသာ ထုတ်ကုန်များ
  subheading_en: Hand-rolled cheroots with a modern premium finish.
  subheading_my: လက်ဖြင့်လိပ်ထားသော ဆေးပေါ့လိပ်ကို ခေတ်သစ် အဆင့်မြင့် အရသာနဲ့ တင်ဆက်ထားပါတယ်။
  cards:
    - key: retail
      image: /img/chanthar-retail.jpg
      title_en: Retail Selection
      title_my: လက်လီ အရောင်းရွေးချယ်မှု
      desc_en: For personal enjoyment, gifts, and everyday rituals.
      desc_my: ကိုယ်ပိုင်အသုံးပြုရန်၊ လက်ဆောင်ပေးရန်၊ နေ့စဉ် အလေ့အထများအတွက် သင့်တော်ပါတယ်။
      pack_en: Pack: 20 sticks
      pack_my: ထုပ်စည်း: ၂၀ လိပ်
      price_en: From premium tiers
      price_my: အဆင့်မြင့်တန်းမှ စတင်
      bullets_en:
        - Smooth draw, clean finish
        - Crafted with care, consistent roll
        - Premium presentation
      bullets_my:
        - မီးဆွဲချောမွေ့၊ အရသာသန့်ရှင်း
        - လက်ရာသေသပ်၊ လိပ်အဆင့်ညီ
        - တင်ဆက်ပုံအဆင့်မြင့်
      cta_text_en: Shop Retail
      cta_text_my: လက်လီ ဝယ်ယူရန်
      cta_link: /contact
    - key: wholesale
      image: /img/chanthar-wholesale.jpg
      title_en: Wholesale Supply
      title_my: လက်ကား ထောက်ပံ့ရေး
      desc_en: Reliable batches for shops, partners, and distributors.
      desc_my: ဆိုင်များ၊ ပါတနာများ၊ ဖြန့်ချိသူများအတွက် ယုံကြည်ရသော ထုတ်လုပ်မှုဖြင့် ထောက်ပံ့ပေးပါတယ်။
      pack_en: Cartons and bulk packs
      pack_my: ကာတန်နှင့် အစုလိုက်ထုပ်
      price_en: Partner pricing available
      price_my: ပါတနာစျေးနှုန်း ရနိုင်
      bullets_en:
        - Consistent quality across batches
        - Packaging options for your shelf
        - Fast coordination via direct contact
      bullets_my:
        - ထုတ်လုပ်မှုတိုင်း အရည်အသွေးတည်ငြိမ်
        - စင်တင်ရန် သင့်တော်သော ထုပ်ပိုးရွေးချယ်စရာ
        - တိုက်ရိုက်ဆက်သွယ်၍ လျင်မြန်စွာညှိနှိုင်း
      cta_text_en: Request Wholesale
      cta_text_my: လက်ကား တောင်းခံရန်
      cta_link: /contact
```

### 2) Template markup (Hugo)

- Create a new partial, e.g. `site/layouts/partials/product-cards.html`, that renders `.Params.showcase`.
- Insert it into the Products template at [`site/layouts/section/products.html`](site/layouts/section/products.html:1), ideally after the intro section and before the existing image grid/testimonials.

### 3) Styling (SCSS)

- Update global theme tokens in [`src/css/imports/_variables.scss`](src/css/imports/_variables.scss:1):
  - Replace current orange primary with teak/leaf/gold palette.
  - Introduce additional CSS vars (teak, leaf, gold, surface, border, etc.).
- Add Product Card styles in the appropriate module file (often [`src/css/imports/_styles.scss`](src/css/main.scss:72) via that import chain).
- Ensure Burmese line-height safety:
  - Use a `lang`/class gate: when Burmese is active, add a class like `lang-my` on `<html>` or `<body>` and set `--line-height: 1.8`.

### 4) Language switcher (no reload)

- Add a small language toggle UI into [`site/layouts/partials/nav.html`](site/layouts/partials/nav.html:1) (two buttons is enough: EN / MY).
- Implement the dictionary + swapping in [`src/index.js`](src/index.js:1).
  - Use `data-i18n` attributes on elements.
  - Store the chosen language in `localStorage`.
  - On switch, also set a class on `<html>`/`<body>` to activate Burmese typography rules.

### 5) Fonts

- Keep Latin font like Inter (or continue Nunito Sans) and add a Myanmar-capable font.
- Option A (fast): use Google Fonts `Noto Sans Myanmar` in [`site/layouts/partials/head.html`](site/layouts/partials/head.html:1).
- Option B (best control): self-host `Pyidaungsu` under [`src/fonts/`](src/fonts/.keep:1) and load via `@font-face` in SCSS.

### 6) CMS schema updates

Extend the Products page fields in [`site/static/admin/config.yml`](site/static/admin/config.yml:59) so `showcase` and `cards` can be edited in Decap CMS (including each card image).

## Acceptance Checklist

- Products page has a “Product Showcase” section with two cards (Retail + Wholesale).
- EN/MY toggle swaps all showcase copy instantly (no reload) and persists.
- Burmese text reads natural and elegant (not literal/robotic).
- Burmese line-height is >= 1.8 and visually unclipped.
- Color palette feels teak/leaf/gold and high-end.
- Works on mobile (cards stack) and desktop (2-column grid).

---

## Notes for the next AI

- This repo is still the default Kaldi coffee template. Don’t follow any earlier assumption about a root `index.html`; the real page templates are Hugo at [`site/layouts/`](site/layouts:1).
- The Products page content file to edit is [`site/content/products/_index.md`](site/content/products/_index.md:1).
- The build pipeline uses Hugo + Webpack (see [`package.json`](package.json:7)).

