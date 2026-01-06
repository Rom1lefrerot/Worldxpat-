// ============================================
// ROOMMATE FINDER - COLOCATION PAGE
// ============================================

console.log('colocation.js loaded');

// ============================================
// CONSTANTS
// ============================================

const STORAGE_BUCKET = 'roommate-photos';
const MIN_DESCRIPTION_LENGTH = 80; // Minimum 80 characters required (DB constraint)
const MAX_DESCRIPTION_LENGTH = 500;
const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Generate UUID v4 (client-side)
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Liste complète des nationalités
const ALL_NATIONALITIES = [
  'Afghan', 'Albanian', 'Algerian', 'Argentine', 'Australian', 'Austrian',
  'Bangladeshi', 'Belgian', 'Brazilian', 'British', 'Bulgarian', 'Burmese',
  'Canadian', 'Chilean', 'Chinese', 'Colombian', 'Croatian', 'Czech',
  'Danish', 'Dutch',
  'Egyptian', 'Emirati', 'Estonian', 'Ethiopian',
  'Filipino', 'Finnish', 'French',
  'German', 'Ghanaian', 'Greek',
  'Hungarian',
  'Indian', 'Indonesian', 'Iranian', 'Iraqi', 'Irish', 'Israeli', 'Italian',
  'Japanese', 'Jordanian',
  'Kenyan', 'Korean', 'Kuwaiti',
  'Lebanese', 'Libyan',
  'Malaysian', 'Maltese', 'Mexican', 'Moroccan',
  'Nepalese', 'New Zealander', 'Nigerian', 'Norwegian',
  'Omani', 'Pakistani', 'Palestinian', 'Peruvian', 'Polish', 'Portuguese',
  'Qatari', 'Romanian', 'Russian',
  'Saudi', 'Serbian', 'Singaporean', 'Slovak', 'Slovenian', 'South African', 'Spanish', 'Sri Lankan', 'Sudanese', 'Swedish', 'Swiss', 'Syrian',
  'Taiwanese', 'Tanzanian', 'Thai', 'Tunisian', 'Turkish',
  'Ukrainian',
  'Venezuelan', 'Vietnamese',
  'Yemeni',
  'Zimbabwean'
].sort();

// ============================================
// DOM ELEMENTS
// ============================================

const colocationCards = document.getElementById('colocationCards');
const colocationEmpty = document.getElementById('colocationEmpty');
const filterBtn = document.getElementById('filterBtn');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const createProfileBtn = document.getElementById('createProfileBtn');
const profileModal = document.getElementById('profileModal');
const profileDetailsModal = document.getElementById('profileDetailsModal');
const closeModal = document.getElementById('closeModal');
const closeDetailsModal = document.getElementById('closeDetailsModal');
const cancelBtn = document.getElementById('cancelBtn');
const profileForm = document.getElementById('profileForm');
const successMessage = document.getElementById('successMessage');

// Filter inputs
const filterBudgetMin = document.getElementById('filterBudgetMin');
const filterBudgetMax = document.getElementById('filterBudgetMax');
const filterDistrictsContent = document.getElementById('filterDistricts');
const filterGender = document.getElementById('filterGender');
const filterNationality = document.getElementById('filterNationality');
const filterNationalityToggle = document.getElementById('filterNationalityToggle');
const filterNationalityText = document.getElementById('filterNationalityText');
const nationalityList = document.getElementById('nationalityList');
const nationalitySearchInput = document.getElementById('nationalitySearchInput');

// Form elements
const profilePhoto = document.getElementById('profilePhoto');
const photoPreview = document.getElementById('photoPreview');
const photoPreviewContainer = document.getElementById('photoPreviewContainer');
const photoUploadLabel = document.getElementById('photoUploadLabel');
const removePhoto = document.getElementById('removePhoto');

// Crop elements
const photoCropModal = document.getElementById('photoCropModal');
const cropModalTitle = document.getElementById('cropModalTitle');
const cropPreviewMode = document.getElementById('cropPreviewMode');
const cropAdjustMode = document.getElementById('cropAdjustMode');
const cropPreview = document.getElementById('cropPreview');
const cropImage = document.getElementById('cropImage');
const cropArea = document.getElementById('cropArea');
const cropZoom = document.getElementById('cropZoom');
const usePhotoBtn = document.getElementById('usePhotoBtn');
const adjustCropBtn = document.getElementById('adjustCropBtn');
const saveAdjustBtn = document.getElementById('saveAdjustBtn');
const cancelAdjustBtn = document.getElementById('cancelAdjustBtn');
const closeCropModal = document.getElementById('closeCropModal');
const profileFirstName = document.getElementById('profileFirstName');
const profileAge = document.getElementById('profileAge');
const profileNationality = document.getElementById('profileNationality');
const profileLanguages = document.getElementById('profileLanguages');
const profileBudget = document.getElementById('profileBudget');
const profileDistricts = document.getElementById('profileDistricts');
const profileDistrictsToggle = document.getElementById('profileDistrictsToggle');
const profileDistrictsText = document.getElementById('profileDistrictsText');
const profileAvailabilityDate = document.getElementById('profileAvailabilityDate');
const profileGender = document.getElementById('profileGender');
const profileDescription = document.getElementById('profileDescription');
const charCount = document.getElementById('charCount');
const profileWhatsApp = document.getElementById('profileWhatsApp');
const submitBtn = document.getElementById('submitBtn');
const formSuccessMessage = document.getElementById('formSuccessMessage');

// ============================================
// DATA
// ============================================

let allProfiles = [];
let filteredProfiles = [];
let selectedPhotoFile = null;
let originalPhotoFile = null; // Original file before crop
let isPhotoCropped = false; // Track if photo has been cropped

// ============================================
// SUPABASE - LOAD PROFILES
// ============================================

/**
 * Load roommate profiles from Supabase
 * Only loads profiles where is_visible = true
 */
async function loadProfiles() {
  try {
    console.log('Loading roommate profiles from Supabase...');
    
    // Wait for Supabase client
    let retries = 10;
    while ((!window.supabase || !window.supabaseClient) && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
      retries--;
    }
    
    if (!window.supabase || !window.supabaseClient) {
      console.error('Supabase client not available after waiting');
      return;
    }
    
    // Load only visible profiles (is_visible = true)
    const { data, error } = await window.supabaseClient
      .from('roommate_profiles')
      .select('*')
      .eq('is_visible', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error loading profiles:', error);
      showError('Failed to load profiles. Please refresh the page.');
      return;
    }
    
    console.log('Profiles loaded:', data?.length || 0);
    allProfiles = data || [];
    filteredProfiles = [...allProfiles];
    
    // Populate nationality filter dropdown
    populateNationalityFilter();
    
    renderCards();
  } catch (err) {
    console.error('Error in loadProfiles:', err);
    showError('An error occurred while loading profiles.');
  }
}

// ============================================
// RENDER CARDS
// ============================================

/**
 * Render all roommate profile cards
 */
