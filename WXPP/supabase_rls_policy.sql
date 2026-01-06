-- ============================================
-- SUPABASE RLS POLICY: Allow anon to update jobs status
-- ============================================
-- 
-- This policy allows the anonymous (anon) role to UPDATE rows in the jobs table.
-- This is needed for the admin approval workflow where jobs are updated from
-- 'pending' to 'approved' status.
--
-- IMPORTANT: This is a permissive policy (allows all updates). Since your admin
-- page has password protection, this is acceptable for now. For production,
-- consider making the policy more restrictive (e.g., only allow updating status
-- column, or only for specific status transitions).

-- Create policy for anon role to UPDATE jobs
CREATE POLICY "Allow anon to update jobs status"
ON public.jobs
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);

-- Optional: Also allow authenticated users to update (if you have user auth)
-- Uncomment the following if you want authenticated users to also update jobs:
-- CREATE POLICY "Allow authenticated to update jobs status"
-- ON public.jobs
-- FOR UPDATE
-- TO authenticated
-- USING (true)
-- WITH CHECK (true);

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
-- 4. You should see a policy named "Allow anon to update jobs status"
--    with:
--    - Command: UPDATE
--    - Roles: anon
--    - USING: true
--    - WITH CHECK: true
--
-- ============================================
-- TROUBLESHOOTING
-- ============================================
--
-- If you get an error "policy already exists":
--   - The policy might already exist with a different name
--   - Check the Policies tab to see existing UPDATE policies
--   - You may need to DROP the existing policy first, or adjust it
--
-- If updates still don't work after creating the policy:
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
-- DROP POLICY IF EXISTS "Allow anon to update jobs status" ON public.jobs;




