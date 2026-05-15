'use client'
import { Star, Medal, Award, Zap, PartyPopper } from 'lucide-react'

const badgeStyle = {
  'Silver Badge': 'bg-gray-100/80 text-gray-700 border border-gray-200/50 shadow-sm',
  'Gold Badge': 'bg-yellow-100/80 text-yellow-800 border border-yellow-200/50 shadow-sm',
  'Hunger Hero': 'bg-green-100/80 text-green-800 border border-green-200/50 shadow-sm',
}

const badgeIcon = {
  'Silver Badge': <Medal className="w-4 h-4 text-gray-500 shrink-0" />,
  'Gold Badge': <Award className="w-4 h-4 text-yellow-600 shrink-0" />,
  'Hunger Hero': <Zap className="w-4 h-4 text-green-600 shrink-0" />,
}

function getProgress(donationCount) {
  if (donationCount < 10) return { label: 'Progress to Silver Badge', pct: (donationCount / 10) * 100 }
  if (donationCount < 50) return { label: 'Progress to Gold Badge', pct: (donationCount / 50) * 100 }
  if (donationCount < 100) return { label: 'Progress to Hunger Hero', pct: (donationCount / 100) * 100 }
  return null
}

export default function RewardCard({ points = 0, badges = [], donationCount = 0 }) {
  const progress = getProgress(donationCount)

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-3xl shadow-sm p-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 shadow-sm">
          <Star className="w-6 h-6 text-orange-500 fill-orange-500" />
        </div>
        <div>
          <p className="text-4xl font-black text-green-900 tracking-tight">{points}</p>
          <p className="text-sm font-medium text-gray-500 mt-0.5">Reward Points</p>
        </div>
      </div>

      {progress ? (
        <div>
          <div className="flex justify-between items-end mb-2">
            <p className="text-sm font-semibold text-gray-700">{progress.label}</p>
            <p className="text-xs text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded-md">{donationCount} donations</p>
          </div>
          <div className="w-full bg-green-50 rounded-full h-2.5 overflow-hidden border border-green-100/50">
            <div className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.min(progress.pct, 100)}%` }} />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-green-700 font-bold bg-green-50 px-4 py-3 rounded-xl border border-green-200/50">
          <PartyPopper className="w-5 h-5 text-green-600" /> All badges earned!
        </div>
      )}

      <div>
        <p className="text-sm font-bold text-green-900 mb-3">Badges Earned</p>
        {badges.length === 0 ? (
          <p className="text-sm text-gray-500 italic bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">No badges yet. Keep donating!</p>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {badges.map((badge) => (
              <span key={badge} className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-bold ${badgeStyle[badge] || 'bg-gray-100 text-gray-600'}`}>
                {badgeIcon[badge] || <Award className="w-4 h-4" />} {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
