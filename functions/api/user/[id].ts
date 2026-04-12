// Dynamic route example with path parameters
// File: /functions/api/user/[id].ts
// URL: /api/user/:id

export async function onRequestGet(context: EventContext<unknown, string, unknown>) {
  const userId = context.params.id
  
  // Mock user data - in production, fetch from database
  const user = {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
    createdAt: new Date().toISOString(),
  }

  return new Response(
    JSON.stringify({
      success: true,
      user,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

export async function onRequestPut(context: EventContext<unknown, string, unknown>) {
  const userId = context.params.id
  
  try {
    const body = await context.request.json()
    
    // Mock update - in production, update database
    return new Response(
      JSON.stringify({
        success: true,
        message: `User ${userId} updated`,
        data: body,
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
        error: 'Invalid request body',
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
