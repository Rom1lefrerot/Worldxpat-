// ============================================
// JOBS PAGE - DISPLAY APPROVED JOBS ONLY
// ============================================

console.log("Initializing Jobs page...");

// ============================================
// CONFIGURATION - MODIFIABLE VALUES
// ============================================

/**
 * STATUS_FILTER: Change this value if you want to filter by a different status
 * Options: 'approved', 'published', etc.
 * Current: 'approved' - only shows jobs that have been approved by admin
 */
const STATUS_FILTER = 'approved';

/**
 * WORLDXPAT_WHATSAPP_URL: Your WorldXpat WhatsApp number for companies to contact you
 * Format: https://wa.me/COUNTRYCODE+NUMBER (without + sign)
 * Example: https://wa.me/971501234567
 * 
 * ⬅️ TO MODIFY: Replace the number below with your actual WhatsApp number
 * This URL is used when companies click "Vous êtes une entreprise ? Contactez-nous"
 */
const WORLDXPAT_WHATSAPP_URL = 'https://wa.me/971501234567'; // ⬅️ MODIFY THIS NUMBER

// ============================================
// DOM ELEMENTS
// ============================================

const jobsContainer = document.getElementById('jobs-container');
const jobsEmpty = document.getElementById('jobs-empty');
const jobDetailsModal = document.getElementById('jobDetailsModal');
const closeDetailsModal = document.getElementById('closeDetailsModal');
const jobDetailsTitle = document.getElementById('jobDetailsTitle');
const jobDetailsContent = document.getElementById('jobDetailsContent');
const jobDetailsFooter = document.getElementById('jobDetailsFooter');

// Filter elements
const filterCategory = document.getElementById('filterCategory');
const filterLocation = document.getElementById('filterLocation');
const filterExperience = document.getElementById('filterExperience');

// Store all jobs for filtering
let allJobs = [];

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Escape HTML to prevent XSS attacks
 */
function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  if (typeof text === 'object') return text;
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Format date to "Posted X days ago" format
 */
