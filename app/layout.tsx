import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quro - Real-time Barbershop Wait Times',
  description: 'Know before you go. Join the waitlist for real-time barbershop wait times.',
  keywords: 'barbershop, wait time, queue, haircut, barber',
  openGraph: {
    title: 'Quro - Real-time Barbershop Wait Times',
    description: 'Know before you go. Join the waitlist for real-time barbershop wait times.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}