import pino from 'pino'

/**
 * Server-only. Shared pino logger, auto-imported in server code. In dev it
 * prints colourised lines through pino-pretty (a dev dependency, loaded by
 * name in a worker thread so it never ends up in the production bundle). In
 * production it writes one JSON object per line to stdout for CloudWatch.
 * Set the level with NUXT_LOG_LEVEL (default "info").
 *
 * Pass errors under `err` so pino serialises the stack:
 * `logger.error({ err: error }, '[db] query failed')`.
 */
export const logger = pino({
    level: import.meta.dev ? 'trace' : 'warn',
    ...(import.meta.dev && {
        transport: { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:HH:MM:ss.l', ignore: 'pid,hostname' } }
    })
})