function formatDateAgo(dateString) {
  if (!dateString) return 'Recently posted';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Posted today';
  if (diffDays === 1) return 'Posted 1 day ago';
  if (diffDays < 7) return `Posted ${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? 'Posted 1 week ago' : `Posted ${weeks} weeks ago`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? 'Posted 1 month ago' : `Posted ${months} months ago`;
  }
  const years = Math.floor(diffDays / 365);
  return years === 1 ? 'Posted 1 year ago' : `Posted ${years} years ago`;
}

/**
 * Get category badge color class
 */
function getCategoryBadgeClass(category) {
  const categoryMap = {
    'hospitality_restaurants': 'badge-hospitality',
    'sales_retail': 'badge-sales',
    'real_estate': 'badge-real-estate',
    'customer_service_call_center': 'badge-customer-service',
    'administration_office': 'badge-admin',
    'marketing_social_media_content': 'badge-marketing',
    'driver_delivery': 'badge-driver',
    'it_web_tech': 'badge-tech',
    'kids_education_babysitting': 'badge-education',
    'beauty_fitness_wellness': 'badge-beauty',
    'construction_engineering': 'badge-construction'
  };
  return categoryMap[category] || 'badge-default';
}

/**
 * Format category name for display
 */
function formatCategoryName(category) {
  if (!category) return '';
  return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// ============================================
// SUPABASE - LOAD JOBS
// ============================================

/**
 * Load approved jobs from Supabase
 */
async function loadJobs() {
  try {
    console.log(`Loading jobs with status: ${STATUS_FILTER}...`);
    
    // Wait for Supabase client to be available
    let retries = 10;
    while ((!window.supabase || !window.supabaseClient) && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
      retries--;
    }
    
    if (!window.supabase || !window.supabaseClient) {
      console.error('Supabase client not available after waiting');
      showError('Error loading job offers. Please try again later.');
      return;
    }
    
    // Query Supabase for approved jobs only
    // Select specific fields needed for display and filtering
    const { data, error } = await window.supabaseClient
      .from('job_offers_pending')
      .select('id, company_name, job_title, category, location, level, availability, job_description, salary, contract_type, benefits, created_at')
      .eq('status', STATUS_FILTER) // Currently filtering by 'approved' status
      .order('created_at', { ascending: false }); // Most recent first
    
    if (error) {
      console.error('Supabase error loading jobs:', error);
      showError('Error loading job offers. Please try again later.');
      return;
    }
    
    console.log(`Jobs loaded: ${data?.length || 0} approved job(s)`);
    
    if (!data || data.length === 0) {
      showEmptyState();
      allJobs = [];
      return;
    }
    
    // Store all jobs for filtering
    allJobs = data;
    
    // Apply current filters and render
    applyFilters();
    
  } catch (err) {
    console.error('Error in loadJobs:', err);
    showError('Error loading job offers. Please try again later.');
  }
}

// ============================================
// FILTERING LOGIC
// ============================================

/**
 * Apply filters to jobs and render filtered results
 */
function applyFilters() {
  if (!allJobs || allJobs.length === 0) {
    showEmptyState();
    return;
  }
  
  // Get filter values
  const categoryFilter = filterCategory?.value || '';
  const locationFilter = filterLocation?.value || '';
  const experienceFilter = filterExperience?.value || '';
  
  // Filter jobs
  let filteredJobs = allJobs.filter(job => {
    // Category filter - match exact category value
    if (categoryFilter && categoryFilter !== '') {
      if (!job.category || job.category !== categoryFilter) {
        return false;
      }
    }
    
    // Location filter - compare lowercase values
    if (locationFilter && locationFilter !== '') {
      const jobLocation = (job.location || '').toLowerCase().trim();
      const filterLocationLower = locationFilter.toLowerCase().trim();
      if (jobLocation !== filterLocationLower) {
        return false;
      }
    }
    
    // Level filter - check level field
    if (experienceFilter && experienceFilter !== '') {
      if (!job.level || job.level !== experienceFilter) {
        return false;
      }
    }
    
    return true;
  });
  
  // Render filtered jobs
  if (filteredJobs.length === 0) {
    showEmptyState();
  } else {
    renderJobCards(filteredJobs);
  }
  
  console.log(`Filtered: ${filteredJobs.length} job(s) from ${allJobs.length} total`);
}

// ============================================
// RENDER JOB CARDS
// ============================================

/**
 * Render job cards using document.createElement (no innerHTML)
 */
function renderJobCards(jobs) {
  if (!jobsContainer) {
    console.error('jobs-container element not found');
    return;
  }
  
  // Clear existing content
  jobsContainer.innerHTML = '';
  jobsContainer.style.display = 'grid';
  if (jobsEmpty) jobsEmpty.style.display = 'none';
  
  // Create a card for each job
  jobs.forEach((job, index) => {
    const card = createJobCard(job, index);
    jobsContainer.appendChild(card);
  });
  
  console.log(`Rendered ${jobs.length} job card(s)`);
}

/**
 * Create a single job card element
 */
function createJobCard(job, index) {
  // Main card container
  const card = document.createElement('div');
  card.className = 'job-card';
  card.style.animationDelay = `${index * 0.1}s`;
  card.setAttribute('data-job-id', job.id);
  
  // Card image at the top
  const cardImage = document.createElement('div');
  cardImage.className = 'job-card-image-wrapper';
  const img = document.createElement('img');
  img.src = 'job.png';
  img.alt = job.job_title || 'Job offer';
  img.className = 'job-card-image-main';
  cardImage.appendChild(img);
  
  // Category badge (positioned over image, top right)
  if (job.category) {
    const badge = document.createElement('div');
    badge.className = `job-badge ${getCategoryBadgeClass(job.category)}`;
    badge.textContent = formatCategoryName(job.category);
    cardImage.appendChild(badge);
  }
  
  card.appendChild(cardImage);
  
  // Card content wrapper
  const cardContent = document.createElement('div');
  cardContent.className = 'job-card-content';
  
  // Card header
  const header = document.createElement('div');
  header.className = 'job-card-header';
  
  // Job title
  const title = document.createElement('h3');
  title.className = 'job-card-title';
  title.textContent = job.job_title || 'Untitled Position';
  header.appendChild(title);
  
  // Company name
  const company = document.createElement('p');
  company.className = 'job-card-company';
  company.textContent = job.company_name || 'Company';
  header.appendChild(company);
  
  cardContent.appendChild(header);
  
  // Meta information row
  const metaRow = document.createElement('div');
  metaRow.className = 'job-card-meta';
  
  // Location - format for display (capitalize first letter)
  if (job.location) {
    const location = document.createElement('span');
    location.className = 'job-meta-item';
    const locationDisplay = job.location.charAt(0).toUpperCase() + job.location.slice(1);
    location.innerHTML = `<span class="meta-icon">📍</span> ${escapeHtml(locationDisplay)}`;
    metaRow.appendChild(location);
  }
  
  // Contract type
  if (job.contract_type) {
    const contract = document.createElement('span');
    contract.className = 'job-meta-item';
    contract.innerHTML = `<span class="meta-icon">🕒</span> ${escapeHtml(job.contract_type)}`;
    metaRow.appendChild(contract);
  }
  
  // Level required - use level field
  if (job.level) {
    const experience = document.createElement('span');
    experience.className = 'job-meta-item';
    experience.innerHTML = `<span class="meta-icon">🎯</span> ${escapeHtml(job.level)}`;
    metaRow.appendChild(experience);
  }
  
  cardContent.appendChild(metaRow);
  
  // Salary
  if (job.salary) {
    const salary = document.createElement('p');
    salary.className = 'job-card-salary';
    salary.textContent = `Salary: ${escapeHtml(job.salary)}`;
    cardContent.appendChild(salary);
  } else {
    const salary = document.createElement('p');
    salary.className = 'job-card-salary job-salary-discuss';
    salary.textContent = 'Salary: to be discussed';
    cardContent.appendChild(salary);
  }
  
  // Posted date
  if (job.created_at) {
    const date = document.createElement('p');
    date.className = 'job-card-date';
    date.textContent = formatDateAgo(job.created_at);
    cardContent.appendChild(date);
  }
  
  // View Details button
  const viewBtn = document.createElement('button');
  viewBtn.className = 'btn-view-details';
  viewBtn.textContent = 'View Details';
  viewBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openJobDetailsModal(job);
  });
  cardContent.appendChild(viewBtn);
  
  // Append content to card
  card.appendChild(cardContent);
  
  // Add click listener to entire card (except button)
  card.addEventListener('click', (e) => {
    if (!e.target.closest('.btn-view-details')) {
      openJobDetailsModal(job);
    }
  });
  
  return card;
}

// ============================================
// MODAL - JOB DETAILS
// ============================================

/**
 * Open job details modal with full job information
 */
function openJobDetailsModal(job) {
  if (!jobDetailsModal || !job) return;
  
  // Set modal title
  if (jobDetailsTitle) {
    jobDetailsTitle.textContent = job.job_title || 'Job Details';
  }
  
  // Build modal content
  if (jobDetailsContent) {
    jobDetailsContent.innerHTML = '';
    
    // Company name
    if (job.company_name) {
      const companySection = document.createElement('div');
      companySection.className = 'job-detail-section';
      const companyLabel = document.createElement('strong');
      companyLabel.textContent = 'Company: ';
      companySection.appendChild(companyLabel);
      companySection.appendChild(document.createTextNode(escapeHtml(job.company_name)));
      jobDetailsContent.appendChild(companySection);
    }
    
    // Job Information Section (Category, Location, Level)
    const jobInfoSection = document.createElement('div');
    jobInfoSection.className = 'job-detail-section';
    jobInfoSection.style.marginBottom = '1.5rem';
    jobInfoSection.style.padding = '1rem';
    jobInfoSection.style.backgroundColor = '#f8fafc';
    jobInfoSection.style.borderRadius = '0.75rem';
    jobInfoSection.style.border = '1px solid #e2e8f0';
    
    const jobInfoTitle = document.createElement('h4');
    jobInfoTitle.textContent = 'Job Information';
    jobInfoTitle.style.marginBottom = '1rem';
    jobInfoTitle.style.fontSize = '1.125rem';
    jobInfoTitle.style.fontWeight = '600';
    jobInfoTitle.style.color = '#1e293b';
    jobInfoSection.appendChild(jobInfoTitle);
    
    const jobInfoList = document.createElement('div');
    jobInfoList.style.display = 'flex';
    jobInfoList.style.flexDirection = 'column';
    jobInfoList.style.gap = '0.75rem';
    
    // Category
    if (job.category) {
      const categoryItem = document.createElement('div');
      categoryItem.style.display = 'flex';
      categoryItem.style.alignItems = 'center';
      categoryItem.style.gap = '0.5rem';
      const categoryLabel = document.createElement('strong');
      categoryLabel.textContent = 'Category:';
      categoryLabel.style.color = '#475569';
      categoryLabel.style.minWidth = '100px';
      const categoryValue = document.createElement('span');
      categoryValue.textContent = formatCategoryName(job.category);
      categoryValue.style.color = '#1e293b';
      categoryItem.appendChild(categoryLabel);
      categoryItem.appendChild(categoryValue);
      jobInfoList.appendChild(categoryItem);
    }
    
    // Location
    if (job.location) {
      const locationItem = document.createElement('div');
      locationItem.style.display = 'flex';
      locationItem.style.alignItems = 'center';
      locationItem.style.gap = '0.5rem';
      const locationLabel = document.createElement('strong');
      locationLabel.textContent = 'Location:';
      locationLabel.style.color = '#475569';
      locationLabel.style.minWidth = '100px';
      const locationValue = document.createElement('span');
      const locationDisplay = job.location.charAt(0).toUpperCase() + job.location.slice(1);
      locationValue.textContent = locationDisplay;
      locationValue.style.color = '#1e293b';
      locationItem.appendChild(locationLabel);
      locationItem.appendChild(locationValue);
      jobInfoList.appendChild(locationItem);
    }
    
    // Level - use level field
    if (job.level) {
      const levelItem = document.createElement('div');
      levelItem.style.display = 'flex';
      levelItem.style.alignItems = 'center';
      levelItem.style.gap = '0.5rem';
      const levelLabel = document.createElement('strong');
      levelLabel.textContent = 'Level:';
      levelLabel.style.color = '#475569';
      levelLabel.style.minWidth = '100px';
      const levelValue = document.createElement('span');
      levelValue.textContent = escapeHtml(job.level);
      levelValue.style.color = '#1e293b';
      levelItem.appendChild(levelLabel);
      levelItem.appendChild(levelValue);
      jobInfoList.appendChild(levelItem);
    }
    
    if (jobInfoList.children.length > 0) {
      jobInfoSection.appendChild(jobInfoList);
      jobDetailsContent.appendChild(jobInfoSection);
    }
    
    // Description
    if (job.job_description) {
      const descSection = document.createElement('div');
      descSection.className = 'job-detail-section';
      const descTitle = document.createElement('h4');
      descTitle.textContent = 'Description';
      descSection.appendChild(descTitle);
      const descText = document.createElement('p');
      descText.textContent = escapeHtml(job.job_description);
      descSection.appendChild(descText);
      jobDetailsContent.appendChild(descSection);
    }
    
    // Benefits
    if (job.benefits) {
      const benefitsSection = document.createElement('div');
      benefitsSection.className = 'job-detail-section';
      const benefitsTitle = document.createElement('h4');
      benefitsTitle.textContent = 'Benefits';
      benefitsSection.appendChild(benefitsTitle);
      const benefitsText = document.createElement('p');
      benefitsText.textContent = escapeHtml(job.benefits);
      benefitsSection.appendChild(benefitsText);
      jobDetailsContent.appendChild(benefitsSection);
    }
    
    // Availability
    if (job.availability) {
      const availSection = document.createElement('div');
      availSection.className = 'job-detail-section';
      const availLabel = document.createElement('strong');
      availLabel.textContent = 'Availability: ';
      availSection.appendChild(availLabel);
      availSection.appendChild(document.createTextNode(escapeHtml(job.availability)));
      jobDetailsContent.appendChild(availSection);
    }
    
    // Additional info grid (Contract, Salary, etc.)
    const infoGrid = document.createElement('div');
    infoGrid.className = 'job-detail-grid';
    
    if (job.contract_type) {
      const contractItem = document.createElement('div');
      contractItem.innerHTML = `<strong>Contract:</strong> ${escapeHtml(job.contract_type)}`;
      infoGrid.appendChild(contractItem);
    }
    
    if (job.salary) {
      const salaryItem = document.createElement('div');
      salaryItem.innerHTML = `<strong>Salary:</strong> ${escapeHtml(job.salary)}`;
      infoGrid.appendChild(salaryItem);
    }
    
    if (infoGrid.children.length > 0) {
      jobDetailsContent.appendChild(infoGrid);
    }
    
    // ============================================
    // APPLICATION FORM
    // ============================================
    const applicationFormSection = document.createElement('div');
    applicationFormSection.className = 'job-application-form';
    applicationFormSection.id = 'jobApplicationForm';
    
    const formTitle = document.createElement('h3');
    formTitle.className = 'job-application-form-title';
    formTitle.id = 'applicationFormTitle';
    formTitle.textContent = window.t ? window.t('application_form_title') : 'Apply for this position';
    applicationFormSection.appendChild(formTitle);
    
    // Display job information (read-only) so candidate knows what they're applying for
    if (job.job_title || job.company_name) {
      const jobInfoDiv = document.createElement('div');
      jobInfoDiv.className = 'job-application-job-info';
      jobInfoDiv.style.marginBottom = '1rem';
      jobInfoDiv.style.padding = '1rem';
      jobInfoDiv.style.backgroundColor = '#f8fafc';
      jobInfoDiv.style.borderRadius = '0.5rem';
      jobInfoDiv.style.border = '1px solid #e2e8f0';
      
      if (job.job_title) {
        const jobTitleP = document.createElement('p');
        jobTitleP.style.margin = '0 0 0.5rem 0';
        jobTitleP.style.fontWeight = '600';
        jobTitleP.style.color = '#1e293b';
        jobTitleP.innerHTML = `<strong>Position:</strong> ${escapeHtml(job.job_title)}`;
        jobInfoDiv.appendChild(jobTitleP);
      }
      
      if (job.company_name) {
        const companyP = document.createElement('p');
        companyP.style.margin = '0';
        companyP.style.color = '#475569';
        companyP.innerHTML = `<strong>Company:</strong> ${escapeHtml(job.company_name)}`;
        jobInfoDiv.appendChild(companyP);
      }
      
      applicationFormSection.appendChild(jobInfoDiv);
    }
    
    const formSubtitle = document.createElement('p');
    formSubtitle.className = 'job-application-form-subtitle';
    formSubtitle.id = 'applicationFormSubtitle';
    formSubtitle.textContent = window.t ? window.t('application_form_subtitle') : 'Fill out the form below to submit your application.';
    applicationFormSection.appendChild(formSubtitle);
    
    // Success message
    const successMessage = document.createElement('div');
    successMessage.className = 'application-form-success';
    successMessage.id = 'applicationSuccessMessage';
    successMessage.textContent = window.t ? window.t('application_form_success') : 'Your application has been submitted successfully! We will contact you soon.';
    applicationFormSection.appendChild(successMessage);
    
    // Error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'application-form-error-message';
    errorMessage.id = 'applicationErrorMessage';
    applicationFormSection.appendChild(errorMessage);
    
    // Loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'application-form-loading';
    loadingIndicator.id = 'applicationLoading';
    loadingIndicator.textContent = window.t ? window.t('application_form_loading') : 'Submitting your application...';
    applicationFormSection.appendChild(loadingIndicator);
    
    // Form
    const form = document.createElement('form');
    form.id = 'candidateApplicationForm';
    form.setAttribute('novalidate', 'true');
    
    // Full name
    const nameGroup = document.createElement('div');
    nameGroup.className = 'application-form-group';
    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'candidateName');
    nameLabel.id = 'applicationFormNameLabel';
    nameLabel.innerHTML = (window.t ? window.t('application_form_name') : 'Full Name') + ' <span class="required">*</span>';
    nameGroup.appendChild(nameLabel);
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'candidateName';
    nameInput.name = 'candidateName';
    nameInput.required = true;
    nameInput.placeholder = window.t ? window.t('application_form_name') : 'Enter your full name';
    nameGroup.appendChild(nameInput);
    const nameError = document.createElement('span');
    nameError.className = 'application-form-error';
    nameError.id = 'candidateNameError';
    nameGroup.appendChild(nameError);
    form.appendChild(nameGroup);
    
    // Email
    const emailGroup = document.createElement('div');
    emailGroup.className = 'application-form-group';
    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'candidateEmail');
    emailLabel.id = 'applicationFormEmailLabel';
    emailLabel.innerHTML = (window.t ? window.t('application_form_email') : 'Email') + ' <span class="required">*</span>';
    emailGroup.appendChild(emailLabel);
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'candidateEmail';
    emailInput.name = 'candidateEmail';
    emailInput.required = true;
    emailInput.placeholder = 'your.email@example.com';
    emailGroup.appendChild(emailInput);
    const emailError = document.createElement('span');
    emailError.className = 'application-form-error';
    emailError.id = 'candidateEmailError';
    emailGroup.appendChild(emailError);
    form.appendChild(emailGroup);
    
    // Phone/WhatsApp
    const phoneGroup = document.createElement('div');
    phoneGroup.className = 'application-form-group';
    const phoneLabel = document.createElement('label');
    phoneLabel.setAttribute('for', 'candidatePhone');
    phoneLabel.id = 'applicationFormPhoneLabel';
    phoneLabel.textContent = window.t ? window.t('application_form_phone') : 'Phone / WhatsApp Number';
    phoneGroup.appendChild(phoneLabel);
    const phoneInput = document.createElement('input');
    phoneInput.type = 'tel';
    phoneInput.id = 'candidatePhone';
    phoneInput.name = 'candidatePhone';
    phoneInput.placeholder = '+971 50 123 4567';
    phoneGroup.appendChild(phoneInput);
    form.appendChild(phoneGroup);
    
    // CV Upload
    const cvGroup = document.createElement('div');
    cvGroup.className = 'application-form-group';
    const cvLabel = document.createElement('label');
    cvLabel.setAttribute('for', 'candidateCV');
    cvLabel.id = 'applicationFormCVLabel';
    cvLabel.innerHTML = (window.t ? window.t('application_form_cv') : 'CV / Resume') + ' <span class="required">*</span>';
    cvGroup.appendChild(cvLabel);
    const cvInput = document.createElement('input');
    cvInput.type = 'file';
    cvInput.id = 'candidateCV';
    cvInput.name = 'candidateCV';
    cvInput.accept = '.pdf,.doc,.docx';
    cvInput.required = true;
    cvGroup.appendChild(cvInput);
    const cvHint = document.createElement('span');
    cvHint.className = 'file-hint';
    cvHint.id = 'applicationFormCVHint';
    cvHint.textContent = window.t ? window.t('application_form_cv_hint') : 'Accepted formats: PDF, DOC, DOCX (max 10MB)';
    cvGroup.appendChild(cvHint);
    const cvError = document.createElement('span');
    cvError.className = 'application-form-error';
    cvError.id = 'candidateCVError';
    cvGroup.appendChild(cvError);
    form.appendChild(cvGroup);
    
    applicationFormSection.appendChild(form);
    jobDetailsContent.appendChild(applicationFormSection);
  }
  
  // ============================================
  // BOUTON "POSTULER MAINTENANT" - CONNECTED TO APPLICATION FORM
  // ============================================
  const applyNowSection = document.getElementById('applyNowSection');
  const applyNowBtn = document.getElementById('applyNowBtn');
  const applyNowMessage = document.getElementById('applyNowMessage');
  
  // Always show footer with application button
  if (jobDetailsFooter) {
    jobDetailsFooter.style.display = 'block';
  }
  
  if (applyNowSection && applyNowBtn) {
    // Always show the section and enable the button for form submission
      applyNowSection.style.display = 'block';
      applyNowBtn.disabled = false;
      applyNowBtn.style.opacity = '1';
      applyNowBtn.style.cursor = 'pointer';
    if (applyNowMessage) {
      applyNowMessage.style.display = 'none';
    }
      
    // Connect button to form submission
      applyNowBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
      handleApplicationFormSubmit(job);
    };
  }
  
  // Show modal
  jobDetailsModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

/**
 * Handle application form submission
 * This function validates the form, uploads the CV to Supabase Storage,
 * and saves the application to the applications table.
 */
async function handleApplicationFormSubmit(job) {
  // ============================================
  // STEP 1: Get form elements and references
  // ============================================
  const form = document.getElementById('candidateApplicationForm');
  const nameInput = document.getElementById('candidateName');
  const emailInput = document.getElementById('candidateEmail');
  const phoneInput = document.getElementById('candidatePhone');
  const cvInput = document.getElementById('candidateCV');
  const successMessage = document.getElementById('applicationSuccessMessage');
  const errorMessage = document.getElementById('applicationErrorMessage');
  const loadingIndicator = document.getElementById('applicationLoading');
  const nameError = document.getElementById('candidateNameError');
  const emailError = document.getElementById('candidateEmailError');
  const cvError = document.getElementById('candidateCVError');
  
  if (!form || !job) return;
  
  // ============================================
  // STEP 2: Reset UI state (hide messages, clear errors)
  // ============================================
  if (successMessage) successMessage.classList.remove('show');
  if (errorMessage) {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
  }
  if (loadingIndicator) loadingIndicator.classList.remove('show');
  if (nameError) nameError.textContent = '';
  if (emailError) emailError.textContent = '';
  if (cvError) cvError.textContent = '';
  
  // ============================================
  // STEP 3: Validate form fields
  // ============================================
  let isValid = true;
  
  // Validate full name (required)
  const fullName = nameInput?.value.trim() || '';
  if (!fullName) {
    isValid = false;
    if (nameError) nameError.textContent = window.t ? window.t('application_form_name_required') : 'Full name is required';
  }
  
  // Validate email (required, must be valid format)
  const email = emailInput?.value.trim() || '';
  if (!email) {
    isValid = false;
    if (emailError) emailError.textContent = window.t ? window.t('application_form_email_required') : 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    isValid = false;
    if (emailError) emailError.textContent = window.t ? window.t('application_form_email_invalid') : 'Please enter a valid email address';
  }
  
  // Validate CV file (required, must be PDF/DOC/DOCX, max 10MB)
  const cvFile = cvInput?.files[0];
  if (!cvFile) {
    isValid = false;
    if (cvError) cvError.textContent = window.t ? window.t('application_form_cv_required') : 'CV file is required';
  } else {
    // Check file extension
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = cvFile.name.toLowerCase();
    const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
    
    if (!allowedExtensions.includes(fileExtension)) {
      isValid = false;
      if (cvError) cvError.textContent = window.t ? window.t('application_form_cv_invalid') : 'Only PDF, DOC, and DOCX files are allowed';
    }
    
    // Check file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (cvFile.size > maxSize) {
      isValid = false;
      if (cvError) cvError.textContent = window.t ? window.t('application_form_cv_size') : 'File size must be less than 10MB';
    }
  }
  
  // If validation fails, show errors and stop
  if (!isValid) {
    const firstError = form.querySelector('.application-form-error:not(:empty)');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  // ============================================
  // STEP 4: Show loading state
  // ============================================
  if (loadingIndicator) {
    loadingIndicator.classList.add('show');
    form.style.opacity = '0.6';
    form.style.pointerEvents = 'none';
  }
  
  // ============================================
  // STEP 5: Ensure Supabase client is available
  // ============================================
  try {
    let retries = 10;
    while (!window.supabaseClient && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
      retries--;
    }
    
    if (!window.supabaseClient) {
      throw new Error(window.t ? window.t('application_form_error_client') : 'Supabase client not available. Please refresh the page and try again.');
    }
    
    // ============================================
    // STEP 6: Upload CV file to Supabase Storage
    // ============================================
    // Generate unique filename: job_id + timestamp + original filename
    const jobId = String(job.id || '').replace(/[^a-zA-Z0-9]/g, '_');
    const timestamp = Date.now();
    const originalFileName = cvFile.name;
    const fileExtension = originalFileName.substring(originalFileName.lastIndexOf('.'));
    const uniqueFileName = `${jobId}_${timestamp}_${originalFileName}`;
    
    // Upload to 'cvs' bucket
    const { data: uploadData, error: uploadError } = await window.supabaseClient.storage
      .from('cvs')
      .upload(uniqueFileName, cvFile);
    
    if (uploadError) {
      console.error('CV upload error:', uploadError);
      throw new Error(window.t ? window.t('application_form_error_upload') : 'Failed to upload CV file. Please try again.');
    }
    
    // ============================================
    // STEP 7: Get public URL of uploaded CV
    // ============================================
    const { data: urlData } = window.supabaseClient.storage
      .from('cvs')
      .getPublicUrl(uniqueFileName);
    
    const cvUrl = urlData?.publicUrl;
    
    if (!cvUrl) {
      // If we can't get the URL, try to delete the uploaded file
      try {
        await window.supabaseClient.storage.from('cvs').remove([uniqueFileName]);
      } catch (deleteError) {
        console.error('Failed to delete uploaded file:', deleteError);
      }
      throw new Error(window.t ? window.t('application_form_error_url') : 'Failed to get CV file URL. Please try again.');
    }
    
    // ============================================
    // STEP 8: Insert application into database
    // ============================================
    const phone = phoneInput?.value.trim() || null;
    const currentJobId = job.id;
    const currentJobTitle = job.job_title || null;
    
    // Get company_name from job object
    const currentCompanyName = job.company_name || null;
    
    // Insert application into applications table
    const { data: applicationResult, error: applicationError } = await window.supabaseClient
      .from('applications')
      .insert({
        job_id: currentJobId,                      // job.id from job_offers_pending (int8)
        job_title: currentJobTitle,                // job.job_title
        company_name: currentCompanyName,          // job.company_name
        full_name: fullName,                       // From form
        email: email,                              // From form
        phone: phone || null,                      // From form (optional)
        cv_url: cvUrl || null                     // From uploaded file (optional)
      })
      .select();
    
    if (applicationError) {
      // Log detailed error information
      console.error('❌ Application insert error:');
      console.error('Error code:', applicationError.code);
      console.error('Error message:', applicationError.message);
      console.error('Error details:', applicationError.details);
      console.error('Error hint:', applicationError.hint);
      
      // Try to delete uploaded file if database insert fails
      try {
        await window.supabaseClient.storage.from('cvs').remove([uniqueFileName]);
      } catch (deleteError) {
        console.error('Failed to delete uploaded file after insert error:', deleteError);
      }
      
      // Show error message to user
      if (errorMessage) {
        const errorText = applicationError.message || (window.t ? window.t('application_form_error_save') : 'Failed to save application. Please try again.');
        errorMessage.textContent = errorText;
        errorMessage.classList.add('show');
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      if (loadingIndicator) loadingIndicator.classList.remove('show');
      form.style.opacity = '1';
      form.style.pointerEvents = 'auto';
      return;
    }
    
    // ============================================
    // STEP 9: Success - show message and reset form
    // ============================================
    if (loadingIndicator) loadingIndicator.classList.remove('show');
    
    if (successMessage) {
      successMessage.textContent = 'Your application has been sent successfully.';
      successMessage.classList.add('show');
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Reset form fields
    form.reset();
    form.style.opacity = '1';
    form.style.pointerEvents = 'auto';
    
    // Log success with details
    console.log('✅ Application submitted successfully!', applicationResult);
    console.log('✅ Application ID:', applicationResult?.[0]?.id);
    console.log('✅ Job ID:', currentJobId);
    console.log('✅ Job Title:', currentJobTitle);
    console.log('✅ Company Name:', currentCompanyName);
    console.log('✅ Candidate Name:', fullName);
    console.log('✅ Candidate Email:', email);
    
    // Close modal after a short delay to show success message
    setTimeout(() => {
      closeJobDetailsModal();
    }, 2000);
    
  } catch (err) {
    // ============================================
    // ERROR HANDLING: Show error message to user
    // ============================================
    console.error('Error in handleApplicationFormSubmit:', err);
    
    if (loadingIndicator) loadingIndicator.classList.remove('show');
    form.style.opacity = '1';
    form.style.pointerEvents = 'auto';
    
    if (errorMessage) {
      const errorText = err.message || (window.t ? window.t('application_form_error_generic') : 'An error occurred. Please try again.');
      errorMessage.textContent = errorText;
      errorMessage.classList.add('show');
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

/**
 * Close job details modal
 */
function closeJobDetailsModal() {
  if (jobDetailsModal) {
    jobDetailsModal.style.display = 'none';
    document.body.style.overflow = '';
    
    // Reset form if it exists
    const form = document.getElementById('candidateApplicationForm');
    if (form) {
      form.reset();
    }
    
    // Hide messages
    const successMessage = document.getElementById('applicationSuccessMessage');
    const errorMessage = document.getElementById('applicationErrorMessage');
    const loadingIndicator = document.getElementById('applicationLoading');
    if (successMessage) successMessage.classList.remove('show');
    if (errorMessage) errorMessage.classList.remove('show');
    if (loadingIndicator) loadingIndicator.classList.remove('show');
  }
}

// Close modal when clicking outside
if (jobDetailsModal) {
  jobDetailsModal.addEventListener('click', (e) => {
    if (e.target === jobDetailsModal) {
      closeJobDetailsModal();
      }
    });
  }
  
// ============================================
// EMPTY STATE & ERROR HANDLING
// ============================================

/**
 * Show empty state when no jobs available
 */
function showEmptyState() {
  if (jobsContainer) {
    jobsContainer.style.display = 'none';
  }
  if (jobsEmpty) {
    // Check if filters are active
    const hasActiveFilters = (filterCategory?.value && filterCategory.value !== '') ||
                            (filterLocation?.value && filterLocation.value !== '') ||
                            (filterExperience?.value && filterExperience.value !== '');
    
    if (hasActiveFilters) {
      jobsEmpty.innerHTML = '<p>No jobs match your current filters. Try adjusting your search criteria.</p>';
    } else {
    jobsEmpty.innerHTML = '<p>Aucune offre disponible pour le moment. Revenez bientôt.</p>';
    }
    jobsEmpty.style.display = 'block';
  }
}

/**
 * Show error message to user
 */
function showError(message) {
  if (jobsContainer) {
    jobsContainer.style.display = 'none';
  }
  if (jobsEmpty) {
    jobsEmpty.innerHTML = `<p style="color: #ef4444; text-align: center; padding: 2rem;">${message}</p>`;
    jobsEmpty.style.display = 'block';
  }
}

// ============================================
// COMPANY JOB OFFER MODAL
// ============================================

/**
 * Open company job offer modal
 */
function openCompanyJobModal() {
  const modal = document.getElementById('companyJobModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close company job offer modal
 */
function closeCompanyJobModal() {
  const modal = document.getElementById('companyJobModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    // Reset form
    const form = document.getElementById('companyJobForm');
    if (form) {
      form.reset();
    }
    // Hide message
    const messageEl = document.getElementById('companyFormMessage');
    if (messageEl) {
      messageEl.style.display = 'none';
    }
  }
}

/**
 * Show message in company form modal
 * ⬅️ TO MODIFY MESSAGES: Change the text in the showFormMessage function calls below
 */
function showFormMessage(message, isError = false) {
  const messageEl = document.getElementById('companyFormMessage');
  if (!messageEl) return;
  
  messageEl.style.display = 'block';
  messageEl.textContent = message;
  messageEl.style.backgroundColor = isError ? '#fee2e2' : '#d1fae5';
  messageEl.style.color = isError ? '#991b1b' : '#065f46';
  messageEl.style.border = `1px solid ${isError ? '#fecaca' : '#a7f3d0'}`;
  
  // Scroll to message
  messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Handle company job offer form submission
 * ⬅️ TO MODIFY TABLE NAME: Change 'job_offers_pending' below if you use a different table name
 */
async function handleCompanyJobSubmit(event) {
  event.preventDefault();
  console.log('Submitting company job offer...');
  
  const form = document.getElementById('companyJobForm');
  if (!form) return;
  
  // Get form values - Map all fields to Supabase schema
  const companyName = document.getElementById('companyName')?.value.trim() || '';
  const contactPerson = document.getElementById('contactPerson')?.value.trim() || '';
  const contactInfo = document.getElementById('contactInfo')?.value.trim() || '';
  const jobTitle = document.getElementById('jobTitle')?.value.trim() || '';
  const jobDescription = document.getElementById('jobDescription')?.value.trim() || '';
  const availability = document.getElementById('availability')?.value.trim() || '';
  // Get location from the form - convert to lowercase to match ENUM values
  const locationSelect = document.getElementById('companyLocation');
  const location = locationSelect?.value?.toLowerCase() || null;
  // Get category and level from the form
  const categorySelect = document.getElementById('companyCategory');
  const category = categorySelect?.value || null;
  const levelSelect = document.getElementById('companyLevel');
  const level = levelSelect?.value || null;
  // Optional fields (may not exist in simplified form)
  const salary = document.getElementById('companySalary')?.value.trim() || null;
  const contractType = document.getElementById('companyContract')?.value.trim() || null;
  const benefits = document.getElementById('companyBenefits')?.value.trim() || null;
  
  // Validation - Required fields
  // ⬅️ TO MODIFY VALIDATION: Add or remove required field checks below
  if (!companyName) {
    showFormMessage('Le champ "Nom de l\'entreprise" est obligatoire.', true);
    return;
  }
  if (!contactPerson) {
    showFormMessage('Le champ "Nom de la personne de contact" est obligatoire.', true);
    return;
  }
  if (!contactInfo) {
    showFormMessage('Le champ "Email ou WhatsApp" est obligatoire.', true);
    return;
  }
  if (!jobTitle) {
    showFormMessage('Le champ "Titre du poste" est obligatoire.', true);
    return;
  }
  if (!jobDescription) {
    showFormMessage('Le champ "Description du poste" est obligatoire.', true);
    return;
  }
  if (!location) {
    showFormMessage('Le champ "Location" est obligatoire.', true);
    return;
  }
  // Validate location value matches ENUM
  if (location && !['dubai', 'sharjah', 'remote'].includes(location)) {
    showFormMessage('Veuillez sélectionner une location valide (Dubai, Sharjah, ou Remote).', true);
    return;
  }
  
  // Prepare data for Supabase insertion
  // Mapping: form fields → database columns (job_offers_pending table)
  // Only include columns that exist in the job_offers_pending table schema
  const supabaseData = {
    company_name: companyName,                    // Company Name input → company_name
    contact_name: contactPerson,                  // Contact Person Name input → contact_name
    contact_email: contactInfo,                   // Email or WhatsApp input → contact_email
    contact_whatsapp: contactInfo,                // Email or WhatsApp input → contact_whatsapp (same value)
    job_title: jobTitle,                          // Job Title input → job_title
    job_description: jobDescription,              // Job Description textarea → job_description
    category: category,                            // Category dropdown → category
    location: location,                            // Location dropdown → location (lowercase)
    level: level,                                 // Level dropdown → level
    availability: availability || null,          // Availability field → availability (optional)
    salary: salary || null,                       // Salary field → salary (optional)
    contract_type: contractType || null,          // Contract type field → contract_type (optional)
    benefits: benefits || null,                   // Benefits field → benefits (optional)
    status: 'pending'                             // Hard-coded status → 'pending'
  };
  
  try {
    // Wait for Supabase client
    let retries = 10;
    while (!window.supabaseClient && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
      retries--;
    }
    
    if (!window.supabaseClient) {
      console.error('Supabase client not available');
      // ⬅️ TO MODIFY ERROR MESSAGE: Change the text below
      showFormMessage('Erreur de connexion. Veuillez réessayer plus tard.', true);
      return;
    }
    
    // Insert into Supabase
    // ⬅️ TO MODIFY TABLE NAME: Change 'job_offers_pending' to your actual table name
    const { data, error } = await window.supabaseClient
      .from('job_offers_pending')
      .insert([supabaseData])
      .select();
    
    if (error) {
      // Log detailed error information
      console.error('❌ Supabase insert error:');
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      
      // Show user-friendly error message
      const errorMsg = error.message || 'Erreur lors de l\'envoi. Veuillez réessayer.';
      showFormMessage(errorMsg, true);
      return;
    }
    
    console.log('✅ Job offer submitted successfully!', data);
    console.log('✅ Job ID:', data?.[0]?.id);
    console.log('✅ Category:', category);
    console.log('✅ Location:', location);
    console.log('✅ Level:', level);
    
    // Success message
    showFormMessage('✅ Your job offer has been submitted successfully! It will be reviewed before publication.', false);
    
    // Reset form and close modal after a short delay
    setTimeout(() => {
      form.reset();
      closeCompanyJobModal();
    }, 2000);
    
  } catch (err) {
    console.error('Error in handleCompanyJobSubmit:', err);
    // ⬅️ TO MODIFY ERROR MESSAGE: Change the text below
    showFormMessage('Une erreur est survenue. Veuillez réessayer.', true);
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Close modal button
if (closeDetailsModal) {
  closeDetailsModal.addEventListener('click', closeJobDetailsModal);
}

// Contact WorldXpat button (for companies) - Opens company job offer modal
// ⬅️ TO MODIFY: If you change the button id in jobs.html, update it here too
const contactCompanyBtn = document.getElementById('contact-company-btn');
if (contactCompanyBtn) {
  contactCompanyBtn.addEventListener('click', openCompanyJobModal);
}

// Company job offer form submission
const companyJobForm = document.getElementById('companyJobForm');
if (companyJobForm) {
  companyJobForm.addEventListener('submit', handleCompanyJobSubmit);
}

// Close company modal button
const closeCompanyModal = document.getElementById('closeCompanyModal');
if (closeCompanyModal) {
  closeCompanyModal.addEventListener('click', closeCompanyJobModal);
}

// Close company modal when clicking outside
const companyJobModal = document.getElementById('companyJobModal');
if (companyJobModal) {
  companyJobModal.addEventListener('click', (e) => {
    if (e.target === companyJobModal) {
      closeCompanyJobModal();
      }
    });
  }

// ============================================
// FILTER EVENT LISTENERS
// ============================================

// Add event listeners to filter dropdowns
if (filterCategory) {
  filterCategory.addEventListener('change', applyFilters);
}

if (filterLocation) {
  filterLocation.addEventListener('change', applyFilters);
}

if (filterExperience) {
  filterExperience.addEventListener('change', applyFilters);
  }
  
// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the jobs page
 */
async function init() {
  console.log('Jobs page initialization started');
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    await new Promise(resolve => {
      document.addEventListener('DOMContentLoaded', resolve);
    });
  }
  
  // Load jobs from Supabase
  await loadJobs();
  
  console.log('Jobs page initialization complete');
}

// Start initialization
init();

// ============================================
// LANGUAGE CHANGE HANDLER
// ============================================
// Update application form texts when language changes
window.addEventListener('languageChanged', () => {
  updateApplicationFormTexts();
});

/**
 * Update all application form texts based on current language
 */
function updateApplicationFormTexts() {
  if (!window.t) return;
  
  // Update form title and subtitle
  const formTitle = document.getElementById('applicationFormTitle');
  if (formTitle) {
    formTitle.textContent = window.t('application_form_title');
  }
  
  const formSubtitle = document.getElementById('applicationFormSubtitle');
  if (formSubtitle) {
    formSubtitle.textContent = window.t('application_form_subtitle');
  }
  
  // Update labels
  const nameLabel = document.getElementById('applicationFormNameLabel');
  if (nameLabel) {
    nameLabel.innerHTML = window.t('application_form_name') + ' <span class="required">*</span>';
  }
  
  const emailLabel = document.getElementById('applicationFormEmailLabel');
  if (emailLabel) {
    emailLabel.innerHTML = window.t('application_form_email') + ' <span class="required">*</span>';
  }
  
  const phoneLabel = document.getElementById('applicationFormPhoneLabel');
  if (phoneLabel) {
    phoneLabel.textContent = window.t('application_form_phone');
  }
  
  const cvLabel = document.getElementById('applicationFormCVLabel');
  if (cvLabel) {
    cvLabel.innerHTML = window.t('application_form_cv') + ' <span class="required">*</span>';
  }
  
  // Update hints
  const cvHint = document.getElementById('applicationFormCVHint');
  if (cvHint) {
    cvHint.textContent = window.t('application_form_cv_hint');
  }
  
  // Update loading indicator
  const loadingIndicator = document.getElementById('applicationLoading');
  if (loadingIndicator) {
    loadingIndicator.textContent = window.t('application_form_loading');
  }
  
  // Update success message (if visible)
  const successMessage = document.getElementById('applicationSuccessMessage');
  if (successMessage && successMessage.classList.contains('show')) {
    successMessage.textContent = window.t('application_form_success');
  }
  
  // Update button text
  const applyBtn = document.getElementById('applyNowBtn');
  if (applyBtn) {
    applyBtn.textContent = window.t('application_form_submit');
  }
}
