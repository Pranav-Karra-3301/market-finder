'use client';

import { useState, useEffect } from 'react';
import { states } from '@/data/states';
import { useMarketStore } from '@/store/useMarketStore';

export default function USAMap() {
  const { selectedState, setState } = useMarketStore();
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    // Load the SVG content
    fetch('/usa.svg')
      .then(response => response.text())
      .then(content => setSvgContent(content))
      .catch(error => console.error('Error loading SVG:', error));
  }, []);

  const getStateByCode = (code: string) => {
    return states.find(state => state.code === code);
  };

  const handleStateClick = (stateCode: string) => {
    const state = getStateByCode(stateCode);
    if (state?.licensed) {
      setState(stateCode as 'CA' | 'TX' | 'AZ');
    }
  };

  const getStateStyle = (stateCode: string) => {
    const state = getStateByCode(stateCode);
    
    if (!state?.licensed) {
      return {
        fill: '#e5e7eb', // gray-200
        cursor: 'not-allowed',
        opacity: 0.7
      };
    }
    
    if (selectedState === stateCode) {
      return {
        fill: '#1e40af', // blue-700
        cursor: 'pointer'
      };
    }
    
    return {
      fill: '#60a5fa', // blue-400
      cursor: 'pointer'
    };
  };

  useEffect(() => {
    if (!svgContent) return;

    // Add event listeners and styling to SVG paths
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
    const paths = svgDoc.querySelectorAll('path[id^="US-"]');

    paths.forEach((path) => {
      const stateId = path.getAttribute('id');
      if (stateId) {
        const stateCode = stateId.replace('US-', '');
        const style = getStateStyle(stateCode);
        
        // Apply styles
        Object.assign((path as HTMLElement).style, style);
        
        // Add hover effects
        const state = getStateByCode(stateCode);
        if (state?.licensed) {
          (path as HTMLElement).addEventListener('mouseenter', () => {
            if (selectedState !== stateCode) {
              (path as HTMLElement).style.fill = '#3b82f6'; // blue-500
            }
          });
          
          (path as HTMLElement).addEventListener('mouseleave', () => {
            if (selectedState !== stateCode) {
              (path as HTMLElement).style.fill = '#60a5fa'; // blue-400
            }
          });
        }
      }
    });

    // Update the SVG content in the DOM
    const mapContainer = document.getElementById('usa-map-container');
    if (mapContainer) {
      mapContainer.innerHTML = svgDoc.documentElement.outerHTML;
      
      // Re-add event listeners after DOM update
      const newPaths = mapContainer.querySelectorAll('path[id^="US-"]');
      newPaths.forEach((path) => {
        const stateId = path.getAttribute('id');
        if (stateId) {
          const stateCode = stateId.replace('US-', '');
          path.addEventListener('click', () => handleStateClick(stateCode));
        }
      });
    }
  }, [svgContent, selectedState]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Market Finder</h1>
        <p className="text-lg text-gray-600">
          Please click on a state in the map below to get more information on your specific business need
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div 
          id="usa-map-container"
          className="w-full flex justify-center"
          style={{ minHeight: '400px' }}
        >
          {!svgContent && (
            <div className="flex items-center justify-center h-96">
              <div className="text-gray-500">Loading map...</div>
            </div>
          )}
        </div>
        
        {selectedState && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
              <span className="font-semibold">Selected: {getStateByCode(selectedState)?.name}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 