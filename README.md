# AfterHours - Personal Journal Application

A production-ready personal journal web application with vintage paper aesthetics, OAuth authentication, and real-time database synchronization.

## Features

- **OAuth Authentication**: Google and Twitter sign-in only (via Supabase)
- **Vintage Paper UI**: Warm beige tones, grain textures, serif fonts, soft shadows
- **Rich Journal Entries**: Create, read, update, and delete journal entries
- **Interactive Calendar**: Visual calendar with date highlighting for entries
- **Recent Entries Panel**: Quick access to your latest journal posts
- **Real-time Updates**: Instant synchronization with Supabase database
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Protected Routes**: Secure authentication flow with route protection
- **Loading States**: Smooth skeleton screens and loading indicators

## Tech Stack

- **Frontend**: React 19 + Vite 6
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth (OAuth)
- **Database**: Supabase PostgreSQL with Row Level Security
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Framework

Vite + React

## Theme

Vintage Paper Journal
- Warm beige color palette (#F5F1E8, #E8DCC4, #D4C5A9)
- Serif typography (Crimson Text, Playfair Display)
- Handwriting accents (Caveat font)
- Subtle grain texture overlays
- Soft shadows and thin borders

## Quick Setup

### 1. Install Dependencies

The system will handle dependency installation automatically.

### 2. Configure Supabase

Follow the detailed setup instructions in `SUPABASE_SETUP.md`:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `supabase/schema.sql` in the SQL Editor
3. Configure Google OAuth provider in Authentication settings
4. Configure Twitter OAuth provider in Authentication settings
5. Get your Project URL and anon key from Settings → API

### 3. Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace with your actual Supabase credentials.

## Project Structure

```
afterhours/
├── src/
│   ├── components/
│   │   ├── journal/
│   │   │   ├── Calendar.jsx          # Interactive calendar with date highlighting
│   │   │   ├── JournalEditor.jsx     # Entry creation/editing form
│   │   │   ├── JournalViewer.jsx     # Entry display component
│   │   │   └── RecentEntries.jsx     # Recent entries sidebar
│   │   └── ui/
│   │       ├── Button.jsx            # Reusable button component
│   │       └── LoadingSpinner.jsx    # Loading indicators
│   ├── contexts/
│   │   └── AuthContext.jsx           # Authentication state management
│   ├── lib/
│   │   ├── auth.js                   # Auth helper functions
│   │   ├── journal.js                # Journal CRUD operations
│   │   └── supabase.js               # Supabase client configuration
│   ├── pages/
│   │   ├── Login.jsx                 # OAuth landing page
│   │   └── Journal.jsx               # Main journal dashboard
│   ├── App.jsx                       # App router and route protection
│   ├── main.jsx                      # React entry point
│   └── index.css                     # Global styles and Tailwind
├── supabase/
│   └── schema.sql                    # Database schema and RLS policies
├── SUPABASE_SETUP.md                 # Detailed Supabase configuration guide
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Key Features Explained

### Authentication Flow

- Landing page displays Google and Twitter sign-in buttons
- OAuth handled entirely by Supabase (no email/password)
- Successful login redirects to `/journal`
- Protected routes ensure only authenticated users access journal

### Journal Dashboard

- **Left Panel**: Active journal entry viewer/editor
- **Right Sidebar**: 
  - Calendar with highlighted dates that have entries
  - Recent entries panel (latest 10 entries)
- **Add Journal Button**: Switches to edit mode for new entries
- **Edit/Delete**: Full CRUD operations on existing entries

### Database Security

- Row Level Security (RLS) policies ensure users only see their own entries
- Automatic `updated_at` timestamp on every edit
- UUID-based entry IDs
- Cascade deletion when user account is removed

### Responsive Design

- Mobile-first approach
- Stacks vertically on mobile/tablet
- Side-by-side layout on desktop (1024px+)
- Touch-friendly buttons and interactions

## Database Schema

The `journal_entries` table includes:

- `id` (UUID, primary key)
- `user_id` (UUID, references auth.users)
- `title` (text)
- `content` (text)
- `entry_date` (date)
- `created_at` (timestamp)
- `updated_at` (timestamp, auto-updated)

See `supabase/schema.sql` for complete schema and RLS policies.

## Development Notes

- Configured to run on `0.0.0.0:8080` for Kubernetes HTTPRoute access
- Uses `allowedHosts: ['.nodeops.app']` for secure subdomain wildcarding
- Vite proxy configured for API requests (if needed)
- Hot module replacement enabled for fast development

## Security

- OAuth-only authentication (Google + Twitter)
- Row Level Security on all database tables
- Supabase handles token refresh automatically
- Session persistence in local storage
- Protected routes with automatic redirects

## Troubleshooting

### OAuth Not Working

1. Verify OAuth credentials in Supabase dashboard
2. Check callback URLs match Supabase settings
3. Ensure Google/Twitter apps have correct redirect URIs

### Database Errors

1. Confirm RLS policies are enabled
2. Check user is authenticated before queries
3. Verify schema was run successfully in SQL Editor

### Environment Variables

1. Ensure `.env` file exists in root directory
2. Restart dev server after changing environment variables
3. Variables must be prefixed with `VITE_`

## License

MIT

## Support

For detailed Supabase setup instructions, see `SUPABASE_SETUP.md`.

---

Built with care for preserving your thoughts in a digital notebook.