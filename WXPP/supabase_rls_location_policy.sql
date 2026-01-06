-- ============================================
-- SUPABASE RLS POLICY: Location field policies
-- ============================================
-- 
-- Run this SQL in your Supabase SQL Editor after running the location migration.
-- This ensures that the location field works correctly with RLS policies.
--
-- IMPORTANT: Run supabase_location_migration.sql FIRST before running this file.

-- ============================================
-- VERIFY RLS IS ENABLED
-- ============================================
-- Make sure RLS is enabled on job_offers_pending table
ALTER TABLE job_offers_pending ENABLE ROW LEVEL SECURITY;

-- ============================================
-- EXISTING POLICIES (should already exist)
-- ============================================
-- These policies should already exist from previous setup.
-- If they don't exist, uncomment and run them:

-- Policy: Anonymous users can SELECT approved jobs (includes location field)
-- CREATE POLICY IF NOT EXISTS "Public can view approved jobs"
-- ON job_offers_pending FOR SELECT
-- TO anon
-- USING (status = 'approved');

-- Policy: Anonymous users can INSERT jobs (includes location field)
-- CREATE POLICY IF NOT EXISTS "Public can insert jobs"
-- ON job_offers_pending FOR INSERT
-- TO anon
-- WITH CHECK (true);

-- Policy: Anonymous users can UPDATE jobs (for admin approval workflow)
-- CREATE POLICY IF NOT EXISTS "Allow anon to update jobs status"
-- ON job_offers_pending FOR UPDATE
-- TO anon
-- USING (true)
-- WITH CHECK (true);

-- ============================================
-- NOTES
-- ============================================
--
-- The location field is automatically included in all SELECT, INSERT, and UPDATE operations
-- because the policies use USING (true) and WITH CHECK (true) for anon role.
--
-- The ENUM constraint ensures only valid values (dubai, sharjah, remote) can be inserted.
--
-- No additional policies are needed for the location field specifically.
--
-- ============================================
-- VERIFY POLICIES
-- ============================================
-- To verify your policies are set up correctly, run:
--
-- SELECT 
--   schemaname,
--   tablename,
--   policyname,
--   permissive,
--   roles,
--   cmd,
--   qual,
--   with_check
-- FROM pg_policies 
-- WHERE tablename = 'job_offers_pending';
--
-- You should see policies for SELECT, INSERT, and UPDATE operations.




