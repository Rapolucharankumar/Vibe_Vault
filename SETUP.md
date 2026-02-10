# VibeVault - Your Private Mood + Music Journal

A beautiful, modern PWA for capturing your moods and discovering music that matches or transforms how you feel. Private, secure, and delight-filled.

## 🎵 Features

### Core Experience
- **Instant Mood Capture** - Record your mood in 3-6 seconds with 10 beautifully designed mood buttons
- **Meaningful Journaling** - Optional short-form journaling (max 150 characters) to capture what's on your mind
- **Smart Music Discovery** - Instant access to curated music that either mirrors your current mood or helps shift it
- **Beautiful History** - Calendar heatmap and timeline view of your mood entries with replay functionality
- **Clean Design** - Dark-first, soothing interface with smooth animations and micro-interactions

### Mood Capture
10 unique moods with color-coded emojis:
- 😊 Joyful
- 😌 Peaceful
- 😢 Melancholy
- 😟 Anxious
- 🔥 Energetic
- 😠 Frustrated
- 🌙 Nostalgic
- 😴 Drained
- 🥰 Loved
- 🤍 Mixed / Other

### Playlist Modes
- **Mirror** - Music that understands and matches your current feeling
- **Shift** - Choose a target feeling (Calm Me, Lift Me, Focus Me, Energize Me) and get music to help you get there

## 🚀 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Music**: YouTube Data API v3
- **State**: Zustand
- **Hosting**: Vercel

## 🔧 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Supabase

Run this SQL in your Supabase project:

```sql
CREATE TABLE mood_entries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  mood text NOT NULL,
  intensity int DEFAULT 3 CHECK (intensity >= 1 AND intensity <= 5),
  note text,
  mode text,
  target text,
  playlist jsonb
);

ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own entries" ON mood_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own entries" ON mood_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own entries" ON mood_entries
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own entries" ON mood_entries
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX idx_mood_entries_created_at ON mood_entries(created_at DESC);
```

Enable Google OAuth in Supabase Authentication.

### 4. Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project
3. Enable YouTube Data API v3
4. Create API key in Credentials
5. Add to `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 📱 Features by Page

- **Home** (`/home`) - Mood capture with instant music recommendations
- **Journal** (`/journal`) - View mood history and replay playlists
- **Settings** (`/settings`) - Account management and preferences
- **Auth** (`/auth`) - Email/Password and Google OAuth

## 🚀 Deployment

Deploy to Vercel:

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard and deploy.

## 🔒 Privacy & Security

- All data is user-private via Supabase Row Level Security
- OAuth handled securely via Supabase Auth
- YouTube embeds don't require user login
- No tracking or analytics by default

## 📄 License

MIT

Made with 💜 by the VibeVault team.