function renderCards() {
  if (!colocationCards) return;
  
  if (filteredProfiles.length === 0) {
    colocationCards.style.display = 'none';
    if (colocationEmpty) colocationEmpty.style.display = 'block';
    return;
  }
  
  colocationCards.style.display = 'grid';
  if (colocationEmpty) colocationEmpty.style.display = 'none';
  
  colocationCards.innerHTML = filteredProfiles.map((profile, index) => {
    const firstName = profile.first_name || 'Anonymous';
    const age = profile.age || '';
    const nationality = profile.nationality || '';
    const languages = Array.isArray(profile.languages) ? profile.languages : [];
    // Read budget (use budget_min or calculate range if both exist)
    const budgetMin = profile.budget_min || 0;
    const budgetMax = profile.budget_max || profile.budget_min || 0;
    const budget = budgetMin === budgetMax ? `${budgetMin} AED` : `${budgetMin} - ${budgetMax} AED`;
    const districts = Array.isArray(profile.districts) ? profile.districts : [];
    const availabilityDate = profile.available_from || '';
    const searchType = profile.looking_for || '';
    const gender = profile.gender_preference || '';
    const description = profile.description || '';
    const whatsapp = profile.whatsapp || '';
    const photoUrl = profile.photo_url || '';
    
    // Format availability date
    const formattedDate = availabilityDate ? formatDate(availabilityDate) : 'Not specified';
    
    // Format search type (looking_for can be 'room' or 'roommate')
    const searchTypeLabel = searchType === 'room' 
      ? 'Looking for a room' 
      : 'Looking for a roommate';
    
    // Truncate description
    const shortDescription = description.length > 150 
      ? description.substring(0, 150) + '...' 
      : description;
    
    // Photo or placeholder
    const displayPhoto = photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}&background=2563eb&color=fff&size=200`;
    
    return `
    <div class="colocation-card" style="animation-delay: ${index * 0.1}s;" data-profile-id="${profile.id}">
      <div class="colocation-card-image">
        <img src="${escapeHtml(displayPhoto)}" alt="${escapeHtml(firstName)}" loading="lazy" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}&background=2563eb&color=fff&size=200'">
      </div>
      <div class="colocation-card-body">
        <div class="colocation-card-header">
          <div class="colocation-card-info">
            <h3 class="colocation-card-name">${escapeHtml(firstName)}${age ? `, ${age}` : ''}</h3>
            ${nationality ? `<p class="colocation-card-meta">${escapeHtml(nationality)}</p>` : ''}
          </div>
        </div>
        <div class="colocation-card-badges">
          ${languages.length > 0 ? `<span class="colocation-badge">
            <span class="colocation-badge-icon">🗣️</span>
            <span>${escapeHtml(languages.slice(0, 2).join(', '))}${languages.length > 2 ? '...' : ''}</span>
          </span>` : ''}
          <span class="colocation-badge">
            <span class="colocation-badge-icon">💰</span>
            <span>${budget.toLocaleString()} AED</span>
          </span>
          ${districts.length > 0 ? `<span class="colocation-badge">
            <span class="colocation-badge-icon">📍</span>
            <span>${escapeHtml(districts.slice(0, 2).join(', '))}${districts.length > 2 ? '...' : ''}</span>
          </span>` : ''}
          <span class="colocation-badge badge-search-type">
            <span class="colocation-badge-icon">${searchType === 'looking_for_room' ? '🏠' : '👥'}</span>
            <span>${escapeHtml(searchTypeLabel)}</span>
          </span>
          <span class="colocation-badge">
            <span class="colocation-badge-icon">${getGenderIcon(gender)}</span>
            <span>${escapeHtml(gender)}</span>
          </span>
        </div>
        <p class="colocation-card-description">${escapeHtml(shortDescription)}</p>
        ${description.length > 150 ? `<button class="btn-read-more" data-profile-id="${profile.id}">Read more</button>` : ''}
        <div class="colocation-card-footer-info">
          <span class="colocation-card-availability">Available: ${escapeHtml(formattedDate)}</span>
        </div>
      </div>
      <div class="colocation-card-footer">
        <button class="btn-whatsapp-coloc" onclick="contactViaWhatsApp('${escapeHtml(whatsapp)}', '${escapeHtml(firstName)}')">
          Contact via WhatsApp
        </button>
      </div>
    </div>
  `;
  }).join('');
  
  // Attach click listeners
  attachCardListeners();
}

/**
 * Normalize gender strings to a canonical form.
 * Examples:
 *  "Female", " female ", "FEMALE", "woman", "f" -> "female"
 *  "Male", " male ", "M", "man" -> "male"
 *  "Mixed", "mixte" -> "mixed"
 */
function normalizeGender(value) {
  if (!value) return '';
  const v = value.toString().trim().toLowerCase();
  
  if (['male', 'm', 'man', 'homme'].includes(v)) return 'male';
  if (['female', 'f', 'woman', 'femme'].includes(v)) return 'female';
  if (['mixed', 'mixte'].includes(v)) return 'mixed';
  
  return v;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  if (typeof text === 'object') return JSON.stringify(text);
  const div = document.createElement('div');
  div.textContent = String(text);
  return div.innerHTML;
}

/**
 * Format date string
 */
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (e) {
    return dateString;
  }
}

/**
 * Get gender icon
 */
function getGenderIcon(gender) {
  switch(gender) {
    case 'Male':
      return '👨';
    case 'Female':
      return '👩';
    case 'Mixed':
      return '👥';
    default:
      return '👤';
  }
}

/**
 * Attach click listeners to cards
 */
function attachCardListeners() {
  // Read more buttons
  const readMoreButtons = document.querySelectorAll('.btn-read-more');
  readMoreButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const profileId = btn.getAttribute('data-profile-id');
      const profile = filteredProfiles.find(p => p.id === profileId);
      if (profile) {
        openProfileDetailsModal(profile);
      }
    });
  });
  
  // Card click (open details)
  const cards = document.querySelectorAll('.colocation-card');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking on button
      if (e.target.closest('.btn-whatsapp-coloc') || e.target.closest('.btn-read-more')) return;
      
      const profileId = card.getAttribute('data-profile-id');
      const profile = filteredProfiles.find(p => p.id === profileId);
      if (profile) {
        openProfileDetailsModal(profile);
      }
    });
  });
}

// ============================================
// PROFILE DETAILS MODAL
// ============================================

/**
 * Open profile details modal
 */
function openProfileDetailsModal(profile) {
  if (!profileDetailsModal || !profile) return;
  
  const firstName = profile.first_name || 'Anonymous';
  const age = profile.age || '';
  const nationality = profile.nationality || '';
  const languages = Array.isArray(profile.languages) ? profile.languages : [];
  // Read budget (use budget_min or calculate range if both exist)
  const budgetMin = profile.budget_min || 0;
  const budgetMax = profile.budget_max || profile.budget_min || 0;
  const budget = budgetMin === budgetMax ? `${budgetMin} AED` : `${budgetMin} - ${budgetMax} AED`;
  const districts = Array.isArray(profile.districts) ? profile.districts : [];
  const availabilityDate = profile.available_from || '';
  const searchType = profile.looking_for || '';
  const gender = profile.gender_preference || '';
  const description = profile.description || '';
  const whatsapp = profile.whatsapp || '';
  const photoUrl = profile.photo_url || '';
  const createdAt = profile.created_at || '';
  const lastActivity = profile.last_activity || '';
  
  const searchTypeLabel = searchType === 'room' 
    ? 'Looking for a room' 
    : 'Looking for a roommate to rent together';
  
  const formattedDate = availabilityDate ? formatDate(availabilityDate) : 'Not specified';
  const formattedCreatedAt = createdAt ? formatDate(createdAt) : '';
  const formattedLastActivity = lastActivity ? formatDate(lastActivity) : '';
  
  const displayPhoto = photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}&background=2563eb&color=fff&size=200`;
  
  const detailsContent = document.getElementById('profileDetailsContent');
  if (detailsContent) {
    detailsContent.innerHTML = `
      <div class="profile-details-header">
        <img src="${escapeHtml(displayPhoto)}" alt="${escapeHtml(firstName)}" class="profile-details-photo" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}&background=2563eb&color=fff&size=200'">
        <div class="profile-details-header-info">
          <h3>${escapeHtml(firstName)}${age ? `, ${age}` : ''}</h3>
          ${nationality ? `<p class="profile-details-nationality">${escapeHtml(nationality)}</p>` : ''}
        </div>
      </div>
      
      <div class="profile-details-section">
        <h4>About</h4>
        <p class="profile-details-description">${escapeHtml(description)}</p>
      </div>
      
      <div class="profile-details-grid">
        <div class="profile-details-item">
          <span class="profile-details-label">Languages:</span>
          <span class="profile-details-value">${languages.length > 0 ? escapeHtml(languages.join(', ')) : 'Not specified'}</span>
        </div>
        <div class="profile-details-item">
          <span class="profile-details-label">Budget:</span>
          <span class="profile-details-value">${budget.toLocaleString()} AED/month</span>
        </div>
        <div class="profile-details-item">
          <span class="profile-details-label">Preferred Districts:</span>
          <span class="profile-details-value">${districts.length > 0 ? escapeHtml(districts.join(', ')) : 'Not specified'}</span>
        </div>
        <div class="profile-details-item">
          <span class="profile-details-label">Availability:</span>
          <span class="profile-details-value">${escapeHtml(formattedDate)}</span>
        </div>
        <div class="profile-details-item">
          <span class="profile-details-label">Looking for:</span>
          <span class="profile-details-value">${escapeHtml(searchTypeLabel)}</span>
        </div>
        <div class="profile-details-item">
          <span class="profile-details-label">Gender Preference:</span>
          <span class="profile-details-value">${escapeHtml(gender)}</span>
        </div>
      </div>
      
      ${formattedCreatedAt ? `<div class="profile-details-meta">
        <small>Profile created: ${escapeHtml(formattedCreatedAt)}</small>
        ${formattedLastActivity ? `<small>Last activity: ${escapeHtml(formattedLastActivity)}</small>` : ''}
      </div>` : ''}
      
      <div class="profile-details-actions">
        <button class="btn-whatsapp-coloc btn-whatsapp-full" onclick="contactViaWhatsApp('${escapeHtml(whatsapp)}', '${escapeHtml(firstName)}')">
          Contact via WhatsApp
        </button>
      </div>
    `;
  }
  
  profileDetailsModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

/**
 * Close profile details modal
 */
function closeProfileDetailsModal() {
  if (profileDetailsModal) {
    profileDetailsModal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// ============================================
// PHOTO UPLOAD
// ============================================

/**
 * Handle photo file selection
 */
if (profilePhoto) {
  profilePhoto.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      showError('Please select a valid image file.');
      profilePhoto.value = '';
    return;
  }
  
    // Validate file size
    if (file.size > MAX_PHOTO_SIZE) {
      showError('Photo size must be less than 5MB.');
      profilePhoto.value = '';
      return;
    }
    
    // Store original file and open crop modal
    originalPhotoFile = file;
    isPhotoCropped = false;
    openCropModal(file);
  });
}

// ============================================
// PHOTO CROP FUNCTIONALITY
// ============================================

let cropState = {
  scale: 1,
  x: 0,
  y: 0,
  isDragging: false,
  startX: 0,
  startY: 0,
  animationFrame: null
};

/**
 * Open crop modal with automatic crop
 */
function openCropModal(file) {
  if (!photoCropModal || !cropPreview) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      // Auto-crop: generate square crop automatically (centered, filled)
      const croppedDataUrl = autoCropImage(img);
      
      // Show preview mode with auto-cropped image
      cropPreview.src = croppedDataUrl;
      cropImage.src = e.target.result; // Keep original for adjust mode
      
      // Reset crop state for adjust mode
      cropState.scale = 1;
      cropState.x = 0;
      cropState.y = 0;
      if (cropZoom) cropZoom.value = 1;
      
      // Show preview mode, hide adjust mode
      if (cropPreviewMode) cropPreviewMode.style.display = 'block';
      if (cropAdjustMode) cropAdjustMode.style.display = 'none';
      if (cropModalTitle) cropModalTitle.textContent = 'Photo ready ✅';
      
      // Store auto-cropped image as current (but don't mark as confirmed yet)
      dataURLtoFile(croppedDataUrl, file.name, file.type).then(croppedFile => {
        selectedPhotoFile = croppedFile;
        // Don't set isPhotoCropped = true yet - wait for "Use this photo" click
        isPhotoCropped = false;
        updateSubmitButtonState();
      });
      
      photoCropModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

/**
 * Auto-crop image to square (1:1) - centered, filled, no whitespace
 * High quality output (1200x1200 for sharp profile photos)
 */
function autoCropImage(img) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // High resolution output for sharp photos (1200x1200)
  const outputSize = 1200;
  canvas.width = outputSize;
  canvas.height = outputSize;
  
  // Use high-quality image interpolation
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  const imgWidth = img.width;
  const imgHeight = img.height;
  const imgAspect = imgWidth / imgHeight;
  
  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = imgWidth;
  let sourceHeight = imgHeight;
  
  // Calculate crop to fill square (no whitespace)
  if (imgAspect > 1) {
    // Landscape: crop width to match height
    sourceWidth = imgHeight;
    sourceX = (imgWidth - sourceWidth) / 2; // Center horizontally
  } else {
    // Portrait or square: crop height to match width
    sourceHeight = imgWidth;
    sourceY = (imgHeight - sourceHeight) / 2; // Center vertically
  }
  
  // Draw cropped image (fills entire square) with high quality
  ctx.drawImage(
    img,
    sourceX, sourceY, sourceWidth, sourceHeight,
    0, 0, outputSize, outputSize
  );
  
  return canvas.toDataURL('image/jpeg', 0.95);
}

/**
 * Convert data URL to File
 */
function dataURLtoFile(dataUrl, filename, mimeType) {
  return new Promise((resolve) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], filename, { type: mimeType || mime });
    resolve(file);
  });
}

