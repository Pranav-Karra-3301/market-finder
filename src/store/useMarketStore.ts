import { create } from 'zustand';
import type { BusinessType } from '@/types/market';

interface MarketStore {
  selectedState: '' | 'CA' | 'TX' | 'AZ';
  businessType: BusinessType;
  selectedLOB: string;
  setState: (state: '' | 'CA' | 'TX' | 'AZ') => void;
  setBusinessType: (type: BusinessType) => void;
  setLOB: (lob: string) => void;
}

export const useMarketStore = create<MarketStore>((set) => ({
  selectedState: '',
  businessType: 'Personal',
  selectedLOB: '',
  setState: (state) => set({ selectedState: state }),
  setBusinessType: (type) => set({ businessType: type }),
  setLOB: (lob) => set({ selectedLOB: lob }),
})); 