# Modern Blockchain News Website

This repository contains the source code for a Next.js-based news platform focused on blockchain technology. The app lives in the `blockchain-news-app` directory and follows the conventions described in `AGENTS.md`.

## Prerequisites
- Node.js 20 or later
- npm 9 or later

## Getting Started
1. Install dependencies:
   ```bash
   cd blockchain-news-app
   npm install
   ```
2. Copy the example environment file and fill in your values:
   ```bash
   cp .env.example .env.local
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Directory Layout
- `blockchain-news-app/src/app` - Next.js App Router pages and layouts
- `blockchain-news-app/src/components` - Reusable React components
- `blockchain-news-app/src/lib` - Utility functions and API clients
- `blockchain-news-app/src/types` - TypeScript type definitions
- `blockchain-news-app/src/hooks` - Custom React hooks
- `prisma` - Database schema and migrations

## Common Commands
These commands help verify that the application builds and passes all checks:

```bash
npm run build      # production build
npm run lint       # lint the codebase
npm run type-check # run TypeScript type checking
npm test           # unit tests
npm run e2e        # end-to-end tests
```

Refer to `AGENTS.md` for full development standards and validation steps. All required environment variables are listed in `blockchain-news-app/.env.example`.
