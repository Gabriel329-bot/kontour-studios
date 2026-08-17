# KONTOUR STUDIOS

High-end creative studio portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lenis and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Checks

```bash
npm run typecheck
npm run build
```

## Production

```bash
npm run build
npm start
```

## Notes
- All visuals are CSS-generated, so the starter has zero image payload and can be swapped for optimized `next/image` project media later.
- Custom cursor is disabled on narrower/touch-oriented layouts.
- `prefers-reduced-motion` is respected.
- The hero uses a lightweight pointer-reactive CSS aura instead of Three.js to keep the landing page performant.
- Deployment requires no environment variables. Import the repository in Vercel and keep the detected Next.js defaults.
