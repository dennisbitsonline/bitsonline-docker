// Time endpoint with query parameters
// File: /functions/api/time.ts
// URL: /api/time

export async function onRequestGet(context: EventContext<unknown, string, unknown>) {
  const url = new URL(context.request.url)
  const format = url.searchParams.get('format') || 'iso'
  
  const now = new Date()
  let timeString: string

  switch (format) {
    case 'unix':
      timeString = Math.floor(now.getTime() / 1000).toString()
      break
    case 'utc':
      timeString = now.toUTCString()
      break
    default:
      timeString = now.toISOString()
  }

  return new Response(
    JSON.stringify({
      time: timeString,
      format,
      timezone: 'UTC',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
