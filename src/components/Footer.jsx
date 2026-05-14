import Link from 'next/link'

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
  { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: '🐙', label: 'GitHub', href: 'https://github.com' },
  { icon: '📸', label: 'Instagram', href: 'https://instagram.com' },
  { icon: '🐦', label: 'Twitter', href: 'https://twitter.com' },
]

export default function Footer() {
  return (
    <footer className="border-t" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-teal-500/30">
                R
              </div>
              <span className="font-extrabold text-xl text-primary">RescueBite</span>
            </div>
            <p className="text-secondary text-sm leading-relaxed max-w-xs mb-6">
              A smart food rescue platform connecting donors, NGOs, and communities to fight hunger and reduce food waste across India.
            </p>
            <div className="flex gap-3 mb-6">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-base transition" style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-secondary)' }}>
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full">SDG 1 — No Poverty</span>
              <span className="text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1 rounded-full">SDG 2 — Zero Hunger</span>
              <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full">SDG 12 — Responsible Consumption</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-primary font-semibold text-sm mb-4 uppercase tracking-widest">{title}</p>
              <div className="flex flex-col gap-2.5">
                {links.map((l) => (
                  l.external ? (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                      className="text-secondary hover:text-primary text-sm transition flex items-center gap-1">
                      {l.label} <span className="text-xs opacity-50">↗</span>
                    </a>
                  ) : (
                    <Link key={l.label} href={l.href}
                      className="text-secondary hover:text-primary text-sm transition">
                      {l.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 p-6 rounded-2xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-primary">Stay updated on our impact</p>
              <p className="text-secondary text-sm mt-1">Get monthly reports on meals rescued, cities added, and platform updates.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input type="email" placeholder="Enter your email"
                className="flex-1 md:w-64 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition text-primary placeholder-gray-500"
                style={{ backgroundColor: 'var(--bg-base)', border: '1px solid var(--border)' }} />
              <button className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition whitespace-nowrap shadow-lg"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.2)' }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted" style={{ borderColor: 'var(--border)' }}>
          <p>© 2024 RescueBite. All rights reserved. Built with love to fight hunger across India.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-primary transition">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-primary transition">Terms of Service</Link>
            <Link href="/contact" className="hover:text-primary transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
