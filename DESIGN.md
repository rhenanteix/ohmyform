# OhMyForm — visual system

Reference capture: 2026-11-25, Firecrawl branding + page capture.

- https://tally.so: screenshot inspected. Large headline, generous whitespace, restrained borders, product preview as the hero. Extracted: Inter, white background, blue #0070D7, 8px primary button corners.
- https://www.typeform.com: extracted branding: #FAF9FB background, #2A222B text, 12px button corners, Lausanne typography. Screenshot returned but not inspected; no layout fidelity claimed.
- https://formbricks.com: extracted branding: #F8FAFC background, #00C4B8 accent, Jost/Poppins typography. Screenshot returned but not inspected; no layout fidelity claimed.

## Implementation choices (not copied reference tokens)

Use a calm green identity (#176B58), white surfaces, muted slate text, pale green accents. Keep the existing system font stack; no external font downloads. Use a 4/8px spacing rhythm, 9–12px controls, 16–24px cards, subtle shadows and 160–300ms transitions. Marketing headings scale from 36 to 64px; public questions from 26 to 42px.

Shared SCSS tokens and existing styled components retain the current Next 12 / React 17 / Ant Design architecture. The desktop workspace has a full-width header, 250px sidebar and flexible content column. On mobile, navigation is an overlay and the content uses the full width. Tables scroll inside their container. Auth pages can grow vertically. Editor controls wrap on narrow screens.

Public form colors remain supplied by each form's design. Layout and typography improvements do not change validation, GraphQL, permissions, submission logic or stored data. Respect reduced-motion preferences and show keyboard focus. No competitor imagery, logos or proprietary fonts are reused.
