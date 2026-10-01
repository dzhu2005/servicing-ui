// Test endpoint. The configuration holds credentials, so this route only
// responds in dev (`pnpm dev`) and returns 404 in production builds.
export default defineEventHandler(async () => {
    if (!import.meta.dev) {
        throw createError({ statusCode: 404 })
    }
    return await getConfiguration()
})
