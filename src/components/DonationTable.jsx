'use client'
import StatusBadge from './StatusBadge'
import { Trash2 } from 'lucide-react'

export function DonationTableSkeleton() {
  return (
    <div className="overflow-x-auto bg-white/80 border border-green-200/50 rounded-3xl shadow-sm overflow-hidden animate-pulse">
      <table className="min-w-full text-sm">
        <thead className="bg-green-700/10">
          <tr>
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <th key={i} className="px-4 py-4 text-left"><div className="h-4 bg-green-200 rounded w-16"></div></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((row) => (
            <tr key={row} className="border-t border-green-100/50">
              <td className="px-4 py-3"><div className="h-4 bg-green-100 rounded w-24"></div></td>
              <td className="px-4 py-3"><div className="h-4 bg-green-50 rounded w-8"></div></td>
              <td className="px-4 py-3"><div className="h-4 bg-green-50 rounded w-16"></div></td>
              <td className="px-4 py-3"><div className="h-4 bg-green-50 rounded w-32"></div></td>
              <td className="px-4 py-3"><div className="h-4 bg-green-50 rounded w-20"></div></td>
              <td className="px-4 py-3"><div className="h-6 bg-green-100 rounded-full w-20"></div></td>
              <td className="px-4 py-3"><div className="h-4 bg-green-50 rounded w-16"></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function DonationTable({ donations = [], onDelete, deletingIds }) {
  if (donations.length === 0) {
    return <p className="text-center text-gray-400 py-12">No donations found</p>
  }

  return (
    <div className="overflow-x-auto bg-white border border-green-200/50 rounded-3xl shadow-sm overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-green-700 text-white text-sm font-medium">
          <tr>
            {['Food Name', 'Quantity', 'Type', 'Location', 'Expiry', 'Status', 'Date',
              ...(onDelete ? ['Action'] : [])
            ].map((h) => (
              <th key={h} className="px-4 py-3.5 text-left font-semibold tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {donations.map((d, i) => {
            const isDeleting = deletingIds?.has(d._id)
            return (
              <tr key={d._id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-green-50/50'} hover:bg-green-100/60 transition-colors group`}>
                <td className="px-4 py-3 font-semibold text-green-900">{d.foodName}</td>
                <td className="px-4 py-3 text-gray-600 font-medium">{d.quantity}</td>
                <td className="px-4 py-3 text-gray-600 capitalize">{d.foodType}</td>
                <td className="px-4 py-3 text-gray-600 truncate max-w-xs">{d.location}</td>
                <td className="px-4 py-3 text-gray-600">{d.expiryTime ? new Date(d.expiryTime).toLocaleDateString() : '—'}</td>
                <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                <td className="px-4 py-3 text-gray-400">{d.createdAt ? new Date(d.createdAt).toLocaleDateString() : '—'}</td>
                {onDelete && (
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onDelete(d._id)}
                      disabled={isDeleting}
                      title="Delete"
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isDeleting ? <span className="animate-pulse">...</span> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
