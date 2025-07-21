'use client';

import { useState, useEffect, useRef } from 'react';
import { HiCheckCircle, HiChevronRight, HiChevronDown } from 'react-icons/hi';
import { carriers } from '@/data/carriers';
import { states } from '@/data/states';
import { lobs } from '@/data/lobs';
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
  const [businessTypeDropdownOpen, setBusinessTypeDropdownOpen] = useState(false);
  const [lobDropdownOpen, setLobDropdownOpen] = useState(false);
  
  const businessTypeRef = useRef<HTMLDivElement>(null);
  const lobRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (businessTypeRef.current && !businessTypeRef.current.contains(event.target as Node)) {
        setBusinessTypeDropdownOpen(false);
      }
      if (lobRef.current && !lobRef.current.contains(event.target as Node)) {
        setLobDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!selectedState || !businessType || !selectedLOB) {
    return null;
  }

  const selectedStateData = states.find(s => s.code === selectedState);
  const businessTypes: BusinessType[] = ['Personal', 'Commercial'];
  const availableLOBs = lobs[businessType];
  
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

  const handleBusinessTypeChange = (newType: BusinessType) => {
    setBusinessTypeDropdownOpen(false);
    if (newType !== businessType) {
      onBusinessTypeSelect(newType);
      // Reset LOB selection when business type changes
      // The parent component will handle this through URL updates
    }
  };

  const handleLOBChange = (newLOB: string) => {
    setLobDropdownOpen(false);
    onLOBSelect(newLOB);
  };

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
      {/* Results Header with Controls */}
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
        
        {/* Interactive Controls Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
            {/* Business Type Selector */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <div className="relative" ref={businessTypeRef}>
                <button
                  onClick={() => setBusinessTypeDropdownOpen(!businessTypeDropdownOpen)}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
                >
                  <span className="text-gray-900">{businessType}</span>
                  <HiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${businessTypeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {businessTypeDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                    {businessTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => handleBusinessTypeChange(type)}
                        className={`w-full px-3 py-2 text-left hover:bg-gray-50 ${
                          businessType === type ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
                        } first:rounded-t-md last:rounded-b-md`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Insurance Product Selector */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Product</label>
              <div className="relative" ref={lobRef}>
                <button
                  onClick={() => setLobDropdownOpen(!lobDropdownOpen)}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
                >
                  <span className="text-gray-900">{selectedLOB}</span>
                  <HiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${lobDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {lobDropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {availableLOBs.map((lob) => (
                      <button
                        key={lob}
                        onClick={() => handleLOBChange(lob)}
                        className={`w-full px-3 py-2 text-left hover:bg-gray-50 ${
                          selectedLOB === lob ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
                        } border-t border-gray-100 first:border-t-0 first:rounded-t-md last:rounded-b-md`}
                      >
                        {lob}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Current State Display (Read-only) */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <div className="flex items-center space-x-2 bg-gray-100 border border-gray-200 rounded-md px-3 py-2">
                <Image
                  src={`/state_flags/${selectedState.toLowerCase()}.png`}
                  alt={`${selectedStateData?.name} flag`}
                  width={20}
                  height={15}
                  className="rounded-sm"
                />
                <span className="text-gray-700 font-medium">{selectedStateData?.name}</span>
              </div>
            </div>
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