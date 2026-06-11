import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '0ei18agp', 
  dataset: 'production',
  useCdn: true, 
  apiVersion: '2026-06-12', 
});