/**
 * Initialize adjust mode (when user clicks "Adjust")
 */
function initializeAdjustMode() {
  if (!cropImage || !cropArea) return;
  
  setTimeout(() => {
    const img = cropImage;
    const area = cropArea;
    const areaRect = area.getBoundingClientRect();
    const cropSize = 300; // Square size
    
    // Calculate image display size to fill crop area (maintaining aspect ratio)
    // We want the image to be significantly larger than the crop area so user can drag/zoom freely
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const minSize = cropSize * 1.5; // 50% larger minimum for more movement freedom
    
    let displayWidth, displayHeight;
    if (imgAspect > 1) {
      // Landscape: fit height, width will be larger
      displayHeight = minSize;
      displayWidth = minSize * imgAspect;
    } else {
      // Portrait or square: fit width, height will be larger
      displayWidth = minSize;
      displayHeight = minSize / imgAspect;
    }
    
    // Center image initially (so center of image aligns with center of crop area)
    cropState.x = 0;
    cropState.y = 0;
    cropState.scale = 1;
    
    // Set image size
    img.style.width = displayWidth + 'px';
    img.style.height = displayHeight + 'px';
    
    updateCropImage();
  }, 100);
}

/**
 * Update crop image transform (optimized for smooth rendering with GPU acceleration)
 * Image is centered at (50%, 50%) and we apply translate + scale from center
 */
function updateCropImage() {
  if (!cropImage) return;
  
  // Use transform3d for GPU acceleration (smoother on mobile)
  // First translate to center (-50%, -50%), then apply user drag (x, y), then scale
  const transform = `translate3d(calc(-50% + ${cropState.x}px), calc(-50% + ${cropState.y}px), 0) scale(${cropState.scale})`;
  cropImage.style.transform = transform;
}

/**
 * Get crop area bounds for limiting drag (prevent whitespace)
 * Must be accessible from both drag and zoom handlers
 * 
 * Coordinate system: x and y are offsets from crop center
 * When x=0, y=0: image center aligns with crop center
 */
function getCropBounds() {
  if (!cropArea || !cropImage) return null;
  
  const cropSize = 300; // Square crop size
  
  // Get base image dimensions (before transform)
  const baseWidth = parseFloat(cropImage.style.width) || cropImage.offsetWidth;
  const baseHeight = parseFloat(cropImage.style.height) || cropImage.offsetHeight;
  
  // Calculate the scaled image dimensions
  const scaledWidth = baseWidth * cropState.scale;
  const scaledHeight = baseHeight * cropState.scale;
  
  // Calculate bounds to ensure the crop area is always filled (no whitespace)
  // Image is centered at (0, 0) by default, and can be moved by (x, y)
  // Image bounds: from (-scaledWidth/2 + x, -scaledHeight/2 + y) 
  //               to (scaledWidth/2 + x, scaledHeight/2 + y)
  // Crop area: from (-cropSize/2, -cropSize/2) to (cropSize/2, cropSize/2)
  // 
  // To ensure crop is filled (no whitespace):
  // Left edge: -scaledWidth/2 + x <= -cropSize/2  => x <= scaledWidth/2 - cropSize/2
  // Right edge: scaledWidth/2 + x >= cropSize/2   => x >= cropSize/2 - scaledWidth/2
  // Top edge: -scaledHeight/2 + y <= -cropSize/2 => y <= scaledHeight/2 - cropSize/2
  // Bottom edge: scaledHeight/2 + y >= cropSize/2 => y >= cropSize/2 - scaledHeight/2
  
  const minX = (cropSize / 2) - (scaledWidth / 2);
  const maxX = (scaledWidth / 2) - (cropSize / 2);
  const minY = (cropSize / 2) - (scaledHeight / 2);
  const maxY = (scaledHeight / 2) - (cropSize / 2);
  
  return { minX, maxX, minY, maxY };
}

/**
 * Handle zoom change (with bounds checking)
 */
if (cropZoom) {
  cropZoom.addEventListener('input', (e) => {
    const newScale = parseFloat(e.target.value);
    cropState.scale = newScale;
    
    // Re-apply bounds after scale change to prevent whitespace
    const bounds = getCropBounds();
    if (bounds) {
      // Only clamp if bounds are valid (min < max)
      if (bounds.minX < bounds.maxX) {
        cropState.x = Math.max(bounds.minX, Math.min(bounds.maxX, cropState.x));
      }
      if (bounds.minY < bounds.maxY) {
        cropState.y = Math.max(bounds.minY, Math.min(bounds.maxY, cropState.y));
      }
    }
    
    updateCropImage();
  });
}

/**
 * Handle image dragging with Pointer Events (unified mouse + touch)
 * Ultra smooth with requestAnimationFrame
 */
if (cropImage) {
  // Set cursor styles
  cropImage.style.cursor = 'grab';
  cropImage.style.touchAction = 'none'; // Prevent scroll/zoom during drag
  
  // Smooth update function using requestAnimationFrame
  function smoothUpdateCropImage() {
    if (cropState.animationFrame) {
      cancelAnimationFrame(cropState.animationFrame);
    }
    
    cropState.animationFrame = requestAnimationFrame(() => {
      const bounds = getCropBounds();
      if (bounds) {
        // Clamp position to prevent whitespace
        // Only clamp if bounds are valid (min < max)
        if (bounds.minX < bounds.maxX) {
          cropState.x = Math.max(bounds.minX, Math.min(bounds.maxX, cropState.x));
        }
        if (bounds.minY < bounds.maxY) {
          cropState.y = Math.max(bounds.minY, Math.min(bounds.maxY, cropState.y));
        }
      }
      updateCropImage();
      cropState.animationFrame = null;
    });
  }
  
  // Pointer Events (unified mouse + touch)
  cropImage.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    cropImage.setPointerCapture(e.pointerId);
    
    cropState.isDragging = true;
    cropState.startX = e.clientX - cropState.x;
    cropState.startY = e.clientY - cropState.y;
    cropImage.style.cursor = 'grabbing';
  });
  
  cropImage.addEventListener('pointermove', (e) => {
    if (!cropState.isDragging) return;
    e.preventDefault();
    
    // Update position
    cropState.x = e.clientX - cropState.startX;
    cropState.y = e.clientY - cropState.startY;
    
    // Smooth update
    smoothUpdateCropImage();
  });
  
  cropImage.addEventListener('pointerup', (e) => {
    e.preventDefault();
    cropImage.releasePointerCapture(e.pointerId);
    
    cropState.isDragging = false;
    cropImage.style.cursor = 'grab';
    
    if (cropState.animationFrame) {
      cancelAnimationFrame(cropState.animationFrame);
      cropState.animationFrame = null;
    }
  });
  
  cropImage.addEventListener('pointercancel', (e) => {
    e.preventDefault();
    cropImage.releasePointerCapture(e.pointerId);
    
    cropState.isDragging = false;
    cropImage.style.cursor = 'grab';
    
    if (cropState.animationFrame) {
      cancelAnimationFrame(cropState.animationFrame);
      cropState.animationFrame = null;
    }
  });
}

/**
 * Use photo button (from preview mode)
 */
if (usePhotoBtn) {
  usePhotoBtn.addEventListener('click', () => {
    // Confirm photo: mark as cropped and update preview
    isPhotoCropped = true;
    
    if (photoPreview) {
      photoPreview.src = cropPreview.src;
    }
    if (photoPreviewContainer) {
      photoPreviewContainer.style.display = 'block';
    }
    if (photoUploadLabel) {
      photoUploadLabel.style.display = 'none';
    }
    closeCropModalFunc();
    updateSubmitButtonState();
  });
}

/**
 * Adjust button (switch to adjust mode)
 */
if (adjustCropBtn) {
  adjustCropBtn.addEventListener('click', () => {
    // Switch to adjust mode
    if (cropPreviewMode) cropPreviewMode.style.display = 'none';
    if (cropAdjustMode) cropAdjustMode.style.display = 'block';
    if (cropModalTitle) cropModalTitle.textContent = 'Adjust your photo';
    
    // Initialize adjust mode
    initializeAdjustMode();
  });
}

/**
 * Save adjust button (from adjust mode)
 */
if (saveAdjustBtn) {
  saveAdjustBtn.addEventListener('click', () => {
    generateCroppedImage();
  });
}

/**
 * Cancel adjust button (back to preview)
 */
if (cancelAdjustBtn) {
  cancelAdjustBtn.addEventListener('click', () => {
    // Switch back to preview mode
    if (cropPreviewMode) cropPreviewMode.style.display = 'block';
    if (cropAdjustMode) cropAdjustMode.style.display = 'none';
    if (cropModalTitle) cropModalTitle.textContent = 'Photo ready ✅';
    
    // Reset to auto-cropped version
    if (cropImage && originalPhotoFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const croppedDataUrl = autoCropImage(img);
          cropPreview.src = croppedDataUrl;
          dataURLtoFile(croppedDataUrl, originalPhotoFile.name, originalPhotoFile.type).then(croppedFile => {
            selectedPhotoFile = croppedFile;
            // Don't set isPhotoCropped = true yet - wait for "Use this photo" click
            isPhotoCropped = false;
            updateSubmitButtonState();
          });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(originalPhotoFile);
    }
  });
}

/**
 * Generate cropped image from adjust mode (square 1:1, filled, no whitespace)
 * High quality output (1200x1200 for sharp profile photos)
 */
