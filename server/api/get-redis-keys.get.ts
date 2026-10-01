// Demo endpoint, dev only (404 in production builds). Returns up to 10 key
// names (not values). Uses SCAN rather than KEYS so it doesn't block Redis.
export default defineEventHandler(async () => {
    if (!import.meta.dev) {
        throw createError({ statusCode: 404 })
    }
    const redis = await useRedis()
    const keys: string[] = []
    let cursor = '0'
    do {
        const [next, batch] = await redis.scan(cursor, 'COUNT', 100)
        keys.push(...batch)
        cursor = next
    } while (cursor !== '0' && keys.length < 10)
    return keys.slice(0, 10)
})
