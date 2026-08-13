# Midwife Connect Rwanda — Learning Platform Upgrade

Implemented:
- Functional Midwifery, Pregnancy, and Youth quizzes
- Instant scoring and best-score tracking
- Quiz results connected to the existing progress system
- Course player with 16 Anatomy & Physiology lessons
- Lesson-by-lesson navigation
- Certificate page with authenticated student name and printable certificate
- Dashboard links to quizzes and certificates

Progress is currently device-local. For true cross-device progress, create the documented Supabase `course_progress` table and change `js/progress.js` to use authenticated row upserts.
