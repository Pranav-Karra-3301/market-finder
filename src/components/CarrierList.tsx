'use client';

import { carriers } from '@/data/carriers';
import { states } from '@/data/states';
import { useMarketStore } from '@/store/useMarketStore';

export default function CarrierList() {
  const { selectedState, businessType, selectedLOB } = useMarketStore();

  if (!selectedState || !businessType || !selectedLOB) {
    return null;
  }

  const selectedStateData = states.find(s => s.code === selectedState);
  
  // Filter carriers based on selected state and LOB
  const availableCarriers = carriers.filter(carrier => 
    carrier.states.includes(selectedState) && 
    carrier.lines.includes(selectedLOB)
  );

  const onlineCarriers = availableCarriers.filter(carrier => 
    carrier.tags.includes('Online')
  );
  
  const offlineCarriers = availableCarriers.filter(carrier => 
    carrier.tags.includes('Offline') && !carrier.tags.includes('Online')
  );

  const CarrierGrid = ({ carriers }: { carriers: typeof availableCarriers }) => (
    <div className="grid grid-cols-4 gap-4">
      {carriers.map(carrier => (
        <div key={carrier.id} className="flex items-center justify-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900 truncate">
              {carrier.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Market Finder</h1>
        </div>

        {/* Selected State Highlight */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{selectedState}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full mb-4">
                <span className="font-semibold">{selectedStateData?.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instant Quotes Section */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Instant Quotes</h2>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
              <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded font-medium">
                {selectedLOB}
              </span>
              <span>|</span>
              <span>{selectedStateData?.name}</span>
              <button className="ml-2 text-teal-600 hover:text-teal-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Available carriers</h3>
            
            {/* Bolt Appointment + Online */}
            {onlineCarriers.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-medium text-gray-700">Bolt Appointment:</span>
                </div>
                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-700 mb-3">Online:</div>
                  <CarrierGrid carriers={onlineCarriers} />
                </div>
              </div>
            )}

            {/* Offline */}
            {offlineCarriers.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-3">Offline:</div>
                <CarrierGrid carriers={offlineCarriers} />
              </div>
            )}

            {availableCarriers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No carriers available for the selected combination.</p>
                <p className="text-sm mt-2">Try selecting a different line of business.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 