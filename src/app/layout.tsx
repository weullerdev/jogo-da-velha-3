'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SocketProvider } from '@/hooks/socket'
import io from 'socket.io-client'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  const ENDPOINT = 'http://localhost:3333'

  const connection = io(ENDPOINT)

  return (
    <html lang="en">
      <SocketProvider connection={connection}>
        <body className={inter.className}>
          {children}
        </body>
      </SocketProvider>
    </html>
  )
}
