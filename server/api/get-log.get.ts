// Demo endpoint, dev only (404 in production builds). Writes one info and one
// error line to the server log; check the terminal running `pnpm dev`.
export default defineEventHandler(() => {
    if (!import.meta.dev) {
        throw createError({ statusCode: 404 })
    }


    let payload = {
        agent : 'John Doe',
        age: 2,
        updated: new Date()
    }

    logger.info( payload, 'hello world %s',  true)
    logger.error('hello error')
    logger.debug('debug')
    logger.fatal('fatel')
    logger.warn('warn')
    logger.trace('trace')
    
    return { logged: ['info: hello world', 'error: hello error'] }
})
