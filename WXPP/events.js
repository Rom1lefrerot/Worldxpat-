// ============================================
// EVENTS PAGE - SIMPLE VERSION
// ============================================

console.log('events.js loaded');

// ============================================
// DATA - ÉVÉNEMENTS PAR NATIONALITÉ
// ============================================

// Événements globaux qui s'affichent pour toutes les nationalités
const GLOBAL_EVENTS = [
  {
    id: 'newcomers-meeting-2026',
    titleKey: 'event_newcomers_meeting_2026_title',
    descriptionKey: 'event_newcomers_meeting_2026_desc',
    type: 'Soirée Newcomers',
    date: '2026-02-03',
    time: '19:00',
    location: 'Dubai',
    image: 'meeting.png',
  },
];

const EVENTS_BY_NATIONALITY = {
  FR: [
    {
      id: 'fr-ireland-1',
      titleKey: 'event_fr_ireland_title',
      descriptionKey: 'event_fr_ireland_desc',
      type: 'Soirée Sportive',
      date: '2025-02-05',
      time: '00:10',
      location: 'Dubai',
      image: 'c.png',
    },
  ],
  GB: [
    {
      id: 'gb-wales-1',
      titleKey: 'event_gb_wales_title',
      descriptionKey: 'event_gb_wales_desc',
      type: 'Soirée Sportive',
      date: '2025-02-07',
      time: '20:40',
      location: 'Dubai',
      image: 'ccc.png',
    },
  ],
  IE: [
    {
      id: 'ie-france-1',
      titleKey: 'event_fr_ireland_title',
      descriptionKey: 'event_fr_ireland_desc',
      type: 'Soirée Sportive',
      date: '2025-02-05',
      time: '00:10',
      location: 'Dubai',
      image: 'c.png',
    },
  ],
  MA: [
 
  ],
  IT: [
    {
      id: 'it-scotland-1',
      titleKey: 'event_it_scotland_title',
      descriptionKey: 'event_it_scotland_desc',
      type: 'Soirée Sportive',
      date: '2025-02-07',
      time: '18:10',
      location: 'Dubai',
      image: 'cc.png',
    },
  ],
  SC: [
    {
      id: 'sc-italy-1',
      titleKey: 'event_it_scotland_title',
      descriptionKey: 'event_it_scotland_desc',
      type: 'Soirée Sportive',
      date: '2025-02-07',
      time: '18:10',
      location: 'Dubai',
      image: 'cc.png',
    },
  ],
  WL: [
    {
      id: 'wl-england-1',
      titleKey: 'event_gb_wales_title',
      descriptionKey: 'event_gb_wales_desc',
      type: 'Soirée Sportive',
      date: '2025-02-07',
      time: '20:40',
      location: 'Dubai',
      image: 'ccc.png',
    },
  ],
};

// Mapping des types d'événements avec leurs icônes et images
const EVENT_TYPE_ICONS = {
  'Soirée Rencontre': '🤝',
  'Soirée Newcomers': '👋',
  'Soirée Boat Party': '⛵',
  'Soirée Dating': '💕',
  'Soirée Quiz': '🧠',
  'Soirée Sportive': '⚽',
  'Soirée Brunch': '🥐',
};

// Mapping des types d'événements vers les clés de traduction
const EVENT_TYPE_TRANSLATION_KEYS = {
  'Soirée Rencontre': 'event_type_meetup',
  'Soirée Newcomers': 'event_type_newcomers',
  'Soirée Boat Party': 'event_type_boat_party',
  'Soirée Dating': 'event_type_dating',
  'Soirée Quiz': 'event_type_quiz',
  'Soirée Sportive': 'event_type_sport',
  'Soirée Brunch': 'event_type_brunch',
};

// Mapping des types d'événements vers les catégories
const EVENT_TYPE_CATEGORIES = {
  'Soirée Rencontre': 'meetup',
  'Soirée Newcomers': 'meetup',
  'Soirée Boat Party': 'party',
  'Soirée Dating': 'party',
  'Soirée Quiz': 'party',
  'Soirée Sportive': 'sport',
  'Soirée Brunch': 'brunch',
};

// Catégories disponibles
const EVENT_CATEGORIES = {
  meetup: { en: 'Meetup', fr: 'Rencontre' },
  party: { en: 'Party', fr: 'Soirée' },
  brunch: { en: 'Brunch', fr: 'Brunch' },
  sport: { en: 'Sport', fr: 'Sport' },
};

// URLs WhatsApp pour les groupes d'événements par nationalité
const WHATSAPP_EVENTS_URLS = {
  FR: 'https://chat.whatsapp.com/BiL3Sc0pAhB9u6Bd5yGpt8',
  GB: 'https://chat.whatsapp.com/LkEAT5AlWC8DUfXUHzp0n4',
  IE: 'https://chat.whatsapp.com/Iu8eYqO4M01C5RR4B2uo3L',
  MA: 'https://chat.whatsapp.com/HsU2cvFUCytD0wsPbBLOXV', // Groupe events marocain
  IT: 'https://chat.whatsapp.com/BiL3Sc0pAhB9u6Bd5yGpt8', // À remplacer par le vrai lien
  SC: 'https://chat.whatsapp.com/BiL3Sc0pAhB9u6Bd5yGpt8', // À remplacer par le vrai lien
  WL: 'https://chat.whatsapp.com/LkEAT5AlWC8DUfXUHzp0n4', // À remplacer par le vrai lien
};

