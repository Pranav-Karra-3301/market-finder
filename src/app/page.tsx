'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HiUser, HiOfficeBuilding, HiCheck } from 'react-icons/hi';
import USAMap from '@/components/USAMap';
import ProductDropdown from '@/components/ProductDropdown';
import CarrierList from '@/components/CarrierList';
import { states } from '@/data/states';
import type { BusinessType } from '@/types/market';

function MarketFinderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Read state directly from URL
  const selectedState = searchParams.get('state') as '' | 'CA' | 'TX' | 'AZ' || '';
  const businessType = searchParams.get('type') as BusinessType || '';
  const selectedLOB = searchParams.get('lob') || '';

  const selectedStateData = states.find(s => s.code === selectedState);

  // Helper function to update URL with new parameters
  const updateURL = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const query = params.toString();
    const newUrl = query ? `/?${query}` : '/';
    router.push(newUrl, { scroll: false });
  };

  // Handler for state selection from map
  const handleStateSelect = (stateCode: string) => {
    updateURL({ 
      state: stateCode,
      type: null, // Reset business type when changing state
      lob: null // Reset LOB when changing state
    });
  };

  // Handler for business type selection
  const handleBusinessTypeSelect = (type: BusinessType) => {
    updateURL({ 
      type: type,
      lob: null // Reset LOB when changing business type
    });
  };

  // Handler for LOB selection
  const handleLOBSelect = (lob: string) => {
    updateURL({ lob });
  };

  const businessTypes: BusinessType[] = ['Personal', 'Commercial'];
  const showResults = selectedState && businessType && selectedLOB;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Click on a state in the map below to find available insurance carriers for your business needs
        </p>
      </div>
      
      {/* Always show the map prominently */}
      <div>
        <USAMap 
          selectedState={selectedState}
          onStateSelect={handleStateSelect}
        />
      </div>
      
      {/* Show business type and product selection if state is selected */}
      {selectedState && !showResults && (
        <div className="w-full space-y-8">
          {/* Business Type Selection */}
          <div className="control-card">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Select Business Type</h3>
              <p className="text-gray-600">Choose the type of insurance coverage you need in {selectedStateData?.name}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {businessTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleBusinessTypeSelect(type)}
                  className={`relative hover-scale p-8 rounded-lg text-center transition-all duration-100 ease-out ${
                    businessType === type
                      ? 'accent-border bg-blue-50 shadow-inner'
                      : 'border-2 border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                      businessType === type 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {type === 'Personal' ? (
                        <HiUser className="w-8 h-8" />
                      ) : (
                        <HiOfficeBuilding className="w-8 h-8" />
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{type}</h4>
                      <p className="text-sm text-gray-600">
                        {type === 'Personal' ? 'Individual & Family Coverage' : 'Business & Commercial Coverage'}
                      </p>
                    </div>
                  </div>
                  
                  {businessType === type && (
                    <div className="absolute -top-2 -right-2">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <HiCheck className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Selection Dropdown */}
          {businessType && (
            <div className="control-card">
              <ProductDropdown 
                businessType={businessType}
                selectedLOB={selectedLOB}
                onLOBSelect={handleLOBSelect}
              />
            </div>
          )}
        </div>
      )}
      
      {/* Show results if all selections are made */}
      {showResults && (
        <div>
          <CarrierList 
            selectedState={selectedState}
            businessType={businessType}
            selectedLOB={selectedLOB}
            onStateSelect={handleStateSelect}
            onBusinessTypeSelect={handleBusinessTypeSelect}
            onLOBSelect={handleLOBSelect}
          />
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-96">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-500 font-medium">Loading...</span>
        </div>
      </div>
    }>
      <MarketFinderContent />
    </Suspense>
  );
}
