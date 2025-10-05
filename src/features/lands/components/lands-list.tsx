'use client';

import React, { useEffect, useState } from 'react';
import { Land } from '@/types/lands';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Lands</h1>
          <Button onClick={() => router.push('/dashboard/lands/new')}>
            Create New Land
          </Button>
        </div>
        <p>Loading lands...</p>
      </div>
    );
  }

  const { success, lands, error } = landsData;

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Lands</h1>
        <Button onClick={() => router.push('/dashboard/lands/new')}>
          Create New Land
        </Button>
      </div>

      {!success ? (
        <div className='text-red-500'>Error: {error}</div>
      ) : lands.length > 0 ? (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {lands.map((land) => (
            <Card key={land.id} className='transition-shadow hover:shadow-md'>
              <CardHeader>
                <CardTitle className='text-lg'>{land.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='mb-4 text-sm text-gray-500'>{land.description}</p>
                <div className='flex items-center justify-between'>
                  <span className='rounded bg-blue-100 px-2 py-1 text-xs text-blue-800'>
                    {land.category}
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => router.push(`/dashboard/lands/${land.id}`)}
                  >
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className='py-8 text-center'>
          <p className='mb-4 text-gray-500'>No lands found.</p>
          <Button onClick={() => router.push('/dashboard/lands/new')}>
            Create Your First Land
          </Button>
        </div>
      )}
    </div>
  );
}
