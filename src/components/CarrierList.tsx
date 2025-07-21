'use client';

import { HiCheckCircle, HiChevronRight } from 'react-icons/hi';
import { carriers } from '@/data/carriers';
import { states } from '@/data/states';
import { BusinessType } from '@/types/market';
import Image from 'next/image';

interface CarrierListProps {
  selectedState: string;
  businessType: BusinessType;
  selectedLOB: string;
  onStateSelect: (stateCode: string) => void;
  onBusinessTypeSelect: (type: BusinessType) => void;
  onLOBSelect: (lob: string) => void;
}

export default function CarrierList({ 
  selectedState, 
  businessType, 
  selectedLOB,
  onStateSelect,
  onBusinessTypeSelect, 
  onLOBSelect 
}: CarrierListProps) {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {carriers.map((carrier) => (
        <div
          key={carrier.id}
          className="clean-card hover-scale cursor-pointer"
        >
          <div className="flex items-center space-x-4">
            {carrier.logo ? (
              <div className="w-16 h-12 relative bg-white rounded border border-gray-100 p-2 flex-shrink-0">
                <Image
                  src={carrier.logo}
                  alt={`${carrier.name} logo`}
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                />
              </div>
            ) : (
              <div className="w-16 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded border border-blue-200 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">
                  {carrier.name.split(' ').map(word => word[0]).join('').slice(0, 3)}
                </span>
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-semibold text-gray-900 truncate">
                {carrier.name}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Available in {selectedStateData?.name}
              </p>
              
              <div className="flex items-center mt-2 space-x-2">
                <div className="flex items-center space-x-1">
                  <HiCheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">{selectedLOB}</span>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <HiChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full space-y-8">
      {/* Results Header */}
      <div className="clean-card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <HiCheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Available Carriers</h2>
            <p className="text-sm text-gray-600">Found {availableCarriers.length} carriers for {selectedLOB}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="inline-flex items-center px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg font-medium">
            {selectedLOB}
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600 font-medium">{selectedStateData?.name}</span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-600">{businessType}</span>
        </div>
      </div>

      {/* Carrier Results */}
      <div className="space-y-8">
        {/* Online Carriers */}
        {onlineCarriers.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Online Applications</h3>
            <CarrierGrid carriers={onlineCarriers} />
          </div>
        )}

        {/* Offline Carriers */}
        {offlineCarriers.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Required</h3>
            <CarrierGrid carriers={offlineCarriers} />
          </div>
        )}

        {availableCarriers.length === 0 && (
          <div className="clean-card text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiCheckCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No carriers available</h3>
            <p className="text-gray-500 mb-4">Try selecting a different line of business or state.</p>
          </div>
        )}
      </div>
    </div>
  );
} 