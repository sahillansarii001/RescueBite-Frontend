'use client'

const colorMap = {
  pending: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-blue-100 text-blue-700',
  collected: 'bg-orange-100 text-orange-700',
  completed: 'bg-green-100 text-green-700',
}

export default function StatusBadge({ status }) {
  const classes = colorMap[status] || 'bg-gray-100 text-gray-700'
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${classes}`}>
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : '—'}
    </span>
  )
}
