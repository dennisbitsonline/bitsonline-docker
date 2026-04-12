// TypeScript type definitions for Cloudflare Pages Functions
// File: /functions/types.d.ts

interface EventContext<Env = unknown, P extends string = string, Data = unknown> {
  request: Request
  functionPath: string
  waitUntil: (promise: Promise<unknown>) => void
  passThroughOnException: () => void
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>
  env: Env & {
    ASSETS: { fetch: typeof fetch }
  }
  params: Record<P, string>
  data: Data
}

// Example of typed environment variables
interface CloudflareEnv {
  // Add your environment variables here
  API_KEY?: string
  DATABASE_URL?: string
}
