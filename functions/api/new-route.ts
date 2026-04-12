export const runtime = 'edge';
export async function onRequestGet(context: EventContext<unknown, string, unknown>) { return new Response( JSON.stringify({ message: 'New route!' }), { headers: { 'Content-Type': 'application/json' } } ) }
