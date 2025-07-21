'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { HiCheck } from 'react-icons/hi';
import USAMap from '@/components/USAMap';
import ProductDropdown from '@/components/ProductDropdown';
import CarrierList from '@/components/CarrierList';
import { states } from '@/data/states';
import type { BusinessType } from '@/types/market';

function MarketFinderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Refs for smooth scrolling
  const mapRef = useRef<HTMLDivElement>(null);
  const businessTypeRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Read state directly from URL
  const selectedState = searchParams.get('state') as '' | 'CA' | 'TX' | 'AZ' || '';
  const businessType = searchParams.get('type') as BusinessType || '';
  const selectedLOB = searchParams.get('lob') || '';

  const selectedStateData = states.find(s => s.code === selectedState);

  // Helper function for smooth scrolling
  const smoothScrollTo = (element: HTMLDivElement | null, offset = 120, extraSpace = 0) => {
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      
      // Calculate if we need extra space for dropdown or other content
      const viewportHeight = window.innerHeight;
      const elementHeight = element.offsetHeight;
      const availableSpace = viewportHeight - offset;
      
      // If element + extra space exceeds available viewport, scroll further
      const totalNeededSpace = elementHeight + extraSpace;
      const additionalScroll = totalNeededSpace > availableSpace ? totalNeededSpace - availableSpace + 40 : 0;
      
      window.scrollTo({
        top: offsetPosition + additionalScroll,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll effects based on user progress
  useEffect(() => {
    // Small delay to ensure DOM is ready and avoid jarring immediate scrolls
    const scrollTimeout = setTimeout(() => {
      if (selectedState && businessType && selectedLOB) {
        // Final step: scroll to results
        smoothScrollTo(resultsRef.current, 80);
      } else if (selectedState && businessType) {
        // Second step: scroll to product selection with extra space for dropdown
        smoothScrollTo(productRef.current, 120, 300); // Extra 300px for dropdown space
      } else if (selectedState) {
        // First step: scroll to business type selection
        smoothScrollTo(businessTypeRef.current);
      }
    }, 300); // Short delay for better UX

    return () => clearTimeout(scrollTimeout);
  }, [selectedState, businessType, selectedLOB]);

  // Handle dropdown toggle to adjust scroll position
  const handleDropdownToggle = (isOpen: boolean) => {
    if (isOpen && productRef.current) {
      // When dropdown opens, ensure there's enough space to see all options
      setTimeout(() => {
        smoothScrollTo(productRef.current, 120, 320); // Extra space for open dropdown
      }, 100); // Small delay to let dropdown render
    }
  };

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
    router.push(newUrl, { scroll: false }); // Disable default scroll to use our custom scrolling
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
      <div ref={mapRef}>
        <USAMap 
          selectedState={selectedState}
          onStateSelect={handleStateSelect}
        />
      </div>
      
      {/* Show business type and product selection if state is selected */}
      {selectedState && !showResults && (
        <div className="w-full space-y-8">
          {/* Business Type Selection */}
          <div ref={businessTypeRef} className="control-card">
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
                    <div className="flex items-center justify-center w-20 h-20">
                      <Image
                        src={`/icons/${type === 'Personal' ? 'personal' : 'business'}.png`}
                        alt={`${type} icon`}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain"
                      />
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
            <div ref={productRef} className="control-card">
              <ProductDropdown 
                businessType={businessType}
                selectedLOB={selectedLOB}
                onLOBSelect={handleLOBSelect}
                onDropdownToggle={handleDropdownToggle}
              />
            </div>
          )}
        </div>
      )}
      
      {/* Show results if all selections are made */}
      {showResults && (
        <div ref={resultsRef}>
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
