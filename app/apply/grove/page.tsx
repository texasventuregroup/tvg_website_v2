import type { Metadata } from 'next';
import ApplyClient from '../ApplyClient';

export const metadata: Metadata = {
  title: 'TVG Grove | Texas Venture Group',
  description:
    'Explore TVG Grove, visit the houses, and complete the Fall 2026 application.',
};

export default function ApplyGrovePage() {
  return <ApplyClient />;
}
