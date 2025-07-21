import type { Carrier } from '@/types/market';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '');
}

export function groupByTag(carriers: Carrier[]): Record<string, Carrier[]> {
  const groups: Record<string, Carrier[]> = {};
  
  carriers.forEach(carrier => {
    const tag = carrier.tags[0] || 'Other';
    if (!groups[tag]) {
      groups[tag] = [];
    }
    groups[tag].push(carrier);
  });
  
  return groups;
} 