'use client'

import { Clock, CheckCircle, Truck, CheckCheck } from 'lucide-react'

const colorMap = {
  pending: { classes: 'bg-yellow-50/80 text-yellow-700 border border-yellow-200/50', icon: Clock },
  accepted: { classes: 'bg-blue-50/80 text-blue-700 border border-blue-200/50', icon: CheckCircle },
  collected: { classes: 'bg-orange-50/80 text-orange-700 border border-orange-200/50', icon: Truck },
  completed: { classes: 'bg-green-50/80 text-green-700 border border-green-200/50', icon: CheckCheck },
}

export default function StatusBadge({ status }) {
  const config = colorMap[status] || { classes: 'bg-gray-50/80 text-gray-700 border border-gray-200/50', icon: Clock }
  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold capitalize backdrop-blur-sm shadow-sm transition-all duration-300 ${config.classes}`}>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : '—'}
    </span>
  )
}
