export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    return Response.json({
      echo: body,
      received: new Date().toISOString(),
    })
  } catch (error) {
    return Response.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    )
  }
}

export async function GET() {
  return Response.json(
    { error: 'Method not allowed. Use POST to echo data.' },
    { status: 405 }
  )
}
