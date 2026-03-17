import { buildMetadata } from '@/lib/metadata';
import DemosClient from '@/components/demos/DemosClient';

export const metadata = buildMetadata({
  title: 'Demo Classes — See The Loop in Practice',
  description:
    'Watch real Navigator-led sessions across Live Sessions, Writing, and The Hangar. Grades 5–8. See The Loop — Read → Think → Speak → Write — running live.',
  path: '/demos',
});

export default function DemosPage() {
  return <DemosClient />;
}