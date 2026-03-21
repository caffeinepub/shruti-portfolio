# Shruti Portfolio

## Current State
A full portfolio website with a `CinematicIntro.tsx` component that plays before the portfolio loads. The current intro has: canvas streak animation, Charminar background (using a generated image), avatar display with spinning ring, shake/flash transition. Total duration ~6.5 seconds. It uses `sessionStorage` to track if played. The App.tsx renders `<CinematicIntro>` before the main portfolio.

## Requested Changes (Diff)

### Add
- Bike silhouette SVG/CSS layer animating across screen during streak phase
- Wind streak particles that trail behind the bike silhouette
- Zoom-in transition effect when entering Charminar scene
- Use the actual uploaded Charminar image (`/assets/uploads/Screenshot-2026-03-21-200837-1.png`) instead of a generated one
- Use the new avatar image (`/assets/uploads/Screenshot-2026-03-21-194344-1-2.png`)
- Snap/ripple ring pulse animation (expanding rings from avatar center) for the "confidence snap" moment
- "ARRIVING IN HYDERABAD" cinematic text overlay
- Zoom + fade transition out instead of plain white flash

### Modify
- Reduce total duration from ~6.5s to 4-5 seconds (tighter pacing)
- Streak phase: add a CSS bike silhouette that rides from left to right with motion blur
- Charminar phase: apply dark purple overlay + zoom-in animation on the Charminar image
- Avatar phase: after floating-in, trigger ripple rings (snap effect) before flash
- Flash transition: zoom scale-up + fade to white/transparent leading into portfolio
- Keyframe animations: add `bikeRide`, `snapRipple`, `zoomIn`, `windStreak` keyframes

### Remove
- Reference to `/assets/generated/charminar-night.dim_1200x800.jpg` (replace with uploaded image)
- Overly long phase timings

## Implementation Plan
1. Rewrite `CinematicIntro.tsx` with updated phase timeline (4-5s total)
2. Phase 1 (0-1.2s): Canvas streaks + CSS bike silhouette riding across screen with motion blur
3. Phase 2 (1.2-2.5s): Charminar image fades in with zoom-in + purple overlay + "HYDERABAD" text
4. Phase 3 (2.5-3.5s): Avatar appears with spinning gradient ring + floating animation
5. Phase 4 (3.5-4s): Snap ripple rings expand from avatar, quick brightness flash
6. Phase 5 (4-4.5s): Zoom + white fade transition calls `onComplete`
7. Keep Skip Intro button; keep sessionStorage one-play-per-session logic in App.tsx
