'use client';

import { useState, useRef, useEffect } from 'react';
import { HiChevronDown, HiCheck } from 'react-icons/hi';
import { lobs } from '@/data/lobs';
import type { BusinessType } from '@/types/market';

interface ProductDropdownProps {
  businessType: BusinessType | '';
  selectedLOB: string;
  onLOBSelect: (lob: string) => void;
}

export default function ProductDropdown({ businessType, selectedLOB, onLOBSelect }: ProductDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const products = businessType ? lobs[businessType] : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (product: string) => {
    onLOBSelect(product);
    setIsOpen(false);
  };

  if (!businessType) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-base font-medium text-gray-900 mb-3">
        Choose insurance product
      </label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="custom-select flex items-center justify-between w-full"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selectedLOB ? 'text-gray-900' : 'text-gray-500'}>
          {selectedLOB || 'Select a product...'}
        </span>
        <HiChevronDown 
          className={`dropdown-chevron w-5 h-5 text-gray-400 ${isOpen ? 'open' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="max-h-60 overflow-y-auto">
            {products.map((product) => (
              <button
                key={product}
                onClick={() => handleSelect(product)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ease-in-out ${
                  selectedLOB === product ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
                } border-t border-gray-100 first:border-t-0`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{product}</span>
                  {selectedLOB === product && (
                    <HiCheck className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 