import { getTableColumns } from 'drizzle-orm'
import { users } from '../database/schema'

// Demo endpoint, dev only (404 in production builds). refresh_token is left
// out because it's a live credential.
export default defineEventHandler(async () => {
    if (!import.meta.dev) {
        throw createError({ statusCode: 404 })
    }
    const { refreshToken, ...columns } = getTableColumns(users)
    const db = await useDb()
    return await db.select(columns).from(users).orderBy(users.id)
})
