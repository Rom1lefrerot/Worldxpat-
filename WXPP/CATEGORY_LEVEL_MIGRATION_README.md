# Category and Level Fields Migration Guide

This document explains the changes made to add category and level ENUM fields to the job_offers_pending table.

## 📋 What Was Changed

1. ✅ Created category ENUM type with 11 values
2. ✅ Created level ENUM type with 3 values
3. ✅ Added/updated category and level columns in `job_offers_pending` table
4. ✅ Updated company job form to include category and level fields (required)
5. ✅ Updated main job form to include level field (required)
6. ✅ Updated insert logic to save category and level
7. ✅ Updated filters to work with category and level
8. ✅ Updated modal to display category, location, and level clearly
9. ✅ Added backward compatibility with experience_required field

---

## 🗄️ Step 1: Database Migration (Supabase)

### Run this SQL in Supabase:

**File:** `supabase_category_level_migration.sql`

1. Go to your Supabase project dashboard
2. Click on **"SQL Editor"** in the left sidebar
3. Open and paste the contents of `supabase_category_level_migration.sql`
4. Click **"Run"**

This will:
- Create `job_category` ENUM type with 11 category values
- Create `job_level` ENUM type with 3 level values
- Add/update the `category` column in `job_offers_pending` table
- Add/update the `level` column in `job_offers_pending` table
- Copy existing `experience_required` values to `level` if they match
- Create indexes on category and level for better performance

**Important:** The category values in the database are stored in **snake_case** (e.g., `hospitality_restaurants`), and level values are stored exactly as shown (e.g., `Entry level`).

---

## 📝 Step 2: Frontend Changes

### Files Updated:

#### 1. `jobs.html`
- ✅ Added "Level" field (required) to main job posting form (`offerForm`)
- ✅ Added "Category" field (required) to company job form (`companyJobForm`)
- ✅ Added "Level" field (required) to company job form
- ✅ Both forms now have matching category and level dropdowns

#### 2. `jobs.js`
- ✅ Updated `handleCompanyJobSubmit()` to:
  - Get category and level values from form
  - Validate category and level are selected
  - Include category and level in Supabase insert
  - Also set `experience_required` to level for backward compatibility
- ✅ Updated `applyFilters()` to check both `level` and `experience_required` fields
- ✅ Updated modal display to use `level` field if available, fallback to `experience_required`
- ✅ Updated job card display to use `level` field if available

---

## 🔄 Data Flow

### Insert Flow:
1. User selects category from dropdown (e.g., "Hospitality & Restaurants")
2. Frontend sends snake_case value: `"hospitality_restaurants"`
3. User selects level from dropdown (e.g., "Entry level")
4. Frontend sends exact value: `"Entry level"`
5. Supabase validates against ENUM types
6. Category is stored as: `hospitality_restaurants`
7. Level is stored as: `Entry level`
8. Experience_required is also set to level for backward compatibility

### Display Flow:
1. Supabase returns category: `"hospitality_restaurants"`
2. Frontend formats for display: `"Hospitality & Restaurants"`
3. Supabase returns level: `"Entry level"`
4. Frontend displays: `"Entry level"`

### Filter Flow:
1. User selects filter (e.g., "Entry level")
2. Frontend sends exact value: `"Entry level"`
3. Filter matches against both `level` and `experience_required` fields
4. Jobs with matching level are shown

---

## ✅ Verification Checklist

After running the migrations, verify:

- [ ] ENUM types `job_category` and `job_level` exist in Supabase
- [ ] Columns `category` and `level` exist in `job_offers_pending` table
- [ ] Column types are ENUM (not TEXT)
- [ ] New job submissions include category and level fields
- [ ] Category and level display correctly on job cards
- [ ] Category and level display correctly in job detail modal
- [ ] Filters work correctly with category and level
- [ ] RLS policies allow SELECT, INSERT, UPDATE with category and level fields

---

## 🐛 Troubleshooting

### Error: "invalid input value for enum job_category"
- **Cause:** Trying to insert a category value that's not in the ENUM
- **Solution:** Make sure frontend sends only valid category values (snake_case)

### Error: "invalid input value for enum job_level"
- **Cause:** Trying to insert a level value that's not in the ENUM
- **Solution:** Make sure frontend sends only: `Entry level`, `Mid level (2-5 years)`, or `Senior (5+ years)` (exact match)

### Category/Level not showing on job cards
- **Cause:** Field might be NULL or not included in SELECT
- **Solution:** Verify SELECT query includes `category` and `level` fields (using `select('*')` includes them)

### Filter not working
- **Cause:** Filter might be using wrong field name or value format
- **Solution:** Verify filter checks both `level` and `experience_required` fields, and uses exact value matching

---

## 📊 Database Schema

```sql
-- ENUM Types
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

CREATE TYPE job_level AS ENUM (
    'Entry level',
    'Mid level (2-5 years)',
    'Senior (5+ years)'
);

-- Columns in job_offers_pending table
category job_category
level job_level

-- Indexes for performance
CREATE INDEX idx_job_offers_pending_category ON job_offers_pending(category);
CREATE INDEX idx_job_offers_pending_level ON job_offers_pending(level);
```

---

## 🔗 Related Files

- `supabase_category_level_migration.sql` - Main migration script
- `jobs.html` - Frontend forms
- `jobs.js` - Frontend logic and filtering
- `admin.html` - Admin interface (should already work with new fields)

---

## 📝 Notes

- Category values are stored in **snake_case** in the database
- Level values are stored **exactly** as shown (with capitalization and parentheses)
- The `experience_required` field is still populated for backward compatibility
- Filters check both `level` and `experience_required` fields
- Display logic uses `level` if available, falls back to `experience_required`