// Images par type d'événement (utilisant Unsplash pour de belles images)
const EVENT_TYPE_IMAGES = {
  'Soirée Rencontre': 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
  'Soirée Newcomers': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
  'Soirée Boat Party': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'Soirée Dating': 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop',
  'Soirée Quiz': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
  'Soirée Sportive': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
  'Soirée Brunch': 'https://images.unsplash.com/photo-1525351484163-752a5b8e0e0e?w=800&h=600&fit=crop',
};

// Mapping des nationalités avec leurs noms
const NATIONALITY_NAMES = {
  FR: 'Francophones',
  GB: 'British',
  IE: 'Irish',
  MA: 'Moroccan',
  IT: 'Italian',
  SC: 'Scottish',
  WL: 'Welsh',
};

// ============================================
// DOM ELEMENTS
// ============================================

const nationalitySelect = document.getElementById('nationalitySelect');
const categorySelect = document.getElementById('categorySelect');
const eventsContainer = document.getElementById('eventsContainer');
const eventsEmpty = document.getElementById('eventsEmpty');

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Formate une date pour l'affichage selon la langue actuelle
 */
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    // Obtenir la langue actuelle depuis script.js ou utiliser 'en' par défaut
    // Vérifier d'abord window.currentLanguage, puis localStorage, puis 'en' par défaut
    let currentLang = 'en';
    if (window.currentLanguage) {
      currentLang = window.currentLanguage;
    } else if (typeof localStorage !== 'undefined') {
      currentLang = localStorage.getItem('worldxpat_language') || 'en';
    }
    const locale = currentLang === 'fr' ? 'fr-FR' : 'en-GB';
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(locale, options);
  } catch (e) {
    return dateString;
  }
}

/**
 * Obtient l'icône pour un type d'événement
 */
function getEventTypeIcon(type) {
  return EVENT_TYPE_ICONS[type] || '🎉';
}

/**
 * Obtient le texte traduit pour un type d'événement
 */
function getEventTypeTranslated(type) {
  const translationKey = EVENT_TYPE_TRANSLATION_KEYS[type];
  if (translationKey && window.t) {
    return window.t(translationKey);
  }
  return type; // Fallback vers le type original
}

/**
 * Obtient l'URL WhatsApp pour une nationalité
 */
function getWhatsAppUrl(nationality) {
  // Tous les événements redirigent vers le même groupe WhatsApp
  return 'https://chat.whatsapp.com/BfuDNywd3K6LZ1MRppiikN';
}

/**
 * Obtient l'image pour un événement
 * Système de priorité :
 * 1. Si event.image est défini → utiliser cette image (URL personnalisée)
 * 2. Sinon, chercher automatiquement images/events/{event.id}.{ext}
 * 3. Sinon, utiliser l'image par défaut du type
 */
function getEventTypeImage(event) {
  // Priorité 1 : Image personnalisée explicitement définie
  if (event.image) {
    return event.image;
  }
  
  // Priorité 2 : Chercher automatiquement une image basée sur l'ID
  // Le système cherchera automatiquement dans images/events/{event.id}.jpg
  // Si l'image n'existe pas, onerror dans le HTML utilisera l'image par défaut
  return `images/events/${event.id}.jpg`;
}

/**
 * Obtient l'image de fallback (image par défaut du type)
 */
function getEventTypeFallbackImage(event) {
  return EVENT_TYPE_IMAGES[event.type] || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop';
}

/**
 * Obtient le nom de la nationalité
 */
function getNationalityName(code) {
  if (code === 'ALL') {
    // Pour les événements globaux, utiliser la traduction
    return window.t ? window.t('events_all_nationalities') : 'All nationalities';
  }
  return NATIONALITY_NAMES[code] || code;
}

// ============================================
// RENDERING FUNCTIONS
// ============================================

/**
 * Obtient la catégorie d'un événement
 */
function getEventCategory(eventType) {
  return EVENT_TYPE_CATEGORIES[eventType] || null;
}

/**
 * Affiche les événements filtrés par nationalité et catégorie
 */
