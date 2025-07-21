import type { Carrier } from '@/types/market';

export const carriers: Carrier[] = [
  // Online carriers
  {
    id: 'national-general',
    name: 'National General',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto', 'Homeowners'],
    tags: ['Online'],
    logo: '/logos/national-general.png'
  },
  {
    id: 'safeco',
    name: 'Safeco Insurance',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto', 'Homeowners'],
    tags: ['Online'],
    logo: '/logos/safeco.png'
  },
  {
    id: 'assurance-america',
    name: 'Assurance America',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto'],
    tags: ['Online'],
    logo: '/logos/assurance-america.png'
  },
  {
    id: 'nationwide',
    name: 'Nationwide',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto', 'Homeowners'],
    tags: ['Online'],
    logo: '/logos/nationwide.png'
  },
  {
    id: 'commonwealth-casualty',
    name: 'Commonwealth Casualty',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto'],
    tags: ['Online'],
    logo: '/logos/commonwealth-casualty.png'
  },
  {
    id: 'elephant',
    name: 'Elephant',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto'],
    tags: ['Online'],
    logo: '/logos/elephant.png'
  },
  {
    id: 'thirtyland',
    name: 'Thirtyland',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto'],
    tags: ['Online'],
    logo: '/logos/thirtyland.png'
  },
  {
    id: 'clearcover',
    name: 'Clearcover',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto'],
    tags: ['Online'],
    logo: '/logos/clearcover.png'
  },
  
  // Offline carriers
  {
    id: 'gainsco',
    name: 'Gainsco',
    states: ['TX', 'AZ'],
    lines: ['Personal Auto'],
    tags: ['Offline'],
    logo: '/logos/gainsco.png'
  },
  {
    id: 'kemper-auto',
    name: 'Kemper Auto',
    states: ['CA', 'TX'],
    lines: ['Personal Auto'],
    tags: ['Offline'],
    logo: '/logos/kemper-auto.png'
  },

  // Additional carriers for variety
  {
    id: 'state-farm',
    name: 'State Farm',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto', 'Homeowners', 'Renters'],
    tags: ['Online', 'Offline'],
    logo: '/logos/state-farm.png'
  },
  {
    id: 'geico',
    name: 'GEICO',
    states: ['CA', 'TX'],
    lines: ['Personal Auto'],
    tags: ['Online'],
    logo: '/logos/geico.png'
  },
  {
    id: 'progressive',
    name: 'Progressive',
    states: ['CA', 'TX', 'AZ'],
    lines: ['Personal Auto', 'Commercial Auto'],
    tags: ['Online'],
    logo: '/logos/progressive.png'
  },
  {
    id: 'allstate',
    name: 'Allstate',
    states: ['CA', 'TX'],
    lines: ['Personal Auto', 'Homeowners'],
    tags: ['Online', 'Offline'],
    logo: '/logos/allstate.png'
  }
]; 