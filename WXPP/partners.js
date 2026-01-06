// ============================================
// PARTNERS DATA & LOGIC
// ============================================

// Données des partenaires avec textes FR / EN
// Structure simple pour faciliter l'ajout/modification
const partners = [
  {
    id: 'louis',
    name: { en: 'Louis', fr: 'Louis' },
    role: {
      en: 'Company setup in Dubai',
      fr: 'Création de société à Dubaï',
  },
    description: {
      en: 'Louis helps you open your company in Dubai, get your visa and your Emirates ID.',
      fr: 'Louis t\'aide à ouvrir ta boîte à Dubaï, à obtenir ton visa et ton Emirates ID.',
    },
    whatsapp: '+33 6 76 67 02 16',
    photoUrl: 'louis.png', // Temporaire - à remplacer par vraie photo
    tags: {
      en: ['French / English', 'Visa expert'],
      fr: ['Français / English', 'Expert visa'],
  },
  },
  {
    id: 'negar',
    name: { en: 'Negar', fr: 'Negar' },
    role: {
      en: 'Off-plan investments in Dubai',
      fr: 'Investissements off-plan à Dubaï',
    },
    description: {
      en: 'Negar helps you find the best off-plan investments in Dubai.',
      fr: 'Negar s\'occupe de vous trouver les meilleurs investissements offplan à Dubai.',
    },
    whatsapp: '', // À remplir avec le numéro WhatsApp de Negar
    photoUrl: 'Negar.png',
    tags: {
      en: ['Off-plan', 'Real estate', 'Investment'],
      fr: ['Off-plan', 'Immobilier', 'Investissement'],
    },
  },
  {
    id: 'romain',
    name: { en: 'Romain', fr: 'Romain' },
    role: {
      en: 'Cars in Dubai',
      fr: 'Voitures à Dubaï',
    },
    description: {
      en: 'I help you find the best cars with the best quality-price ratio in Dubai based on your needs.',
      fr: 'Je m\'occupe de vous trouver les meilleures voitures rapport qualité prix sur Dubai en fonction de vos besoins.',
    },
    whatsapp: '', // À remplir avec votre numéro WhatsApp
    photoUrl: 'moi.png',
    tags: {
      en: ['Cars', 'Vehicles', 'Quality-price'],
      fr: ['Voitures', 'Véhicules', 'Rapport qualité-prix'],
    },
  },
];

// Langue courante côté partenaires (indépendant de script.js)
let partnersLanguage = 'en';

// Helper pour récupérer un texte traduit depuis l'objet partenaire
function getPartnerText(partner, field) {
  const value = partner[field];
  const lang = partnersLanguage === 'fr' ? 'fr' : 'en';

  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') {
    return value[lang] || value.en || '';
  }
  return '';
}

// Fonction pour créer une carte partenaire
function createPartnerCard(partner) {
  const card = document.createElement('div');
  card.className = 'partner-card partner-card-animate';

  const role = getPartnerText(partner, 'role');
  const description = getPartnerText(partner, 'description');
  const name = getPartnerText(partner, 'name');
  const lang = partnersLanguage === 'fr' ? 'fr' : 'en';

  // Tags HTML
  const rawTags = Array.isArray(partner.tags)
    ? partner.tags
    : partner.tags?.[lang] || partner.tags?.en || [];
  const tagsHTML = rawTags
    .map((tag) => `<span class="partner-tag">${tag}</span>`)
    .join('');

  // WhatsApp SVG icon
  const whatsappIcon = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  `;

  // Construire le HTML de la carte
  const descriptionText = description || (lang === 'fr' ? 'Disponible sur WhatsApp' : 'Available on WhatsApp');
  
  card.innerHTML = `
    <div class="partner-trusted-badge">Trusted partner</div>
    <div class="partner-avatar-wrapper">
      <img src="${partner.photoUrl}" alt="${name}" class="partner-avatar" onerror="this.onerror=null; this.style.display='none'; const wrapper = this.parentElement; const placeholderWrapper = wrapper.nextElementSibling; if(placeholderWrapper) { wrapper.style.display='none'; placeholderWrapper.style.display='flex'; }">
    </div>
    <div class="partner-avatar-placeholder-wrapper" style="display: none;">
      <div class="partner-avatar-placeholder">${name.charAt(0).toUpperCase()}</div>
    </div>
    <h3 class="partner-name">${name}</h3>
    <p class="partner-role-subtitle">${role}</p>
    <p class="partner-description">${descriptionText}</p>
    ${partner.tags && rawTags.length > 0 ? `<div class="partner-tags">${tagsHTML}</div>` : ''}
    <a href="${partner.whatsapp ? `https://wa.me/${partner.whatsapp.replace(/[^0-9]/g, '')}` : 'https://wa.me/33676670216'}" 
       target="_blank" 
       rel="noopener" 
       class="partner-whatsapp-btn"
       data-i18n="partner_contact_whatsapp">
      ${whatsappIcon}
      <span>Contact on WhatsApp</span>
    </a>
  `;

  return card;
}

// Fonction pour initialiser les partenaires
function initPartners() {
  const partnersGrid = document.getElementById('partnersGrid');
  if (!partnersGrid) return;

  // Vider la grille
  partnersGrid.innerHTML = '';

  // Créer et ajouter chaque carte avec un délai pour l'animation
  partners.forEach((partner, index) => {
    const card = createPartnerCard(partner);
    card.style.animationDelay = `${index * 100}ms`;
    partnersGrid.appendChild(card);
  });

  // Mettre à jour les textes i18n
  updatePartnerTexts();
}

// Fonction pour mettre à jour les textes des boutons WhatsApp
function updatePartnerTexts() {
  if (typeof t === 'undefined') return; // Attendre que script.js soit chargé

  const buttons = document.querySelectorAll('.partner-whatsapp-btn span');
  buttons.forEach((span) => {
    const text = t('partner_contact_whatsapp');
    if (text) {
      span.textContent = text;
    }
  });
}

// Initialisation au chargement de la page
function initPartnersPage() {
  // Attendre que script.js soit chargé
  if (typeof t === 'undefined') {
    setTimeout(initPartnersPage, 100);
    return;
  }

  // Détecter la langue active au chargement
  const activeLangButton = document.querySelector('[data-language-option][aria-pressed="true"]');
  partnersLanguage = activeLangButton?.dataset.languageOption === 'fr' ? 'fr' : 'en';
  
  initPartners();
  
  // Écouter les changements de langue depuis script.js
  window.addEventListener('languageChanged', (event) => {
    const lang = event?.detail?.language;
    partnersLanguage = lang === 'fr' ? 'fr' : 'en';
    initPartners();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPartnersPage);
} else {
  initPartnersPage();
}

