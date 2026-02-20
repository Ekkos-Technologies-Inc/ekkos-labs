# Deployment Instructions for ekkoslabs.com

## Vercel Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your repository
4. **Important**: Set the "Root Directory" to `apps/labs`
5. Vercel will auto-detect Next.js
6. Click "Deploy"

### Option 2: Deploy via CLI

From the monorepo root:

```bash
cd /Volumes/MacMiniPort/DEV/EKKOS
vercel --cwd apps/labs --prod
```

Or from the labs directory:

```bash
cd apps/labs
vercel --prod
```

### Domain Configuration

1. In Vercel project settings, go to "Domains"
2. Add custom domain: `ekkoslabs.com`
3. Follow DNS configuration instructions

## Project Structure

The project is located at `apps/labs/` in the monorepo. Vercel needs to know this is the root directory for the Next.js app.

## Environment Variables

Currently no environment variables are required. If needed in the future, add them in Vercel project settings.

## Build Configuration

- **Framework**: Next.js 15
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

## Troubleshooting

If you see errors about wrong directory:
- Ensure "Root Directory" is set to `apps/labs` in Vercel dashboard
- Or use `--cwd apps/labs` flag when deploying via CLI




















































































































































































































