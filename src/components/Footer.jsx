import Link from 'next/link'
import { Briefcase, Code2, Camera, MessageCircle, ExternalLink } from 'lucide-react'

const footerLinks = {
  Platform: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Impact', href: '/impact' },
    { label: 'Contact', href: '/contact' },
  ],
  'Get Involved': [
    { label: 'Donate Food', href: '/signup' },
    { label: 'Register as NGO', href: '/signup' },
    { label: 'Partner With Us', href: '/contact' },
    { label: 'Volunteer', href: '/contact' },
    { label: 'View Leaderboard', href: '/signup' },
  ],
  Resources: [
    { label: 'FAO Reports', href: 'https://www.fao.org', external: true },
    { label: 'NITI Aayog SDG', href: 'https://niti.gov.in', external: true },
    { label: 'UNDP MPI', href: 'https://hdr.undp.org', external: true },
    { label: 'UN SDG Goals', href: 'https://sdgs.un.org', external: true },
    { label: 'NFHS Data', href: 'https://mohfw.gov.in', external: true },
  ],
}

const socials = [
  { icon: <Briefcase className="w-4 h-4" />, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: <Code2 className="w-4 h-4" />, label: 'GitHub', href: 'https://github.com' },
  { icon: <Camera className="w-4 h-4" />, label: 'Instagram', href: 'https://instagram.com' },
  { icon: <MessageCircle className="w-4 h-4" />, label: 'Twitter', href: 'https://twitter.com' },
]

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-sm font-bold text-green-900 shadow-lg">
                R
              </div>
              <span className="font-extrabold text-xl text-white">RescueBite</span>
            </div>
            <p className="text-green-200 text-sm leading-relaxed max-w-xs mb-6">
              A smart food rescue platform connecting donors, NGOs, and communities to fight hunger and reduce food waste across India.
            </p>
            <div className="flex gap-3 mb-6">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-base transition-all duration-300 bg-green-800 hover:bg-green-700 text-green-200 hover:text-white hover:-translate-y-1 shadow-md hover:shadow-lg">
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-green-800 text-green-200 border border-green-700 px-3 py-1 rounded-full">SDG 1 — No Poverty</span>
              <span className="text-xs bg-green-800 text-green-200 border border-green-700 px-3 py-1 rounded-full">SDG 2 — Zero Hunger</span>
              <span className="text-xs bg-green-800 text-green-200 border border-green-700 px-3 py-1 rounded-full">SDG 12 — Responsible Consumption</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">{title}</p>
              <div className="flex flex-col gap-2.5">
                {links.map((l) => (
                  l.external ? (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                      className="group text-green-200 hover:text-white text-sm transition-all duration-300 flex items-center gap-1.5 w-fit">
                      {l.label} <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <Link key={l.label} href={l.href}
                      className="text-green-200 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">
                      {l.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 p-8 rounded-3xl bg-green-800/80 backdrop-blur-sm border border-green-700 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-white text-lg">Stay updated on our impact</p>
              <p className="text-green-200 text-sm mt-1.5">Get monthly reports on meals rescued, cities added, and platform updates.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input type="email" placeholder="Enter your email"
                className="flex-1 md:w-72 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 bg-white/95 focus:bg-white border-2 border-transparent focus:border-green-400 shadow-inner" />
              <button className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 whitespace-nowrap shadow-[0_4px_14px_0_rgba(234,88,12,0.39)] hover:shadow-[0_6px_20px_rgba(234,88,12,0.23)] bg-orange-600 hover:bg-orange-500 hover:-translate-y-0.5">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-green-700 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-green-400">
          <p>© 2024 RescueBite. All rights reserved. Built with love to fight hunger across India.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
