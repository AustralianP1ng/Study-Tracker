# Study Tracker — synced PWA

This version uses Supabase for account-based syncing.

## What it does
- Study timer with pause/resume
- Custom study session names/topics
- Calendar with per-date stats
- Daily / weekly / monthly graphs
- Study streak
- Light / dark mode
- Sign in on multiple devices
- Cloud sync between devices
- Offline shell through the PWA service worker

## One-time setup

1. Create a free Supabase project at https://supabase.com/
2. In Supabase, open SQL Editor and run `supabase-schema.sql`.
3. In Supabase, open Project Settings → API.
4. Copy the Project URL and the project's publishable/anon key.
5. Put those two values into `config.js`.
6. Host this folder over HTTPS (GitHub Pages is a simple free option).
7. Open the site on your iPad in Safari and choose Share → Add to Home Screen.
8. Sign in with the same account on every device.

## Important
The app should only contain the Supabase publishable/anon key. NEVER put a Supabase service-role/secret key into this app.

Study records are protected by Row Level Security: each signed-in user can only read, insert, and delete their own sessions.

## Email confirmation
Depending on your Supabase Auth settings, creating an account may require email confirmation. If you want instant personal use, you can adjust the email-confirmation setting in Supabase Auth settings.

## Local development
A normal local `file://` open is not a good test for a PWA. Serve the folder from a local web server or deploy it to HTTPS.
