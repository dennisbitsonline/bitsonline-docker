export const runtime = 'edge'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  // Simulate user lookup
  const mockUser = {
    id,
    name: `User ${id}`,
    email: `user${id}@example.com`,
    createdAt: new Date().toISOString(),
  }
  
  return Response.json(mockUser)
}
