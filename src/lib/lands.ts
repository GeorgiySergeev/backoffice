import { Land } from '@/types/lands';
import { readdir } from 'fs/promises';
import path from 'path';

// Get all lands from the file system
export async function getAllLands() {
  try {
    // Get the root directory of the project
    const landsPath = path.join(process.cwd(), 'src', 'lands', 'ng');

    // Read the directory contents
    const dirs = await readdir(landsPath);

    // Filter out only directories (landing pages)
    const landDirs = dirs.filter((dir) => !dir.startsWith('.'));

    // Convert to Land objects
    const lands: Land[] = landDirs.map((dir, index) => ({
      id: dir,
      name: dir.replace(/ng--/g, '').replace(/--/g, ' ').replace(/-/g, ' '),
      path: `src/lands/ng/${dir}`,
      category: 'Marketing',
      description: `Landing page for ${dir}`,
      createdAt: new Date(Date.now() - index * 86400000).toISOString(), // Different dates for each
      updatedAt: new Date().toISOString()
    }));

    return { success: true, lands };
  } catch (error) {
    console.error('Error reading lands directory:', error);
    return {
      success: false,
      lands: [],
      error: 'Failed to read lands directory'
    };
  }
}

// Get a specific land by its ID
export async function getLandById(id: string) {
  try {
    const allLands = await getAllLands();

    if (!allLands.success) {
      return {
        success: false,
        land: null,
        error: allLands.error
      };
    }

    // Find the land by its ID
    const land = allLands.lands.find((land) => land.id === id);

    if (!land) {
      return {
        success: false,
        land: null,
        error: `Land with ID ${id} not found`
      };
    }

    return {
      success: true,
      land
    };
  } catch (error) {
    console.error(`Error reading land with ID ${id}:`, error);
    return {
      success: false,
      land: null,
      error: `Failed to read land with ID ${id}`
    };
  }
}

// Create a new land
export async function createLand(
  landData: Omit<Land, 'id' | 'createdAt' | 'updatedAt'>
) {
  try {
    // In a real implementation, this would create a new directory and files
    // For now, we'll just simulate the creation

    const newLand: Land = {
      ...landData,
      id: `land-${Date.now()}`, // Simple ID generation
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In a real implementation, you would write to the file system here

    return {
      success: true,
      land: newLand
    };
  } catch (error) {
    console.error('Error creating land:', error);
    return {
      success: false,
      land: null,
      error: 'Failed to create land'
    };
  }
}

// Update an existing land
export async function updateLand(
  id: string,
  landData: Partial<Omit<Land, 'id' | 'createdAt' | 'updatedAt'>>
) {
  try {
    // In a real implementation, this would update the existing land
    // For now, we'll just simulate the update

    const existingLand = await getLandById(id);

    if (!existingLand.success || !existingLand.land) {
      return {
        success: false,
        land: null,
        error: `Land with ID ${id} not found`
      };
    }

    const updatedLand = {
      ...existingLand.land,
      ...landData,
      updatedAt: new Date().toISOString()
    };

    // In a real implementation, you would write to the file system here

    return {
      success: true,
      land: updatedLand
    };
  } catch (error) {
    console.error(`Error updating land with ID ${id}:`, error);
    return {
      success: false,
      land: null,
      error: `Failed to update land with ID ${id}`
    };
  }
}
