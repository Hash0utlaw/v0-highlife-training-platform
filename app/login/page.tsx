import { LoginForm } from "@/components/login-form"
import { Leaf } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">Highlife Training</h1>
            <p className="text-sm text-muted-foreground mt-1">Employee Learning Portal</p>
          </div>
        </div>

        {/* Login Form */}
        <LoginForm />
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-muted-foreground">© 2025 Highlife Retail. All rights reserved.</p>
    </div>
  )
}
