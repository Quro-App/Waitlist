# Getting Started with Quro Waitlist

Welcome to your Quro waitlist application! This guide will help you get up and running in minutes.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, TypeScript, Tailwind CSS, and SQLite.

### 2. Set Your Admin Password

Create a `.env.local` file in the root directory:

```bash
ADMIN_PASSWORD=your-secure-password-here
DATABASE_PATH=./data/waitlist.db
```

**⚠️ Important:** Replace `your-secure-password-here` with a strong password!

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Open Your Browser

- **Waitlist Page:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin

## 📁 What's Included

Your waitlist application includes:

### Landing Page (/)
- ✅ Clean, YC-style design
- ✅ Email signup form with validation
- ✅ Real-time waitlist counter
- ✅ Automatic visitor tracking
- ✅ Mobile responsive
- ✅ Quro branding with your logo

### Admin Dashboard (/admin)
- ✅ Password-protected access
- ✅ Total signups counter
- ✅ Total visitors counter
- ✅ Conversion rate calculation
- ✅ Signup trends (last 30 days)
- ✅ Complete email list
- ✅ CSV export functionality
- ✅ Real-time updates (refreshes every 30 seconds)

### Backend Features
- ✅ Email collection with duplicate prevention
- ✅ Visitor tracking (IP + User Agent)
- ✅ SQLite database (auto-created)
- ✅ Secure admin authentication
- ✅ RESTful API endpoints

## 🎯 Testing Your Waitlist

### Test the Landing Page

1. Go to http://localhost:3000
2. Enter an email address
3. Click "Join the Waitlist"
4. You should see a success message
5. Try the same email again - you'll get an error (duplicate prevention works!)

### Test the Admin Dashboard

1. Go to http://localhost:3000/admin
2. Enter your admin password (from `.env.local`)
3. You should see:
   - Your signup count
   - Visitor count
   - The email you just added
4. Click "Export CSV" to download your email list

## 📊 Understanding Your Data

### Database Location
Your SQLite database is stored at `./data/waitlist.db`

### What's Being Tracked

1. **Emails Table**
   - Email address
   - Signup timestamp
   - Unique ID

2. **Visits Table**
   - IP address (anonymized)
   - User agent
   - Visit timestamp

### Viewing Your Data

You can view all your data through the admin dashboard, or if you want to query the database directly:

```bash
npm install -g sqlite3
sqlite3 data/waitlist.db
```

Then run SQL queries like:
```sql
SELECT * FROM emails;
SELECT COUNT(*) FROM visits;
```

## 🚀 Deploy to Production

### Recommended: Vercel

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit - Quro waitlist"
git remote add origin https://github.com/Quro-App/Waitlist.git
git push -u origin main
```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Import your `Quro-App/Waitlist` repository
   - Add environment variable: `ADMIN_PASSWORD`
   - Click "Deploy"

3. **Done!** Your waitlist is live 🎉

See `DEPLOYMENT.md` for detailed deployment instructions.

## 🎨 Customization

### Change Colors

Edit `app/page.tsx` and `app/admin/page.tsx` to change:
- Background colors
- Button styles
- Text colors

### Change Copy

Edit `app/page.tsx` to update:
- Headline text
- Subheadline
- Feature descriptions
- Footer text

### Update Metadata

Edit `app/layout.tsx` to change:
- Page title
- Meta description
- Open Graph tags

## 📈 Growth Tips

1. **Share Your Link:** Post on social media, forums, communities
2. **Add to Bio:** Put your waitlist link in social media bios
3. **Email Signature:** Add to your email signature
4. **Product Hunt:** Launch when you have traction
5. **Reddit/HN:** Share in relevant communities

## 🔒 Security Best Practices

1. ✅ Use a strong admin password (20+ characters)
2. ✅ Never commit `.env.local` to git
3. ✅ Regularly export your email list as backup
4. ✅ Monitor your admin dashboard for unusual activity
5. ✅ Enable 2FA on your GitHub and Vercel accounts

## 📱 Next Steps

### Immediate
- [ ] Set a strong admin password
- [ ] Test both the landing page and admin dashboard
- [ ] Deploy to Vercel
- [ ] Share your waitlist link

### Soon
- [ ] Add Google Analytics
- [ ] Set up email notifications (when someone signs up)
- [ ] Create a referral system
- [ ] Add social proof (testimonials)

### Future
- [ ] Integrate with email marketing tools (Mailchimp, SendGrid)
- [ ] Add A/B testing for copy
- [ ] Create multiple landing page variants
- [ ] Build an email drip campaign

## 🆘 Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Database errors
```bash
rm -rf data/
npm run dev
# Database will be recreated automatically
```

### Admin password not working
1. Check `.env.local` exists
2. Verify no extra spaces in the password
3. Restart the dev server

### Logo not showing
1. Ensure `Quro Logo.png` is in `/public` folder
2. Clear browser cache
3. Check browser console for errors

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

## 💬 Support

Need help? Check:
- `README.md` - General information
- `DEPLOYMENT.md` - Deployment guide
- GitHub Issues - Report bugs or ask questions

---

**Built with ❤️ for Quro**

Good luck with your launch! 🚀

