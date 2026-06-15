import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Highlife Training",
    template: "%s | Highlife Training",
  },
  description: "Employee training platform for Highlife retail - product knowledge, compliance, and sales excellence",
  keywords: ["training", "employee", "retail", "highlife", "learning", "compliance"],
  authors: [{ name: "Highlife Retail" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Highlife Training",
    title: "Highlife Training Platform",
    description: "Employee training platform for Highlife retail - product knowledge, compliance, and sales excellence",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Highlife Training Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Highlife Training Platform",
    description: "Employee training platform for Highlife retail",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon-dark-32x32.png",
    apple: "/apple-icon.png",
  },
  generator: "v0.app",
}

export const viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="highlife-theme">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