function generateCroppedImage() {
  if (!cropImage || !cropArea || !originalPhotoFile) return;
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // High resolution output for sharp photos (1200x1200)
  const outputSize = 1200;
  canvas.width = outputSize;
  canvas.height = outputSize;
  
  // Use high-quality image interpolation
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // Get image element and its natural dimensions
  const img = cropImage;
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;
  const imgAspect = imgWidth / imgHeight;
  
  // Get displayed image dimensions (after CSS transform)
  const imgRect = img.getBoundingClientRect();
  const displayWidth = imgRect.width;
  const displayHeight = imgRect.height;
  
  // Get crop area
  const areaRect = cropArea.getBoundingClientRect();
  const areaCenterX = areaRect.left + areaRect.width / 2;
  const areaCenterY = areaRect.top + areaRect.height / 2;
  
  // Calculate what part of the image is at the center of the crop area
  // The image is positioned with transform: translate(x, y) scale(scale)
  // The center of the crop area in image coordinates (before transform)
  const imgLeft = imgRect.left;
  const imgTop = imgRect.top;
  const imgCenterInDisplayX = areaCenterX - imgLeft;
  const imgCenterInDisplayY = areaCenterY - imgTop;
  
  // Convert to natural image coordinates
  const scaleX = imgWidth / displayWidth;
  const scaleY = imgHeight / displayHeight;
  const imgNaturalCenterX = imgCenterInDisplayX * scaleX;
  const imgNaturalCenterY = imgCenterInDisplayY * scaleY;
  
  // Calculate source rectangle (square, centered on the point under crop center)
  let sourceX, sourceY, sourceWidth, sourceHeight;
  
  if (imgAspect > 1) {
    // Landscape: crop width to match height (square)
    sourceHeight = imgHeight;
    sourceWidth = imgHeight;
    sourceX = Math.max(0, Math.min(imgNaturalCenterX - sourceWidth / 2, imgWidth - sourceWidth));
    sourceY = 0;
  } else {
    // Portrait or square: crop height to match width (square)
    sourceWidth = imgWidth;
    sourceHeight = imgWidth;
    sourceX = 0;
    sourceY = Math.max(0, Math.min(imgNaturalCenterY - sourceHeight / 2, imgHeight - sourceHeight));
  }
  
  // Ensure we don't go out of bounds (fill square, no whitespace)
  if (sourceX < 0) sourceX = 0;
  if (sourceY < 0) sourceY = 0;
  if (sourceX + sourceWidth > imgWidth) sourceX = imgWidth - sourceWidth;
  if (sourceY + sourceHeight > imgHeight) sourceY = imgHeight - sourceHeight;
  
  // Draw cropped image (square 1:1, always filled) with high quality
  ctx.drawImage(
    img,
    sourceX, sourceY, sourceWidth, sourceHeight,
    0, 0, outputSize, outputSize
  );
  
  // Convert to blob with high quality
  canvas.toBlob((blob) => {
    if (!blob) {
      showError('Error generating cropped image. Please try again.');
      return;
    }
    
    // Create File from blob
    const croppedFile = new File([blob], originalPhotoFile.name, {
      type: originalPhotoFile.type,
      lastModified: Date.now()
    });
    
    selectedPhotoFile = croppedFile;
    // Don't set isPhotoCropped = true yet - wait for "Use this photo" click
    
    // Update preview in both modal and form
    const reader = new FileReader();
    reader.onload = (e) => {
      if (cropPreview) {
        cropPreview.src = e.target.result;
      }
      if (photoPreview) {
        photoPreview.src = e.target.result;
      }
      if (photoPreviewContainer) {
        photoPreviewContainer.style.display = 'block';
      }
      if (photoUploadLabel) {
        photoUploadLabel.style.display = 'none';
      }
    };
    reader.readAsDataURL(croppedFile);
    
    // Switch back to preview mode
    if (cropPreviewMode) cropPreviewMode.style.display = 'block';
    if (cropAdjustMode) cropAdjustMode.style.display = 'none';
    if (cropModalTitle) cropModalTitle.textContent = 'Photo ready ✅';
    
    // Don't mark as confirmed yet - user must click "Use this photo"
    isPhotoCropped = false;
    updateSubmitButtonState();
  }, originalPhotoFile.type, 0.95);
}

/**
 * Close crop modal
 */
