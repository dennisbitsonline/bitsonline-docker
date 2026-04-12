// Basic GET endpoint
// File: /functions/api/hello.ts
// URL: /api/hello

export async function onRequestGet(context: EventContext<unknown, string, unknown>) {
  return new Response(
    JSON.stringify({
      message: 'Hello from Cloudflare Pages Functions!',
      timestamp: new Date().toISOString(),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
