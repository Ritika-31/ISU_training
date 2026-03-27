import './globals.css';

export const metadata = {
  title: 'Feedback Form - Next.js',
  description: 'A Next.js feedback form example for Day 4 training',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
