'use client';

import { useState } from 'react';
import { LOBs } from '@/data/lobs';
import { useMarketStore } from '@/store/useMarketStore';
import { states } from '@/data/states';
import type { BusinessType } from '@/types/market';

export default function StateSelector() {
  const { selectedState, businessType, selectedLOB, setBusinessType, setLOB, setState } = useMarketStore();
  
  if (!selectedState) {
    return null;
  }

  const selectedStateData = states.find(s => s.code === selectedState);
  const handleClose = () => {
    setState('');
    setBusinessType('Personal');
    setLOB('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Business Type & LOB - {selectedStateData?.name}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Business Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Type Of Business
            </label>
            <div className="space-y-2">
              {(['Personal', 'Commercial'] as BusinessType[]).map(type => (
                <button
                  key={type}
                  onClick={() => setBusinessType(type)}
                  className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-colors ${
                    businessType === type
                      ? 'bg-teal-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">*Required</p>
          </div>

          {/* LOB Selection */}
          <div>
            <label htmlFor="lob-select" className="block text-sm font-medium text-gray-700 mb-3">
              LOB
            </label>
            <div className="relative">
              <select
                id="lob-select"
                value={selectedLOB}
                onChange={(e) => setLOB(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none appearance-none bg-white"
                style={{ maxHeight: '200px' }}
              >
                <option value="">Select a line of business...</option>
                {LOBs[businessType].map(lob => (
                  <option key={lob} value={lob}>
                    {lob}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <button
              onClick={handleClose}
              disabled={!businessType || !selectedLOB}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                businessType && selectedLOB
                  ? 'bg-teal-500 text-white hover:bg-teal-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 