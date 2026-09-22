# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`servicing-ui` is a Nuxt 4 application (early-stage — still close to a scaffolded starter). It uses `@nuxt/ui` v4 as the component library, Tailwind CSS v4 (via `@nuxt/ui`'s Tailwind integration, imported in `app/assets/css/main.css`), Pinia for state, `@nuxtjs/i18n` for translations, `@nuxt/image` and `@nuxt/icon`, and VueUse.

This is not a git repository (no `.git` directory) — do not assume git-based workflows are available unless one is initialized.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml` / `pnpm-workspace.yaml`).

- `pnpm dev` — start the dev server at `http://localhost:3000`
- `pnpm build` — production build
- `pnpm generate` — static site generation
- `pnpm preview` — preview a production build locally
- `postinstall` runs `nuxt prepare` automatically after `pnpm install`

There is no test runner, lint command, or CI configuration set up in this repo currently.

## Architecture

This uses the **Nuxt 4 directory structure**, where app code lives under `app/` (not the project root):

- `app/app.vue` — root component; wraps everything in `<UApp>` (Nuxt UI's app provider) + `<NuxtLayout>` + `<NuxtPage>`.
- `app/layouts/default.vue` — the default layout. Currently contains an inline sidebar/header/footer implementation (built with `USidebar`, `UNavigationMenu`, `UDropdownMenu`) rather than delegating to the components in `app/components/layout/`. When refactoring the layout, prefer extracting into `AppSidebar.vue` / `AppFooter.vue` and using them here instead of the inline markup.
- `app/components/layout/` — `AppSidebar.vue` (currently an empty shell) and `AppFooter.vue` (a working example: reads a `version` prop, uses `font-body` and CSS custom properties from `main.css`, e.g. `var(--color-ink-muted)`).
- `app/pages/` — file-based routing. `demo/dz.vue` is a working scratch/demo page duplicating the sidebar layout logic; `demo/index.vue` is an empty placeholder.
- `app/assets/css/main.css` — imports `tailwindcss` and `@nuxt/ui`, then defines the design token system as CSS custom properties on `:root` (`--color-primary`, `--color-ink`, `--color-canvas`, `--radius-*`, etc.). **Use these tokens** (`var(--color-ink)`, `var(--color-hairline)`, etc.) rather than hardcoding hex values or falling back to default Tailwind/Nuxt UI palette colors, to stay consistent with the existing design system.
- `app.config.ts` — Nuxt UI theme config; currently just sets `ui.colors.primary` to `'blue'`.
- `nuxt.config.ts` — registers modules, loads the `Inter` font via Google Fonts `<link>` tags, and configures `@nuxtjs/i18n` (currently English-only, `en` / `en-US`).

### Component conventions observed

- Favor Nuxt UI components (`UButton`, `USidebar`, `UNavigationMenu`, `UDropdownMenu`, `UIcon`, etc.) over hand-rolled markup.
- Icons use the `lucide:` and `i-lucide-` Iconify prefixes (`@iconify-json/lucide` and `@iconify-json/material-symbols` are the installed icon sets).
- `<script setup lang="ts">` is the convention for component logic.

## Design source (pen.dev / Pencil MCP)

This project is driven in part by Figma-like designs stored as `.pen` files and accessed through the **pencil** MCP server. `.pen` files are encrypted — never use `Read` or `Grep` on them directly; always go through the `mcp__pencil__*` tools to inspect or sync designs.

`ai/command/01.init/` contains the original agent instructions used to scaffold this project and to build page layouts from pen.dev frames (e.g. `02.layout.md` describes generating a `/demo/page` route from a frame named "Loan page", with a reusable layout wrapper for nav + footer). Treat these as historical/task-spec files, not live documentation — check current app code before assuming a described feature exists.

## Branding note

The footer (`AppFooter.vue`) references "Scarlett Network by Axiom Innovations" — this app is being built for that product/organization.
