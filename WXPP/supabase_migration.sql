-- ============================================
-- SUPABASE MIGRATION: Add status column to jobs table
-- ============================================
-- 
-- Run this SQL in your Supabase SQL Editor:
-- 1. Go to your Supabase project dashboard
-- 2. Click on "SQL Editor" in the left sidebar
-- 3. Paste this SQL and click "Run"
--
-- This adds a 'status' column with default value 'pending'
-- to the existing 'jobs' table.

ALTER TABLE jobs 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Optional: Update existing jobs to 'approved' if you want them visible immediately
-- Uncomment the line below if you want all existing jobs to be approved:
-- UPDATE jobs SET status = 'approved' WHERE status IS NULL;

-- Verify the column was added:
-- SELECT column_name, data_type, column_default 
-- FROM information_schema.columns 
-- WHERE table_name = 'jobs' AND column_name = 'status';




