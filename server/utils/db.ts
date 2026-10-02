import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '../database/schema'

type Database = NodePgDatabase<typeof schema>

let db: Database | undefined
let pool: Pool | undefined
let settingsKey: string | undefined

// Amazon's public RDS CA bundle (server/assets/certs), so TLS is verified.
async function loadRdsCa(): Promise<string> {
    const ca = await useStorage('assets:server').getItemRaw('certs/rds-global-bundle.pem')
    if (!ca) throw new Error('RDS CA bundle missing from server assets')
    return typeof ca === 'string' ? ca : new TextDecoder().decode(ca as Uint8Array)
}

/**
 * Server-only. Returns a Drizzle client for the Postgres database described
 * by the "Database" settings in the AWS configuration. The pool is rebuilt
 * if those settings change on a configuration refresh.
 */
export async function useDb(): Promise<Database> {
    const { Database: settings } = await getConfiguration()
    const key = JSON.stringify(settings)
    if (db && key === settingsKey) return db

    const previous = pool
    pool = new Pool({
        host: settings.Host,
        port: settings.Port,
        database: settings.Database,
        user: settings.Username,
        password: settings.Password,
        ssl: { ca: await loadRdsCa() },
        max: 10
    })
    db = drizzle(pool, { schema })
    settingsKey = key
    previous?.end().catch(error => logger.error({ err: error }, '[db] failed to close previous pool'))
    return db
}
