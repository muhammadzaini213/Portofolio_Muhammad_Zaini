# Agent Instructions — Zaini Portfolio

## Quick Commands

- **Dev server**: `npm run dev`
- **Build**: `npm run build` (runs `prisma generate && next build`)
- **Lint**: `npm run lint` (ESLint 9 flat config)
- **Seed DB**: `npx prisma db seed`
- **Generate Prisma client**: `npx prisma generate`

No test framework is configured. No typecheck script (use IDE or `npx tsc --noEmit`).

## Architecture

Next.js 16 App Router portfolio site for a game developer, deployed on Vercel. Indonesian comments in some files.

**Stack**: Next.js 16 · React 19 · Prisma (PostgreSQL) · Supabase (auth + storage) · Tailwind CSS 4 · TypeScript

**Key directories**:
- `app/` — Next.js App Router pages (public site + admin panel)
- `components/` — React components (public UI + `components/admin/Editor.tsx`)
- `lib/` — Prisma singleton, slug generation, Supabase upload helpers
- `utils/supabase/` — Supabase client (browser), server client, and middleware
- `prisma/` — schema + seed file

**Data models** (Prisma): `SiteConfig`, `Project`, `Article`, `Profile`, `SiteMetadata` — all singleton rows except Project and Article.

## Middleware

Middleware is at `utils/supabase/middleware.ts`, **not** the standard `middleware.ts` root file. It's re-exported via `proxy.ts`. The matcher skips static assets.

**Auth flow**: Supabase JWT checked in middleware. `/admin/*` routes require `user.app_metadata.role === "admin"`. Unauthenticated users redirect to `/login`. Non-admins redirect to `/`.

## Path Aliases

```
@/*        → ./*
@/components/* → ./components/*
@/utils/*  → ./utils/*
@/app/*    → ./app/*
@/data/*   → ./data/*
@/lib/*    → ./lib/*
```

## Environment Variables Required

- `DATABASE_URL` — PostgreSQL connection string (Prisma)
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key

No `.env` file is committed. Check `.env.example` or set these in Vercel.

## Supabase Storage

Images/files upload to bucket `portfolio-assets` via `lib/upload.ts`. Public URLs are returned directly.

## Build Gotchas

- `npm run build` runs `prisma generate` first — Prisma client must be generated before Next.js build.
- `.gitignore` excludes `/app/generated/prisma` — don't import from that path; use `@prisma/client`.
- Tailwind CSS 4 uses `@tailwindcss/postcss` plugin (not the old `tailwindcss` PostCSS plugin).
- ESLint uses flat config (`eslint.config.mjs`) with `eslint-config-next` v16.

## Editor

Rich text editing uses **TipTap** (`components/admin/Editor.tsx`). Content stored as Markdown in the database. CSS classes `prose-content` handle rendering in `globals.css`.
