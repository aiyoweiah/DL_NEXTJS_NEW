// app/[locale]/audiobooks/layout.jsx
//
// Wraps all /[locale]/audiobooks/* routes in the AudiobooksGate.
// The gate POSTs the access code to the audio proxy Worker, which validates
// it server-side and sets a signed session cookie on audio.dodolearning.com.

import AudiobooksGate from '@/components/audiobooks/AudiobooksGate'

export default function AudiobooksLayout({ children }) {
  return <AudiobooksGate>{children}</AudiobooksGate>
}
