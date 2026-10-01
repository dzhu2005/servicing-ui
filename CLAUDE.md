# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`servicing-ui` is an early-stage Nuxt 4 app for "Scarlett Network by Axiom Innovations" (a lending/servicing product). Stack: `@nuxt/ui` v4 (with Tailwind v4), Pinia, `@nuxtjs/i18n` (English only so far), `nuxt-zod` + Zod v4, VueUse, `@nuxt/image`, `@nuxt/icon`. On the server: AWS Secrets Manager for configuration, and Drizzle ORM over `pg` for Postgres.

## Commands

Use **pnpm**. `pnpm-lock.yaml` is the lockfile that counts; ignore the stray `package-lock.json`.

- `pnpm dev`: dev server at `http://localhost:3000`
- `pnpm build` / `pnpm preview`: production build and preview
- `pnpm drizzle-kit <cmd>`: needs `DATABASE_URL` set, because `drizzle.config.ts` can't read the AWS-loaded configuration

There is no test runner, linter or CI. You can only check server work against the real AWS secret and database by running `pnpm dev` and calling the endpoints.

## Server architecture

Everything secret stays on the server. Nothing goes into `runtimeConfig.public`.

- **Configuration** (`server/utils/configuration.ts`): `getConfiguration()` reads the JSON secret named in `runtimeConfig.aws` (default `secman-los-uat` in `ca-central-1`). Override it with `NUXT_AWS_PROFILE`, `NUXT_AWS_REGION` or `NUXT_AWS_SECRET_NAME`.
  - **Credentials:** the local `secman-los-dev` profile is tried first, then the default AWS chain (environment variables, ECS/EC2 role).
  - **Caching:** results are cached in memory for one hour. If a refresh fails, the last good value is kept.
  - **Startup:** `server/plugins/configuration.ts` loads the config when the server starts.
  - **Type:** the shape is `Configuration` in `shared/types/configuration.d.ts`.
  - **Parsing:** the secret contains raw newlines inside string values (PEM keys), so it goes through a lenient parser. Plain `JSON.parse` fails on it.
- **Database** (`server/utils/db.ts`): `await useDb()` returns a Drizzle client. It's built from `Configuration.Database` and rebuilt if those settings change.
  - **TLS:** connections check the server certificate against `server/assets/certs/rds-global-bundle.pem`, Amazon's public RDS CA bundle, which Nitro includes in the build. Don't swap this for `rejectUnauthorized: false`.
  - **Schema:** `server/database/schema.ts` mirrors tables in the existing `los.htb` database, which another system owns. Add tables by introspecting the live schema, and don't generate or run migrations against it.
  - **IDs:** `bigint` columns use `mode: 'number'` so results can be sent as JSON.
- **Demo endpoints** (`/api/get-configuration`, `/api/get-users`): these only work under `import.meta.dev` and return 404 in production, because they expose credentials and user data. `get-users` also leaves out `refresh_token`. Keep this guard on any debug route that returns secrets or personal data.

## App architecture

- **Layout:** `app/layouts/default.vue` awaits `useUserStore().loadUser()`, then renders `layout-sidebar`, `layout-header` and the page slot.
  - **Header title:** pages set it by changing `useTitle()` (shared `useState` in `app/composables/states.ts`), usually in `onMounted`.
- **User store** (`app/stores/user.ts`): currently **hard-coded mock data**. That includes the user, the lenders, and the sidebar menu items (`userMenu.items`). Picking a lender changes `user.userColor.primary`. The sidebar's open/closed state is `sidebarOpenFlag`, also in this store.
- **Component names come from their folder path.** For example, `components/ui/input/currency.vue` is used as `<ui-input-currency>`, and `components/layout/sidebar.vue` as `<layout-sidebar>`.
  - `ui/input/*` are `UFormField` wrappers that use `v-model`.
  - `ui/btn/*` are styled `UButton`s.
- **Schema-driven forms:** `<ui-form-auto :form v-model>` takes a `DZFormType` from `shared/types/global.d.ts`. That is a list of fields, each with a `type` (`text`, `int`, `currency`, `rate`, `date`, `divider`, …) and `validations`.
  - It builds a Zod schema at runtime via `useZod()` and renders the matching `ui-input-*` component for each field.
  - To add a field type: extend the `type` union in `global.d.ts`, then add both a render branch and a Zod branch in `auto.vue`.
  - `pages/demo/form-dz.vue` is the working example.
- **Pages:** `app/pages/demo/*` are design/prototype pages (dashboards, report, forms). There are no production routes yet.
- **Styling:**
  - **Design tokens:** use the CSS custom properties defined on `:root` in `app/assets/css/main.css` (`var(--color-ink)`, `var(--color-hairline)`, `--radius-*`, …) rather than new hex values. The brand blue is `#0075de`/`#0076de`. It's set both as `--ui-primary` and in `app.config.ts`, and some existing components still hard-code it in their `:ui` classes.
  - **Icons:** use the `lucide:` / `i-lucide-` prefixes. `material-symbols` is also installed.
  - Use `<script setup lang="ts">`, and prefer Nuxt UI components over hand-written markup.

## Task specs and designs

- **Task specs:** `ai/command/01.init/*.md` are numbered task specs that the user asks to have "run". Each file describes one piece of work:
  - `02`: layout from a pen.dev frame
  - `03`: AWS config
  - `04`: Drizzle/Postgres
  
  Treat them as instructions for that task, not as documentation of what exists. Check the code first.
- **Designs:** they live in `.pen` files reached through the **pencil** MCP server. `.pen` files are encrypted, so never `Read` or `Grep` them; always use the `mcp__pencil__*` tools.

<!-- ## Claude workflow for each Claude task
1. After Claude udnerstand user requirements, summary a task slug(kebab-case), slug will be use for name the git worktree
2. create git worktree 
3. work in new worktree, never work on main tree
4. after finish the task show me the command how to:
  1. How to merge to dev branch
  2. How to delete current work tree
5. after finish, start the application -->

 