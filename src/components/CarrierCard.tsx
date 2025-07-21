import type { Carrier } from '@/types/market';

interface CarrierCardProps {
  carrier: Carrier;
}

export default function CarrierCard({ carrier }: CarrierCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{carrier.name}</h3>
        <div className="flex gap-1">
          {carrier.tags.map(tag => (
            <span
              key={tag}
              className={`px-2 py-1 text-xs rounded-full ${
                tag === 'Online' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div>
          <span className="font-medium">States:</span> {carrier.states.join(', ')}
        </div>
        <div>
          <span className="font-medium">Lines:</span> {carrier.lines.join(', ')}
        </div>
      </div>
    </div>
  );
} 