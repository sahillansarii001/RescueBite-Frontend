'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { isLoggedIn } from '../utils/auth'

export default function LandingPage() {
  // If token is expired/invalid, isLoggedIn() auto-clears it via auth.js
  useEffect(() => { isLoggedIn() }, [])
  return (
    <main>
      {/* Hero */}
      <section className="min-h-screen bg-gradient-to-br from-green-700 to-green-900 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-3xl">
          Transform Surplus Food into Social Impact
        </h1>
        <p className="mt-4 text-green-100 text-lg md:text-xl max-w-xl">
          Connecting donors, NGOs and communities to rescue food and fight hunger
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition text-base"
          >
            Start Donating
          </Link>
          <Link
            href="/signup"
            className="border-2 border-white text-white hover:bg-white hover:text-green-800 font-semibold px-8 py-3 rounded-xl transition text-base"
          >
            I&apos;m an NGO
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-green-800 text-white py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center px-6">
          <div>
            <p className="text-3xl font-bold">🍱 12,000+</p>
            <p className="text-green-200 text-sm mt-1">Meals Saved</p>
          </div>
          <div>
            <p className="text-3xl font-bold">🤝 50+</p>
            <p className="text-green-200 text-sm mt-1">NGOs</p>
          </div>
          <div>
            <p className="text-3xl font-bold">📍 10</p>
            <p className="text-green-200 text-sm mt-1">Cities</p>
          </div>
        </div>
      </section>

      {/* Who Can Donate */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">Who Can Donate?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🏠', title: 'Individuals', desc: 'Leftover home cooked food' },
            { icon: '🍽️', title: 'Restaurants & Hotels', desc: 'Daily surplus meals' },
            { icon: '💒', title: 'Marriage Halls & Events', desc: 'Post-event bulk food' },
          ].map((c) => (
            <div key={c.title} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
              <span className="text-5xl">{c.icon}</span>
              <h3 className="mt-3 font-bold text-gray-900 text-lg">{c.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{c.desc}</p>
              <p className="text-green-600 text-xs mt-3 font-medium">All welcome to register as Donor</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Register', desc: 'Sign up as a Donor or NGO in seconds' },
              { step: '02', title: 'Upload Food', desc: 'Donor uploads surplus food with details' },
              { step: '03', title: 'NGO Collects', desc: 'NGO accepts and collects the donation' },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <p className="text-4xl font-extrabold text-green-200">{s.step}</p>
                <h3 className="font-bold text-gray-900 mt-2">{s.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-green-200 text-center py-6 text-sm">
        <p>🍃 RescueBite © 2024 — Rescue food. Feed hope. Fight hunger.</p>
      </footer>
    </main>
  )
}
