# Quro Waitlist

A professional, clean waiting list page for Quro - the app that displays real-time wait times for barbershops.

## Features

- 🎨 Modern, YC-style landing page
- 📧 Email collection with validation
- 📊 Visitor tracking
- 🔐 Admin dashboard with analytics
- 📈 Conversion rate tracking
- 📥 CSV export of emails
- 💾 SQLite database for easy deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Quro-App/Waitlist.git
cd Waitlist
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp env.example .env
```

4. Edit `.env` and set your admin password:
```
ADMIN_PASSWORD=your-secure-password-here
DATABASE_PATH=./data/waitlist.db
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Dashboard

Access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin)

The dashboard shows:
- Total signups
- Total visitors
- Conversion rate
- Signups over time (last 30 days)
- Complete email list
- CSV export functionality

Default password: The one you set in `.env` file

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variable: `ADMIN_PASSWORD`
4. Deploy!

Note: The SQLite database will persist between deployments on Vercel's filesystem.

### Other Platforms

The app can be deployed to any Node.js hosting platform:
- Railway
- Render
- DigitalOcean
- AWS/Azure/GCP

Make sure to set the `ADMIN_PASSWORD` environment variable.

## Project Structure

```
├── app/
│   ├── page.tsx              # Main landing page
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   ├── api/
│   │   ├── subscribe/        # Email subscription endpoint
│   │   ├── track-visit/      # Visitor tracking endpoint
│   │   ├── stats/            # Public stats endpoint
│   │   └── admin/
│   │       └── stats/        # Protected admin stats endpoint
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   └── db.ts                 # Database functions
├── public/
│   └── Quro Logo.png         # Logo
└── data/
    └── waitlist.db           # SQLite database (auto-created)
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** SQLite (better-sqlite3)
- **Deployment:** Vercel-ready

## API Endpoints

- `POST /api/subscribe` - Add email to waitlist
- `POST /api/track-visit` - Track page visit
- `GET /api/stats` - Get public stats (email count, visit count)
- `GET /api/admin/stats` - Get detailed stats (requires authentication)

## License

MIT

## Support

For questions or issues, please open an issue on GitHub.

