
import type { Metadata } from "next"
import { Italiana, Italianno, Montserrat } from "next/font/google"
import "../styles/globals.css"
import { ThemeProvider } from "~/components/shared/theme-provider"
import { Toaster } from "sonner"
import { TooltipProvider } from "~/components/ui/tooltip"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
})

const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-italiana",
})

const italianno = Italianno({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-italianno",
})

export const metadata: Metadata = {
  title: "Reuse",
  description: "Reuse products.",
  icons: {
    icon: "/logo.svg",
    
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${montserrat.className} ${italiana.variable} ${italianno.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme>
          <Toaster
            swipeDirections={["right"]}
            toastOptions={{
              closeButton: true,
            }}
            richColors
          />

          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}