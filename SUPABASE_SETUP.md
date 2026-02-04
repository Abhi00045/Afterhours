# Supabase Setup Instructions for AfterHours

## 1. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "New Project"
3. Create a new project with a name (e.g., "afterhours")
4. Choose a database password and region
5. Wait for the project to be created

## 2. Run Database Schema

1. In your Supabase dashboard, go to the **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL editor
5. Click "Run" to execute the schema

This will create:
- `journal_entries` table with proper columns
- Indexes for performance
- Row Level Security (RLS) policies
- Automatic `updated_at` timestamp trigger

## 3. Configure OAuth Providers

### Google OAuth Setup

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** in the list and click to expand
3. Toggle "Enable Sign in with Google"
4. You need to create Google OAuth credentials:

   **Create Google OAuth App:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs (get this from Supabase):
     - Copy the "Callback URL" shown in Supabase Google provider settings
     - It looks like: `https://<your-project>.supabase.co/auth/v1/callback`
   - Click "Create"
   - Copy the **Client ID** and **Client Secret**

5. Back in Supabase, paste:
   - Client ID (for web application)
   - Client Secret (for web application)
6. Click "Save"

### Twitter OAuth Setup

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Twitter** in the list and click to expand
3. Toggle "Enable Sign in with Twitter"
4. You need to create Twitter OAuth credentials:

   **Create Twitter OAuth App:**
   - Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
   - Create a new project and app (if you don't have one)
   - Go to your app settings
   - Find "User authentication settings" and click "Set up"
   - Select "OAuth 2.0" 
   - Add callback URL (get this from Supabase):
     - Copy the "Callback URL" shown in Supabase Twitter provider settings
     - It looks like: `https://<your-project>.supabase.co/auth/v1/callback`
   - Set app permissions (Read users, Read tweets at minimum)
   - Save settings
   - Copy the **Client ID** and **Client Secret** from the OAuth 2.0 section

5. Back in Supabase, paste:
   - API Key (Client ID)
   - API Secret Key (Client Secret)
6. Click "Save"

## 4. Get Your Supabase Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Find and copy these values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## 5. Configure Environment Variables

1. Create a `.env` file in the root of your project
2. Add your Supabase credentials:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace `your-project` and `your-anon-key-here` with your actual values from step 4.

## 6. Verify Setup

To verify everything is working:

1. Check that the `journal_entries` table exists in **Database** → **Tables**
2. Check that RLS policies are enabled in **Database** → **Policies**
3. Check that Google and Twitter providers are enabled in **Authentication** → **Providers**
4. Your `.env` file has the correct Supabase URL and anon key

## Notes

- The OAuth callback URLs are automatically handled by Supabase
- Make sure your Google/Twitter OAuth apps have the correct callback URLs
- RLS policies ensure users can only access their own journal entries
- The `updated_at` field is automatically updated on every entry modification