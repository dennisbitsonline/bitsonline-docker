import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Code } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Code className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Cloudflare Pages Template
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Next.js on Cloudflare Pages with Edge Runtime API routes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Edge Runtime</CardTitle>
              <CardDescription>Lightning-fast API routes at the edge</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Runs on Cloudflare's global network</li>
                <li>• Sub-50ms response times worldwide</li>
                <li>• TypeScript support built-in</li>
                <li>• Environment variable access</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next.js App Router</CardTitle>
              <CardDescription>Modern React framework features</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Server and Client Components</li>
                <li>• API Routes with Edge Runtime</li>
                <li>• Dynamic route parameters</li>
                <li>• Full TypeScript support</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Try the API</CardTitle>
              <CardDescription>Test the example Edge Runtime endpoints</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-mono text-sm">GET /api/hello</p>
                    <p className="text-xs text-muted-foreground mt-1">Simple greeting with timestamp</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a href="/api/hello" target="_blank">Test</a>
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-mono text-sm">GET /api/time</p>
                    <p className="text-xs text-muted-foreground mt-1">Current server time in multiple formats</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a href="/api/time" target="_blank">Test</a>
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-mono text-sm">POST /api/echo</p>
                    <p className="text-xs text-muted-foreground mt-1">Echo back request body as JSON</p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    POST Only
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-mono text-sm">GET /api/user/[id]</p>
                    <p className="text-xs text-muted-foreground mt-1">Dynamic route with path parameters</p>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a href="/api/user/123" target="_blank">Test</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Deploy to Cloudflare Pages • Push to GitHub and connect your repository
          </p>
        </div>
      </div>
    </main>
  )
}
