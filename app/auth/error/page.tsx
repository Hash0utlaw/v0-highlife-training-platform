export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Authentication Error</h1>
        <p className="text-muted-foreground">Something went wrong. Please try logging in again.</p>
        <a href="/login" className="text-primary underline text-sm">Back to Login</a>
      </div>
    </div>
  )
}
