# Deploying the client (GitHub → Vercel)

Covers pushing `client/` to GitHub and deploying it to Vercel as a static
Vite/React site. Do this **after** the server is deployed (see
`../server/DEPLOYMENT.md`) so you have the real API URL to configure below -
or deploy now with `localhost` and come back to update the env var, either
order works.

## 1. Push to GitHub

Same as the server - if `client/` and `server/` are two folders in one repo,
you've likely already run this once from the repo root:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

If they're separate repos, run this inside `client/` instead.

Double check `.gitignore` excludes `node_modules` and `.env` before
committing - only `.env.example` should be tracked. **`public/product-media/`
should stay committed** though (not gitignored) - those ~190MB of migrated
product images are served directly from this folder in production, see
`CLAUDE.md`'s Phase 1 section for why.

## 2. Import into Vercel

1. [vercel.com/new](https://vercel.com/new) → import the repo.
2. **Root Directory**: set to `client` if it's a monorepo with `server/`
   alongside it; leave as repo root if it's its own repo.
3. **Framework Preset**: Vercel auto-detects **Vite** here - leave the
   default build command (`vite build` / `npm run build`) and output
   directory (`dist`) as detected.
4. **Environment Variables**:

   | Key | Value |
   |---|---|
   | `VITE_API_BASE_URL` | your deployed server's API URL, e.g. `https://<server-project>.vercel.app/api` (use `http://localhost:5001/api` only for local dev) |
   | `VITE_GOOGLE_CLIENT_ID` | must match the server's `GOOGLE_CLIENT_ID` exactly |

5. Deploy.

`vercel.json` (already in this project) rewrites every path to
`index.html`, which is required for a client-side-routed SPA (React
Router) - without it, refreshing on e.g. `/products/products/phardness`
directly would 404 instead of loading the app and letting React Router
take over.

## 3. Google Sign-In: update the authorized origin

Once you know the real deployed URL (e.g. `https://your-site.vercel.app`),
go back to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials),
open the OAuth Client ID you created (see `CLAUDE.md`'s auth section), and
add that URL under **Authorized JavaScript origins** (alongside
`http://localhost:5173` for local dev, which you can leave in place). Google
Sign-In will fail on the deployed site until this is added - it's scoped per
origin.

## 4. First admin user

There's no `/register`-to-admin flow by design (see `CLAUDE.md`) - register
a normal account through the deployed site (email/password or Google), then
promote it to `admin` directly in Supabase's table editor (`User` table,
`role` column) or via a one-off Prisma script against the same
`DATABASE_URL`.

## Redeploying after changes

Vercel redeploys automatically on every push to the branch you imported
(`main` by default) - no extra steps needed once this is set up once.
