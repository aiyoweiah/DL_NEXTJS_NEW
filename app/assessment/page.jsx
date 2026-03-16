// app/results/page.jsx
// Pure server component — metadata only.
// All interactive elements → components/results/AssessmentClient.jsx
//
// Figma source: Assessment App.tsx — tUKokxMK9eHkSortCPKzTX
// Route: /results (Master Reference §12)

import { buildMetadata } from '@/lib/metadata'
import AssessmentClient  from '@/components/results/AssessmentClient'

export const metadata = buildMetadata({
  title:       'Results — Assessment at DODO Learning',
  description:
    'DODO measures before the program begins, at week 8, and at exit. ' +
    'Lexile reading levels and 6+1 Trait writing scores — specific numbers, ' +
    'not vague progress reports. One grade level of Lexile growth in 16 weeks.',
  path: '/results',
})

export default function ResultsPage() {
  return <AssessmentClient />
}