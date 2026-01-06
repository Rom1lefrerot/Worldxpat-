# Manual Job Approval Workflow - Implementation Guide

This document explains the manual approval workflow that has been implemented for job posts.

## 📋 What Was Implemented

1. ✅ Added `status` column to Supabase `jobs` table
2. ✅ Updated job submission to set `status = 'pending'`
3. ✅ Updated public jobs listing to only show `status = 'approved'`
4. ✅ Created admin approval page with password protection

---

## 🗄️ Step 1: Database Migration (Supabase)

### Run this SQL in Supabase:

**File:** `supabase_migration.sql`

1. Go to your Supabase project dashboard
2. Click on **"SQL Editor"** in the left sidebar
3. Open and paste the contents of `supabase_migration.sql`
4. Click **"Run"**

This will add a `status` column with default value `'pending'` to your `jobs` table.

**SQL Command:**
```sql
ALTER TABLE jobs 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
```

---

## 📝 Step 2: Updated Files

### 1. `jobs.js` - Job Submission Function

**Location:** Lines 31-45

**What changed:**
- Added `status: 'pending'` to the `formData` object in `submitJobOffer()`
- Updated success message to inform users their job is pending review

**Key change:**
```javascript
const formData = {
  // ... existing fields ...
  status: 'pending' // All new jobs start as 'pending' until admin approval
};
```

### 2. `jobs.js` - Public Jobs Listing Function

**Location:** Lines 193-198

**What changed:**
- Modified `loadJobs()` to filter by `status = 'approved'`
- Only approved jobs will appear on the public page

**Key change:**
```javascript
const { data, error } = await supabaseClient
  .from('jobs')
  .select('*')
  .eq('status', 'approved')  // ⬅️ Only show approved jobs
  .order('created_at', { ascending: false });
```

---

## 🔐 Step 3: Admin Approval Page

### New File: `admin.html`

**Location:** Root of your project

**Features:**
- ✅ Simple password protection (prompt on page load)
- ✅ Lists all jobs with `status = 'pending'`
- ✅ "Approve" button for each job
- ✅ Updates job status to `'approved'` in Supabase
- ✅ Auto-refreshes list after approval
- ✅ Clean, responsive UI

**Configuration:**
1. Open `admin.html`
2. Find these lines (around line 95-96):
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
   ```
3. Replace with your actual Supabase credentials
4. Change the password (line 108):
   ```javascript
   const ADMIN_PASSWORD = "changeme123"; // ⬅️ Change this!
   ```

**Access:**
- Navigate to: `https://yourdomain.com/admin.html`
- Enter the password when prompted
- Approve pending jobs as needed

---

## 🔄 How It Works

### Job Submission Flow:
1. User submits job via public form → `status = 'pending'`
2. Job is saved to Supabase but **NOT visible** on public page
3. Admin logs into `admin.html` and sees pending jobs
4. Admin clicks "Approve" → `status` changes to `'approved'`
5. Job immediately appears on public jobs page (no redeploy needed!)

### Public Jobs Page:
- Only displays jobs where `status = 'approved'`
- Pending jobs are completely hidden from public view

### Admin Page:
- Shows only jobs where `status = 'pending'`
- After approval, job disappears from pending list
- No page refresh needed - updates happen in real-time

---

## 🔒 Security Notes

**Password Protection:**
- The password protection in `admin.html` is **VERY BASIC**
- It only prevents casual access
- Anyone who views the page source can see the password
- **For production:** Consider implementing proper authentication (Supabase Auth, etc.)

**Supabase Security:**
- Make sure your Supabase Row Level Security (RLS) policies allow:
  - Public read access for `status = 'approved'` jobs
  - Public insert access for new jobs (with `status = 'pending'`)
  - Admin update access to change `status` (you may need to use service role key for admin operations, or set up proper RLS policies)

---

## ✅ Testing Checklist

1. **Run SQL migration** in Supabase
2. **Submit a test job** via the public form
3. **Verify** the job does NOT appear on public jobs page
4. **Open** `admin.html` and enter password
5. **Verify** the pending job appears in the list
6. **Click "Approve"** on the test job
7. **Verify** the job now appears on the public jobs page
8. **Verify** the job is removed from pending list

---

## 📁 Files Modified/Created

- ✅ `supabase_migration.sql` (NEW - SQL migration)
- ✅ `jobs.js` (MODIFIED - added status to submission, filtered listing)
- ✅ `admin.html` (NEW - admin approval interface)
- ✅ `APPROVAL_WORKFLOW_README.md` (NEW - this file)

---

## 🚀 Deployment

After making these changes:

1. **Run the SQL migration** in Supabase (one-time setup)
2. **Deploy your updated files** to Vercel:
   - `jobs.js` (updated)
   - `admin.html` (new file)
3. **Configure** `admin.html` with your Supabase credentials
4. **Change** the admin password in `admin.html`
5. **Test** the workflow end-to-end

**Important:** Once deployed, you can approve jobs directly from the admin page without needing to redeploy. Only the data in Supabase changes!

---

## 🆘 Troubleshooting

**Jobs not appearing after approval:**
- Check Supabase to verify `status` was updated to `'approved'`
- Check browser console for errors
- Verify Supabase RLS policies allow reading approved jobs

**Admin page not loading:**
- Verify Supabase URL and anon key are correct
- Check browser console for connection errors
- Ensure password is entered correctly

**Pending jobs not showing:**
- Verify jobs were created with `status = 'pending'`
- Check Supabase table to see actual status values
- Ensure SQL migration was run successfully

---

## 📞 Support

If you encounter any issues, check:
1. Supabase dashboard → Table Editor → `jobs` table → verify `status` column exists
2. Browser console for JavaScript errors
3. Supabase logs for API errors




