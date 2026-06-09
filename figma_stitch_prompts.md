# Figma to Google Stitch to GitHub Pages Mappings & Prompts

This document provides highly detailed, deep prompts to configure your Figma designs and the Google Stitch build pipeline for the CSXIA website.

---

## 1. Figma UI Build Prompt
*Use this prompt in a generative UI builder or provide it to a UI designer to construct the Figma layout files precisely matching the codebase.*

```text
Role: Principal UI/UX Designer & Design Systems Architect
Task: Design a premium, ultra-modern "Anti-Gravity" dark-mode landing page for CSXIA — Hyderabad's Builder Ecosystem.

Core Aesthetic Guidelines:
1. Palette:
   - Base Background: True Pitch Black (#000000).
   - Cards/Containers: Very dark charcoal (#050505) with 1px semi-transparent white borders (rgba(255,255,255,0.08)).
   - Accents: Pure High-Contrast White (#FFFFFF), Dim Gray (#888888), and subtle glow drop shadows.
   - Glassmorphism: Use backdrop-blur-md (20px) with rgba(0,0,0,0.7) fills on floating elements like the Navbar and Floating CTA.
2. Typography Hierarchy:
   - Primary Headings & Hero Title: "Bebas Neue" (Uppercase, tight line height, bold letter-spacing).
   - Section Headings & Body: "Syne" (Modern, geometric, bold weights for titles, light-medium for descriptions).
   - Labels, Stats, & Monospaced Metadata: "DM Mono" (Clean, high-tech, letter-spaced, uppercase for tags).
3. Background Noise: Add an overlay layer with a high-frequency micro-grain texture (opacity 4%) to simulate a premium tactile feel.

Layout & Grid Specifications:
- Desktop Canvas: 1440px width. 12-column layout grid. Gutter: 24px. Margin: 80px.
- Tablet Canvas: 768px width. 6-column layout grid. Gutter: 20px. Margin: 32px.
- Mobile Canvas: 375px width. 2-column layout grid. Gutter: 16px. Margin: 20px.

Section-by-Section Components & Autolayout Rules:

1. Navigation Bar (Sticky/Floating):
   - Left-aligned brand: CSXIA Logo image mark (white viking helmet on black backdrop, 40px height) linked horizontally to navigation.
   - Center-aligned links: "What We Do", "Gallery", "Values", "Founder", "Team" in DM Mono (11px, 2px letter-spacing, uppercase, color #888888 with #FFFFFF hover state).
   - Right-aligned CTA: "Join Ecosystem" button. Solid white background, black text. Hover state: transparent background, 1px white border, white text.

2. Hero Section:
   - Background: Large centered watermark of the CSXIA logo (600px, 3% opacity, rotating float animation placeholder).
   - Hero Badge: Curved pill (20px border-radius) reading "CSXIA ECOLOGY" in DM Mono (10px).
   - Main Logo: Centered 240px width CSXIA logo with screen blend mode and white drop shadow glow.
   - Hero Title: Massive text "BUILD THE FUTURE OF HYDERABAD" where "FUTURE" is styled with transparent fill and a 1px white stroke (-webkit-text-stroke).
   - Stat Counter: Centered "250+" (Bebas Neue, 72px) with label "Active Builders" below (DM Mono, 10px).
   - Action CTAs: Dual buttons. Primaries (Solid White) and Secondaries (Outline White).
   - Scroll Hint: "Scroll to explore" vertical line indicator animating slowly.

3. Pillars Section (What We Do):
   - Header: Left-aligned title "BUILDING ON FOUR PILLARS" (Bebas Neue, 88px) and a right-aligned paragraph description (Syne, 15px, max-width 360px).
   - Grid: 2x2 grid containing 4 cards.
   - Cards (auto-layout): 48px padding. Numbered header ("01 / PROCESS"), central emoji icon, Bebas Neue title (36px), description, and monospaced tag at the bottom.
   - Hover States: Cards slightly transition to #050505 background with a white arrow sliding out (6px translateX).

4. Gallery Section (Shipped in Hyd):
   - Masonry layout structure using 3 columns.
   - Item Aspect Ratios: Alternate between 4:3 (Landscape), 3:4 (Portrait), and 1:1 (Square).
   - Visual Style: Images must be high-contrast, cyberpunk-themed developer meetups.
   - Hover Overlay: A black gradient card overlay (rgba(0,0,0,0.85)) slides up showing the project title, stats, and a monospaced link (e.g. "View Showcase ↗").

5. Founder Section:
   - Split layout: 1fr (Founder Photo) and 1.2fr (Bio details).
   - Photo Frame: Stylized black and white portrait bounded by floating white hairline corners (8px offset, 24px lengths, 1px borders).
   - Bio Details: Bebas Neue title "Mohammed Abu Bakar Khan", tag "Founder & Lead Architect", and rich body copy with strong emphasis on execution-first mindset.

6. Team Section (The Inner Circle):
   - Grid: 5-column grid on desktop, wrapping to 3 on tablet, and 2 on mobile.
   - Cards: 3:4 portrait ratios. Black and white portraits that zoom in 5% and transition to color on hover.
   - Card Footer: Name in Syne bold, Role in DM Mono, and LinkedIn handle.

7. Footer:
   - Upper Footer: Column split (Logo + Tagline, Navigation, Resources, Connect links).
   - Mid Footer: Call-to-action banner "READY TO BUILD? JOIN THE CLAN." with a large white CTA button.
   - Lower Footer: Dynamic copyright text and creator tags.
```

