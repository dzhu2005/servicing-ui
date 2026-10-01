import { defineConfig } from 'drizzle-kit'

// drizzle-kit runs outside Nuxt, so it can't use the AWS-loaded configuration.
// Set DATABASE_URL before running drizzle-kit commands (e.g. `pnpm drizzle-kit pull`).
export default defineConfig({
    dialect: 'postgresql',
    schema: './server/database/schema.ts',
    out: './server/database/migrations',
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
})
