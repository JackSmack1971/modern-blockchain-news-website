# Blockchain News Website Development Guide

## Repository Structure
- `/src/app` - Next.js App Router pages and layouts
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and API clients
- `/src/types` - TypeScript type definitions
- `/src/hooks` - Custom React hooks
- `/prisma` - Database schema and migrations

## Development Standards
- Use TypeScript with strict mode enabled
- Follow Next.js 14 App Router patterns
- Implement proper error boundaries
- Use server components where possible
- Optimize for Core Web Vitals

## Testing Requirements
- Run `npm test` for unit tests
- Run `npm run e2e` for end-to-end tests
- Run `npm run build` to verify production build
- Check `npm run lint` passes all rules
- Verify `npm run type-check` has no errors

## Validation Steps
- All API endpoints must include proper error handling
- Components must be responsive and accessible
- Database queries must be optimized with proper indexing
- Security headers must be configured
- Performance must meet >90 PageSpeed score

## Deployment Notes
- Use environment variables for all configuration
- Implement proper logging and monitoring
- Set up CI/CD pipeline with automated testing
- Configure backup and disaster recovery
- Document all deployment procedures
