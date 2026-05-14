'use client'
import { useEffect, useState } from 'react'
import api from '../utils/api'

const rankStyle = {
  0: 'bg-yellow-50 border-yellow-300',
  1: 'bg-gray-100 border-gray-300',
  2: 'bg-orange-50 border-orange-300',
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
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-14 bg-gray-200 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {leaders.map((user, i) => (
        <div
          key={user._id}
          className={`flex items-center gap-4 px-4 py-3 rounded-xl border ${rankStyle[i] || 'bg-white border-gray-100'}`}
        >
          <span className="text-lg font-bold text-gray-500 w-6">#{i + 1}</span>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
            <p className="text-xs text-gray-400 capitalize">{user.donorType?.replace('_', ' ')}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-green-700">⭐ {user.points}</p>
            {user.badges?.[user.badges.length - 1] && (
              <p className="text-xs text-gray-400">{user.badges[user.badges.length - 1]}</p>
            )}
          </div>
        </div>
      ))}
      {leaders.length === 0 && <p className="text-center text-gray-400 py-6">No donors yet</p>}
    </div>
  )
}
