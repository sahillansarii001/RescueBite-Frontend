'use client'
import StatusBadge from './StatusBadge'

export default function DonationTable({ donations = [], onDelete, deletingIds }) {
  if (donations.length === 0) {
    return <p className="text-center text-gray-400 py-10">No donations found</p>
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            {['Food Name', 'Quantity', 'Type', 'Location', 'Expiry', 'Status', 'Date',
              ...(onDelete ? ['Action'] : [])
            ].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {donations.map((d, i) => {
            const isDeleting = deletingIds?.has(d._id)
            return (
              <tr key={d._id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-green-50 transition`}>
                <td className="px-4 py-3 font-medium text-gray-900">{d.foodName}</td>
                <td className="px-4 py-3 text-gray-600">{d.quantity}</td>
                <td className="px-4 py-3 text-gray-600 capitalize">{d.foodType}</td>
                <td className="px-4 py-3 text-gray-600">{d.location}</td>
                <td className="px-4 py-3 text-gray-600">{d.expiryTime ? new Date(d.expiryTime).toLocaleDateString() : '—'}</td>
                <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                <td className="px-4 py-3 text-gray-400">{d.createdAt ? new Date(d.createdAt).toLocaleDateString() : '—'}</td>
                {onDelete && (
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onDelete(d._id)}
                      disabled={isDeleting}
                      className="text-red-500 hover:text-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium"
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
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
