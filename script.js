// Chargement des événements depuis le fichier JSON
let eventsData = [];

async function loadEvents() {
    try {
        const response = await fetch('event.json');
        const data = await response.json();
        eventsData = data.events;
        renderEvents();
    } catch (error) {
        console.error('Error loading events:', error);
        showNotification('Error loading events', 'error');
    }
}

function renderEvents() {
    const eventsGrid = document.getElementById('eventsGrid');
    eventsGrid.innerHTML = '';

    eventsData.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });

    // Appliquer les animations
    animateEventCards();
}

function createEventCard(event) {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    eventCard.setAttribute('data-status', event.status);

    eventCard.innerHTML = `
        <div class="event-image">
            <img src="${event.image}" alt="${event.imageAlt}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzMzMzMzIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg=='">
            <div class="event-status ${event.status}">${event.status.charAt(0).toUpperCase() + event.status.slice(1)}</div>
        </div>
        <div class="event-content">
            <div class="event-price">${event.price}</div>
            <h3 class="event-title">${event.title}</h3>
            <div class="event-theme">
                <i class="${event.theme.icon}"></i>
                <span>${event.theme.text}</span>
            </div>
            <p class="event-description">${event.description}</p>
            <div class="event-details">
                <div class="event-date">
                    <i class="fas fa-calendar"></i>
                    <span>${event.date}</span>
                </div>
                <div class="event-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${event.location}</span>
                </div>
            </div>
            <div class="event-actions">
                <button class="whatsapp-btn" onclick="joinWhatsAppGroup('${event.whatsappGroup}')">
                    <i class="fab fa-whatsapp"></i>
                </button>
            </div>
        </div>
    `;

    return eventCard;
}

function animateEventCards() {
    const cards = document.querySelectorAll('.event-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('event-card');
    });
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 12) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Dark mode functionality removed

// Initialize filter functionality
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply filter
            filterEvents(filter);
            
            // Update aria-pressed for accessibility
            filterButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
            this.setAttribute('aria-pressed', 'true');
        });
    });
    
    // Set initial active state
    const activeButton = document.querySelector('.filter-btn.active');
    if (activeButton) {
        const initialFilter = activeButton.dataset.filter;
        filterEvents(initialFilter);
    }
}

// Function to join the community
function joinCommunity() {
    showNotification('Redirecting to our community...', 'success');
    // Here you can add the link to your community (Discord, Facebook, etc.)
    setTimeout(() => {
        window.open('https://example.com/community', '_blank');
    }, 1000);
}

// Variables pour le carousel

// Variables pour le carousel
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

