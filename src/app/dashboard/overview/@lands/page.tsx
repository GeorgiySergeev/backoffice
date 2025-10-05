import { delay } from '@/constants/mock-api';
import { LandsList } from '@/features/overview/components/lands-list';

export default async function LandsListPage() {
  await delay(2000);
  return <LandsList />;
}
