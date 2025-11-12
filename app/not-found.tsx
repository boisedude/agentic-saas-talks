import { FileQuestion } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full p-12 text-center border-2 border-slate-500/20 bg-background/50 backdrop-blur-sm">
        <FileQuestion className="mx-auto mb-6 h-24 w-24 text-muted-foreground" />
        <h1 className="mb-4 text-4xl font-bold">Page Not Found</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page may have been moved or deleted.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/">Go to Home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/episodes">View Episodes</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
