// app/ops/onboarding/page.jsx
// Server component shell — OpsGate layout wraps this route automatically.
import OnboardingLoader from '@/components/ops/OnboardingLoader';

export const metadata = {
  title: 'Enrollment Packet Generator — DODO Ops',
  robots: { index: false, follow: false },
};

export default function OnboardingPage() {
  return <OnboardingLoader />;
}
