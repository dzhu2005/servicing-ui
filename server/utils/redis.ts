import Redis from 'ioredis'

let client: Redis | undefined
let settingsKey: string | undefined

/**
 * Server-only. Returns an ioredis client for the Redis server described by
 * the "Redis" settings in the AWS configuration. ElastiCache requires TLS
 * when AUTH is on; its certificates chain to a public Amazon CA, so Node's
 * default trust store verifies them. The client is rebuilt if those settings
 * change on a configuration refresh.
 */
export async function useRedis(): Promise<Redis> {
    const { Redis: settings } = await getConfiguration()
    const key = JSON.stringify(settings)
    if (client && key === settingsKey) return client

    const previous = client
    client = new Redis({
        host: settings.Host,
        port: settings.Port,
        password: settings.Password || undefined,
        tls: { servername: settings.Host },
        maxRetriesPerRequest: 3
    })
    client.on('error', error => logger.error({ err: error }, '[redis] connection error'))
    settingsKey = key
    previous?.quit().catch(error => logger.error({ err: error }, '[redis] failed to close previous client'))
    return client
}