---

## 2. Google Stitch Build Pipeline Prompt
*Use this prompt to set up the build script, Gulp file, Webpack configuration, or deployment environment for automating Figma asset exports and compiling the code.*

```text
Role: Senior DevOps & Build Automation Engineer
Task: Create a Node.js-based build and stitching pipeline ("Google Stitch style") that automates asset extraction, optimization, and continuous deployment of the CSXIA static landing page to GitHub Pages.

Pipeline Workflow Requirements:

1. Figma Asset Extraction:
   - Configure a script `scripts/fetch-assets.js` using the Figma REST API.
   - Environment variables required: `FIGMA_ACCESS_TOKEN`, `FIGMA_FILE_KEY`.
   - Node packages: `axios`, `dotenv`.
   - Mappings:
     * Extract vector icon with ID matching "CSXIA_Logo" as an SVG and save to `assets/logo.svg`.
     * Extract the team frame layers ("Bakar", "Rishabh", "Farhan", "Sogra", "Ammar") and save as high-quality PNGs to `assets/team_X.png`.
     * Extract events gallery frames and save as high-quality JPEGs to `assets/gallery_X.png`.

2. Image Optimization & Format Conversion:
   - Implement an image processor using `sharp` to:
     * Compress all PNG/JPG assets.
     * Generate WebP alternatives (`.webp`) to optimize web delivery.
     * Resize team portraits to exactly 600x800 pixels with high contrast.
     * Export the main logo to `assets/logo.png` with background transparency.

3. Static Template Stitching:
   - Implement a template engine (like EJS or a custom template compiler in Node) to stitch data variables into `index.html`.
   - Read data dynamically from a local JSON file `data/ecosystem.json` containing:
     * Social Links (WhatsApp, Instagram, LinkedIn).
     * Team Member details (Names, Roles, bios, and LinkedIn URLs).
     * Gallery metadata (Event names, dates, and action links).
   - Inject the compiled CSS (`style.css`) and JavaScript bundle (`app.js`) with cache-busting hashes (e.g. `style.[hash].css`).

4. Assets Bundling & Code Quality:
   - Minify HTML using `html-minifier`.
   - Post-process CSS using `postcss` with `autoprefixer` and `cssnano` to bundle, prefix, and minify styles.
   - Minify JS using `terser`.

5. Automated Deployment to GitHub Pages:
   - Setup a GitHub Actions workflow `.github/workflows/deploy.yml` triggered on push to `main` branch.
   - The workflow must:
     * Checkout code.
     * Setup Node.js environment.
     * Run `npm install` and `npm run build` (triggering the fetch-assets, optimize, and stitch scripts).
     * Deploy the compiled `dist/` directory to the `gh-pages` branch using `JamesIves/github-pages-deploy-action@v4`.

Provide the full implementation of the build scripts, npm package configuration, and GitHub Action file.
```
