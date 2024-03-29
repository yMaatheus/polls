import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Enquete',
    default: 'Enquete',
  },
  description: 'Crie uma enquete e compartilhe com seus amigos!',
}

type RootLayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'h-screen bg-background font-sans antialiased dark',
          fontSans.variable,
        )}
      >
        <main className="flex flex-col flex-1 items-center justify-center h-full">
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  )
}
