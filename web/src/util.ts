
export interface ErrorData {
    statusCode: number
    message?: string
  }
  
  export type WithError<T> = T & { 
    error?: string | ErrorData
  }
  
  export class RequestError extends Error {
    constructor(message: string, readonly data: ErrorData, readonly status: number) {
      super(message)
      this.name = 'RequestError'
    }
  }

export async function fetchJson(input: RequestInfo, init?: RequestInit, throwError: boolean = true) {
  let resp = await fetch(input, init)
  if (!resp.ok) {
    let data: any | null = null
    try {
      data = await resp.json()
    } catch (e) {}
    if (!throwError && data?.error) {
      return data // caller will handle error
    }
    let errorDesc = data?.error ?? `${resp.status} ${resp.statusText}`
    throw new RequestError(errorDesc, data, resp.status)
  }

  return await resp.json()
}
