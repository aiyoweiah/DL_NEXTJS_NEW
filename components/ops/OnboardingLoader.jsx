'use client';
// components/ops/OnboardingLoader.jsx
// Dynamic import shell — keeps jsPDF + html2canvas out of the server bundle.
import dynamic from 'next/dynamic';

const OnboardingTool = dynamic(
  () => import('@/components/ops/OnboardingTool'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        minHeight: '100dvh',
        backgroundColor: 'var(--color-void-black)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-latin)',
        color: '#5E6879',
        fontSize: 14,
      }}>
        Loading enrollment tool…
      </div>
    ),
  }
);

export default function OnboardingLoader() {
  return <OnboardingTool />;
}
