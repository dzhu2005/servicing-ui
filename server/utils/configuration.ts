import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'
import { createCredentialChain, fromIni, fromNodeProviderChain } from '@aws-sdk/credential-providers'
import type { Configuration } from '#shared/types/configuration'

const REFRESH_INTERVAL_MS = 60 * 60 * 1000

let cached: Configuration | undefined
let loadedAt = 0
let inflight: Promise<Configuration> | undefined

// Local profile first (dev machines); if it doesn't exist, fall back to the
// default Node chain (env vars, ECS task role, EC2 instance role) on servers.
function createClient(profile: string, region: string) {
    return new SecretsManagerClient({
        region,
        credentials: createCredentialChain(fromIni({ profile }), fromNodeProviderChain())
    })
}

// The secret contains raw newlines inside string values (PEM keys), which
// JSON.parse rejects. Escape control characters that appear inside strings.
function parseLenientJson(text: string): unknown {
    let out = ''
    let inString = false
    let escaped = false
    for (const ch of text) {
        if (inString) {
            if (escaped) escaped = false
            else if (ch === '\\') escaped = true
            else if (ch === '"') inString = false
            else if (ch < ' ') {
                out += ch === '\n' ? '\\n' : ch === '\r' ? '\\r' : ch === '\t' ? '\\t' : `\\u${ch.charCodeAt(0).toString(16).padStart(4, '0')}`
                continue
            }
        }
        else if (ch === '"') inString = true
        out += ch
    }
    return JSON.parse(out)
}

async function loadConfiguration(): Promise<Configuration> {
    const { aws } = useRuntimeConfig()
    const client = createClient(aws.profile, aws.region)
    const result = await client.send(new GetSecretValueCommand({ SecretId: aws.secretName }))
    if (!result.SecretString) {
        throw new Error(`Secret "${aws.secretName}" has no SecretString`)
    }
    return parseLenientJson(result.SecretString) as Configuration
}

/**
 * Server-only. Returns the configuration from AWS Secrets Manager, reading
 * from AWS at most once per hour. If a refresh fails, the previous value is
 * kept and served.
 */
export async function getConfiguration(): Promise<Configuration> {
    if (cached && Date.now() - loadedAt < REFRESH_INTERVAL_MS) {
        return cached
    }
    inflight ??= loadConfiguration()
        .then((config) => {
            cached = config
            loadedAt = Date.now()
            return config
        })
        .catch((error) => {
            if (!cached) throw error
            logger.error({ err: error }, '[configuration] refresh failed, serving previous value')
            return cached
        })
        .finally(() => {
            inflight = undefined
        })
    return inflight
}
