# Bugs Fixed - Quro Waitlist Project

## Summary
This document outlines all bugs found and fixed in the Quro waitlist application.

---

## 🔴 CRITICAL: Installation Issue (Requires User Action)

### Problem
**Cannot install dependencies due to directory path with spaces and parentheses**

The project is located in a directory path containing spaces and parentheses:
```
/Users/kayra/Library/CloudStorage/OneDrive-TheUniversityofSydney(Students)/Quro Waiting List Website
```

This causes `better-sqlite3` (a native Node.js module) to fail during compilation with the error:
```
/bin/sh: -c: line 0: syntax error near unexpected token `('
```

### Impact
- Cannot run `npm install`
- Application cannot start without node_modules
- Development and deployment are blocked

### Solutions

#### Solution 1: Move Project to Path Without Spaces (RECOMMENDED)
Move the project to a path without spaces or special characters:

```bash
# Option A: Move to home directory
mv "/Users/kayra/Library/CloudStorage/OneDrive-TheUniversityofSydney(Students)/Quro Waiting List Website" ~/quro-waitlist
cd ~/quro-waitlist
npm install
```

```bash
# Option B: Move to Documents
mv "/Users/kayra/Library/CloudStorage/OneDrive-TheUniversityofSydney(Students)/Quro Waiting List Website" ~/Documents/quro-waitlist
cd ~/Documents/quro-waitlist
npm install
```

#### Solution 2: Create a Symlink
Create a symbolic link to work around the path issue:

```bash
# Create symlink in home directory
ln -s "/Users/kayra/Library/CloudStorage/OneDrive-TheUniversityofSydney(Students)/Quro Waiting List Website" ~/quro-waitlist
cd ~/quro-waitlist
npm install
```

#### Solution 3: Switch to sql.js (Alternative Database)
Replace `better-sqlite3` with `sql.js` (a WebAssembly-based SQLite that doesn't require native compilation). This would require code changes but would work with the current path.

**After choosing a solution, run:**
```bash
npm install
npm run dev
```

---

## ✅ Fixed: React Hook Dependencies

### Problem
**Missing dependency in useEffect hook in admin dashboard**

File: `app/admin/page.tsx`

The `refreshStats` function was used in a `useEffect` dependency array but wasn't memoized, causing:
- React warnings about missing dependencies
- Potential infinite re-render loops
- Unnecessary function recreations on every render

### Original Code
```typescript
const refreshStats = async () => {
  // ... async function
};

useEffect(() => {
  if (isAuthenticated) {
    const interval = setInterval(refreshStats, 30000);
    return () => clearInterval(interval);
  }
}, [isAuthenticated, password]); // ❌ refreshStats not in deps, password was
```

### Fix Applied
Wrapped `refreshStats` in `useCallback` hook to properly memoize it:

```typescript
const refreshStats = useCallback(async () => {
  if (!isAuthenticated) return;
  
  try {
    const response = await fetch('/api/admin/stats', {
      headers: {
        'Authorization': `Bearer ${password}`,
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      setStats(data);
    }
  } catch (err) {
    console.error('Failed to refresh stats');
  }
}, [isAuthenticated, password]); // ✅ Memoized with proper dependencies

useEffect(() => {
  if (isAuthenticated) {
    const interval = setInterval(refreshStats, 30000);
    return () => clearInterval(interval);
  }
}, [isAuthenticated, refreshStats]); // ✅ Correct dependencies
```

### Changes Made
1. Added `useCallback` to imports from 'react'
2. Wrapped `refreshStats` function with `useCallback`
3. Added proper dependencies: `[isAuthenticated, password]`
4. Updated useEffect dependencies to `[isAuthenticated, refreshStats]`

### Impact
- ✅ Eliminates React warnings
- ✅ Prevents unnecessary re-renders
- ✅ Ensures stable function reference
- ✅ Follows React best practices

---

## 📋 Other Notes

### Environment Variables
The project requires a `.env` file to be created. Template exists in `env.example`:

```bash
# Copy the example file
cp env.example .env

# Edit the file and update ADMIN_PASSWORD
nano .env  # or use your preferred editor
```

Required variables:
- `ADMIN_PASSWORD` - Must be changed from default value
- `DATABASE_PATH` - Optional, defaults to `./data/waitlist.db`

### TypeScript/Linting Errors
The TypeScript errors shown in the IDE (related to missing 'react', 'next' modules) are expected before running `npm install`. These will be resolved once dependencies are installed.

### Database Initialization
The database is automatically initialized on first run:
- Creates `data/` directory if it doesn't exist
- Creates `waitlist.db` SQLite database
- Creates `emails` and `visits` tables

No manual database setup is required.

---

## Next Steps

1. **CRITICAL**: Resolve the installation issue by moving the project or creating a symlink
2. Run `npm install` to install dependencies
3. Create `.env` file and set a secure `ADMIN_PASSWORD`
4. Run `npm run dev` to start development server
5. Test all functionality:
   - Email signup on homepage
   - Visit tracking
   - Admin authentication
   - Stats display
   - CSV export

---

## Files Modified

- ✅ `app/admin/page.tsx` - Fixed React hook dependencies
- 📝 `BUGS_FIXED.md` - This documentation (new file)

## Files That Need User Action

- ⚠️ `.env` - Needs to be created from `env.example`
- ⚠️ Project location - Needs to be moved or symlinked

---

*Last Updated: October 9, 2025*

