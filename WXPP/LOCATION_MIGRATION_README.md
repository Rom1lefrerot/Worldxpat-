# Location Field Migration Guide

This document explains the changes made to add a location ENUM field to the job_offers_pending table.

## 📋 What Was Changed

1. ✅ Created location ENUM type with values: `dubai`, `sharjah`, `remote`
2. ✅ Added/updated location column in `job_offers_pending` table
3. ✅ Removed Abu Dhabi from all frontend dropdowns
4. ✅ Updated insert logic to include location field
5. ✅ Updated display logic to format location (capitalize first letter)
6. ✅ Verified location is included in all SELECT queries
7. ✅ Created RLS policy documentation

---

## 🗄️ Step 1: Database Migration (Supabase)

### Run this SQL in Supabase:

**File:** `supabase_location_migration.sql`

1. Go to your Supabase project dashboard
2. Click on **"SQL Editor"** in the left sidebar
3. Open and paste the contents of `supabase_location_migration.sql`
4. Click **"Run"**

This will:
- Create a `job_location` ENUM type with values: `dubai`, `sharjah`, `remote`
- Add/update the `location` column in `job_offers_pending` table
- Convert existing location values to match ENUM (lowercase)
- Remove any Abu Dhabi references
- Create an index on location for better performance

**Important:** The location values in the database are stored in **lowercase** (`dubai`, `sharjah`, `remote`).

---

## 🔐 Step 2: RLS Policies

### Run this SQL in Supabase:

**File:** `supabase_rls_location_policy.sql`

1. Go to your Supabase project dashboard
2. Click on **"SQL Editor"** in the left sidebar
3. Open and paste the contents of `supabase_rls_location_policy.sql`
4. Click **"Run"**

This verifies that RLS is enabled and that existing policies work with the location field.

**Note:** No additional policies are needed - the location field is automatically included in existing SELECT, INSERT, and UPDATE policies.

---

## 📝 Step 3: Frontend Changes

### Files Updated:

#### 1. `jobs.html`
- ✅ Removed "Abu Dhabi" option from filter dropdown (line ~70)
- ✅ Removed "Abu Dhabi" option from job posting form (line ~230)
- ✅ Changed all location values to lowercase: `dubai`, `sharjah`, `remote`
- ✅ Added location field to company job form with required validation

#### 2. `jobs.js`
- ✅ Updated `handleCompanyJobSubmit()` to:
  - Get location value from form
  - Convert to lowercase to match ENUM
  - Validate location is one of: `dubai`, `sharjah`, `remote`
  - Include location in Supabase insert
- ✅ Updated display logic to capitalize first letter for user display:
  - `dubai` → `Dubai`
  - `sharjah` → `Sharjah`
  - `remote` → `Remote`

#### 3. `admin.html`
- ✅ Already includes location in SELECT query (no changes needed)

---

## 🔄 Data Flow

### Insert Flow:
1. User selects location from dropdown (e.g., "Dubai")
2. Frontend sends lowercase value: `"dubai"`
3. Supabase validates against ENUM type
4. Location is stored as: `dubai`

### Display Flow:
1. Supabase returns location: `"dubai"`
2. Frontend capitalizes first letter: `"Dubai"`
3. User sees: `"Dubai"`

### Filter Flow:
1. User selects filter (e.g., "Dubai")
2. Frontend sends lowercase value: `"dubai"`
3. Filter matches against database values: `"dubai"`

---

## ✅ Verification Checklist

After running the migrations, verify:

- [ ] ENUM type `job_location` exists in Supabase
- [ ] Column `location` exists in `job_offers_pending` table
- [ ] Column type is `job_location` (ENUM)
- [ ] No rows have `location = 'abu dhabi'` or similar
- [ ] New job submissions include location field
- [ ] Location displays correctly on job cards (capitalized)
- [ ] Location filter works correctly
- [ ] RLS policies allow SELECT, INSERT, UPDATE with location field

---

## 🐛 Troubleshooting

### Error: "invalid input value for enum job_location"
- **Cause:** Trying to insert a value that's not in the ENUM
- **Solution:** Make sure frontend sends only: `dubai`, `sharjah`, or `remote` (lowercase)

### Location not showing on job cards
- **Cause:** Location field might be NULL or not included in SELECT
- **Solution:** Verify SELECT query includes `location` field (using `select('*')` includes it)

### Filter not working
- **Cause:** Filter might be using capitalized values
- **Solution:** Make sure filter sends lowercase values to match database

### RLS policy blocking inserts
- **Cause:** Policy might not allow location field
- **Solution:** Verify policies use `WITH CHECK (true)` to allow all fields

---

## 📊 Database Schema

```sql
-- ENUM Type
CREATE TYPE job_location AS ENUM ('dubai', 'sharjah', 'remote');

-- Column in job_offers_pending table
location job_location

-- Index for performance
CREATE INDEX idx_job_offers_pending_location ON job_offers_pending(location);
```

---

## 🔗 Related Files

- `supabase_location_migration.sql` - Main migration script
- `supabase_rls_location_policy.sql` - RLS policy verification
- `jobs.html` - Frontend forms
- `jobs.js` - Frontend logic
- `admin.html` - Admin interface (already includes location)

---

## 📝 Notes

- Location values are stored in **lowercase** in the database
- Frontend displays them with **capitalized first letter**
- The ENUM constraint ensures data integrity
- Abu Dhabi has been completely removed from the system
- All existing location values are converted to match the ENUM