function renderEvents(selectedNationality = '', selectedCategory = '') {
  if (!eventsContainer) return;

  eventsContainer.innerHTML = '';

  let eventsToShow = [];

  // Toujours ajouter les événements globaux
  GLOBAL_EVENTS.forEach(event => {
    eventsToShow.push({
      ...event,
      nationality: 'ALL', // Marquer comme événement global
    });
  });

  if (selectedNationality && EVENTS_BY_NATIONALITY[selectedNationality]) {
    // Afficher les événements de la nationalité sélectionnée
    EVENTS_BY_NATIONALITY[selectedNationality].forEach(event => {
      eventsToShow.push({
        ...event,
        nationality: selectedNationality,
      });
    });
  } else if (!selectedNationality) {
    // Afficher tous les événements de toutes les nationalités
    Object.keys(EVENTS_BY_NATIONALITY).forEach(nationality => {
      EVENTS_BY_NATIONALITY[nationality].forEach(event => {
        eventsToShow.push({
          ...event,
          nationality,
        });
      });
    });
  }

  // Filtrer par catégorie si une catégorie est sélectionnée
  if (selectedCategory) {
    eventsToShow = eventsToShow.filter(event => {
      const eventCategory = getEventCategory(event.type);
      return eventCategory === selectedCategory;
    });
  }

  // Trier par date
  eventsToShow.sort((a, b) => new Date(a.date) - new Date(b.date));

  if (eventsToShow.length === 0) {
    eventsEmpty.style.display = 'block';
    return;
  }
  
  eventsEmpty.style.display = 'none';

  eventsToShow.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';

    const icon = getEventTypeIcon(event.type);
    const image = getEventTypeImage(event);
    const fallbackImage = getEventTypeFallbackImage(event);
    const nationalityName = getNationalityName(event.nationality);
    const eventTypeTranslated = getEventTypeTranslated(event.type);
    const whatsappUrl = getWhatsAppUrl(event.nationality);
    
    // Obtenir les traductions pour le titre et la description
    const eventTitle = event.titleKey && window.t ? window.t(event.titleKey) : event.title;
    const eventDescription = event.descriptionKey && window.t ? window.t(event.descriptionKey) : event.description;

    eventCard.innerHTML = `
      <div class="event-card-image-container">
        <img 
          src="${image}" 
          alt="${eventTitle}" 
          class="event-card-image" 
          loading="lazy"
          onerror="this.onerror=null; this.src='${fallbackImage}';"
        >
        <div class="event-card-type-badge">${eventTypeTranslated}</div>
        <div class="event-card-nationality-badge">${nationalityName}</div>
      </div>
      <div class="event-card-content">
        <h3 class="event-card-title">${eventTitle}</h3>
        <p class="event-card-description">${eventDescription}</p>
        <div class="event-card-details">
          <div class="event-detail-item">
            <span class="event-detail-icon">📅</span>
            <span class="event-detail-value">${formatDate(event.date)}</span>
          </div>
          <div class="event-detail-item">
            <span class="event-detail-icon">🕐</span>
            <span class="event-detail-value">${event.time}</span>
          </div>
          <div class="event-detail-item">
            <span class="event-detail-icon">📍</span>
            <span class="event-detail-value">${event.location}</span>
          </div>
        </div>
      </div>
      <a href="${whatsappUrl}" target="_blank" rel="noopener" class="event-card-whatsapp-btn" aria-label="Join WhatsApp group">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/>
        </svg>
      </a>
    `;

    eventsContainer.appendChild(eventCard);
  });
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Fonction pour mettre à jour les options traduites des sélecteurs
 */
function updateSelectOptions() {
  if (window.t) {
    // Mettre à jour l'option "Toutes les nationalités"
    const allNationalityOption = nationalitySelect?.querySelector('option[value=""]');
    if (allNationalityOption) {
      allNationalityOption.textContent = window.t('events_all_nationalities');
    }
    
    // Mettre à jour l'option "Toutes les catégories"
    const allCategoryOption = categorySelect?.querySelector('option[value=""]');
    if (allCategoryOption) {
      allCategoryOption.textContent = window.t('events_all_categories');
    }
    
    // Mettre à jour les options de catégories
    if (categorySelect) {
      const categoryOptions = categorySelect.querySelectorAll('option[value]');
      categoryOptions.forEach(option => {
        const categoryValue = option.value;
        if (categoryValue && EVENT_CATEGORIES[categoryValue]) {
          const currentLang = window.currentLanguage || 'en';
          option.textContent = EVENT_CATEGORIES[categoryValue][currentLang] || EVENT_CATEGORIES[categoryValue].en;
        }
      });
    }
  }
}

/**
 * Fonction pour appliquer les filtres
 */
function applyFilters() {
  const selectedNationality = nationalitySelect?.value || '';
  const selectedCategory = categorySelect?.value || '';
  renderEvents(selectedNationality, selectedCategory);
}

/**
 * Initialise la page des événements
 */
function initEventsPage() {
  // Écouter les changements de sélection de nationalité
  if (nationalitySelect) {
    nationalitySelect.addEventListener('change', applyFilters);
  }
  
  // Écouter les changements de sélection de catégorie
  if (categorySelect) {
    categorySelect.addEventListener('change', applyFilters);
  }
  
  // Mettre à jour les options traduites au chargement
  updateSelectOptions();
  
  // Écouter les changements de langue pour mettre à jour les cartes et les options
  window.addEventListener('languageChanged', () => {
    updateSelectOptions();
    // Re-rendre les événements pour mettre à jour les traductions
    applyFilters();
  });

  // Afficher tous les événements au chargement initial
  renderEvents();
}

// Initialiser quand le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEventsPage);
} else {
  initEventsPage();
}
