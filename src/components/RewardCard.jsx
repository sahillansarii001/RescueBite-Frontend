'use client'

const badgeStyle = {
  'Silver Badge': 'bg-gray-200 text-gray-700',
  'Gold Badge': 'bg-yellow-100 text-yellow-700',
  'Hunger Hero': 'bg-green-100 text-green-700',
}

const badgeIcon = {
  'Silver Badge': '🥈',
  'Gold Badge': '🥇',
  'Hunger Hero': '🦸',
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
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
      {/* Points */}
      <div className="flex items-center gap-3">
        <span className="text-4xl">⭐</span>
        <div>
          <p className="text-3xl font-bold text-gray-900">{points}</p>
          <p className="text-sm text-gray-500">Reward Points</p>
        </div>
      </div>

      {/* Progress */}
      {progress ? (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">{progress.label}</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{ width: `${Math.min(progress.pct, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">{donationCount} donations</p>
        </div>
      ) : (
        <p className="text-green-600 font-semibold">All badges earned! 🎉</p>
      )}

      {/* Badges */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Badges</p>
        {badges.length === 0 ? (
          <p className="text-sm text-gray-400">No badges yet. Keep donating!</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyle[badge] || 'bg-gray-100 text-gray-600'}`}
              >
                {badgeIcon[badge] || '🏅'} {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
