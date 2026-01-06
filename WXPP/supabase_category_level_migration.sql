-- ============================================
-- SUPABASE MIGRATION: Add category and level ENUMs and columns
-- ============================================
-- 
-- Run this SQL in your Supabase SQL Editor:
-- 1. Go to your Supabase project dashboard
-- 2. Click on "SQL Editor" in the left sidebar
-- 3. Paste this SQL and click "Run"
--
-- This creates category and level ENUM types and adds/updates the columns
-- in the job_offers_pending table with only allowed values.

-- ============================================
-- STEP 1: Create category ENUM type
-- ============================================
DO $$ 
BEGIN
    -- Create ENUM type if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'job_category') THEN
        CREATE TYPE job_category AS ENUM (
            'hospitality_restaurants',
            'sales_retail',
            'real_estate',
            'customer_service_call_center',
            'administration_office',
            'marketing_social_media_content',
            'driver_delivery',
            'it_web_tech',
            'kids_education_babysitting',
            'beauty_fitness_wellness',
            'construction_engineering'
        );
    END IF;
END $$;

-- ============================================
-- STEP 2: Create level ENUM type
-- ============================================
DO $$ 
BEGIN
    -- Create ENUM type if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'job_level') THEN
        CREATE TYPE job_level AS ENUM (
            'Entry level',
            'Mid level (2-5 years)',
            'Senior (5+ years)'
        );
    END IF;
END $$;

-- ============================================
-- STEP 3: Add/Update category column
-- ============================================
DO $$
BEGIN
    -- Check if column exists
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'job_offers_pending' 
        AND column_name = 'category'
    ) THEN
        -- Column doesn't exist, add it with ENUM type
        ALTER TABLE job_offers_pending 
        ADD COLUMN category job_category;
    ELSE
        -- Column exists, we need to convert it
        -- First, update any existing values to match ENUM values
        UPDATE job_offers_pending 
        SET category = LOWER(TRIM(category))
        WHERE category IS NOT NULL;
        
        -- Normalize category values to match ENUM
        UPDATE job_offers_pending 
        SET category = 'hospitality_restaurants' 
        WHERE LOWER(category) IN ('hospitality & restaurants', 'hospitality_restaurants', 'hospitality');
        
        UPDATE job_offers_pending 
        SET category = 'sales_retail' 
        WHERE LOWER(category) IN ('sales & retail', 'sales_retail', 'sales');
        
        UPDATE job_offers_pending 
        SET category = 'real_estate' 
        WHERE LOWER(category) IN ('real estate', 'real_estate');
        
        UPDATE job_offers_pending 
        SET category = 'customer_service_call_center' 
        WHERE LOWER(category) IN ('customer service / call center', 'customer_service_call_center', 'customer service');
        
        UPDATE job_offers_pending 
        SET category = 'administration_office' 
        WHERE LOWER(category) IN ('administration / office', 'administration_office', 'administration');
        
        UPDATE job_offers_pending 
        SET category = 'marketing_social_media_content' 
        WHERE LOWER(category) IN ('marketing / social media / content', 'marketing_social_media_content', 'marketing');
        
        UPDATE job_offers_pending 
        SET category = 'driver_delivery' 
        WHERE LOWER(category) IN ('driver / delivery', 'driver_delivery', 'driver');
        
        UPDATE job_offers_pending 
        SET category = 'it_web_tech' 
        WHERE LOWER(category) IN ('it / web / tech', 'it_web_tech', 'it', 'tech');
        
        UPDATE job_offers_pending 
        SET category = 'kids_education_babysitting' 
        WHERE LOWER(category) IN ('kids / education / babysitting', 'kids_education_babysitting', 'education', 'kids');
        
        UPDATE job_offers_pending 
        SET category = 'beauty_fitness_wellness' 
        WHERE LOWER(category) IN ('beauty / fitness / wellness', 'beauty_fitness_wellness', 'beauty', 'fitness');
        
        UPDATE job_offers_pending 
        SET category = 'construction_engineering' 
        WHERE LOWER(category) IN ('construction / engineering', 'construction_engineering', 'construction', 'engineering');
        
        -- Remove any rows with invalid category values (set to NULL)
        UPDATE job_offers_pending 
        SET category = NULL 
        WHERE category NOT IN (
            'hospitality_restaurants',
            'sales_retail',
            'real_estate',
            'customer_service_call_center',
            'administration_office',
            'marketing_social_media_content',
            'driver_delivery',
            'it_web_tech',
            'kids_education_babysitting',
            'beauty_fitness_wellness',
            'construction_engineering'
        );
        
        -- Now alter the column to use ENUM type
        ALTER TABLE job_offers_pending 
        ALTER COLUMN category TYPE job_category 
        USING category::text::job_category;
    END IF;
END $$;

-- ============================================
-- STEP 4: Add/Update level column
-- ============================================
DO $$
BEGIN
    -- Check if column exists
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'job_offers_pending' 
        AND column_name = 'level'
    ) THEN
        -- Column doesn't exist, add it with ENUM type
        ALTER TABLE job_offers_pending 
        ADD COLUMN level job_level;
        
        -- If experience_required exists, copy its values to level
        IF EXISTS (
            SELECT 1 
            FROM information_schema.columns 
            WHERE table_name = 'job_offers_pending' 
            AND column_name = 'experience_required'
        ) THEN
            UPDATE job_offers_pending 
            SET level = experience_required::text::job_level
            WHERE experience_required IN ('Entry level', 'Mid level (2-5 years)', 'Senior (5+ years)');
        END IF;
    ELSE
        -- Column exists, update values to match ENUM
        UPDATE job_offers_pending 
        SET level = 'Entry level' 
        WHERE LOWER(level) IN ('entry level', 'entry', 'junior');
        
        UPDATE job_offers_pending 
        SET level = 'Mid level (2-5 years)' 
        WHERE LOWER(level) IN ('mid level (2-5 years)', 'mid level', 'mid', 'intermediate');
        
        UPDATE job_offers_pending 
        SET level = 'Senior (5+ years)' 
        WHERE LOWER(level) IN ('senior (5+ years)', 'senior', 'senior level');
        
        -- Remove invalid values
        UPDATE job_offers_pending 
        SET level = NULL 
        WHERE level NOT IN ('Entry level', 'Mid level (2-5 years)', 'Senior (5+ years)');
        
        -- Alter column to use ENUM type
        ALTER TABLE job_offers_pending 
        ALTER COLUMN level TYPE job_level 
        USING level::text::job_level;
    END IF;
END $$;

-- ============================================
-- STEP 5: Create indexes for better performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_job_offers_pending_category 
ON job_offers_pending(category);

CREATE INDEX IF NOT EXISTS idx_job_offers_pending_level 
ON job_offers_pending(level);

-- ============================================
-- STEP 6: Verify the columns were added/updated correctly
-- ============================================
-- Run this query to verify:
-- SELECT column_name, data_type, udt_name 
-- FROM information_schema.columns 
-- WHERE table_name = 'job_offers_pending' 
-- AND column_name IN ('category', 'level');

-- ============================================
-- NOTES
-- ============================================
-- 
-- Category values (stored in database):
--   - hospitality_restaurants
--   - sales_retail
--   - real_estate
--   - customer_service_call_center
--   - administration_office
--   - marketing_social_media_content
--   - driver_delivery
--   - it_web_tech
--   - kids_education_babysitting
--   - beauty_fitness_wellness
--   - construction_engineering
--
-- Level values (stored in database):
--   - Entry level
--   - Mid level (2-5 years)
--   - Senior (5+ years)
--
-- The frontend should send these exact values when inserting jobs.




