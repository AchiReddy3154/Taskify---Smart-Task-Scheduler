import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Taskify - Smart Task Scheduler',
  description: 'Taskify helps you organize, schedule, and get smart reminders for your tasks. Stay productive!',
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>Taskify - Smart Task Scheduler</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
