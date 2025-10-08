# Deployment Guide

## Quick Start (Local Development)

1. Install dependencies:
```bash
npm install
```

2. Create your environment file:
```bash
# Create a .env.local file with your admin password
echo "ADMIN_PASSWORD=your-secure-password" > .env.local
echo "DATABASE_PATH=./data/waitlist.db" >> .env.local
```

3. Run the development server:
```bash
npm run dev
```

4. Open http://localhost:3000

## Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables:
```bash
vercel env add ADMIN_PASSWORD
```

4. Deploy to production:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Quro-App/Waitlist.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "Add New Project"

4. Import your GitHub repository

5. Add environment variable:
   - Key: `ADMIN_PASSWORD`
   - Value: Your secure password

6. Click "Deploy"

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `ADMIN_PASSWORD` | Password for admin dashboard | Yes | admin123 |
| `DATABASE_PATH` | Path to SQLite database file | No | ./data/waitlist.db |

## Admin Dashboard

After deployment, access your admin dashboard at:
- Local: http://localhost:3000/admin
- Production: https://your-domain.vercel.app/admin

## Database

The app uses SQLite with `better-sqlite3`. The database file is automatically created at `./data/waitlist.db` on first run.

On Vercel, the database persists in the serverless function filesystem. For production use with high traffic, consider migrating to PostgreSQL or MySQL.

## Custom Domain

To add a custom domain:

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your domain
4. Update your DNS settings as instructed

## Monitoring

Track your waitlist performance:
- **Admin Dashboard**: Real-time stats and email list
- **Vercel Analytics**: Page views and performance metrics
- **Vercel Logs**: Server logs and errors

## Backup Your Data

To backup your email list:

1. Go to /admin
2. Click "Export CSV"
3. Save the file regularly

## Troubleshooting

### Database locked error
- This can happen with SQLite under high concurrency
- Solution: Deploy to a platform with persistent filesystem or migrate to PostgreSQL

### Admin password not working
- Verify `ADMIN_PASSWORD` is set in environment variables
- Redeploy after changing environment variables

### Logo not showing
- Ensure `Quro Logo.png` is in the `/public` folder
- Check browser console for 404 errors

## Security Notes

⚠️ **Important Security Recommendations:**

1. **Change the default admin password** in production
2. **Use a strong password** (20+ characters, mix of letters, numbers, symbols)
3. **Never commit `.env.local`** to git (it's in .gitignore)
4. **Regularly backup your email list**
5. **Consider adding rate limiting** for the subscribe endpoint

## Next Steps

After deployment:

1. ✅ Test the waitlist form
2. ✅ Test the admin dashboard
3. ✅ Set up email notifications (future feature)
4. ✅ Add Google Analytics
5. ✅ Share your waitlist page!

## Support

For issues or questions:
- Open an issue on GitHub
- Check Vercel deployment logs
- Review the README.md

