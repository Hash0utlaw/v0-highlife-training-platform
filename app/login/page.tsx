import { LoginForm } from "@/components/login-form"
import { Leaf } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Hero Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary/5">
        <div className="absolute inset-0">
          <img
            src="/cannabis-dispensary-interior-modern-retail-store-w.jpg"
            alt="Highlife retail store interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col justify-end p-12 text-foreground">
          <blockquote className="space-y-4">
            <p className="text-xl font-medium leading-relaxed">
              "Empowering our team with knowledge to deliver exceptional customer experiences."
            </p>
            <footer className="text-sm text-muted-foreground">— Highlife Training Team</footer>
          </blockquote>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 bg-background">
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
    </div>
  )
}
