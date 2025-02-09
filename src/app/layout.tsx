import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Recipe Finder App",
  description: "Discover delicious recipes with our accessible recipe finder app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a
          href="#main-content"
          className="visually-hidden focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary text-white p-2"
        >
          Skip to main content
        </a>
        <header className="bg-primary text-white p-4">
          <div className="container">
            <h1 className="text-2xl font-bold">Recipe Finder App</h1>
          </div>
        </header>
        <main id="main-content" className="container py-8">
          {children}
        </main>
        <footer className="bg-secondary p-4 mt-8">
          <div className="container">
            <p>&copy; 2025 Recipe Finder App</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

