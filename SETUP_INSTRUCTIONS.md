# 🚀 Quro Waitlist - Complete Setup Instructions

## ⚠️ IMPORTANT: Path Issue Detected

Your project is currently in a OneDrive folder with special characters in the path that breaks the build process. You have **2 options**:

### Option 1: Move Project (Recommended)
Move the project to a simpler path without special characters.

### Option 2: Deploy Directly to Vercel (Skip Local Build)
Deploy directly to Vercel without building locally. Vercel will handle the build.

---

## 📋 Current Status

✅ **Completed:**
- Project structure created
- All code files written
- Git initialized locally
- Remote repository configured: `https://github.com/Quro-App/Waitlist.git`
- Dependencies installed (with path issue)
- Environment file created (`.env`)

❌ **Not Yet Done:**
- Create GitHub repository
- Push code to GitHub
- Test website locally (blocked by path issue)
- Deploy to Vercel

---

## 🔧 Step-by-Step Setup

### Step 1: Create GitHub Repository

1. Go to https://github.com/Quro-App
2. Click **"New repository"** (green button)
3. Repository settings:
   - **Owner:** Quro-App
   - **Repository name:** `Waitlist`
   - **Description:** Professional waitlist page for Quro - Real-time barbershop wait times
   - **Visibility:** Public ✅
   - **Initialize:** ⚠️ **DO NOT** check "Add a README file" (we already have one)
   - **DO NOT** add .gitignore or license (we have these already)
4. Click **"Create repository"**

### Step 2: Push Your Code to GitHub

After creating the repository on GitHub, run these commands:

```bash
# Navigate to project directory
cd "/Users/kayra/Library/CloudStorage/OneDrive-TheUniversityofSydney(Students)/Quro Waiting List Website"

# Add all files (including your improvements)
git add -A

# Commit everything
git commit -m "Initial commit - Quro waitlist website with admin dashboard"

# Push to GitHub
git push -u origin main
```

If it asks for credentials:
- **Username:** Your GitHub username (or Quro-App)
- **Password:** Use a **Personal Access Token** (not your GitHub password)

#### How to Create Personal Access Token:
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name: "Quro Waitlist"
4. Select scopes: Check `repo` (all repo permissions)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

### Step 3: Deploy to Vercel (Recommended)

Since you have the path issue, deploy directly to Vercel:

1. **Go to https://vercel.com**
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. After connecting GitHub, click **"Add New Project"**
5. Import your repository:
   - Search for `Quro-App/Waitlist`
   - Click **"Import"**
6. Configure Project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (default)
   - **Install Command:** `npm install` (default)
7. **Add Environment Variable:**
   - Click **"Environment Variables"**
   - Key: `ADMIN_PASSWORD`
   - Value: `Quro2025Launch!` (or create your own secure password)
   - Environment: Production ✅
8. Click **"Deploy"**

Vercel will build and deploy your site in ~2 minutes!

---

## 🔑 Your Admin Password

**Current Password:** `Quro2025Launch!`

This is stored in your `.env` file (local only, not pushed to GitHub).

**To change it:**
1. For local: Edit `.env` file
2. For production (Vercel): Update environment variable in Vercel dashboard

**⚠️ Security:** Change this to a stronger password for production!

---

## 🌐 After Deployment

Once Vercel finishes deploying, you'll get URLs like:

- **Production:** `https://waitlist-quro.vercel.app`
- **Admin Dashboard:** `https://waitlist-quro.vercel.app/admin`

### Test Your Website:

1. **Visit the landing page**
2. **Enter an email** to join waitlist
3. **Go to /admin**
4. **Enter your admin password:** `Quro2025Launch!`
5. **View your dashboard:**
   - Total signups
   - Total visitors
   - Email list
   - Export CSV

---

## 💻 Local Development (After Fixing Path)

If you want to run locally, you need to fix the path issue:

### Option A: Move to Desktop
```bash
# Copy project to Desktop
cp -r "/Users/kayra/Library/CloudStorage/OneDrive-TheUniversityofSydney(Students)/Quro Waiting List Website" ~/Desktop/quro-waitlist

# Navigate to new location
cd ~/Desktop/quro-waitlist

# Install dependencies
npm install

# Run development server
npm run dev
```

