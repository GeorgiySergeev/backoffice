import LandsListWrapper from '@/features/lands/components/lands-list-wrapper';
import PageContainer from '@/components/layout/page-container';

export const metadata = {
  title: 'Dashboard : Lands'
};

export default function LandsPage() {
  return (
    <PageContainer scrollable>
      <div className='space-y-4'>
        <LandsListWrapper />
      </div>
    </PageContainer>
  );
}
