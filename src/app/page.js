'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { isLoggedIn } from '../utils/auth'
import { Zap, MapPin, Building2, BarChart3, Lock, Globe2, Home, UtensilsCrossed, PartyPopper, Store, Star } from 'lucide-react'

const stats = [
  { value: '12,000+', label: 'Meals Rescued' },
  { value: '50+', label: 'NGO Partners' },
  { value: '8 Tonnes', label: 'Food Saved' },
  { value: '10 Cities', label: 'Active Regions' },
]

const features = [
  { icon: <Zap className="w-6 h-6 text-green-600" />, title: 'Instant Matching', desc: 'Connects donors with the nearest verified NGO in real time — no delays, no waste.' },
  { icon: <MapPin className="w-6 h-6 text-green-600" />, title: 'Live Tracking', desc: 'Track every donation from upload to collection with live status updates.' },
  { icon: <Building2 className="w-6 h-6 text-green-600" />, title: 'Verified NGO Network', desc: 'Every NGO is manually verified. You know your food reaches the right hands.' },
  { icon: <BarChart3 className="w-6 h-6 text-green-600" />, title: 'Impact Analytics', desc: 'See your personal impact — meals saved, points earned, badges unlocked.' },
  { icon: <Lock className="w-6 h-6 text-green-600" />, title: 'Secure & Transparent', desc: 'End-to-end donation tracking with full audit trail. Every action is logged.' },
  { icon: <Globe2 className="w-6 h-6 text-green-600" />, title: 'SDG Aligned', desc: 'Contributing to UN SDG 1 (No Poverty), SDG 2 (Zero Hunger), and SDG 12.' },
]

const donors = [
  { icon: <Home className="w-8 h-8 text-orange-500" />, title: 'Households', desc: 'Leftover home-cooked meals that deserve a second life.' },
  { icon: <UtensilsCrossed className="w-8 h-8 text-orange-500" />, title: 'Restaurants & Hotels', desc: 'Daily surplus meals — schedule recurring pickups effortlessly.' },
  { icon: <PartyPopper className="w-8 h-8 text-orange-500" />, title: 'Events & Banquets', desc: 'Post-event bulk food rescued before it goes to waste.' },
  { icon: <Store className="w-8 h-8 text-orange-500" />, title: 'Grocery & Retail', desc: 'Near-expiry packaged goods redistributed to communities.' },
]

const steps = [
  { num: '01', title: 'Create an Account', desc: 'Sign up as a Donor, NGO, or Restaurant in under 2 minutes.' },
  { num: '02', title: 'Post Surplus Food', desc: 'Add food details, quantity, expiry, location and an optional photo.' },
  { num: '03', title: 'NGO Gets Notified', desc: 'Nearby verified NGOs are instantly alerted and can accept the donation.' },
  { num: '04', title: 'Food Gets Rescued', desc: 'NGO collects the food and marks it delivered. Impact is updated live.' },
]

const testimonials = [
  { name: 'Priya Sharma', role: 'Restaurant Owner, Mumbai', avatar: 'PS', quote: 'We used to throw away 20kg of food daily. RescueBite changed that completely. Now it reaches families in need within hours.' },
  { name: 'Ravi Kumar', role: 'NGO Director, Pune', avatar: 'RK', quote: 'The platform is incredibly easy to use. We\'ve collected over 500 donations in 3 months. The real-time notifications are a game changer.' },
  { name: 'Anita Desai', role: 'Individual Donor, Bangalore', avatar: 'AD', quote: 'I never knew donating leftover food could be this simple. I posted my first donation and it was picked up within 90 minutes.' },
]

const partners = ['Apollo Hospitals', 'Dominos India', 'Taj Hotels', 'BigBasket', 'IIT Mumbai', 'TATA Trust']

const awards = [
  { title: 'Best Social Impact Startup', org: 'Startup India 2024' },
  { title: 'Top 10 Food Tech Platforms', org: 'Forbes India 2024' },
  { title: 'SDG Champion Award', org: 'UNDP India 2023' },
]

