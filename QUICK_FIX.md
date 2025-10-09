# 🚀 Quick Fix Guide

## The Problem
Your project path contains spaces and parentheses, which breaks the `better-sqlite3` installation:
```
OneDrive-TheUniversityofSydney(Students)/Quro Waiting List Website
```

## The Solution (Choose One)

### Option 1: Move the Project (Fastest ✅)
```bash
# Move to your home directory
cd ~
mv "Library/CloudStorage/OneDrive-TheUniversityofSydney(Students)/Quro Waiting List Website" quro-waitlist
cd quro-waitlist

# Install and run
npm install
cp env.example .env
# Edit .env and change ADMIN_PASSWORD
npm run dev
```

### Option 2: Use a Symlink
```bash
# Create a symlink in your home directory
ln -s "/Users/kayra/Library/CloudStorage/OneDrive-TheUniversityofSydney(Students)/Quro Waiting List Website" ~/quro-waitlist
cd ~/quro-waitlist

# Install and run
npm install
cp env.example .env
# Edit .env and change ADMIN_PASSWORD
npm run dev
```

## After the Fix

Once moved/symlinked, these commands will work:

```bash
# Install dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env - IMPORTANT: Change ADMIN_PASSWORD!
nano .env

# Run development server
npm run dev
```

Open http://localhost:3000 in your browser.

## What Was Fixed

✅ React hook dependency warning in admin dashboard
✅ Proper memoization with `useCallback`
✅ Documentation of all issues and solutions

See `BUGS_FIXED.md` for detailed information.

