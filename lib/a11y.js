// lib/a11y.js
//
// Three exports:
//
//   1. ARIA           — label constants used across components
//   2. useFocusTrap   — React hook, traps focus inside a container (mobile nav, modals)
//   3. usePrefersReducedMotion — React hook, reads prefers-reduced-motion media query
//
// All hooks are client-only — import them inside 'use client' components only.
// The ARIA constants object is plain data — safe to import anywhere.
//
// Current usages:
//   ARIA             → Navbar.jsx, LoopDiagram.jsx, LexileBar.jsx
//   useFocusTrap     → Navbar.jsx (mobile drawer) — replaces the inline trap logic
//   usePrefersReducedMotion → LexileBar.jsx, LoopDiagram.jsx, any animated component
//
// The Navbar currently contains its own inline focus trap logic.
// That can be refactored to call useFocusTrap(drawerRef, mobileOpen) once
// this file is in place — both implementations are identical in behaviour.

'use client'

import { useEffect, useRef, useCallback } from 'react'

// ── 1. ARIA LABEL CONSTANTS ───────────────────────────────────
// Single source of truth for ARIA labels that appear on multiple components.
// Prevents label drift when copy changes — update here, updates everywhere.
//
// Usage:
//   import { ARIA } from '@/lib/a11y'
//   <nav aria-label={ARIA.NAV.PRIMARY}>
export const ARIA = {
  // Navigation
  NAV: {
    PRIMARY:          'Primary navigation',
    SECONDARY:        'Secondary navigation',
    FOOTER_PROGRAM:   'Program navigation',
    FOOTER_COMPANY:   'Company navigation',
    FOOTER_CITIES:    'Cities navigation',
    MOBILE_DRAWER:    'Navigation menu',
    OPEN_MENU:        'Open navigation menu',
    CLOSE_MENU:       'Close navigation menu',
  },

  // The Loop diagram — Read → Think → Speak → Write
  // "The Loop" is owned brand vocabulary; use it in the ARIA label.
  LOOP: {
    DIAGRAM:  'The Loop — DODO Learning methodology',
    STEP_READ:   'Step 1: Read',
    STEP_THINK:  'Step 2: Think',
    STEP_SPEAK:  'Step 3: Speak',
    STEP_WRITE:  'Step 4: Write',
    ARROW:       'then',           // screen reader reads: "Read, then, Think, then..."
  },

  // LexileBar — always cite specific numbers; never vague
  LEXILE: {
    // Use as a template: ARIA.LEXILE.progress(620, 820, 16)
    // → "Reading progress: Lexile 620 to Lexile 820 in 16 weeks"
    progress: (start, end, weeks) =>
      `Reading progress: Lexile ${start} to Lexile ${end} in ${weeks} weeks`,
    BAR:      'Lexile progress bar',
    BEFORE:   (level) => `Starting Lexile level: ${level}`,
    AFTER:    (level) => `Ending Lexile level: ${level}`,
  },

  // Cards
  CARD: {
    NAVIGATOR: (name) => `Navigator profile: ${name}`,
    RESULT:    (label) => `Student result: ${label}`,
  },

  // Buttons / CTAs
  CTA: {
    CONSULT:  'Book a diagnostic consultation',
    ENROLL:   'View Charter Enrollment details',
    PROGRAM:  'Learn about The 16-Week Program',
    RESULTS:  'View student results and Lexile growth data',
  },

  // Forms (/consult is the highest-risk page for a11y failures per brief)
  FORM: {
    REQUIRED:      'Required field',
    ERROR:         (fieldName) => `Error: ${fieldName}`,
    SUCCESS:       'Form submitted successfully',
    LOADING:       'Submitting your consultation request',
    CALENDAR:      'Consultation booking calendar',
  },

  // Skip link — must match the id on <main> in layout.jsx
  SKIP_TO_MAIN: 'Skip to main content',

  // Landmark labels
  LANDMARK: {
    HEADER:  'Site header',
    FOOTER:  'Site footer',
    MAIN:    'Main content',
  },
}