export default function HomePage() {
  useEffect(() => { isLoggedIn() }, [])

  return (
    <main className="overflow-x-hidden bg-white">

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-gradient-to-br from-green-800 to-green-900">
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-green-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-widest uppercase bg-green-800/50 text-green-200">
            <span className="w-2 h-2 rounded-full animate-pulse bg-green-400" />
            Fighting Hunger Across India
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            Transform Surplus Food
            <br />
            <span className="text-orange-400">Into Social Impact</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-green-100">
            RescueBite connects food donors, verified NGOs, and communities to rescue surplus food — powered by technology, driven by compassion.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link href="/signup" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition">
              Start Donating Free →
            </Link>
            <Link href="/how-it-works" className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-8 py-3 rounded-xl font-semibold transition">
              See How It Works
            </Link>
          </div>
          <p className="mt-6 text-sm text-green-200">No minimum quantity · Free to join · Instant NGO matching</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-green-800 py-14">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-bold text-orange-400">{s.value}</p>
              <p className="text-sm mt-1 text-green-200">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest text-green-700">Platform Features</span>
            <h2 className="text-4xl font-bold mt-3 text-green-900">Built for Real Impact</h2>
            <p className="mt-4 max-w-xl mx-auto text-gray-500">Every feature is designed to make food rescue faster, safer, and more transparent.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="group p-8 rounded-3xl border border-green-200/50 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-green-300 hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-green-50 group-hover:bg-green-100 transition-colors">{f.icon}</div>
                <h3 className="font-bold text-lg mb-3 text-green-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Donate */}
      <section className="py-24 px-6 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest text-orange-600">Donors</span>
            <h2 className="text-4xl font-bold mt-3 text-green-900">Who Can Donate?</h2>
            <p className="mt-4 text-gray-500">Anyone with surplus food is welcome — no minimum, no barriers.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {donors.map((d) => (
              <div key={d.title} className="p-8 rounded-3xl border border-green-200/50 bg-white/80 backdrop-blur-sm text-center hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:border-green-300 transition-all duration-300 cursor-default">
                <div className="mb-6 flex justify-center">{d.icon}</div>
                <h3 className="font-bold text-xl text-green-900 mb-3">{d.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 font-medium">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest text-green-700">Process</span>
            <h2 className="text-4xl font-bold mt-3 text-green-900">How It Works</h2>
            <p className="mt-4 text-gray-500">Four simple steps from surplus food to rescued meal.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {steps.map((s, i) => (
              <div key={s.num} className="relative text-center">
                <div className="bg-green-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-4">{s.num}</div>
                {i < steps.length - 1 && <div className="hidden md:block absolute top-5 left-[calc(50%+28px)] right-0 border-t-2 border-dashed border-green-300" />}
                <h3 className="font-semibold mb-2 text-green-800">{s.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/how-it-works" className="inline-flex items-center gap-2 font-semibold text-sm transition text-green-700 hover:text-green-900 underline">
              View full workflow →
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-14 px-6 bg-green-50 border-y border-green-200">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest mb-8 text-gray-400">Trusted by organizations across India</p>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((p) => (
              <span key={p} className="text-sm font-medium px-4 py-2 rounded-full border border-green-200 text-gray-600 hover:border-green-400 hover:text-green-700 transition cursor-default">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-semibold text-sm uppercase tracking-widest text-green-700">Testimonials</span>
            <h2 className="text-4xl font-bold mt-3 text-green-900">What People Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-8 rounded-3xl border border-green-200/50 bg-white/80 backdrop-blur-sm flex flex-col gap-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300">
                <div className="flex gap-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />)}</div>
                <p className="text-sm leading-relaxed italic text-gray-600 font-medium">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-auto pt-5 border-t border-green-100/50 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold bg-green-100 text-green-700">{t.avatar}</div>
                  <div>
                    <p className="font-bold text-sm text-green-900">{t.name}</p>
                    <p className="text-xs mt-0.5 font-medium text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 px-6 bg-green-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-semibold text-sm uppercase tracking-widest text-orange-600">Recognition</span>
            <h2 className="text-3xl font-bold mt-3 text-green-900">Awards & Recognition</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {awards.map((a) => (
              <div key={a.title} className="flex items-center gap-5 p-6 rounded-3xl border border-green-200/50 bg-white/80 backdrop-blur-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-orange-50/80">
                  <Star className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-sm text-green-900">{a.title}</p>
                  <p className="text-xs mt-0.5 text-gray-400">{a.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-green-700 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-5 text-white">
            Ready to make a <span className="text-orange-400">difference?</span>
          </h2>
          <p className="mb-10 text-lg text-green-100">Join thousands of donors and NGOs already fighting hunger with RescueBite.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition">
              Get Started Free
            </Link>
            <Link href="/impact" className="border-2 border-white text-white hover:bg-white hover:text-green-800 px-8 py-3 rounded-xl font-semibold transition">
              View Impact Data
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
