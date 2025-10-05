import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import LandViewPage from '@/features/products/components/product-view-page';

export const metadata = {
  title: 'Dashboard : New Land'
};

export default async function NewLandPage() {
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <LandViewPage landId='new' />
        </Suspense>
      </div>
    </PageContainer>
  );
}
