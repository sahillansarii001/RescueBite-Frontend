import './globals.css'
import Navbar from '../components/Navbar'
import ToasterProvider from '../components/ToasterProvider'

export const metadata = { title: 'RescueBite', description: 'Smart Food Rescue Platform' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        <ToasterProvider />
        {children}
      </body>
    </html>
  )
}
