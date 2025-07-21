export interface State {
  code: string;
  name: string;
  licensed: boolean;
}

export interface Carrier {
  id: string;
  name: string;
  states: string[];      // ISO codes
  lines: string[];       // e.g. 'Personal Auto'
  tags: string[];        // 'Online' | 'Offline'
  logo?: string;         // Logo URL/path
}

export type BusinessType = 'Personal' | 'Commercial'; 