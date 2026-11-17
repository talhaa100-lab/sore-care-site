import { ViewTransition, type ReactNode } from "react";

/**
 * Page-to-page crossfade. A template re-mounts on every navigation (a layout does not), so
 * the page content fades out and the next one fades in while the header and footer, which
 * live in the layout, stay put. Opacity only: the pages' own entrances (hero rise, scroll
 * reveals) carry the movement.
 *
 * The view-transition CSS is inlined here on purpose: the project's CSS pipeline
 * (Tailwind via Turbopack) drops `::view-transition-*(.class)` rules from globals.css.
 */
const CSS = `
/* the old page leaves quickly; the new one arrives a beat later, so they never overlap muddily */
::view-transition-old(.page-out) {
  animation: 120ms ease-out both page-fade reverse;
}
::view-transition-new(.page-in) {
  animation: 240ms cubic-bezier(0.23, 1, 0.32, 1) 100ms both page-fade;
}
@keyframes page-fade {
  from { opacity: 0; }
}
/* everything outside the page (header, footer) swaps instantly instead of ghost-fading */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
}
/* let clicks through while a transition runs */
::view-transition {
  pointer-events: none;
}
`;

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <style href="page-transitions" precedence="default">
        {CSS}
      </style>
      <ViewTransition enter="page-in" exit="page-out" default="none">
        {children}
      </ViewTransition>
    </>
  );
}
