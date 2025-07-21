'use client';

import { useState, useEffect, useCallback } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import Image from 'next/image';
import { states } from '@/data/states';

interface USAMapProps {
  selectedState: string;
  onStateSelect: (stateCode: string) => void;
}

export default function USAMap({ selectedState, onStateSelect }: USAMapProps) {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    // Load the SVG content
    fetch('/usa.svg')
      .then(response => response.text())
      .then(content => setSvgContent(content))
      .catch(error => console.error('Error loading SVG:', error));
  }, []);

  const getStateByCode = useCallback((code: string) => {
    return states.find(state => state.code === code);
  }, []);

  const handleStateClick = useCallback((stateCode: string) => {
    const state = getStateByCode(stateCode);
    if (state?.licensed) {
      onStateSelect(stateCode);
    }
  }, [getStateByCode, onStateSelect]);

  const getStateStyle = useCallback((stateCode: string) => {
    const state = getStateByCode(stateCode);
    
    // Base border styling for all states
    const baseStyle = {
      stroke: '#ffffff', // White borders between states
      strokeWidth: '1', // Thin border width
      strokeLinejoin: 'round' as const,
      strokeLinecap: 'round' as const,
    };
    
    if (!state?.licensed) {
      return {
        ...baseStyle,
        fill: '#e5e7eb', // gray-200
        cursor: 'not-allowed',
        opacity: 0.7
      };
    }
    
    if (selectedState === stateCode) {
      return {
        ...baseStyle,
        stroke: '#1e40af', // Darker blue border for selected state
        strokeWidth: '2', // Thicker border for selected state
        fill: '#5A67D8', // accent color
        cursor: 'pointer'
      };
    }
    
    return {
      ...baseStyle,
      fill: '#60a5fa', // blue-400
      cursor: 'pointer'
    };
  }, [getStateByCode, selectedState]);

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
        (path as HTMLElement).classList.add('map-state-hover');
        
        // Add hover effects
        const state = getStateByCode(stateCode);
        if (state?.licensed) {
          (path as HTMLElement).addEventListener('mouseenter', () => {
            if (selectedState !== stateCode) {
              (path as HTMLElement).style.fill = '#3b82f6'; // blue-500
              (path as HTMLElement).style.stroke = '#e5e7eb'; // Light gray border on hover
              (path as HTMLElement).style.strokeWidth = '1.5'; // Slightly thicker on hover
            }
          });
          
          (path as HTMLElement).addEventListener('mouseleave', () => {
            if (selectedState !== stateCode) {
              (path as HTMLElement).style.fill = '#60a5fa'; // blue-400
              (path as HTMLElement).style.stroke = '#ffffff'; // White border back to normal
              (path as HTMLElement).style.strokeWidth = '1'; // Normal thickness
            }
          });
        }
      }
    });

    // Update the SVG content in the DOM with proper sizing
    const mapContainer = document.getElementById('usa-map-container');
    if (mapContainer) {
      const svgElement = svgDoc.documentElement;
      // Desktop-first sizing
      svgElement.setAttribute('width', '800');
      svgElement.setAttribute('height', '500');
      svgElement.setAttribute('style', 'max-width: 100%; height: auto;');
      mapContainer.innerHTML = svgElement.outerHTML;
      
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
  }, [svgContent, selectedState, getStateStyle, getStateByCode, handleStateClick]);

  return (
    <div className="w-full">
      {/* Selected State Label - above map */}
      {selectedState && (
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-900 rounded-lg font-medium shadow-sm">
            <HiLocationMarker className="w-5 h-5 mr-2 text-gray-600" />
            <Image
              src={`/state_flags/${selectedState.toLowerCase()}.png`}
              alt={`${getStateByCode(selectedState)?.name} flag`}
              width={24}
              height={16}
              className="mr-2 rounded-sm border border-gray-200"
            />
             {getStateByCode(selectedState)?.name}
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div 
          id="usa-map-container"
          className="w-full flex justify-center py-20 px-12"
          style={{ minHeight: '540px' }}
        >
          {!svgContent && (
            <div className="flex items-center justify-center h-96">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-gray-500 font-medium">Loading interactive map...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 