// POST endpoint that echoes request body
// File: /functions/api/echo.ts
// URL: /api/echo

export async function onRequestPost(context: EventContext<unknown, string, unknown>) {
  try {
    const body = await context.request.json()
    
    return new Response(
      JSON.stringify({
        success: true,
        echo: body,
        receivedAt: new Date().toISOString(),
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Invalid JSON in request body',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}

// Handle unsupported methods
export async function onRequest(context: EventContext<unknown, string, unknown>) {
  if (context.request.method !== 'POST') {
    return new Response(
      JSON.stringify({
        error: 'Method not allowed. Use POST.',
      }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Allow': 'POST',
        },
      }
    )
  }
  
  // Let the POST handler take over
  return context.next()
}
