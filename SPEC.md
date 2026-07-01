# Portfolio Refactoring Specification

## Goal
Refactor an old personal portfolio website (pure HTML/CSS, no JS frameworks) with improved design, responsive layout, and better practices.

## Constraints & Preferences
- Pure HTML and CSS (no dependencies, no frameworks)
- Mobile layout: cards with scroll-snap carousel
- Desktop layout: vertical cards with scroll-snap
- SVG sprite sheet external (not inline) for performance
- Dark/light theme via `prefers-color-scheme`
- Background: video (bg.webm) with blur effect on desktop, gradient fallback on mobile

## Architecture
- `index.html`: Single-page with all sections
- `css/styles.css`: Base/mobile styles (carousel horizontal)
- `css/desktop.css`: Desktop overrides (vertical cards)
- `main.js`: Navigation logic (buttons, indicators, keyboard)
- `assets/icons/sprite.svg`: External SVG sprite (47 icons)
- `assets/vids/bg.webm`: Video background

## Sections
1. **About Me**: Personal info + social links (Discord, Twitter, GitHub, Steam, Bluesky)
2. **Studies**: Education + languages (Spanish, English)
3. **Skills**: Languages + Frameworks & Libs with icons
4. **Portfolio**: Project cards with images, descriptions, and tech tags

## Responsive Behavior
- **Mobile (<768px)**: Horizontal scroll-snap carousel with `< >` buttons and dot indicators
- **Desktop (≥768px)**: Vertical scroll-snap with hidden navigation

## Performance
- External SVG sprite (not inline)
- Lazy loading for images
- Video only loads on desktop
- Deferred JavaScript
- Preconnect for Google Fonts

## Accessibility
- Skip link for keyboard navigation
- ARIA labels on buttons and navigation
- Semantic HTML (article, section, figure)
- Keyboard navigation (arrow keys)
