# Cloud Progress Setup

1. Open your Supabase project.
2. Open **SQL Editor**.
3. Paste and run `supabase-schema.sql`.
4. Deploy this project.
5. Make sure the deployed domain is configured under Supabase Authentication → URL Configuration.

After the SQL is run:
- lesson completion is synchronized to `course_progress`
- quiz attempts are stored in `quiz_results`
- students can access their progress from another device after logging in

The browser still keeps a small local cache so the UI remains responsive.
