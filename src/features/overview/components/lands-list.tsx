'use client';

import React, { useEffect, useState } from 'react';
import { Land } from '@/types/lands';

export function LandsList() {
  const [landsData, setLandsData] = useState<{
    success: boolean;
    lands: Land[];
    error?: string;
  }>({
    success: false,
    lands: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const response = await fetch('/api/lands');
        const data = await response.json();
        setLandsData(data);
      } catch (error) {
        setLandsData({
          success: false,
          lands: [],
          error: 'Failed to fetch lands'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLands();
  }, []);

  if (loading) {
    return (
      <div className='p-4'>
        <h1 className='mb-4 text-2xl font-bold'>Lands List</h1>
        <p>Loading lands...</p>
      </div>
    );
  }

  const { success, lands, error } = landsData;

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Lands List</h1>
      {!success ? (
        <div className='text-red-500'>Error: {error}</div>
      ) : lands.length > 0 ? (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {lands.map((land) => (
            <div key={land.id} className='rounded-lg border p-4 shadow-sm'>
              <h2 className='text-lg font-semibold'>{land.name}</h2>
              <p className='mt-2 text-sm text-gray-500'>{land.description}</p>
              <div className='mt-3 flex items-center justify-between'>
                <span className='text-xs text-gray-500'>{land.category}</span>
                <button
                  className='text-sm font-medium text-blue-600 hover:text-blue-800'
                  onClick={() =>
                    (window.location.href = `/dashboard/lands/${land.id}`)
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No lands found.</p>
      )}
    </div>
  );
}
