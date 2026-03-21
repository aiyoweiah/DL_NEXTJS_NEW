'use client'

import { useEffect, useRef } from 'react'

export default function ConsultCalEmbed() {
  const initialised = useRef(false)

  useEffect(() => {
    if (initialised.current) return
    initialised.current = true

    // Bootstrap Cal.com embed runtime
    ;(function (C, A, L) {
      const p = (a, ar) => { a.q.push(ar) }
      const d = C.document
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal
          const ar  = arguments
          if (!cal.loaded) {
            cal.ns  = {}
            cal.q   = cal.q || []
            const s = d.createElement('script')
            s.src   = A
            d.head.appendChild(s)
            cal.loaded = true
          }
          if (ar[0] === L) {
            const api       = function () { p(api, arguments) }
            const namespace = ar[1]
            api.q = api.q || []
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api
              p(cal.ns[namespace], ar)
              p(cal, ['initNamespace', namespace])
            } else {
              p(cal, ar)
            }
            return
          }
          p(cal, ar)
        }
    })(window, 'https://app.cal.com/embed/embed.js', 'init')

    Cal('init', 'consult', { origin: 'https://app.cal.com' })

    Cal.ns.consult('inline', {
      elementOrSelector: '#my-cal-inline-consult',
      config: {
        layout:                    'week_view',
        useSlotsViewOnSmallScreen: 'true',
      },
      calLink: 'dodo-learning/consult',
    })

    Cal.ns.consult('ui', {
      cssVarsPerTheme: {
        light: { 'cal-brand': '#F5F5FF'  },
        dark:  { 'cal-brand': '#b7b5fe' },
      },
      hideEventTypeDetails: false,
      layout:               'week_view',
    })
  }, [])

  return (
    <div
      id="my-cal-inline-consult"
      style={{ width: '100%', height: '700px', overflow: 'scroll', borderRadius: '1rem' }}
    />
  )
}