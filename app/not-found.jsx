// app/not-found.jsx
//
// Rendered when notFound() is called or a route has no match.
// Must export a default React component — this is what the error requires.

import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title:       '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
  path:        '/404',
  noIndex:     true,
})

export default function NotFound() {
  return (
    <div className="section-darker min-h-screen flex items-center justify-center">
      <div className="container-section text-center py-32 max-w-lg mx-auto">

        <p
          className="eyebrow mb-6"
          style={{ color: 'rgba(183,181,254,0.5)' }}
        >
          404
        </p>

        <h1
          className="mb-4 text-gradient"
          style={{ fontWeight: 700 }}
        >
          Page not found.
        </h1>

        <p
          className="text-base leading-relaxed mb-10"
          style={{ color: '#94A3B8' }}
        >
          The page you are looking for doesn&rsquo;t exist or has moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary px-8 py-3 justify-center">
            Back to Home
          </Link>
          <Link href="/consult" className="btn btn-ghost px-8 py-3 justify-center">
            Book a Consult
          </Link>
        </div>

      </div>
    </div>
  )
}
