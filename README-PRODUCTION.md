# Midwife Connect Rwanda — Production Setup

## Included
- Supabase email/password authentication
- Registration with name and user type metadata
- Login and password recovery
- Protected dashboard/course/quiz pages
- Lesson completion tracking
- Shared Supabase client configuration
- Responsive existing frontend preserved

## Supabase configuration
The publishable key is intended for browser use. Never put a Supabase service-role key in HTML/JS.

In Supabase Authentication > URL Configuration, add:
- Your deployed site origin
- `/pages/login.html` as the email verification redirect if your deployment uses that path
- `/pages/reset-password.html` for password recovery

## Optional database sync
The current lesson progress works locally so the site remains usable without a database table. For cross-device progress, create a `course_progress` table with:
- `user_id` uuid
- `lesson_slug` text
- `completed` boolean
- `updated_at` timestamptz

Then replace the local progress implementation with Supabase row upserts.

## Run locally
Serve the folder through a local HTTP server (not `file://`) so authentication redirects and scripts behave consistently.