function closeCropModalFunc() {
  if (photoCropModal) {
    photoCropModal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// Cancel is now handled by cancelAdjustBtn (back to preview)

if (closeCropModal) {
  closeCropModal.addEventListener('click', () => {
    selectedPhotoFile = null;
    originalPhotoFile = null;
    isPhotoCropped = false;
    if (profilePhoto) profilePhoto.value = '';
    if (photoPreview) photoPreview.src = '';
    if (photoPreviewContainer) photoPreviewContainer.style.display = 'none';
    if (photoUploadLabel) photoUploadLabel.style.display = 'block';
    closeCropModalFunc();
    updateSubmitButtonState();
  });
}

// Close crop modal when clicking outside
if (photoCropModal) {
  photoCropModal.addEventListener('click', (e) => {
    if (e.target === photoCropModal) {
      // Cancel crop: reset everything
      selectedPhotoFile = null;
      originalPhotoFile = null;
      isPhotoCropped = false;
      if (profilePhoto) profilePhoto.value = '';
      if (photoPreview) photoPreview.src = '';
      if (photoPreviewContainer) photoPreviewContainer.style.display = 'none';
      if (photoUploadLabel) photoUploadLabel.style.display = 'block';
      closeCropModalFunc();
      updateSubmitButtonState();
    }
  });
}

/**
 * Remove photo
 */
if (removePhoto) {
  removePhoto.addEventListener('click', () => {
    selectedPhotoFile = null;
    originalPhotoFile = null;
    isPhotoCropped = false;
    if (profilePhoto) profilePhoto.value = '';
    if (photoPreview) photoPreview.src = '';
    if (photoPreviewContainer) photoPreviewContainer.style.display = 'none';
    if (photoUploadLabel) photoUploadLabel.style.display = 'block';
    updateSubmitButtonState();
  });
}

// ============================================
// FORM VALIDATION
// ============================================

/**
 * Update character counter and validate description in real-time
 */
const descriptionError = document.getElementById('descriptionError');

function validateDescriptionField() {
  if (!profileDescription) return;
  
  const length = profileDescription.value.trim().length;
  const isValid = length >= MIN_DESCRIPTION_LENGTH && length <= MAX_DESCRIPTION_LENGTH;
  
  // Update character counter
  if (charCount) {
    charCount.textContent = length;
    
    // Add error class if invalid
    if (length < MIN_DESCRIPTION_LENGTH) {
      charCount.parentElement.classList.add('char-counter-error');
    } else {
      charCount.parentElement.classList.remove('char-counter-error');
    }
  }
  
  // Show/hide error message
  if (descriptionError) {
    if (length > 0 && length < MIN_DESCRIPTION_LENGTH) {
      descriptionError.textContent = `Description trop courte : minimum ${MIN_DESCRIPTION_LENGTH} caractères (actuellement ${length}).`;
      descriptionError.style.display = 'block';
      profileDescription.classList.add('form-input-error');
    } else if (length > MAX_DESCRIPTION_LENGTH) {
      descriptionError.textContent = `Description trop longue : maximum ${MAX_DESCRIPTION_LENGTH} caractères.`;
      descriptionError.style.display = 'block';
      profileDescription.classList.add('form-input-error');
    } else {
      descriptionError.style.display = 'none';
      profileDescription.classList.remove('form-input-error');
    }
  }
  
  // Enable/disable submit button based on description validity
  updateSubmitButtonState();
  
  return isValid;
}

if (profileDescription) {
  profileDescription.addEventListener('input', validateDescriptionField);
  profileDescription.addEventListener('blur', validateDescriptionField);
}

/**
 * Update submit button state based on form validation
 */
function updateSubmitButtonState() {
  if (!submitBtn) return;
  
  // Check description validity
  const descriptionLength = profileDescription?.value.trim().length || 0;
  const isDescriptionValid = descriptionLength >= MIN_DESCRIPTION_LENGTH && descriptionLength <= MAX_DESCRIPTION_LENGTH;
  
  // Check if photo is cropped
  const isPhotoValid = isPhotoCropped && selectedPhotoFile !== null;
  
  // Disable button if description is invalid OR photo is not cropped
  if (!isDescriptionValid || !isPhotoValid) {
    submitBtn.disabled = true;
    submitBtn.classList.add('btn-disabled');
  } else {
    // Re-enable button (other validations will be checked on submit)
    submitBtn.disabled = false;
    submitBtn.classList.remove('btn-disabled');
  }
}

/**
 * Validate form before submission
 */
function validateForm() {
  // Photo - must be cropped
  if (!selectedPhotoFile || !isPhotoCropped) {
    showError('Please upload and crop your photo before submitting.');
    return false;
  }
  
  // First name
  if (!profileFirstName?.value.trim()) {
    showError('Please enter your first name.');
    profileFirstName?.focus();
    return false;
  }
  
  // Age
  const age = parseInt(profileAge?.value);
  if (!age || age < 18 || age > 100) {
    showError('Please enter a valid age (18-100).');
    profileAge?.focus();
    return false;
  }
  
  // Nationality
  if (!profileNationality?.value.trim()) {
    showError('Please enter your nationality.');
    profileNationality?.focus();
    return false;
  }
  
  // Languages
  const languagesText = profileLanguages?.value.trim();
  if (!languagesText) {
    showError('Please enter at least one language.');
    profileLanguages?.focus();
    return false;
  }
  
  // Budget
  const budget = parseInt(profileBudget?.value);
  if (!budget || budget < 500) {
    showError('Please enter a valid budget (minimum 500 AED).');
    profileBudget?.focus();
    return false;
  }
  
    // Districts
    const selectedDistricts = [];
    if (profileDistricts) {
      const checkboxes = profileDistricts.querySelectorAll('.district-checkbox:checked');
      checkboxes.forEach(checkbox => {
        selectedDistricts.push(checkbox.value);
      });
    }
    if (selectedDistricts.length === 0) {
      showError('Please select at least one preferred district.');
      if (profileDistrictsToggle) {
        profileDistrictsToggle.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Open dropdown to show districts
        if (profileDistricts) profileDistricts.classList.add('active');
        if (profileDistrictsToggle) profileDistrictsToggle.classList.add('active');
      }
      return false;
    }
  
  // Availability date
  if (!profileAvailabilityDate?.value) {
    showError('Please select your availability date.');
    profileAvailabilityDate?.focus();
    return false;
  }
  
  // Gender preference
  if (!profileGender?.value) {
    showError('Please select your gender preference.');
    profileGender?.focus();
    return false;
  }
  
  // Description - Validation stricte (80-500 caractères)
  const description = profileDescription?.value.trim();
  if (!description || description.length === 0) {
    const errorMsg = 'Veuillez entrer une description.';
    showError(errorMsg);
    if (descriptionError) {
      descriptionError.textContent = errorMsg;
      descriptionError.style.display = 'block';
    }
    profileDescription?.focus();
    return false;
  }
  if (description.length < MIN_DESCRIPTION_LENGTH) {
    const errorMsg = `Description trop courte : minimum ${MIN_DESCRIPTION_LENGTH} caractères (actuellement ${description.length}).`;
    showError(errorMsg);
    alert(errorMsg); // Alert pour visibilité
    if (descriptionError) {
      descriptionError.textContent = errorMsg;
      descriptionError.style.display = 'block';
    }
    profileDescription?.focus();
    profileDescription?.classList.add('form-input-error');
    return false;
  }
  if (description.length > MAX_DESCRIPTION_LENGTH) {
    const errorMsg = `Description trop longue : maximum ${MAX_DESCRIPTION_LENGTH} caractères.`;
    showError(errorMsg);
    alert(errorMsg); // Alert pour visibilité
    if (descriptionError) {
      descriptionError.textContent = errorMsg;
      descriptionError.style.display = 'block';
    }
    profileDescription?.focus();
    profileDescription?.classList.add('form-input-error');
    return false;
  }
  
  // WhatsApp
  if (!profileWhatsApp?.value.trim()) {
    showError('Please enter your WhatsApp number.');
    profileWhatsApp?.focus();
    return false;
  }
  
  return true;
}

// ============================================
// FORM SUBMISSION
// ============================================

/**
 * Handle profile form submission
 */
async function handleFormSubmit(event) {
  // Prevent form refresh
  event.preventDefault();
  event.stopPropagation();
  
  console.log('========================================');
  console.log('[FORM SUBMIT] Starting profile submission...');
  console.log('========================================');
  
  if (!profileForm) {
    console.error('[ERROR] Profile form element not found');
    showError('Form element not found. Please refresh the page.');
    return;
  }
  
  // Validate form
  console.log('[VALIDATION] Running form validation...');
  if (!validateForm()) {
    console.error('[VALIDATION] Form validation failed');
    return;
  }
  console.log('[VALIDATION] ✅ Form validation passed');
  
  // Show loading state
  if (submitBtn) {
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    if (btnText) btnText.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'inline';
    submitBtn.disabled = true;
  }
  
  try {
    // ============================================
    // STEP 0: Verify Supabase Client Initialization
    // ============================================
    console.log('[STEP 0] Verifying Supabase client initialization...');
    
    // Check if Supabase library is loaded
    if (!window.supabase) {
      throw new Error('Supabase library not loaded. Please check the script tag in HTML.');
    }
    console.log('[STEP 0] ✅ Supabase library loaded');
    
    // Wait for Supabase client
    let retries = 20;
    while (!window.supabaseClient && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
      retries--;
    }
    
    if (!window.supabaseClient) {
      throw new Error('Supabase client not initialized. Please check SUPABASE_URL and SUPABASE_ANON_KEY in HTML.');
    }
    
    // Verify client has correct configuration
    const clientUrl = window.supabaseClient.supabaseUrl;
    const clientKey = window.supabaseClient.supabaseKey;
    
    console.log('[STEP 0] ✅ Supabase client initialized');
    console.log('[STEP 0] Supabase URL:', clientUrl);
    console.log('[STEP 0] Supabase Key (first 20 chars):', clientKey ? clientKey.substring(0, 20) + '...' : 'MISSING');
    
    if (!clientUrl || !clientKey) {
      throw new Error('Supabase client missing URL or ANON_KEY. Please check initialization in HTML.');
    }
    
    // ============================================
    // STEP 1: Log all form values (before transformation)
    // ============================================
    console.log('[STEP 1] Logging form values (raw)...');
    const formValues = {
      firstName: profileFirstName?.value || '',
      age: profileAge?.value || '',
      nationality: profileNationality?.value || '',
      languages: profileLanguages?.value || '',
      budget: profileBudget?.value || '',
      districts: Array.from(profileDistricts?.querySelectorAll('.district-checkbox:checked') || []).map(cb => cb.value),
      availableFrom: profileAvailabilityDate?.value || '',
      genderPreference: profileGender?.value || '',
      description: profileDescription?.value || '',
      whatsapp: profileWhatsApp?.value || '',
      photoFile: selectedPhotoFile ? selectedPhotoFile.name : 'none'
    };
    console.log('[STEP 1] Raw form values:', JSON.stringify(formValues, null, 2));
    
    // Step 1b: Parse languages
    console.log('[STEP 1b] Parsing languages...');
    const languagesText = profileLanguages?.value.trim() || '';
    const languages = languagesText.split(',').map(lang => lang.trim()).filter(lang => lang.length > 0);
    console.log('[STEP 1b] Languages parsed:', languages);
    console.log('[STEP 1b] Languages array type:', Array.isArray(languages) ? 'array ✅' : 'NOT ARRAY ❌');
    
    // Step 2: Get selected districts from checkboxes
    console.log('[STEP 2] Getting selected districts...');
    const selectedDistricts = [];
    if (profileDistricts) {
      const checkboxes = profileDistricts.querySelectorAll('.district-checkbox:checked');
      checkboxes.forEach(checkbox => {
        selectedDistricts.push(checkbox.value);
      });
    }
    console.log('[STEP 2] Selected districts:', selectedDistricts);
    console.log('[STEP 2] Districts array type:', Array.isArray(selectedDistricts) ? 'array ✅' : 'NOT ARRAY ❌');
    
    // ============================================
    // STEP 3: VALIDATION & TRANSFORMATIONS
    // ============================================
    console.log('[STEP 3] Validating and transforming form values...');
    
    // 1. Validate and transform date (YYYY-MM-DD)
    const availableFromValue = profileAvailabilityDate?.value;
    console.log('[STEP 3.1] Available from (raw):', availableFromValue);
    if (!availableFromValue || !/^\d{4}-\d{2}-\d{2}$/.test(availableFromValue)) {
      const errorMsg = 'Please select a valid availability date (format: YYYY-MM-DD).';
      console.error('[STEP 3.1] ❌ Date validation failed:', availableFromValue);
      showError(errorMsg);
      profileAvailabilityDate?.focus();
      return;
    }
    console.log('[STEP 3.1] ✅ Date validated:', availableFromValue);
    
    // 2. Transform budget: single value → budget_min and budget_max (same value)
    const budgetValue = parseInt(profileBudget?.value, 10);
    console.log('[STEP 3.2] Budget (raw):', profileBudget?.value, '→ (parsed):', budgetValue);
    if (!budgetValue || isNaN(budgetValue) || budgetValue <= 0) {
      const errorMsg = 'Please enter a valid monthly budget (must be a positive number).';
      console.error('[STEP 3.2] ❌ Budget validation failed');
      showError(errorMsg);
      profileBudget?.focus();
      return;
    }
    console.log('[STEP 3.2] ✅ Budget validated:', budgetValue, '(type:', typeof budgetValue, ')');
    
    // 3. Transform districts: ensure it's an array of strings
    if (!Array.isArray(selectedDistricts) || selectedDistricts.length === 0) {
      const errorMsg = 'Please select at least one district.';
      console.error('[STEP 3.3] ❌ Districts validation failed:', selectedDistricts);
      showError(errorMsg);
      return;
    }
    console.log('[STEP 3.3] ✅ Districts validated:', selectedDistricts, '(type: array, length:', selectedDistricts.length, ')');
    
    // 4. Transform languages: ensure it's an array of strings
    if (!Array.isArray(languages) || languages.length === 0) {
      const errorMsg = 'Please enter at least one language.';
      console.error('[STEP 3.4] ❌ Languages validation failed:', languages);
      showError(errorMsg);
      return;
    }
    console.log('[STEP 3.4] ✅ Languages validated:', languages, '(type: array, length:', languages.length, ')');
    
    // 5. Normalize gender preference to match enum exactly
    // HTML has: "Mixed", "Male", "Female" but DB enum might be lowercase
    // Check what the actual enum values are - assuming lowercase based on previous code
    const genderPreferenceRaw = profileGender?.value?.trim();
    console.log('[STEP 3.5] Gender preference (raw):', genderPreferenceRaw);
    const genderPreference = genderPreferenceRaw?.toLowerCase();
    if (!genderPreference || !['mixed', 'male', 'female'].includes(genderPreference)) {
      const errorMsg = 'Please select a valid gender preference (Mixed, Male, or Female).';
      console.error('[STEP 3.5] ❌ Gender preference validation failed:', genderPreferenceRaw);
      showError(errorMsg);
      return;
    }
    console.log('[STEP 3.5] ✅ Gender preference validated:', genderPreference, '(normalized from:', genderPreferenceRaw, ')');
    
    // ============================================
    // BUILD STRICT PAYLOAD (EXACT SCHEMA ORDER)
    // ============================================
    // Build payload in EXACT order of schema to ensure consistency
    
    // List of ALLOWED keys (exact schema match - in schema order)
    // Note: 'id' is allowed to set it client-side (UUID generated before insert)
    const ALLOWED_KEYS = [
      'id', // Allow setting ID client-side (UUID)
      'first_name',
      'age',
      'nationality',
      'languages',
      'budget_min',
      'budget_max',
      'districts',
      'available_from',
      'looking_for',
      'gender_preference',
      'description',
      'whatsapp',
      'photo_url',
      'status',
      'is_visible'
    ];
    
    // Validate and transform all values
    const firstName = profileFirstName?.value.trim();
    const ageValue = parseInt(profileAge?.value, 10); // Ensure base 10, returns int
    const nationalityValue = profileNationality?.value.trim();
    
    // Validate critical fields
    if (!firstName || firstName.length === 0) {
      showError('Please enter your first name.');
      profileFirstName?.focus();
      return;
    }
    
    if (!ageValue || ageValue < 18 || ageValue > 100) {
      showError('Please enter a valid age (18-100).');
      profileAge?.focus();
      return;
    }
    
    if (!nationalityValue || nationalityValue.length === 0) {
      showError('Please select your nationality.');
      profileNationality?.focus();
      return;
    }
    
    // ============================================
    // VALIDATION CRITIQUE: Description (80-500 caractères)
    // Cette validation DOIT être faite AVANT tout upload photo ou insert
    // ============================================
    console.log('[VALIDATION] Validating description length...');
    const descriptionValue = profileDescription?.value.trim() || '';
    const descriptionLength = descriptionValue.length;
    console.log('[VALIDATION] Description length:', descriptionLength);
    
    if (descriptionValue.length === 0) {
      const errorMsg = 'Veuillez entrer une description.';
      console.error('[VALIDATION] ❌ Description is empty');
      showError(errorMsg);
      if (descriptionError) {
        descriptionError.textContent = errorMsg;
        descriptionError.style.display = 'block';
      }
      profileDescription?.focus();
      profileDescription?.classList.add('form-input-error');
      return; // BLOCK: Ne pas continuer vers upload/insert
    }
    
    if (descriptionLength < MIN_DESCRIPTION_LENGTH) {
      const errorMsg = `Description trop courte : minimum ${MIN_DESCRIPTION_LENGTH} caractères (actuellement ${descriptionLength}).`;
      console.error('[VALIDATION] ❌ Description too short:', descriptionLength, '<', MIN_DESCRIPTION_LENGTH);
      showError(errorMsg);
      alert(errorMsg); // Alert pour visibilité
      if (descriptionError) {
        descriptionError.textContent = errorMsg;
        descriptionError.style.display = 'block';
      }
      profileDescription?.focus();
      profileDescription?.classList.add('form-input-error');
      return; // BLOCK: Ne pas continuer vers upload/insert
    }
    
    if (descriptionLength > MAX_DESCRIPTION_LENGTH) {
      const errorMsg = `Description trop longue : maximum ${MAX_DESCRIPTION_LENGTH} caractères.`;
      console.error('[VALIDATION] ❌ Description too long:', descriptionLength, '>', MAX_DESCRIPTION_LENGTH);
      showError(errorMsg);
      alert(errorMsg); // Alert pour visibilité
      if (descriptionError) {
        descriptionError.textContent = errorMsg;
        descriptionError.style.display = 'block';
      }
      profileDescription?.focus();
      profileDescription?.classList.add('form-input-error');
      return; // BLOCK: Ne pas continuer vers upload/insert
    }
    
    console.log('[VALIDATION] ✅ Description length valid:', descriptionLength, 'characters');
    
    if (!profileWhatsApp?.value.trim() || profileWhatsApp.value.trim().length === 0) {
      showError('Please enter your WhatsApp number.');
      profileWhatsApp?.focus();
      return;
    }
    
    // ============================================
    // STEP 4: Generate ID and Upload Photo
    // ============================================
    
    // Step 4a: Generate profileId client-side (UUID)
    const profileId = generateUUID();
    console.log('[STEP 4a] Generated profileId:', profileId);
    
    // Step 4b: Upload photo BEFORE insert (if photo exists)
    let photoUrl = null;
    let photoUploadSuccess = false;
    
    if (selectedPhotoFile) {
      console.log('[STEP 4b] Uploading photo to Supabase Storage...');
      console.log('[STEP 4b] Photo file name:', selectedPhotoFile.name);
      console.log('[STEP 4b] Photo file size:', selectedPhotoFile.size, 'bytes');
      console.log('[STEP 4b] Photo file type:', selectedPhotoFile.type);
      console.log('[STEP 4b] Storage bucket:', STORAGE_BUCKET);
      
      // Generate unique filename: timestamp + random + extension
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 15);
      const fileExtension = selectedPhotoFile.name.substring(selectedPhotoFile.name.lastIndexOf('.'));
      const fileName = `${timestamp}_${random}${fileExtension}`;
      
      console.log('[STEP 4b] Generated filename:', fileName);
      
      try {
        const { data: uploadData, error: uploadError } = await window.supabaseClient.storage
          .from(STORAGE_BUCKET)
          .upload(fileName, selectedPhotoFile, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (uploadError) {
          console.error('[STEP 4b] ❌ Photo upload FAILED');
          console.error('[STEP 4b] Error code:', uploadError.statusCode);
          console.error('[STEP 4b] Error message:', uploadError.message);
          console.error('[STEP 4b] Full error:', uploadError);
          
          // Check for specific error types
          if (uploadError.statusCode === 401 || uploadError.message?.includes('unauthorized')) {
            const errorMsg = '❌ STORAGE UNAUTHORIZED: Photo upload failed due to missing Storage policy.\n\n' +
              'Please create a Storage policy in Supabase:\n' +
              '1. Go to Storage > roommate-photos bucket\n' +
              '2. Create a policy for INSERT operations\n' +
              '3. Policy should allow: authenticated users OR anon users\n' +
              '4. Check "storage.objects" table in policies';
            console.error('[STEP 4b] STORAGE POLICY ERROR:', errorMsg);
            showError('Photo upload failed: Storage policy missing. Check console for details.');
            return; // Block submission if photo is required
          } else if (uploadError.statusCode === 413 || uploadError.message?.includes('too large')) {
            showError('Photo file is too large. Maximum size is 5MB.');
            return;
          } else {
            // For other errors, allow submission without photo
            photoUrl = null;
            photoUploadSuccess = false;
            console.warn('[STEP 4b] Photo upload failed, but continuing with profile creation (photo_url=null)');
            showError('Photo upload failed, but profile will be saved. You can add a photo later.');
          }
        } else {
          console.log('[STEP 4b] ✅ Photo upload SUCCESS');
          console.log('[STEP 4b] Upload data:', uploadData);
          
          // Get public URL
          const { data: urlData } = window.supabaseClient.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(fileName);
          
          photoUrl = urlData?.publicUrl;
          console.log('[STEP 4b] Photo public URL:', photoUrl);
          photoUploadSuccess = true;
        }
      } catch (uploadException) {
        console.error('[STEP 4b] ❌ Exception during photo upload:', uploadException);
        showError('Photo upload error: ' + uploadException.message);
        return; // Block submission on exception
      }
    } else {
      console.log('[STEP 4b] No photo file selected, skipping upload');
    }
    
    // Step 3: Build payload with EXACT schema structure (in exact schema order)
    // Include id and photo_url from the start
    const payload = {
      id: profileId, // UUID generated client-side
      first_name: firstName, // text
      age: ageValue, // int (parseInt ensures it's a number, not string)
      nationality: nationalityValue, // text
      languages: languages, // text[] (array of strings)
      budget_min: budgetValue, // int (same value as budget_max)
      budget_max: budgetValue, // int (same value as budget_min)
      districts: selectedDistricts, // text[] (array of strings)
      available_from: availableFromValue, // date (YYYY-MM-DD format)
      looking_for: 'room', // enum ('room' or 'roommate') - default to 'room'
      gender_preference: genderPreference, // enum ('male', 'female', 'mixed')
      description: profileDescription.value.trim(), // text
      whatsapp: profileWhatsApp.value.trim(), // text
      photo_url: photoUrl, // text | null (from upload or null)
      status: 'pending', // enum ('pending', 'approved', 'rejected') - FORCED
      is_visible: false // boolean - FORCED
    };
    
    // ============================================
    // SECURITY: VALIDATE PAYLOAD KEYS (after adding id and photo_url)
    // ============================================
    
    const payloadKeys = Object.keys(payload);
    const invalidKeys = payloadKeys.filter(key => !ALLOWED_KEYS.includes(key));
    
    if (invalidKeys.length > 0) {
      const errorMsg = `SECURITY ERROR: Payload contains invalid keys: ${invalidKeys.join(', ')}. Allowed keys: ${ALLOWED_KEYS.join(', ')}`;
      console.error('[SECURITY ERROR]', errorMsg);
      console.error('[SECURITY ERROR] Invalid keys:', invalidKeys);
      console.error('[SECURITY ERROR] Full payload:', payload);
      showError('Internal error: Invalid data structure. Please contact support.');
      return;
    }
    
    // ============================================
    // FINAL VALIDATION LOG (REQUIRED)
    // ============================================
    
    console.log('FINAL PAYLOAD', payload);
    console.log('[VALIDATION] Payload keys count:', payloadKeys.length);
    console.log('[VALIDATION] Expected keys count:', ALLOWED_KEYS.length);
    console.log('[VALIDATION] All keys valid:', invalidKeys.length === 0);
    console.log('[INFO] profileId:', profileId);
    console.log('[INFO] photo_url:', photoUrl || 'null');
    console.log('[INFO] upload status:', photoUploadSuccess ? 'upload ok' : (selectedPhotoFile ? 'upload fail' : 'no photo'));
    
    // Detailed validation log
    if (invalidKeys.length === 0) {
      console.log('[VALIDATION] ✅ Payload structure is valid - all keys match schema');
      console.log('[VALIDATION] Payload structure:', JSON.stringify(payload, null, 2));
    } else {
      console.error('[VALIDATION] ❌ Payload structure is INVALID');
      console.error('[VALIDATION] Invalid keys found:', invalidKeys);
      console.error('[VALIDATION] Expected keys:', ALLOWED_KEYS);
      console.error('[VALIDATION] Actual payload keys:', payloadKeys);
    }
    
    // ============================================
    // STEP 5: INSERT profile into Supabase
    // ============================================
    console.log('[STEP 5] Inserting profile into roommate_profiles table...');
    console.log('[STEP 5] Table: public.roommate_profiles');
    console.log('[STEP 5] Payload being sent:', JSON.stringify(payload, null, 2));
    console.log('[STEP 5] Payload keys:', Object.keys(payload));
    console.log('[STEP 5] Payload types:', Object.entries(payload).map(([k, v]) => `${k}: ${typeof v}${Array.isArray(v) ? ' (array)' : ''}`));
    
    try {
      const { data: insertData, error: insertError } = await window.supabaseClient
        .from('roommate_profiles')
        .insert([payload]);
        // NO .select() - RLS blocks reading pending profiles
      
      if (insertError) {
        console.error('[STEP 5] ❌ INSERT FAILED');
        console.error('[STEP 5] Error code:', insertError.code);
        console.error('[STEP 5] Error message:', insertError.message);
        console.error('[STEP 5] Error details:', insertError.details);
        console.error('[STEP 5] Error hint:', insertError.hint);
        console.error('[STEP 5] Full error object:', JSON.stringify(insertError, null, 2));
        console.error('[STEP 5] Payload that failed:', JSON.stringify(payload, null, 2));
        
        // Check for specific error types
        let userFriendlyError = 'Failed to submit profile. Please try again.';
        
        if (insertError.code === 'PGRST301' || insertError.message?.includes('permission denied') || insertError.message?.includes('RLS')) {
          userFriendlyError = '❌ RLS POLICY ERROR: Insert failed due to missing Row Level Security policy.\n\n' +
            'Please create an INSERT policy in Supabase:\n' +
            '1. Go to Authentication > Policies > roommate_profiles table\n' +
            '2. Create a new policy for INSERT operations\n' +
            '3. Policy should allow: authenticated users OR anon users\n' +
            '4. Policy name: "Allow public insert" or "Allow anon insert"\n' +
            '5. Check the policy is enabled';
          console.error('[STEP 5] RLS POLICY ERROR:', userFriendlyError);
        } else if (insertError.message?.includes('violates check constraint')) {
          userFriendlyError = 'Validation error: ' + insertError.message + '\n\nPlease check all fields meet the requirements.';
        } else if (insertError.message?.includes('violates foreign key constraint')) {
          userFriendlyError = 'Data error: Invalid reference. ' + insertError.message;
        }
        
        showError(userFriendlyError);
        throw new Error(insertError.message || 'Failed to submit profile.');
      }
      
      console.log('[STEP 5] ✅ INSERT SUCCESS');
      console.log('[STEP 5] Insert response data:', insertData);
      console.log('[STEP 5] Profile ID:', profileId);
      console.log('[STEP 5] Profile created successfully in public.roommate_profiles');
      
    } catch (insertException) {
      console.error('[STEP 5] ❌ Exception during insert:', insertException);
      showError('Database error: ' + insertException.message);
      throw insertException;
    }
    
    // ============================================
    // STEP 6: Success - Show message and reset
    // ============================================
    console.log('[STEP 6] ✅ Profile creation process COMPLETED');
    console.log('[STEP 6] Profile ID:', profileId);
    console.log('[STEP 6] Photo upload status:', photoUploadSuccess ? '✅ upload ok' : (selectedPhotoFile ? '❌ upload fail' : '⏭️ no photo'));
    console.log('[STEP 6] Photo URL:', photoUrl || 'null');
    console.log('========================================');
    console.log('[FORM SUBMIT] ✅ SUCCESS - Profile submitted');
    console.log('========================================');
    
    // Success message
    let successMessage = '✅ Votre profil a été envoyé avec succès !';
    
    if (selectedPhotoFile && !photoUploadSuccess) {
      successMessage = '✅ Votre profil a été envoyé avec succès !\n\nNote: L\'upload de la photo a échoué, mais votre profil a été sauvegardé.';
    }
    
    // Show success message and reset form (ONLY after successful INSERT)
    if (formSuccessMessage) {
      // Update success message content
      const successContent = formSuccessMessage.querySelector('.success-content');
      if (successContent) {
        const pElement = successContent.querySelector('p');
        if (pElement) {
          pElement.textContent = successMessage;
        } else {
          // If no p element, create one
          const p = document.createElement('p');
          p.textContent = successMessage;
          successContent.appendChild(p);
        }
      }
      
      formSuccessMessage.style.display = 'block';
      profileForm.style.display = 'none';
      
      // Scroll to success message
      formSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Close modal after 5 seconds and reset form (ONLY after successful INSERT)
      setTimeout(() => {
        closeProfileModal();
        // Reset form ONLY after successful insert
        resetForm();
      }, 5000);
    } else {
      // Fallback: show alert and close modal
      alert(successMessage);
      closeProfileModal();
      // Reset form ONLY after successful insert
      resetForm();
    }
    
  } catch (err) {
    console.error('Error in handleFormSubmit:', err);
    showError(err.message || 'An error occurred. Please try again.');
  } finally {
    // Reset loading state
    if (submitBtn) {
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      if (btnText) btnText.style.display = 'inline';
      if (btnLoading) btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    }
  }
}

/**
 * Reset form
 */
function resetForm() {
  selectedPhotoFile = null;
  originalPhotoFile = null;
  isPhotoCropped = false;
  if (profileForm) profileForm.reset();
  if (photoPreview) photoPreview.src = '';
  if (photoPreviewContainer) photoPreviewContainer.style.display = 'none';
  if (photoUploadLabel) photoUploadLabel.style.display = 'block';
  if (formSuccessMessage) formSuccessMessage.style.display = 'none';
  if (profileForm) profileForm.style.display = 'block';
  if (charCount) {
    charCount.textContent = '0';
    charCount.parentElement.classList.remove('char-counter-error');
  }
  if (descriptionError) {
    descriptionError.style.display = 'none';
  }
  if (profileDescription) {
    profileDescription.classList.remove('form-input-error');
  }
  // Re-enable submit button after reset (will be disabled again if description is invalid or photo not cropped)
  if (submitBtn) {
    submitBtn.disabled = true; // Start disabled until user enters valid description and crops photo
    submitBtn.classList.add('btn-disabled');
  }
  
  // Reset districts dropdown
  if (profileDistricts) {
    const checkboxes = profileDistricts.querySelectorAll('.district-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }
  if (profileDistrictsText) profileDistrictsText.textContent = 'Select districts';
  if (profileDistricts) profileDistricts.classList.remove('active');
  if (profileDistrictsToggle) profileDistrictsToggle.classList.remove('active');
}

// ============================================
// FILTERING
// ============================================

/**
 * Populate nationality filter dropdown with all available nationalities
 */
function populateNationalityFilter() {
  if (!nationalityList) return;
  
  // Clear existing options
  nationalityList.innerHTML = '';
  
  // Add default "All Nationalities" option
  const defaultItem = document.createElement('div');
  defaultItem.className = 'nationality-item active';
  defaultItem.setAttribute('data-value', '');
  defaultItem.innerHTML = '<span class="nationality-item-text">All Nationalities</span>';
  defaultItem.addEventListener('click', () => selectNationality(''));
  nationalityList.appendChild(defaultItem);
  
  // Add all nationalities from the complete list
  ALL_NATIONALITIES.forEach(nationality => {
    const item = document.createElement('div');
    item.className = 'nationality-item';
    item.setAttribute('data-value', nationality);
    item.innerHTML = `<span class="nationality-item-text">${escapeHtml(nationality)}</span>`;
    item.addEventListener('click', () => selectNationality(nationality));
    nationalityList.appendChild(item);
  });
  
  // Also add any nationalities from existing profiles that might not be in the list
  const profileNationalities = new Set();
  allProfiles.forEach(profile => {
    if (profile.nationality && profile.nationality.trim()) {
      const nationality = profile.nationality.trim();
      if (!ALL_NATIONALITIES.includes(nationality)) {
        profileNationalities.add(nationality);
      }
    }
  });
  
  // Add any additional nationalities from profiles
  if (profileNationalities.size > 0) {
    const sortedAdditional = Array.from(profileNationalities).sort();
    sortedAdditional.forEach(nationality => {
      const item = document.createElement('div');
      item.className = 'nationality-item';
      item.setAttribute('data-value', nationality);
      item.innerHTML = `<span class="nationality-item-text">${escapeHtml(nationality)}</span>`;
      item.addEventListener('click', () => selectNationality(nationality));
      nationalityList.appendChild(item);
    });
  }
  
  // Setup search functionality
  if (nationalitySearchInput) {
    nationalitySearchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const items = nationalityList.querySelectorAll('.nationality-item');
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/**
 * Select a nationality
 */
function selectNationality(nationality) {
  if (filterNationalityText) {
    filterNationalityText.textContent = nationality || 'All Nationalities';
  }
  
  // Update active state
  const items = nationalityList.querySelectorAll('.nationality-item');
  items.forEach(item => {
    if (item.getAttribute('data-value') === nationality) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
  
  // Close dropdown
  if (filterNationality) {
    filterNationality.classList.remove('active');
  }
  if (filterNationalityToggle) {
    filterNationalityToggle.classList.remove('active');
  }
  
  // Apply filters
  applyFilters();
}

/**
 * Populate nationality form dropdown with all available nationalities
 */
function populateNationalityForm() {
  if (!profileNationality) return;
  
  // Clear existing options (except the first "Select" option)
  const selectOption = profileNationality.querySelector('option[value=""]');
  profileNationality.innerHTML = '';
  
  if (selectOption) {
    profileNationality.appendChild(selectOption);
  } else {
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select your nationality';
    profileNationality.appendChild(defaultOption);
  }
  
  // Add all nationalities from the complete list
  ALL_NATIONALITIES.forEach(nationality => {
    const option = document.createElement('option');
    option.value = nationality;
    option.textContent = nationality;
    profileNationality.appendChild(option);
  });
}

/**
 * Apply filters to profiles
 */
function applyFilters() {
  const budgetMin = filterBudgetMin?.value ? parseInt(filterBudgetMin.value) : null;
  const budgetMax = filterBudgetMax?.value ? parseInt(filterBudgetMax.value) : null;
  
  // Get selected districts from checkboxes
  const selectedDistricts = [];
  if (filterDistrictsContent) {
    const checkboxes = filterDistrictsContent.querySelectorAll('.district-checkbox:checked');
    checkboxes.forEach(checkbox => {
      selectedDistricts.push(checkbox.value);
    });
  }
  
  // Gender from select (normalize for safe comparison)
  const genderFilter = normalizeGender(filterGender?.value || '');
  
  // Get selected nationality from custom dropdown
  let nationality = '';
  if (nationalityList) {
    const activeItem = nationalityList.querySelector('.nationality-item.active');
    if (activeItem) {
      nationality = activeItem.getAttribute('data-value') || '';
    }
  }
  
  filteredProfiles = allProfiles.filter(profile => {
    // Budget filter (check if budget range overlaps with filter range)
    const profileBudgetMin = profile.budget_min || 0;
    const profileBudgetMax = profile.budget_max || profile.budget_min || 0;
    if (budgetMin !== null && profileBudgetMax < budgetMin) return false;
    if (budgetMax !== null && profileBudgetMin > budgetMax) return false;
    
    // District filter (multiple selection)
    if (selectedDistricts.length > 0) {
      const profileDistricts = Array.isArray(profile.districts) ? profile.districts : [];
      // Check if profile has at least one of the selected districts
      const hasMatchingDistrict = selectedDistricts.some(district => profileDistricts.includes(district));
      if (!hasMatchingDistrict) return false;
    }
    
    // Gender filter (normalize on both sides)
    // UX: when user selects "Mixed", we want to see both male and female (i.e. no strict filter),
    // so we only filter when the selected value is NOT empty and NOT "mixed".
    if (genderFilter && genderFilter !== 'mixed') {
      const profileGender = normalizeGender(profile.gender_preference || '');
      if (!profileGender || profileGender !== genderFilter) return false;
    }
    
    // Nationality filter
    if (nationality && profile.nationality?.trim() !== nationality) return false;
    
    return true;
  });
  
  renderCards();
}

/**
 * Clear all filters
 */
function clearFilters() {
  if (filterBudgetMin) filterBudgetMin.value = '';
  if (filterBudgetMax) filterBudgetMax.value = '';
  
  // Clear district checkboxes
  if (filterDistrictsContent) {
    const checkboxes = filterDistrictsContent.querySelectorAll('.district-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    if (filterDistrictsText) filterDistrictsText.textContent = 'All Districts';
  }
  
  if (filterGender) filterGender.value = '';
  
  // Clear nationality selection
  if (nationalityList) {
    const items = nationalityList.querySelectorAll('.nationality-item');
    items.forEach(item => item.classList.remove('active'));
    const defaultItem = nationalityList.querySelector('.nationality-item[data-value=""]');
    if (defaultItem) defaultItem.classList.add('active');
  }
  if (filterNationalityText) filterNationalityText.textContent = 'All Nationalities';
  filteredProfiles = [...allProfiles];
  renderCards();
}

// ============================================
// WHATSAPP CONTACT
// ============================================

/**
 * Open WhatsApp with pre-filled message
 */
function contactViaWhatsApp(phoneNumber, profileName) {
  if (!phoneNumber) {
    showError('WhatsApp number not available for this profile.');
    return;
  }
  
  const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');
  const whatsappNumber = cleanNumber.startsWith('+') ? cleanNumber.substring(1) : cleanNumber;
  const message = `Hello ${profileName ? profileName : ''}, I saw your roommate profile on WorldXpat. I'm interested in finding out more!`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

// Make function globally available
window.contactViaWhatsApp = contactViaWhatsApp;

// ============================================
// MODAL MANAGEMENT
// ============================================

/**
 * Open create profile modal
 */
function openModal() {
  if (profileModal) {
    profileModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // Set minimum date to today
    if (profileAvailabilityDate) {
      const today = new Date().toISOString().split('T')[0];
      profileAvailabilityDate.min = today;
    }
  }
}

/**
 * Close create profile modal (without resetting form)
 */
function closeProfileModal() {
  if (profileModal) {
    profileModal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

/**
 * Close create profile modal and reset form (only for Cancel/X buttons)
 */
function closeProfileModalAndReset() {
  if (profileModal) {
    profileModal.style.display = 'none';
    document.body.style.overflow = '';
    resetForm();
  }
}

// Do NOT close modal when clicking outside - user must explicitly close it

if (profileDetailsModal) {
  profileDetailsModal.addEventListener('click', (e) => {
    if (e.target === profileDetailsModal) {
      closeProfileDetailsModal();
    }
  });
}

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Show error message
 */
function showError(message) {
  console.error(message);
  alert(message); // You can replace this with a better UI component
}

// ============================================
// EVENT LISTENERS
// ============================================

// Filter button
if (filterBtn) {
  filterBtn.addEventListener('click', applyFilters);
}

// Clear filters button
if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener('click', clearFilters);
}

// Create profile button
if (createProfileBtn) {
  createProfileBtn.addEventListener('click', openModal);
}

// Close modal buttons - only these buttons will close and reset the form
if (closeModal) {
  closeModal.addEventListener('click', closeProfileModalAndReset);
}

if (closeDetailsModal) {
  closeDetailsModal.addEventListener('click', closeProfileDetailsModal);
}

if (cancelBtn) {
  cancelBtn.addEventListener('click', closeProfileModalAndReset);
}

// Form submission
if (profileForm) {
  profileForm.addEventListener('submit', handleFormSubmit);
}

// Auto-apply on gender change
if (filterGender) {
  filterGender.addEventListener('change', applyFilters);
}

// Allow Enter key to submit filters
[filterBudgetMin, filterBudgetMax, filterGender].forEach(input => {
  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        applyFilters();
      }
    });
  }
});

// Allow Enter key in nationality search
if (nationalitySearchInput) {
  nationalitySearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Select first visible item if any
      const firstVisible = nationalityList.querySelector('.nationality-item[style*="display: flex"], .nationality-item:not([style*="display: none"])');
      if (firstVisible) {
        firstVisible.click();
      }
    }
  });
}

/**
 * Initialize nationality dropdown
 */
function initNationalityDropdown() {
  // Get elements again to ensure they exist
  const toggle = document.getElementById('filterNationalityToggle');
  const content = document.getElementById('filterNationality');
  const text = document.getElementById('filterNationalityText');
  const searchInput = document.getElementById('nationalitySearchInput');
  const list = document.getElementById('nationalityList');
  
  if (!toggle || !content || !text) {
    console.warn('Nationality dropdown elements not found', { toggle, content, text });
    return;
  }
  
  console.log('Initializing nationality dropdown...');
  
  // Toggle dropdown on button click
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Toggle clicked, current state:', content.classList.contains('active'));
    content.classList.toggle('active');
    toggle.classList.toggle('active');
    if (content.classList.contains('active') && searchInput) {
      setTimeout(() => {
        searchInput.focus();
      }, 100);
    }
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (content && toggle) {
      if (!content.contains(e.target) && !toggle.contains(e.target)) {
        content.classList.remove('active');
        toggle.classList.remove('active');
      }
    }
  });
  
  // Prevent dropdown from closing when clicking inside
  if (content) {
    content.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
  
  console.log('Nationality dropdown initialized');
}

/**
 * Initialize districts dropdown
 */
function initDistrictsDropdown() {
  const filterDistrictsToggle = document.getElementById('filterDistrictsToggle');
  const filterDistrictsText = document.getElementById('filterDistrictsText');
  
  if (!filterDistrictsToggle || !filterDistrictsContent || !filterDistrictsText) {
    console.warn('Districts dropdown elements not found');
    return;
  }
  
  // Toggle dropdown on button click
  filterDistrictsToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    filterDistrictsContent.classList.toggle('active');
    filterDistrictsToggle.classList.toggle('active');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (filterDistrictsContent && filterDistrictsToggle) {
      if (!filterDistrictsContent.contains(e.target) && !filterDistrictsToggle.contains(e.target)) {
        filterDistrictsContent.classList.remove('active');
        filterDistrictsToggle.classList.remove('active');
      }
    }
  });
  
  // Update selected text when checkboxes change
  const updateDistrictsText = () => {
    if (filterDistrictsContent) {
      const checkboxes = filterDistrictsContent.querySelectorAll('.district-checkbox:checked');
      const selectedCount = checkboxes.length;
      
      if (selectedCount === 0) {
        filterDistrictsText.textContent = 'All Districts';
      } else if (selectedCount === 1) {
        filterDistrictsText.textContent = checkboxes[0].value;
      } else {
        filterDistrictsText.textContent = `${selectedCount} districts selected`;
      }
    }
  };
  
  // Auto-apply filters when district checkboxes change
  const districtCheckboxes = filterDistrictsContent.querySelectorAll('.district-checkbox');
  districtCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      updateDistrictsText();
      applyFilters();
    });
  });
  
  // Prevent dropdown from closing when clicking inside
  filterDistrictsContent.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

