// ============================================
// ADMIN.JS - Supabase Auth Admin Panel
// ============================================

// Configuration Supabase
const SUPABASE_URL = 'https://qkqdbxerbaskmgarxwak.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrcWRieGVyYmFza21nYXJ4d2FrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMjc5NzEsImV4cCI6MjA4MDYwMzk3MX0.1eC8ZmlH7f0vPr5q_V8BNKRNnueLLhnD0RjQTG2klhU';

// Initialize Supabase client with Auth
let supabaseClient = null;

// DOM Elements
let loginScreen, adminInterface, loginForm, loginBtn, logoutBtn;
let loginEmail, loginPassword, loginErrorMessage;
let errorMessage, successMessage;
let pendingRoommatesContainer, publishedRoommatesContainer;
let pendingTab, publishedTab;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Supabase client
  if (typeof window.supabase !== 'undefined') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('[AUTH] Supabase client initialized');
  } else {
    console.error('[AUTH] Supabase library not loaded');
    return;
}

  // Get DOM elements
  loginScreen = document.getElementById('loginScreen');
  adminInterface = document.getElementById('adminInterface');
  loginForm = document.getElementById('loginForm');
  loginBtn = document.getElementById('loginBtn');
  logoutBtn = document.getElementById('logoutBtn');
  loginEmail = document.getElementById('adminEmail');
  loginPassword = document.getElementById('adminPassword');
  loginErrorMessage = document.getElementById('loginErrorMessage');
  errorMessage = document.getElementById('errorMessage');
  successMessage = document.getElementById('successMessage');
  pendingRoommatesContainer = document.getElementById('pendingRoommatesContainer');
  publishedRoommatesContainer = document.getElementById('publishedRoommatesContainer');
  pendingTab = document.getElementById('pendingTab');
  publishedTab = document.getElementById('publishedTab');

  // Check for existing session
  const { data: { session } } = await supabaseClient.auth.getSession();
  
  if (session) {
    console.log('[AUTH] Existing session found');
    showAdminInterface();
    loadAllProfiles();
  } else {
    console.log('[AUTH] No session found, showing login');
    showLoginScreen();
  }

  // Listen for auth state changes
  supabaseClient.auth.onAuthStateChange((event, session) => {
    console.log('[AUTH] Auth state changed:', event);
    if (session) {
      showAdminInterface();
      loadAllProfiles();
    } else {
      showLoginScreen();
    }
  });

  // Event listeners
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  // Tab switching
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      switchTab(tabName);
    });
  });
});

// ============================================
// AUTH FUNCTIONS
// ============================================

async function handleLogin(e) {
  e.preventDefault();
  
  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  if (!email || !password) {
    showLoginError('Please enter both email and password.');
    return;
  }

  // Disable login button
  loginBtn.disabled = true;
  loginBtn.textContent = 'Connecting...';

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });
  
    if (error) {
      console.error('[AUTH] Login error:', error);
      showLoginError(error.message || 'Login failed. Please check your credentials.');
      loginBtn.disabled = false;
      loginBtn.textContent = 'Se connecter';
      return;
    }

    if (data.session) {
      console.log('[AUTH] Login successful');
      showAdminInterface();
      loadAllProfiles();
    }
  } catch (err) {
    console.error('[AUTH] Login exception:', err);
    showLoginError('An unexpected error occurred. Please try again.');
    loginBtn.disabled = false;
    loginBtn.textContent = 'Se connecter';
  }
}

async function handleLogout() {
  try {
    const { error } = await supabaseClient.auth.signOut();
    
    if (error) {
      console.error('[AUTH] Logout error:', error);
      showError('Error logging out. Please try again.');
      return;
    }

    console.log('[AUTH] Logout successful');
    showLoginScreen();
    showSuccess('Logged out successfully.');
  } catch (err) {
    console.error('[AUTH] Logout exception:', err);
    showError('An error occurred during logout.');
  }
}