### Option B: Move to Documents
```bash
# Copy project to Documents
cp -r "/Users/kayra/Library/CloudStorage/OneDrive-TheUniversityofSydney(Students)/Quro Waiting List Website" ~/Documents/quro-waitlist

# Navigate to new location
cd ~/Documents/quro-waitlist

# Install dependencies
npm install

# Run development server
npm run dev
```

Then open: http://localhost:3000

---

## 📊 What You Can Do Now

### As a Founder:

1. **View Analytics:**
   - Go to `your-site.vercel.app/admin`
   - Login with password
   - See signups, visitors, conversion rate

2. **Export Emails:**
   - Click "Export CSV" button
   - Download your email list
   - Import to Mailchimp, SendGrid, etc.

3. **Share Your Waitlist:**
   - Post on social media
   - Add to bio links
   - Share in communities
   - Email to network

### Users Can:

1. **Sign up for waitlist:**
   - Enter email
   - Get confirmation
   - See how many people joined

---

## 🔄 Making Changes

After deployment, if you want to update the website:

```bash
# Make your changes to files
# Then commit and push:

git add -A
git commit -m "Description of changes"
git push origin main
```

Vercel will **automatically redeploy** when you push to GitHub!

---

## ⚙️ API Endpoints Reference

Your website has these APIs:

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/api/subscribe` | POST | Add email to waitlist | No |
| `/api/track-visit` | POST | Track visitor | No |
| `/api/stats` | GET | Get public stats | No |
| `/api/admin/stats` | GET | Get admin dashboard data | Yes |

---

## 🆘 Troubleshooting

### "Repository not found" on GitHub
- **Fix:** Make sure you created the repository on GitHub first
- Repository must be at: `https://github.com/Quro-App/Waitlist`

### "Permission denied" when pushing
- **Fix:** Use Personal Access Token instead of password
- Generate at: https://github.com/settings/tokens

### Website not loading
- **Fix:** Check Vercel deployment logs
- Make sure environment variable `ADMIN_PASSWORD` is set

### Admin password not working
- **Fix:** Check you set `ADMIN_PASSWORD` in Vercel environment variables
- Value should match what you use to login

### Database errors
- **Fix:** Vercel handles SQLite automatically, no action needed
- Database persists between deployments

---

## 📝 Quick Checklist

Before launching:

- [ ] Create GitHub repository: `Quro-App/Waitlist`
- [ ] Push code to GitHub
- [ ] Deploy to Vercel
- [ ] Set `ADMIN_PASSWORD` environment variable
- [ ] Test signup form on production
- [ ] Test admin dashboard login
- [ ] Export test CSV to verify
- [ ] Change admin password to something secure
- [ ] Share waitlist link!

---

## 🎉 What You Have

Your complete waitlist website includes:

✅ **Landing Page** - Beautiful, YC-style design  
✅ **Email Collection** - With validation & duplicate prevention  
✅ **Visitor Tracking** - Automatic analytics  
✅ **Admin Dashboard** - Real-time stats & email list  
✅ **CSV Export** - Download emails anytime  
✅ **Mobile Responsive** - Works on all devices  
✅ **Auto-deploy** - Push to GitHub = auto-deploy  
✅ **Secure** - Password protected admin area  

---

## 📞 Next Steps

1. **Create GitHub repo** (see Step 1 above)
2. **Push code** (see Step 2 above)
3. **Deploy to Vercel** (see Step 3 above)
4. **Share your link!** 🚀

---

## 🔗 Important Links

- **GitHub Repo:** https://github.com/Quro-App/Waitlist
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Tokens:** https://github.com/settings/tokens

---

**Need help?** Open an issue on GitHub or check the other documentation files:
- `README.md` - Project overview
- `GETTING_STARTED.md` - Development guide  
- `DEPLOYMENT.md` - Deployment details
- `PROJECT_SUMMARY.md` - Complete feature list

