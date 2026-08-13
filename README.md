# Midwife Connect Rwanda

Unified static web project for Midwife Connect Rwanda.

## Authentication
Registration and login use Supabase Auth. The Supabase publishable key is safe to expose in browser code; never place a Supabase service-role key in this project.

## Main sections
- Student Midwife learning
- Midwife resources
- Pregnancy education
- Youth health
- Pharmacy support
- Anatomy & Physiology lessons
- Quizzes
- Dashboard
- Membership
- Multilingual UI

## Run locally
Because this is a static website, you can open `index.html` directly for most pages, or use a local server:

`python -m http.server 8000`

Then visit `http://localhost:8000/`.

## Deployment
Upload the project folder to GitHub Pages, Netlify, Vercel, or another static host. For Supabase email verification/password reset, make sure the deployed URL is added to the Supabase Authentication URL settings.
