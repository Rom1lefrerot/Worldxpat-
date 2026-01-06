// ============================================
// EVENTS PAGE - SIMPLE VERSION
// ============================================

console.log('events.js loaded');

// ============================================
// DATA - ÉVÉNEMENTS PAR NATIONALITÉ
// ============================================

const EVENTS_BY_NATIONALITY = {
  FR: [
    {
      id: 'fr-newcomers-1',
      titleKey: 'event_fr_newcomers_title',
      descriptionKey: 'event_fr_newcomers_desc',
      type: 'Soirée Newcomers',
      date: '2025-01-18',
      time: '20:00',
      location: 'JLT',
    },
    {
      id: 'fr-boat-1',
      titleKey: 'event_fr_boat_title',
      descriptionKey: 'event_fr_boat_desc',
      type: 'Soirée Boat Party',
      date: '2025-01-25',
      time: '16:00',
      location: 'Dubai Marina',
    },
    {
      id: 'fr-dating-1',
      titleKey: 'event_fr_dating_title',
      descriptionKey: 'event_fr_dating_desc',
      type: 'Soirée Dating',
      date: '2025-01-20',
      time: '20:30',
      location: 'Downtown',
    },
    {
      id: 'fr-quiz-1',
      titleKey: 'event_fr_quiz_title',
      descriptionKey: 'event_fr_quiz_desc',
      type: 'Soirée Quiz',
      date: '2025-01-22',
      time: '19:00',
      location: 'Business Bay',
    },
    {
      id: 'fr-sport-1',
      titleKey: 'event_fr_sport_title',
      descriptionKey: 'event_fr_sport_desc',
      type: 'Soirée Sportive',
      date: '2025-01-17',
      time: '18:00',
      location: 'Dubai Hills',
    },
  ],
  GB: [
    {
      id: 'gb-meetup-1',
      titleKey: 'event_gb_meetup_title',
      descriptionKey: 'event_gb_meetup_desc',
      type: 'Soirée Rencontre',
      date: '2025-01-16',
      time: '20:00',
      location: 'Business Bay',
    },
    {
      id: 'gb-newcomers-1',
      titleKey: 'event_gb_newcomers_title',
      descriptionKey: 'event_gb_newcomers_desc',
      type: 'Soirée Newcomers',
      date: '2025-01-19',
      time: '19:30',
      location: 'JBR',
    },
    {
      id: 'gb-boat-1',
      titleKey: 'event_gb_boat_title',
      descriptionKey: 'event_gb_boat_desc',
      type: 'Soirée Boat Party',
      date: '2025-01-26',
      time: '15:00',
      location: 'Dubai Marina',
    },
    {
      id: 'gb-dating-1',
      titleKey: 'event_gb_dating_title',
      descriptionKey: 'event_gb_dating_desc',
      type: 'Soirée Dating',
      date: '2025-01-21',
      time: '20:00',
      location: 'Downtown',
    },
    {
      id: 'gb-quiz-1',
      titleKey: 'event_gb_quiz_title',
      descriptionKey: 'event_gb_quiz_desc',
      type: 'Soirée Quiz',
      date: '2025-01-23',
      time: '19:00',
      location: 'JBR',
    },
    {
      id: 'gb-sport-1',
      titleKey: 'event_gb_sport_title',
      descriptionKey: 'event_gb_sport_desc',
      type: 'Soirée Sportive',
      date: '2025-01-18',
      time: '18:30',
      location: 'Dubai Hills',
    },
  ],
  IE: [
    {
      id: 'ie-meetup-1',
      titleKey: 'event_ie_meetup_title',
      descriptionKey: 'event_ie_meetup_desc',
      type: 'Soirée Rencontre',
      date: '2025-01-17',
      time: '19:30',
      location: 'JBR',
    },
    {
      id: 'ie-newcomers-1',
      titleKey: 'event_ie_newcomers_title',
      descriptionKey: 'event_ie_newcomers_desc',
      type: 'Soirée Newcomers',
      date: '2025-01-20',
      time: '20:00',
      location: 'Business Bay',
    },
    {
      id: 'ie-boat-1',
      titleKey: 'event_ie_boat_title',
      descriptionKey: 'event_ie_boat_desc',
      type: 'Soirée Boat Party',
      date: '2025-01-27',
      time: '16:00',
      location: 'Dubai Marina',
    },
    {
      id: 'ie-dating-1',
      titleKey: 'event_ie_dating_title',
      descriptionKey: 'event_ie_dating_desc',
      type: 'Soirée Dating',
      date: '2025-01-22',
      time: '20:30',
      location: 'Downtown',
    },
    {
      id: 'ie-quiz-1',
      titleKey: 'event_ie_quiz_title',
      descriptionKey: 'event_ie_quiz_desc',
      type: 'Soirée Quiz',
      date: '2025-01-24',
      time: '19:00',
      location: 'JBR',
    },
    {
      id: 'ie-sport-1',
      titleKey: 'event_ie_sport_title',
      descriptionKey: 'event_ie_sport_desc',
      type: 'Soirée Sportive',
      date: '2025-01-19',
      time: '18:00',
      location: 'Dubai Hills',
    },
  ],
  MA: [
    {
      id: 'ma-meetup-1',
      titleKey: 'event_ma_meetup_title',
      descriptionKey: 'event_ma_meetup_desc',
      type: 'Soirée Rencontre',
      date: '2025-01-18',
      time: '21:00',
      location: 'Downtown',
    },
    {
      id: 'ma-newcomers-1',
      titleKey: 'event_ma_newcomers_title',
      descriptionKey: 'event_ma_newcomers_desc',
      type: 'Soirée Newcomers',
      date: '2025-01-21',
      time: '20:30',
      location: 'Dubai Marina',
    },
    {
      id: 'ma-boat-1',
      titleKey: 'event_ma_boat_title',
      descriptionKey: 'event_ma_boat_desc',
      type: 'Soirée Boat Party',
      date: '2025-01-28',
      time: '17:00',
      location: 'Dubai Marina',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    },
    {
      id: 'ma-dating-1',
      titleKey: 'event_ma_dating_title',
      descriptionKey: 'event_ma_dating_desc',
      type: 'Soirée Dating',
      date: '2025-01-23',
      time: '21:00',
      location: 'JLT',
    },
    {
      id: 'ma-quiz-1',
      titleKey: 'event_ma_quiz_title',
      descriptionKey: 'event_ma_quiz_desc',
      type: 'Soirée Quiz',
      date: '2025-01-25',
      time: '20:00',
      location: 'Business Bay',
    },
    {
      id: 'ma-sport-1',
      titleKey: 'event_ma_sport_title',
      descriptionKey: 'event_ma_sport_desc',
      type: 'Soirée Sportive',
      date: '2025-01-20',
      time: '19:00',
      location: 'Dubai Hills',
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
};

// Mapping des types d'événements vers les clés de traduction
const EVENT_TYPE_TRANSLATION_KEYS = {
  'Soirée Rencontre': 'event_type_meetup',
  'Soirée Newcomers': 'event_type_newcomers',
  'Soirée Boat Party': 'event_type_boat_party',
  'Soirée Dating': 'event_type_dating',
  'Soirée Quiz': 'event_type_quiz',
  'Soirée Sportive': 'event_type_sport',
};

// URLs WhatsApp pour les groupes d'événements par nationalité
const WHATSAPP_EVENTS_URLS = {
  FR: 'https://chat.whatsapp.com/BiL3Sc0pAhB9u6Bd5yGpt8',
  GB: 'https://chat.whatsapp.com/LkEAT5AlWC8DUfXUHzp0n4',
  IE: 'https://chat.whatsapp.com/Iu8eYqO4M01C5RR4B2uo3L',
  MA: 'https://chat.whatsapp.com/HsU2cvFUCytD0wsPbBLOXV', // Groupe events marocain
};

// Images par type d'événement (utilisant Unsplash pour de belles images)
const EVENT_TYPE_IMAGES = {
  'Soirée Rencontre': 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
  'Soirée Newcomers': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
  'Soirée Boat Party': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  'Soirée Dating': 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop',
  'Soirée Quiz': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
  'Soirée Sportive': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
};

// Mapping des nationalités avec leurs noms
const NATIONALITY_NAMES = {
  FR: 'Francophones',
  GB: 'British',
  IE: 'Irish',
  MA: 'Moroccan',
};

// ============================================
// DOM ELEMENTS
// ============================================

const nationalitySelect = document.getElementById('nationalitySelect');
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
  return WHATSAPP_EVENTS_URLS[nationality] || WHATSAPP_EVENTS_URLS.FR;
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
  return NATIONALITY_NAMES[code] || code;
}

// ============================================
// RENDERING FUNCTIONS
// ============================================

/**
 * Affiche les événements filtrés par nationalité
 */
function renderEvents(selectedNationality = '') {
  if (!eventsContainer) return;

  eventsContainer.innerHTML = '';

  let eventsToShow = [];

  if (selectedNationality && EVENTS_BY_NATIONALITY[selectedNationality]) {
    // Afficher les événements de la nationalité sélectionnée
    eventsToShow = EVENTS_BY_NATIONALITY[selectedNationality].map(event => ({
      ...event,
      nationality: selectedNationality,
    }));
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
 * Initialise la page des événements
 */
function initEventsPage() {
  // Écouter les changements de sélection de nationalité
  if (nationalitySelect) {
    nationalitySelect.addEventListener('change', (e) => {
      const selectedNationality = e.target.value;
      renderEvents(selectedNationality);
    });
    
    // Mettre à jour l'option "Toutes les nationalités" lors du changement de langue
    const updateSelectOption = () => {
      const allOption = nationalitySelect.querySelector('option[value=""]');
      if (allOption && window.t) {
        allOption.textContent = window.t('events_all_nationalities');
      }
    };
    
    // Mettre à jour au chargement
    updateSelectOption();
    
    // Écouter les changements de langue pour mettre à jour les cartes
    window.addEventListener('languageChanged', () => {
      updateSelectOption();
      // Re-rendre les événements pour mettre à jour les traductions
      const selectedNationality = nationalitySelect.value || '';
      renderEvents(selectedNationality);
    });
  }

  // Afficher tous les événements au chargement initial
  renderEvents();
}

// Initialiser quand le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEventsPage);
} else {
  initEventsPage();
}
