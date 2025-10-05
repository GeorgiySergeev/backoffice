'use server';

import { getAllLands } from '@/lib/lands';

// Function to get all landing pages
export async function getLands() {
  try {
    const result = await getAllLands();
    return result;
  } catch (error) {
    console.error('Error fetching lands:', error);
    return {
      success: false,
      lands: [],
      error: 'Failed to fetch lands'
    };
  }
}
