-- ============================================
-- SUPABASE RLS POLICY: Allow anon to delete jobs
-- ============================================
-- 
-- This policy allows the anonymous (anon) role to DELETE rows from the jobs table.
-- This is needed for the admin delete workflow where jobs are removed from the database.
--
-- IMPORTANT: This is a permissive policy (allows all deletes). Since your admin
-- page has password protection, this is acceptable for now. For production,
-- consider making the policy more restrictive if needed.

-- Create policy for anon role to DELETE jobs
CREATE POLICY "Allow anon to delete jobs"
ON public.jobs
FOR DELETE
TO anon
USING (true);

-- Optional: Also allow authenticated users to delete (if you have user auth)
-- Uncomment the following if you want authenticated users to also delete jobs:
-- CREATE POLICY "Allow authenticated to delete jobs"
-- ON public.jobs
-- FOR DELETE
-- TO authenticated
-- USING (true);

-- ============================================
-- HOW TO USE THIS SQL
-- ============================================
--
-- 1. Go to your Supabase project dashboard
-- 2. Click on "SQL Editor" in the left sidebar
-- 3. Click "New query" (or use the existing query editor)
-- 4. Paste the SQL above (the CREATE POLICY statement)
-- 5. Click "Run" (or press Ctrl/Cmd + Enter)
--
-- ============================================
-- HOW TO VERIFY THE POLICY IS ACTIVE
-- ============================================
--
-- 1. In Supabase dashboard, go to "Table Editor"
-- 2. Click on the "jobs" table
-- 3. Click on the "Policies" tab (next to "Data", "Structure", etc.)
-- 4. You should see a policy named "Allow anon to delete jobs"
--    with:
--    - Command: DELETE
--    - Roles: anon
--    - USING: true
--
-- ============================================
-- TROUBLESHOOTING
-- ============================================
--
-- If you get an error "policy already exists":
--   - The policy might already exist with a different name
--   - Check the Policies tab to see existing DELETE policies
--   - You may need to DROP the existing policy first, or adjust it
--
-- If deletes still don't work after creating the policy:
--   - Verify RLS is enabled on the jobs table:
--     SELECT tablename, rowsecurity FROM pg_tables 
--     WHERE schemaname = 'public' AND tablename = 'jobs';
--   - If rowsecurity is false, enable it:
--     ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
--
-- ============================================
-- TO DROP THIS POLICY (if needed)
-- ============================================
--
-- DROP POLICY IF EXISTS "Allow anon to delete jobs" ON public.jobs;




