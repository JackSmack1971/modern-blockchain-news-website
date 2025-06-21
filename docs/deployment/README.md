# Deployment Guide

This document outlines how to deploy the Blockchain News Website and describes required environment variables, build commands, and the CI workflow. It also summarizes logging and backup strategies.

## Environment Variables

Copy `.env.example` to `.env.local` in `blockchain-news-app` and set the following variables:

- `DATABASE_URL` – connection string for the production database.
- `COINGECKO_API_KEY` – API key for fetching market data from CoinGecko.
- `COINMARKETCAP_API_KEY` – API key for CoinMarketCap requests.
- `NEXTAUTH_SECRET` – secret used by NextAuth for session encryption.
- `NEXT_PUBLIC_API_ENDPOINT` – URL of the news API service.
- `CMS_SPACE_ID` – Contentful space identifier.
- `CMS_ACCESS_TOKEN` – access token for Contentful CMS.

All sensitive values should be stored securely and never committed to version control.

## Build Commands

Run these commands in the `blockchain-news-app` directory:

```bash
npm install         # install dependencies
npm run lint        # lint the codebase
npm run type-check  # verify TypeScript types
npm test            # run unit tests
npm run e2e         # run end-to-end tests
npm run build       # create a production build
```

These commands are executed automatically in CI and should succeed before deploying.

## Continuous Integration Workflow

The CI pipeline performs the following steps:

1. Install dependencies using `npm ci`.
2. Lint the code, run type checking, and execute all tests.
3. Build the application.
4. Deploy the build artifact to the target environment if all checks pass.

CI ensures code quality and prevents broken builds from reaching production.

## Pre-deployment Checklist

Before deploying, confirm the following items:

- **Environment variables present** – check that all required variables in `.env.local` are defined. You can verify values in a Node.js shell using `console.log(process.env.VAR_NAME)` or run a validation script that asserts each variable is set.
- **Tests passing** – ensure `npm test` and any end-to-end tests complete without failures.
- **Build completed** – run `npm run build` and confirm the build output is generated successfully.
- **Monitoring configured** – confirm log aggregation and alerting are active for the target environment.

## Logging and Monitoring

Application logs are written to stdout/stderr and collected by the hosting platform. Configure log aggregation (e.g., with a service like Datadog or Logtail) to monitor errors and performance. Enable alerts for unusual activity or failures.

## Backup Strategy

The production database is backed up daily using automated snapshots. Store backups in a secure location with a retention period that meets business requirements. Regularly test restoring from backups to confirm integrity.

