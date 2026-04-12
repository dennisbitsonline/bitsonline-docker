// Global middleware for all functions
// File: /functions/_middleware.ts
// Runs before all API routes

export async function onRequest(context: EventContext<unknown, string, unknown>) {
  // Add CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  // Handle preflight requests
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    })
  }

  // Log request (in production, you'd want to use a proper logging service)
  console.log(`[${new Date().toISOString()}] ${context.request.method} ${context.request.url}`)

  // Continue to the next handler
  const response = await context.next()

  // Add CORS headers to response
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}
