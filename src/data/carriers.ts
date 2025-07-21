import type { Carrier } from '@/types/market';

export const carriers: Carrier[] = [
  // Online carriers
  {
    id: 'national-general',
    name: 'National General',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto', 'Homeowners'],
    tags: ['Online'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'safeco',
    name: 'Safeco Insurance', 
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto', 'Homeowners', 'Personal Umbrella'],
    tags: ['Online'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'assurance-america',
    name: 'Assurance America',
    states: ['CA', 'TX', 'AZ'], 
    lines: ['Personal Auto', 'Motorcycle'],
    tags: ['Online'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'nationwide',
    name: 'Nationwide',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto', 'Homeowners', 'Personal Watercraft'],
    tags: ['Online'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'commonwealth-casualty',
    name: 'Commonwealth Casualty',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto', 'Classic Car'],
    tags: ['Online'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'elephant',
    name: 'Elephant',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto', 'Condominium'],
    tags: ['Online'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'thirtyland',
    name: 'Thirtyland',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto', 'Dwelling Fire'],
    tags: ['Online'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'clearcover',
    name: 'Clearcover',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto', 'Earthquake'],
    tags: ['Online'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'abc-insurance',
    name: 'ABC Insurance',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto', 'Flood'],
    tags: ['Online'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'xyz-insurance',
    name: 'XYZ Insurance',
    states: ['CA', 'TX'],
    lines: ['Homeowners', 'Jewelry'],
    tags: ['Online'],
    logo: '/icons/placeholder.png'
  },
  {
    id: '123-insurance',
    name: '123 Insurance',
    states: ['AZ'],
    lines: ['Personal Auto', 'Renters'],
    tags: ['Online'],
    logo: '/icons/placeholder.png'
  },
  
  // Offline carriers
  {
    id: 'gainsco',
    name: 'Gainsco',
    states: ['TX', 'AZ'],
    lines: ['Personal Auto', 'Commercial Auto'],
    tags: ['Offline'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'kemper-auto',
    name: 'Kemper Auto',
    states: ['CA', 'TX'],
    lines: ['Personal Auto', 'General Liability'],
    tags: ['Offline'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'farmers',
    name: 'Farmers Insurance',
    states: ['CA', 'AZ'],
    lines: ['Homeowners', 'Workers Compensation'],
    tags: ['Offline'],
    logo: '/icons/placeholder.png'
  },

  // Additional carriers for variety
  {
    id: 'state-farm',
    name: 'State Farm',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Commercial Property', 'Professional Liability'],
    tags: ['Online', 'Offline'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'geico',
    name: 'GEICO',
    states: ['CA', 'TX'],
    lines: ['Cyber Liability', 'Personal Auto'],
    tags: ['Online'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'progressive',
    name: 'Progressive',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto', 'Commercial Auto', 'Motorcycle'],
    tags: ['Online'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'allstate',
    name: 'Allstate',
    states: ['CA', 'TX'],
    lines: ['Personal Auto', 'Homeowners', 'Personal Watercraft'],
    tags: ['Online', 'Offline'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'mercury',
    name: 'Mercury Insurance',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto', 'Homeowners', 'Classic Car'],
    tags: ['Online', 'Offline'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'travelers',
    name: 'Travelers',
    states: ['CA', 'TX'],
    lines: ['Personal Auto', 'Homeowners', 'Renters'],
    tags: ['Online', 'Offline'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'hartford',
    name: 'The Hartford',
    states: ['CA', 'AZ'],
    lines: ['Workers Compensation', 'Commercial Property'],
    tags: ['Online', 'Offline'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'chubb',
    name: 'Chubb',
    states: ['TX', 'AZ'],
    lines: ['Professional Liability', 'Cyber Liability'],
    tags: ['Offline'],
    logo: '/icons/placeholder.png'
  },
  {
    id: 'liberty-mutual',
    name: 'Liberty Mutual',
    states: ['CA', 'TX', 'AZ'],
    lines: ['General Liability', 'Commercial Auto'],
    tags: ['Online', 'Offline'],
    logo: '/icons/placeholder.png'
  }
];