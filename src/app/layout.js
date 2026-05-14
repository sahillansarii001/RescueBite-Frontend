import './globals.css'
import ToasterProvider from '../components/ToasterProvider'
import { ThemeProvider } from '../context/ThemeContext'
import PublicShell from '../components/PublicShell'

export const metadata = {
  title: 'RescueBite — Smart Food Rescue Platform',
  description: 'Connecting food donors, NGOs and communities to rescue surplus food and fight hunger across India.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
        <ThemeProvider>
          <ToasterProvider />
          <PublicShell>
            {children}
          </PublicShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
