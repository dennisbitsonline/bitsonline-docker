# Cloudflare Pages Functions Template

A production-ready template for building serverless APIs with Cloudflare Pages Functions.

## Features

- 🚀 **Edge Functions** - Server-side code that runs at the edge
- 📁 **File-based Routing** - Automatic route generation from file structure
- 🔷 **TypeScript Support** - Full type safety and IntelliSense
- 🛠️ **Middleware** - Global request/response processing
- 🔒 **CORS Configured** - Ready for cross-origin requests
- 📝 **Well Documented** - Clear examples and patterns

## Project Structure

\`\`\`
/functions
  /_middleware.ts       # Global middleware for all routes
  /types.d.ts          # TypeScript definitions
  /api
    /hello.ts          # GET /api/hello
    /time.ts           # GET /api/time
    /echo.ts           # POST /api/echo
    /user
      /[id].ts         # GET/PUT /api/user/:id (dynamic route)
\`\`\`

## API Endpoints

### GET /api/hello
Simple greeting endpoint.

**Response:**
\`\`\`json
{
  "message": "Hello from Cloudflare Pages Functions!",
  "timestamp": "2024-01-15T12:00:00.000Z"
}
\`\`\`

### GET /api/time
Returns current server time with optional format parameter.

**Query Parameters:**
- \`format\` - Time format: \`iso\` (default), \`unix\`, or \`utc\`

**Response:**
\`\`\`json
{
  "time": "2024-01-15T12:00:00.000Z",
  "format": "iso",
  "timezone": "UTC"
}
\`\`\`

### POST /api/echo
Echoes back the request body.

**Request Body:**
\`\`\`json
{
  "message": "Hello"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "echo": { "message": "Hello" },
  "receivedAt": "2024-01-15T12:00:00.000Z"
}
\`\`\`

### GET /api/user/:id
Retrieves user by ID (dynamic route example).

**Response:**
\`\`\`json
{
  "success": true,
  "user": {
    "id": "123",
    "name": "User 123",
    "email": "user123@example.com",
    "createdAt": "2024-01-15T12:00:00.000Z"
  }
}
\`\`\`

## Development

### Prerequisites
- Node.js 18+ installed
- Cloudflare account (for deployment)

### Local Development
\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Visit http://localhost:3000 to see the app.

## Deployment to Cloudflare Pages

### Option 1: Deploy via Git
1. Push your code to GitHub
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Navigate to Pages
4. Click "Create a project" → "Connect to Git"
5. Select your repository
6. Cloudflare will automatically detect Next.js and deploy

### Option 2: Deploy via Wrangler CLI
\`\`\`bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy
\`\`\`

## Environment Variables

To add environment variables:

1. Go to Cloudflare Dashboard → Pages → Your Project
2. Navigate to Settings → Environment Variables
3. Add your variables for Production/Preview environments

Access them in your functions:
\`\`\`typescript
export async function onRequestGet(context: EventContext<CloudflareEnv, string, unknown>) {
  const apiKey = context.env.API_KEY
  // Use the variable
}
\`\`\`

## Adding New Routes

Create a new file in \`/functions/api/\`:

\`\`\`typescript
// /functions/api/new-route.ts

export async function onRequestGet(context: EventContext<unknown, string, unknown>) {
  return new Response(
    JSON.stringify({ message: 'New route!' }),
    {
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
\`\`\`

The route will automatically be available at \`/api/new-route\`.

## Learn More

- [Cloudflare Pages Functions Docs](https://developers.cloudflare.com/pages/functions/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## License

MIT
