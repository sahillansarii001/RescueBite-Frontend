'use client'
import StatusBadge from './StatusBadge'

export default function DonationCard({ donation, actionLabel, onAction, showAction, actionDisabled }) {
  const donor = donation.donorId
  // donorId can be a populated object or a plain string — handle both
  const donorName = typeof donor === 'object' && donor !== null ? donor.name : null
  const donorTypeRaw = typeof donor === 'object' && donor !== null ? donor.donorType : null
  const donorType = donorTypeRaw
    ? donorTypeRaw.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : ''

  const expiry = donation.expiryTime
    ? new Date(donation.expiryTime).toLocaleString()
    : '—'

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col gap-3">
      {/* Image */}
      <div className="w-full h-40 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        {donation.image ? (
          <img src={donation.image} alt={donation.foodName} className="w-full h-full object-cover" />
        ) : (
          <span className="text-5xl">🍱</span>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1">
        <h3 className="font-bold text-gray-900 text-base">{donation.foodName}</h3>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Qty:</span> {donation.quantity} &nbsp;|&nbsp;
          <span className="font-medium">Type:</span>{' '}
          {donation.foodType ? donation.foodType.charAt(0).toUpperCase() + donation.foodType.slice(1) : '—'}
        </p>
        <p className="text-sm text-gray-500">📍 {donation.location}</p>
        <p className="text-sm text-gray-500">⏰ {expiry}</p>
        {donorName && (
          <p className="text-sm text-gray-400">
            {donorName}{donorType ? ` • ${donorType}` : ''}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto">
        <StatusBadge status={donation.status} />
        {showAction && onAction && (
          <button
            onClick={() => onAction(donation._id)}
            disabled={!!actionDisabled}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs px-3 py-1.5 rounded-lg transition"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  )
}
