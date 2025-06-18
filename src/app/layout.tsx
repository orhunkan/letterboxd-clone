import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SonnerToaster from "@/components/ui/sonner-toaster"
import AuthSessionProvider from "@/components/auth-session-provider"   // ➜ yeni satır

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Letterboxd Clone - Track films you've watched",
  description:
    "Keep track of every film you've ever watched (or just start from the day you join)",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#14181c]`}>
        {/* ➜ tüm UI ağacını SessionProvider ile sarmaladık */}
        <AuthSessionProvider>
          <SonnerToaster />
          <Header />
          {children}
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  )
}
