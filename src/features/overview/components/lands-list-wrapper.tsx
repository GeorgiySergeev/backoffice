import React from 'react';
import { LandsList } from './lands-list';

// Server component wrapper for LandsList
export default async function LandsListWrapper() {
  return <LandsList />;
}