// Fonction pour changer de slide
function changeSlide(direction) {
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// Fonction pour aller à un slide spécifique
function currentSlide(slideNumber) {
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = slideNumber - 1;
    
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// Auto-play du carousel
function autoPlayCarousel() {
    setInterval(() => {
        changeSlide(1);
    }, 5000); // Change de slide toutes les 5 secondes
}

// Configuration des groupes WhatsApp
const whatsappGroups = {
    'networking-march': 'https://chat.whatsapp.com/ABC123DEF456',
    'cuisine-march': 'https://chat.whatsapp.com/XYZ789GHI012',
    'jazz-march': 'https://chat.whatsapp.com/MNO345PQR678',
    'randonnee-march': 'https://chat.whatsapp.com/STU901VWX234',
    'peinture-march': 'https://chat.whatsapp.com/YZA567BCD890',
    'vins-march': 'https://chat.whatsapp.com/EFG123HIJ456'
};

// Function to join a WhatsApp group
function joinWhatsAppGroup(groupId) {
    const phoneNumber = "33676670216"; // +33 6 76 67 02 16 sans le +
    const message = `Hello! I'm interested in joining the ${groupId} event. Can you provide more information?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp link in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Feedback animation
    const button = event.target.closest('.whatsapp-btn');
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // Success notification
    showNotification('Redirecting to WhatsApp...', 'success');
}

// Fonction pour afficher des notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Ajouter les styles CSS pour la notification
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 300px;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                border-left: 4px solid #28a745;
            }
            
            .notification-error {
                border-left: 4px solid #dc3545;
            }
            
            .notification-info {
                border-left: 4px solid #17a2b8;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: #333;
                font-weight: 500;
            }
            
            .notification-content i {
                font-size: 1.2rem;
            }
            
            .notification-success .notification-content i {
                color: #28a745;
            }
            
            .notification-error .notification-content i {
                color: #dc3545;
            }
            
            .notification-info .notification-content i {
                color: #17a2b8;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Ajouter la notification au DOM
    document.body.appendChild(notification);
    
    // Afficher la notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Supprimer la notification après 3 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Function to filter events
function filterEvents(filter) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active buttons
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    // Filter the data
    let filteredEvents = eventsData;
    if (filter !== 'all') {
        filteredEvents = eventsData.filter(event => event.status === filter);
    }
    
    // Re-render filtered events
    renderFilteredEvents(filteredEvents);
}

function renderFilteredEvents(events) {
    const eventsGrid = document.getElementById('eventsGrid');
    eventsGrid.innerHTML = '';

    if (events.length === 0) {
        let emptyMessage = '';
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        
        switch(activeFilter) {
            case 'upcoming':
                emptyMessage = 'No upcoming events at the moment';
                break;
            case 'ongoing':
                emptyMessage = 'No ongoing events currently';
                break;
            default:
                emptyMessage = 'No events available';
        }
        
        eventsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-times"></i>
                <h3>${emptyMessage}</h3>
                <p>Come back soon to discover new events!</p>
            </div>
        `;
        return;
    }

    events.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });

    // Apply animations
    animateEventCards();
}

// Fonction pour animer les cartes au scroll
function animateOnScroll() {
    const cards = document.querySelectorAll('.event-card');
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = cardTop < window.innerHeight - 100;
        
        if (cardVisible && !card.classList.contains('animated')) {
            card.classList.add('animated');
        }
    });
}

// Fonction pour ajouter des effets de parallaxe subtils
function addParallaxEffect() {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
}

// Fonction pour améliorer l'accessibilité
function improveAccessibility() {
    // Ajouter des attributs ARIA aux boutons de filtre
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.setAttribute('role', 'button');
        btn.setAttribute('aria-pressed', btn.classList.contains('active'));
    });
    
    // Ajouter des attributs ARIA aux cartes d'événements
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach((card, index) => {
        card.setAttribute('role', 'article');
        card.setAttribute('aria-labelledby', `event-title-${index}`);
        
        const title = card.querySelector('.event-title');
        if (title) {
            title.id = `event-title-${index}`;
        }
    });
    
    // Ajouter des attributs ARIA aux boutons WhatsApp
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    whatsappButtons.forEach(btn => {
        btn.setAttribute('aria-label', 'Rejoindre le groupe WhatsApp pour cet événement');
    });
}

// Fonction pour gérer le mode sombre (bonus)
function toggleDarkMode() {
    const body = document.body;
    const isDark = body.classList.contains('dark-mode');
    
    if (isDark) {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    }
}

// Application initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Worldxpat Events - Application loaded');
    
    // Charger les événements
    loadEvents();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Dark mode removed
    
    // Initialize carousel
    autoPlayCarousel();
    
    // Initialize filter functionality
    initFilters();
    
    // Ajouter l'effet de scroll
    window.addEventListener('scroll', function() {
        animateOnScroll();
        addParallaxEffect();
    });
    
    // Améliorer l'accessibilité
    improveAccessibility();
    
    // Charger le mode sombre depuis le localStorage
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
    
    // Dark mode button removed
    
    // Dark mode styles removed
    
    // Animation initiale des cartes
    setTimeout(() => {
        animateOnScroll();
    }, 100);
    
    // Welcome message
    setTimeout(() => {
        showNotification('Welcome to Worldxpat Events!', 'success');
    }, 1000);
});

// Function to handle errors
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('An error occurred', 'error');
});

// Function to handle image loading errors
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vbiBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
    }
}, true);
