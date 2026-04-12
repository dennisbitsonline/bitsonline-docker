export const runtime = 'edge'

export async function GET() {
  const now = new Date()
  
  return Response.json({
    timestamp: now.toISOString(),
    unix: Math.floor(now.getTime() / 1000),
    timezone: 'UTC',
    formatted: now.toUTCString(),
  })
}
