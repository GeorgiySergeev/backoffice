import { notFound } from 'next/navigation';
import { LandForm } from './land-form';
import { getLandById } from '@/lib/lands';

type TLandViewPageProps = {
  landId: string;
};

export default async function LandViewPage({ landId }: TLandViewPageProps) {
  let land = null;
  let pageTitle = 'Create New Landing';

  if (landId !== 'new') {
    const data = await getLandById(landId);
    land = data.land;
    if (!land) {
      notFound();
    }
    pageTitle = `Edit Landing`;
  }

  return <LandForm initialData={land} pageTitle={pageTitle} />;
}