/**
 * Initialize profile districts dropdown (in form)
 */
function initProfileDistrictsDropdown() {
  const toggle = document.getElementById('profileDistrictsToggle');
  const content = document.getElementById('profileDistricts');
  const text = document.getElementById('profileDistrictsText');
  
  if (!toggle || !content || !text) {
    console.warn('Profile districts dropdown elements not found');
    return;
  }
  
  // Toggle dropdown on button click
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    content.classList.toggle('active');
    toggle.classList.toggle('active');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (content && toggle) {
      if (!content.contains(e.target) && !toggle.contains(e.target)) {
        content.classList.remove('active');
        toggle.classList.remove('active');
      }
    }
  });
  
  // Update selected text when checkboxes change
  const updateProfileDistrictsText = () => {
    if (content) {
      const checkboxes = content.querySelectorAll('.district-checkbox:checked');
      const selectedCount = checkboxes.length;
      
      if (selectedCount === 0) {
        if (text) text.textContent = 'Select districts';
      } else if (selectedCount === 1) {
        if (text) text.textContent = checkboxes[0].value;
      } else {
        if (text) text.textContent = `${selectedCount} districts selected`;
      }
    }
  };
  
  // Update text when checkboxes change
  if (content) {
    const districtCheckboxes = content.querySelectorAll('.district-checkbox');
    districtCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateProfileDistrictsText);
    });
  }
  
  // Prevent dropdown from closing when clicking inside
  if (content) {
    content.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the colocation page
 */
async function init() {
  console.log('Initializing roommate finder page...');
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    await new Promise(resolve => {
      document.addEventListener('DOMContentLoaded', resolve);
    });
  }
  
  // Initialize language switcher and apply language
  if (typeof initLanguageSwitcher === 'function') {
    initLanguageSwitcher();
  }
  if (typeof applyLanguage === 'function') {
    const savedLanguage = localStorage.getItem('worldxpat_language') || 'en';
    applyLanguage(savedLanguage);
  }
  
  // Populate nationality filter and form dropdown immediately (before loading profiles)
  populateNationalityFilter();
  populateNationalityForm();
  
  // Initialize districts dropdown
  initDistrictsDropdown();
  
  // Initialize nationality dropdown
  initNationalityDropdown();
  
  // Initialize profile districts dropdown
  initProfileDistrictsDropdown();
  
  // Wait for Supabase
  let retries = 20;
  while ((!window.supabase || !window.supabaseClient) && retries > 0) {
    await new Promise(resolve => setTimeout(resolve, 100));
    retries--;
  }
  
  if (window.supabase && window.supabaseClient) {
    console.log('Supabase client is ready');
  }
  
  // Load profiles from Supabase
  await loadProfiles();
  
  // Initialize submit button state (disabled until valid description)
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.add('btn-disabled');
  }
  
  console.log('Roommate finder page initialized');
  
  // Listen for language changes
  window.addEventListener('languageChanged', () => {
    updateColocationTexts();
  });
}

/**
 * Update colocation page texts when language changes
 */
function updateColocationTexts() {
  // Update filter gender options
  if (filterGender) {
    const options = filterGender.querySelectorAll('option');
    if (options.length >= 4 && typeof t === 'function') {
      options[0].textContent = t('colocation_gender_any');
      options[1].textContent = t('colocation_gender_male');
      options[2].textContent = t('colocation_gender_female');
      options[3].textContent = t('colocation_gender_mixed');
    }
  }
  
  // Update profile gender options
  const profileGender = document.getElementById('profileGender');
  if (profileGender) {
    const options = profileGender.querySelectorAll('option');
    if (options.length >= 4 && typeof t === 'function') {
      options[0].textContent = t('colocation_form_gender_select');
      options[1].textContent = t('colocation_gender_mixed');
      options[2].textContent = t('colocation_gender_male');
      options[3].textContent = t('colocation_gender_female');
    }
  }
  
  // Update nationality search placeholder
  const nationalitySearchInput = document.getElementById('nationalitySearchInput');
  if (nationalitySearchInput && typeof t === 'function') {
    nationalitySearchInput.placeholder = t('colocation_search_nationality');
  }
}

// Start initialization
init();
