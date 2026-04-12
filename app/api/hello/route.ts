export const runtime = 'edge'

export async function GET() {
  return Response.json({
    message: 'Hello from Cloudflare Pages!',
    timestamp: new Date().toISOString(),
  })
}