function showLoginScreen() {
  if (loginScreen) loginScreen.style.display = 'block';
  if (adminInterface) adminInterface.style.display = 'none';
  if (loginEmail) loginEmail.value = '';
  if (loginPassword) loginPassword.value = '';
  if (loginBtn) {
    loginBtn.disabled = false;
    loginBtn.textContent = 'Se connecter';
  }
  hideLoginError();
}

function showAdminInterface() {
  if (loginScreen) loginScreen.style.display = 'none';
  if (adminInterface) adminInterface.style.display = 'block';
}

// ============================================
// PROFILE MANAGEMENT
// ============================================

async function loadAllProfiles() {
  try {
    console.log('[PROFILES] Loading all roommate profiles...');
    
    const { data, error } = await supabaseClient
      .from('roommate_profiles')
      .select('id, photo_url, first_name, age, nationality, languages, budget_min, budget_max, districts, available_from, looking_for, gender_preference, description, whatsapp, status, is_visible, created_at')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('[PROFILES] Error loading profiles:', error);
      showError(`Error loading profiles: ${error.message}`);
      return;
    }

    console.log('[PROFILES] Loaded profiles:', data?.length || 0);

    // Separate into Pending and Published based on status
    // Pending: status = 'pending'
    // Published: status = 'approved' AND is_visible = true
    // Rejected: status = 'rejected' (not displayed)
    const pending = (data || []).filter(p => p.status === 'pending');
    const published = (data || []).filter(p => p.status === 'approved' && p.is_visible === true);

    console.log('[PROFILES] Pending:', pending.length, 'Published:', published.length);

    renderPendingProfiles(pending);
    renderPublishedProfiles(published);

  } catch (err) {
    console.error('[PROFILES] Exception loading profiles:', err);
    showError(`Error loading profiles: ${err.message}`);
  }
}

function renderPendingProfiles(profiles) {
  if (!pendingRoommatesContainer) return;

  if (!profiles || profiles.length === 0) {
    pendingRoommatesContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">✅</div>
        <h2>No pending profiles</h2>
        <p>All profiles have been reviewed.</p>
      </div>
    `;
    return;
    }
    
  pendingRoommatesContainer.innerHTML = `
    <button class="btn refresh-btn" onclick="loadAllProfiles()">🔄 Refresh</button>
    <div class="pending-jobs-list">
      ${profiles.map(profile => renderProfileCard(profile, true)).join('')}
    </div>
  `;
}

function renderPublishedProfiles(profiles) {
  if (!publishedRoommatesContainer) return;

  if (!profiles || profiles.length === 0) {
    publishedRoommatesContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📭</div>
        <h2>No published profiles</h2>
        <p>No profiles are currently published.</p>
      </div>
    `;
    return;
  }

  publishedRoommatesContainer.innerHTML = `
    <button class="btn refresh-btn" onclick="loadAllProfiles()">🔄 Refresh</button>
    <div class="pending-jobs-list">
      ${profiles.map(profile => renderProfileCard(profile, false)).join('')}
    </div>
  `;
}

