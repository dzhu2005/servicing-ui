// Warm the configuration cache when the server starts.
export default defineNitroPlugin(() => {
    getConfiguration()
        .then(() => console.info('[configuration] loaded from AWS Secrets Manager'))
        .catch(error => console.error('[configuration] initial load failed', error))
})
