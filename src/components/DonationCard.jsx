'use client'
import StatusBadge from './StatusBadge'
import { MapPin, Clock, Utensils } from 'lucide-react'

export function DonationCardSkeleton() {
  return (
    <div className="bg-white/80 border border-green-200/50 rounded-3xl shadow-sm p-5 flex flex-col gap-3 animate-pulse">
      <div className="w-full h-40 rounded-2xl bg-green-100/50"></div>
      <div className="space-y-2 mt-2">
        <div className="h-5 bg-green-100 rounded-lg w-3/4"></div>
        <div className="h-4 bg-green-50 rounded-lg w-1/2"></div>
        <div className="h-4 bg-green-50 rounded-lg w-full"></div>
        <div className="h-3 bg-green-50 rounded-lg w-1/3"></div>
      </div>
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="w-20 h-6 bg-green-100 rounded-full"></div>
        <div className="w-24 h-8 bg-green-100 rounded-xl"></div>
      </div>
    </div>
  )
}

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
    <div className="bg-white border border-green-200/50 rounded-3xl shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-green-300 transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col gap-3 group">
      {/* Image */}
      <div className="w-full h-40 rounded-2xl overflow-hidden bg-green-50 border border-green-100 flex items-center justify-center">
        {donation.image ? (
          <img src={donation.image} alt={donation.foodName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <Utensils className="w-10 h-10 text-green-300" />
        )}
      </div>

      {/* Info */}
      <div className="space-y-1.5 mt-1">
        <h3 className="font-bold text-green-900 text-lg leading-tight">{donation.foodName}</h3>
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-600">Qty:</span> {donation.quantity} &nbsp;|&nbsp;
          <span className="font-semibold text-gray-600">Type:</span>{' '}
          {donation.foodType ? donation.foodType.charAt(0).toUpperCase() + donation.foodType.slice(1) : '—'}
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-2">
          <MapPin className="w-4 h-4 text-green-600 shrink-0" />
          <span className="truncate">{donation.location}</span>
        </p>
        <p className="text-sm text-orange-600 font-medium flex items-center gap-1.5">
          <Clock className="w-4 h-4 shrink-0" />
          {expiry}
        </p>
        {donorName && (
          <p className="text-xs text-gray-400">
            {donorName}{donorType ? ` • ${donorType}` : ''}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-2">
        <StatusBadge status={donation.status} />
        {showAction && onAction && (
          <button
            onClick={() => onAction(donation._id)}
            disabled={!!actionDisabled}
            className="bg-green-700 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  )
}
