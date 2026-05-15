'use client'
import { useEffect, useState } from 'react'
import api from '../utils/api'
import { Star, Trophy, Medal } from 'lucide-react'

const rankStyle = {
  0: 'bg-yellow-50/80 border border-yellow-200/50 shadow-sm',
  1: 'bg-gray-50/80 border border-gray-200/50 shadow-sm',
  2: 'bg-orange-50/80 border border-orange-200/50 shadow-sm',
}

const rankIconStyle = {
  0: <Trophy className="w-5 h-5 text-yellow-600" />,
  1: <Medal className="w-5 h-5 text-gray-400" />,
  2: <Medal className="w-5 h-5 text-orange-400" />,
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/users/leaderboard')
      .then((res) => setLeaders(res.data.leaderboard || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-3xl shadow-sm p-6">
        <h3 className="text-green-900 font-bold text-xl mb-6">Leaderboard</h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-[68px] bg-green-100/50 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-green-200/50 rounded-3xl shadow-sm p-6">
      <h3 className="text-green-900 font-bold text-xl mb-6 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-green-700" />
        Leaderboard
      </h3>
      <div className="space-y-3">
        {leaders.map((user, i) => (
          <div
            className={`flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${rankStyle[i] || 'bg-white/60 border border-green-100/50'}`}
          >
            <div className="w-8 flex justify-center shrink-0">
              {rankIconStyle[i] || <span className="text-gray-400 font-bold text-sm">#{i + 1}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-green-900 text-sm truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize truncate">{user.donorType?.replace('_', ' ')}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-green-700 flex items-center justify-end gap-1">
                <Star className="w-3.5 h-3.5 fill-green-700" /> {user.points}
              </p>
              {user.badges?.[user.badges.length - 1] && (
                <p className="text-[10px] uppercase tracking-wide text-gray-500 mt-0.5">{user.badges[user.badges.length - 1]}</p>
              )}
            </div>
          </div>
        ))}
        {leaders.length === 0 && <p className="text-center text-gray-400 py-6">No donors yet</p>}
      </div>
    </div>
  )
}
