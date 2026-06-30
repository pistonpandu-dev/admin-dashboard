import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, AlertCircle } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="rounded-full bg-muted p-4">
          <AlertCircle className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
        <p className="text-center text-muted-foreground max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
