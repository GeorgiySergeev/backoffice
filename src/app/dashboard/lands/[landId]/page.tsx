import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import LandViewPage from '@/features/products/components/product-view-page';

export const metadata = {
  title: 'Dashboard : Land View'
};

type PageProps = { params: Promise<{ landId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <LandViewPage landId={params.landId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
