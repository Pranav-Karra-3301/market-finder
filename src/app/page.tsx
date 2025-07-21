'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import USAMap from '@/components/USAMap';
import StateSelector from '@/components/StateSelector';
import CarrierList from '@/components/CarrierList';
import { useMarketStore } from '@/store/useMarketStore';
import type { BusinessType } from '@/types/market';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedState, businessType, selectedLOB, setState, setBusinessType, setLOB } = useMarketStore();

  // Initialize state from URL on mount
  useEffect(() => {
    const state = searchParams.get('state') as '' | 'CA' | 'TX' | 'AZ';
    const type = searchParams.get('type') as BusinessType;
    const lob = searchParams.get('lob');

    if (state && ['CA', 'TX', 'AZ'].includes(state)) {
      setState(state);
    }
    if (type && ['Personal', 'Commercial'].includes(type)) {
      setBusinessType(type);
    }
    if (lob) {
      setLOB(lob);
    }
  }, []);

  // Sync URL with store state changes
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedState) {
      params.set('state', selectedState);
    }
    if (businessType) {
      params.set('type', businessType);
    }
    if (selectedLOB) {
      params.set('lob', selectedLOB);
    }

    const query = params.toString();
    const newUrl = query ? `/?${query}` : '/';
    
    router.push(newUrl, { scroll: false });
  }, [selectedState, businessType, selectedLOB, router]);

  // Show results if all selections are made
  const showResults = selectedState && businessType && selectedLOB;

  if (showResults) {
    return <CarrierList />;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        <USAMap />
        <StateSelector />
      </div>
    </main>
  );
}
