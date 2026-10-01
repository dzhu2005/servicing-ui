// JSON body returned for every /api/* error — see server/error.ts.
// On the client: `catch (e) { (e as FetchError<ApiErrorResponse>).data }`.

export interface ApiErrorResponse {
    error: true
    statusCode: number
    statusMessage: string
    message: string
    data?: unknown
    /** Dev only. */
    stack?: string[]
}