function renderProfileCard(profile, isPending) {
  const profileId = profile.id;
  const firstName = profile.first_name || 'Unknown';
  const age = profile.age || 'N/A';
  const nationality = profile.nationality || 'Not specified';
  const languages = Array.isArray(profile.languages) ? profile.languages.join(', ') : 'Not specified';
  const budgetMin = profile.budget_min || 0;
  const budgetMax = profile.budget_max || profile.budget_min || 0;
  const budget = budgetMin === budgetMax ? `${budgetMin} AED` : `${budgetMin} - ${budgetMax} AED`;
  const districts = Array.isArray(profile.districts) ? profile.districts.join(', ') : 'Not specified';
  const availabilityDate = formatDate(profile.available_from);
  const searchType = profile.looking_for === 'room' ? 'Looking for a room' : 'Looking for a roommate';
  const genderPreference = profile.gender_preference ? profile.gender_preference.charAt(0).toUpperCase() + profile.gender_preference.slice(1) : 'Not specified';
  const description = profile.description || 'No description';
  const descriptionShort = description.length > 150 ? description.substring(0, 150) + '...' : description;
  const whatsapp = profile.whatsapp || '';
  const photoUrl = profile.photo_url || '';
  const createdAt = formatDate(profile.created_at);

  return `
    <div class="job-item" data-profile-id="${profileId}">
      <div class="job-header">
        <div style="display: flex; gap: 15px; align-items: flex-start;">
          ${photoUrl ? `<img src="${escapeHtml(photoUrl)}" alt="${escapeHtml(firstName)}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; border: 2px solid #e5e7eb;">` : ''}
          <div>
            <div class="job-title">${escapeHtml(firstName)} (${age} ans)</div>
            <div class="job-company">${escapeHtml(nationality)} • ${escapeHtml(languages)}</div>
          </div>
        </div>
        <span class="status-badge">${isPending ? 'Pending' : 'Published'}</span>
      </div>
      <div class="job-details">
        <div class="job-detail-item">💰 Budget: ${escapeHtml(budget)}</div>
        <div class="job-detail-item">📍 Districts: ${escapeHtml(districts)}</div>
        <div class="job-detail-item">📅 Available from: ${escapeHtml(availabilityDate)}</div>
        <div class="job-detail-item">🔍 ${escapeHtml(searchType)}</div>
        <div class="job-detail-item">👥 Gender: ${escapeHtml(genderPreference)}</div>
        <div class="job-detail-item">📱 WhatsApp: ${whatsapp ? `<a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}" target="_blank" style="color: #2563eb; text-decoration: none;">${escapeHtml(whatsapp)}</a>` : 'Not provided'}</div>
        <div class="job-detail-item">📝 Created: ${escapeHtml(createdAt)}</div>
      </div>
      <div class="job-description">
        ${escapeHtml(descriptionShort)}
        ${description.length > 150 ? `<button class="btn-view-more" onclick="showProfileDescription('${profileId}')" style="margin-left: 5px; background: none; border: none; color: #2563eb; cursor: pointer; text-decoration: underline; padding: 0;">Voir plus</button>` : ''}
      </div>
      <div class="job-actions">
        ${isPending ? `
          <button class="btn btn-approve" onclick="approveProfile('${profileId}')">✅ Approve</button>
          <button class="btn btn-delete" onclick="rejectProfile('${profileId}')">❌ Reject</button>
        ` : `
          <button class="btn btn-unpublish" onclick="unpublishProfile('${profileId}')">📤 Unpublish</button>
        `}
      </div>
    </div>
  `;
}

// ============================================
// PROFILE ACTIONS
// ============================================

async function approveProfile(profileId) {
  console.log('[PROFILES] Approving profile:', profileId);

  const profileItem = document.querySelector(`[data-profile-id="${profileId}"]`);
  const button = profileItem ? profileItem.querySelector('.btn-approve') : null;

  if (!button) {
    showError('Could not find profile element.');
    return;
  }

  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = 'Approving...';

  try {
    // Update status to 'approved' AND is_visible to true
    const { data, error } = await supabaseClient
      .from('roommate_profiles')
      .update({ 
        status: 'approved',
        is_visible: true 
      })
      .eq('id', profileId)
      .select('id');
    
    if (error) {
      console.error('[PROFILES] Approve error:', error);
      showError(`Error approving profile: ${error.message}`);
      button.disabled = false;
      button.textContent = originalText;
      return;
    }

    if (!data || data.length === 0) {
      showError('Profile not found or update failed.');
      button.disabled = false;
      button.textContent = originalText;
      return;
    }

    console.log('[PROFILES] Profile approved successfully');
    showSuccess('✅ Profile approved successfully!');

    // Reload all profiles to update lists
    await loadAllProfiles();

  } catch (err) {
    console.error('[PROFILES] Approve exception:', err);
    showError(`Error approving profile: ${err.message}`);
    button.disabled = false;
    button.textContent = originalText;
  }
}

async function rejectProfile(profileId) {
  if (!confirm('Are you sure you want to reject this profile? It will be marked as rejected and hidden.')) {
    return;
  }

  console.log('[PROFILES] Rejecting profile:', profileId);

  const profileItem = document.querySelector(`[data-profile-id="${profileId}"]`);
  const button = profileItem ? profileItem.querySelector('.btn-delete') : null;

  if (!button) {
    showError('Could not find profile element.');
    return;
  }
  
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = 'Rejecting...';

  try {
    // Update status to 'rejected' AND is_visible to false
    const { data, error } = await supabaseClient
      .from('roommate_profiles')
      .update({ 
        status: 'rejected',
        is_visible: false 
      })
      .eq('id', profileId)
      .select('id');
    
    if (error) {
      console.error('[PROFILES] Reject error:', error);
      showError(`Error rejecting profile: ${error.message}`);
      button.disabled = false;
      button.textContent = originalText;
      return;
    }

    if (!data || data.length === 0) {
      showError('Profile not found or update failed.');
      button.disabled = false;
      button.textContent = originalText;
      return;
    }
    
    console.log('[PROFILES] Profile rejected successfully');
    showSuccess('✅ Profile rejected successfully.');

    // Reload all profiles to update lists
    await loadAllProfiles();

  } catch (err) {
    console.error('[PROFILES] Reject exception:', err);
    showError(`Error rejecting profile: ${err.message}`);
    button.disabled = false;
    button.textContent = originalText;
  }
}

async function unpublishProfile(profileId) {
  console.log('[PROFILES] Unpublishing profile:', profileId);

  const profileItem = document.querySelector(`[data-profile-id="${profileId}"]`);
  const button = profileItem ? profileItem.querySelector('.btn-unpublish') : null;

  if (!button) {
    showError('Could not find profile element.');
    return;
  }

  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = 'Unpublishing...';

  try {
    // Update is_visible to false (status remains 'approved')
    const { data, error } = await supabaseClient
      .from('roommate_profiles')
      .update({ 
        is_visible: false 
      })
      .eq('id', profileId)
      .select('id');

    if (error) {
      console.error('[PROFILES] Unpublish error:', error);
      showError(`Error unpublishing profile: ${error.message}`);
      button.disabled = false;
      button.textContent = originalText;
      return;
    }

    if (!data || data.length === 0) {
      showError('Profile not found or update failed.');
      button.disabled = false;
      button.textContent = originalText;
      return;
    }

    console.log('[PROFILES] Profile unpublished successfully');
    showSuccess('✅ Profile unpublished successfully.');

    // Reload all profiles to update lists
    await loadAllProfiles();

  } catch (err) {
    console.error('[PROFILES] Unpublish exception:', err);
    showError(`Error unpublishing profile: ${err.message}`);
    button.disabled = false;
    button.textContent = originalText;
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatDate(dateString) {
  if (!dateString) return 'Not specified';
  try {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
      month: 'long', 
      day: 'numeric' 
  });
  } catch (e) {
    return dateString;
  }
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function switchTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.tab === tabName) {
      tab.classList.add('active');
    }
  });

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });

  if (tabName === 'pending' && pendingTab) {
    pendingTab.classList.add('active');
  } else if (tabName === 'published' && publishedTab) {
    publishedTab.classList.add('active');
  }
}

function showError(message) {
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 5000);
  }
}

function showSuccess(message) {
  if (successMessage) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 3000);
  }
}

function showLoginError(message) {
  if (loginErrorMessage) {
    loginErrorMessage.textContent = message;
    loginErrorMessage.style.display = 'block';
  }
}

function hideLoginError() {
  if (loginErrorMessage) {
    loginErrorMessage.style.display = 'none';
  }
}

// Expose functions globally
window.approveProfile = approveProfile;
window.rejectProfile = rejectProfile;
window.unpublishProfile = unpublishProfile;
window.loadAllProfiles = loadAllProfiles;
window.showProfileDescription = function(profileId) {
  // TODO: Implement modal for full description
  console.log('Show description for profile:', profileId);
};
