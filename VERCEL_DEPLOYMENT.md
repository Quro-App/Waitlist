# Deploy Quro Waitlist to Vercel

Follow these steps to get your free domain at Vercel:

## Step 1: Sign Up/Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Login"
3. **Important:** Sign in with your GitHub account (`Quro-App`)

## Step 2: Import Your Repository

1. Click "Add New..." → "Project"
2. You'll see your GitHub repositories
3. Find and click "Import" next to `Quro-App/Waitlist`

## Step 3: Configure Your Project

### Framework Preset
- Vercel should auto-detect **Next.js** ✅

### Root Directory
- Leave as `.` (root)

### Build Settings
- Build Command: `npm run build` (auto-detected)
- Output Directory: `.next` (auto-detected)
- Install Command: `npm install` (auto-detected)

### Environment Variables
Click "Add Environment Variable" and add:

```
ADMIN_PASSWORD=your-secure-password-here
```

**Replace `your-secure-password-here` with a strong password for your admin panel**

## Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. You'll get a URL like: `https://waitlist-quro.vercel.app`

## Step 5: Get a Better Domain (Optional)

After deployment, you can:

1. Go to Project Settings → Domains
2. Add a custom domain like:
   - `quro-waitlist.vercel.app` (free Vercel subdomain)
   - Or connect your own domain later

## Your Live URLs

After deployment, you'll have:

- **Waitlist Page:** `https://your-project.vercel.app`
- **Admin Panel:** `https://your-project.vercel.app/admin`

## Next Steps

1. ✅ Test your live site
2. ✅ Add the URL to your social media bios
3. ✅ Access the admin panel to see signups
4. ✅ Set up email notifications (optional)

---

## Automatic Deployments

Every time you push to GitHub (main branch), Vercel will automatically rebuild and deploy your site! 🚀

No manual work needed - just push your code and it's live!

---

## Troubleshooting

**If deployment fails:**
1. Check the build logs in Vercel dashboard
2. Make sure all dependencies are in `package.json`
3. Ensure environment variables are set correctly

**Database issues:**
The SQLite database will be created automatically on first run in Vercel's serverless environment.

