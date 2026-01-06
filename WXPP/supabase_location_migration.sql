-- ============================================
-- SUPABASE MIGRATION: Add location ENUM and column
-- ============================================
-- 
-- Run this SQL in your Supabase SQL Editor:
-- 1. Go to your Supabase project dashboard
-- 2. Click on "SQL Editor" in the left sidebar
-- 3. Paste this SQL and click "Run"
--
-- This creates a location ENUM type and adds/updates the location column
-- in the job_offers_pending table with only allowed values: dubai, sharjah, remote

-- Step 1: Create the location ENUM type
DO $$ 
BEGIN
    -- Create ENUM type if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'job_location') THEN
        CREATE TYPE job_location AS ENUM ('dubai', 'sharjah', 'remote');
    END IF;
END $$;

-- Step 2: Add location column to job_offers_pending table if it doesn't exist
-- If it exists, we'll alter it to use the ENUM type
DO $$
BEGIN
    -- Check if column exists
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'job_offers_pending' 
        AND column_name = 'location'
    ) THEN
        -- Column doesn't exist, add it with ENUM type
        ALTER TABLE job_offers_pending 
        ADD COLUMN location job_location;
    ELSE
        -- Column exists, we need to convert it
        -- First, update any existing values to match ENUM values (lowercase)
        UPDATE job_offers_pending 
        SET location = LOWER(TRIM(location))
        WHERE location IS NOT NULL;
        
        -- Update values that don't match ENUM (convert variations)
        UPDATE job_offers_pending 
        SET location = 'dubai' 
        WHERE LOWER(location) IN ('dubai', 'dubaï');
        
        UPDATE job_offers_pending 
        SET location = 'sharjah' 
        WHERE LOWER(location) = 'sharjah';
        
        UPDATE job_offers_pending 
        SET location = 'remote' 
        WHERE LOWER(location) IN ('remote', 'remot', 'work from home', 'wfh');
        
        -- Remove any rows with invalid location values (set to NULL)
        UPDATE job_offers_pending 
        SET location = NULL 
        WHERE location NOT IN ('dubai', 'sharjah', 'remote');
        
        -- Now alter the column to use ENUM type
        -- We need to convert TEXT to ENUM
        ALTER TABLE job_offers_pending 
        ALTER COLUMN location TYPE job_location 
        USING location::text::job_location;
    END IF;
END $$;

-- Step 3: Remove any references to Abu Dhabi from existing data
UPDATE job_offers_pending 
SET location = NULL 
WHERE LOWER(location) LIKE '%abu dhabi%' 
   OR LOWER(location) LIKE '%abudhabi%';

-- Step 4: Create index on location for better query performance
CREATE INDEX IF NOT EXISTS idx_job_offers_pending_location 
ON job_offers_pending(location);

-- Step 5: Verify the column was added/updated correctly
-- Run this query to verify:
-- SELECT column_name, data_type, udt_name 
-- FROM information_schema.columns 
-- WHERE table_name = 'job_offers_pending' 
-- AND column_name = 'location';

-- ============================================
-- NOTES
-- ============================================
-- 
-- The location column now only accepts: 'dubai', 'sharjah', 'remote'
-- 
-- When inserting data, use lowercase values:
--   - 'dubai' (not 'Dubai' or 'DUBAI')
--   - 'sharjah' (not 'Sharjah' or 'SHARJAH')
--   - 'remote' (not 'Remote' or 'REMOTE')
--
-- The frontend should send lowercase values to match the ENUM.




