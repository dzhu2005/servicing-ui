import type { ApiErrorResponse } from '#shared/types/api'

// Runs before Nuxt's own error handler (registered in nuxt.config.ts). Any
// error on an /api/* route is returned as JSON, even when the request sends
// `Accept: text/html`; other routes fall through to Nuxt and app/error.vue.
export default defineNitroErrorHandler((error, event) => {
    if (!event.path.startsWith('/api/')) return

    const statusCode = error.statusCode || 500
    const isServerError = statusCode >= 500 || !!error.unhandled
    // 5xx and unhandled errors can carry SQL, hostnames or secrets, so their
    // details stay in the server log in production.
    const hide = isServerError && !import.meta.dev
    if (isServerError) logger.error({ err: error }, `[api] ${event.method} ${event.path}`)

    const body: ApiErrorResponse = {
        error: true,
        statusCode,
        statusMessage: hide ? 'Server Error' : error.statusMessage || 'Server Error',
        message: hide ? 'Something went wrong. Please try again later.' : error.message,
        data: hide ? undefined : error.data,
        ...(import.meta.dev && { stack: error.stack?.split('\n').map(line => line.trim()) })
    }
    setResponseHeaders(event, { 'content-type': 'application/json', 'cache-control': 'no-cache' })
    setResponseStatus(event, statusCode, body.statusMessage)
    return send(event, JSON.stringify(body))
})
