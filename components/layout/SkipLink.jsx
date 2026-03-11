// components/layout/SkipLink.jsx
//
// First element rendered in <body> — always, without exception.
// Visually hidden until keyboard focus lands on it.
// Moves focus to #main-content, bypassing the Navbar for
// keyboard and screen reader users.
//
// Rendered in: app/layout.jsx (root layout, before <Navbar>)
// Target:      <main id="main-content" tabIndex={-1}> in app/layout.jsx
// Styles:      .skip-link in globals.css (both variants)

export default function SkipLink() {
    return (
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
    )
  }
  