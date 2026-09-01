import type { Metadata } from 'next';
import ApplyClient from './ApplyClient';

export const metadata: Metadata = {
  title: 'Apply',
  description:
    'Apply to Texas Venture Group: explore TVG Grove, visit the houses, and complete your application.',
};

export default function ApplyPage() {
  return <ApplyClient />;
}