// ── 2. useFocusTrap ───────────────────────────────────────────
// Traps keyboard focus inside `containerRef` when `active` is true.
// On activation: focuses the first focusable element in the container.
// Tab:           cycles forward through focusable elements; wraps at end.
// Shift+Tab:     cycles backward; wraps at start.
// Escape:        calls `onEscape` callback (typically closes the modal/drawer).
// On deactivation: restores focus to the element that was focused before
//                  the trap was activated (the trigger button).
//
// This is a React hook — call it inside a 'use client' component.
//
// Usage:
//   const drawerRef = useRef(null)
//   useFocusTrap(drawerRef, isOpen, () => setIsOpen(false))
//
// @param {React.RefObject} containerRef  - Ref to the container element
// @param {boolean}         active        - Whether the trap is active
// @param {function}        [onEscape]    - Called when Escape is pressed
export function useFocusTrap(containerRef, active, onEscape) {
  // Remember which element had focus before the trap activated
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!active || !containerRef.current) return

    // Save current focus to restore later
    previousFocusRef.current = document.activeElement

    const container = containerRef.current

    // All focusable element types — matches browser tab order behaviour
    const FOCUSABLE_SELECTORS = [
      'a[href]:not([disabled]):not([aria-hidden="true"])',
      'button:not([disabled]):not([aria-hidden="true"])',
      'input:not([disabled]):not([aria-hidden="true"])',
      'select:not([disabled]):not([aria-hidden="true"])',
      'textarea:not([disabled]):not([aria-hidden="true"])',
      '[tabindex]:not([tabindex="-1"]):not([aria-hidden="true"])',
      'details > summary:not([disabled])',
    ].join(', ')

    const getFocusable = () =>
      Array.from(container.querySelectorAll(FOCUSABLE_SELECTORS)).filter(
        (el) => !el.closest('[aria-hidden="true"]') && !el.closest('[inert]')
      )

    // Focus first element on activation
    const focusable = getFocusable()
    if (focusable.length > 0) {
      // Defer slightly so CSS transitions don't fight the focus call
      requestAnimationFrame(() => focusable[0]?.focus())
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onEscape?.()
        return
      }

      if (e.key !== 'Tab') return

      // Re-query on every Tab press — DOM may have changed (conditional renders)
      const current = getFocusable()
      if (current.length === 0) return

      const first = current[0]
      const last  = current[current.length - 1]

      if (e.shiftKey) {
        // Shift+Tab: if at first element, wrap to last
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        // Tab: if at last element, wrap to first
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      // Restore focus to the element that triggered the trap
      // Use requestAnimationFrame to let the DOM settle after close animations
      requestAnimationFrame(() => {
        if (
          previousFocusRef.current &&
          typeof previousFocusRef.current.focus === 'function' &&
          document.contains(previousFocusRef.current)
        ) {
          previousFocusRef.current.focus()
        }
      })
    }
  }, [active, containerRef, onEscape])
}

// ── 3. usePrefersReducedMotion ────────────────────────────────
// Reads the prefers-reduced-motion media query.
// Returns true if the user has requested reduced motion.
// Components should use this to skip or simplify animations.
//
// The CSS `@media (prefers-reduced-motion: reduce)` gate in globals.css
// handles CSS animations automatically. This hook handles JS-driven
// animations (e.g. counting up a Lexile number, canvas animations,
// scroll-triggered entrance animations via IntersectionObserver).
//
// SSR behaviour:
//   Returns false during SSR / before hydration (safe default — no motion
//   is suppressed before the client has a chance to read the preference).
//   The correct value is set after first mount.
//
// Usage:
//   const reduceMotion = usePrefersReducedMotion()
//   useEffect(() => {
//     if (reduceMotion) { setWidth(targetWidth); return }
//     // run animation
//   }, [reduceMotion])
export function usePrefersReducedMotion() {
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = mq.matches

    const handler = (e) => {
      prefersReducedMotion.current = e.matches
    }

    // Use addEventListener with { passive: true } — matchMedia listeners
    // don't need to call preventDefault but passive is good practice
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Return a stable callback so callers can read current value
  // without triggering re-renders on preference change.
  // If re-renders on change are needed, use the useState variant below.
  return useCallback(() => prefersReducedMotion.current, [])
}

// ── usePrefersReducedMotion (reactive variant) ────────────────
// Same as above but triggers a re-render when the preference changes.
// Use this when the component needs to respond visually to a live change
// (e.g. user toggles OS accessibility setting while the page is open).
// For most cases the ref variant above is sufficient.
//
// Usage:
//   const prefersReducedMotion = usePrefersReducedMotionReactive()
//   // prefersReducedMotion is a boolean; component re-renders on change
import { useState } from 'react'

export function usePrefersReducedMotionReactive() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)

    const handler = (e) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}
