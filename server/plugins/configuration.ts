// Warm the configuration cache when the server starts.
export default defineNitroPlugin(() => {
    getConfiguration()
        .then(() => logger.info('[configuration] loaded from AWS Secrets Manager'))
        .catch(error => logger.error({ err: error }, '[configuration] initial load failed'))
})
