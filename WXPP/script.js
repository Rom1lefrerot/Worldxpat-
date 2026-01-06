// ============================================
// I18N + DONNÉES MOCK
// ============================================

const LANGUAGE_STORAGE_KEY = 'worldxpat_language';

const translations = {
  nav_logo: { en: 'WorldXpat', fr: 'WorldXpat' },
  nav_find_group: { en: 'Find a group', fr: 'Trouver un groupe' },
  nav_colocation: { en: 'Roommates', fr: 'Colocation' },
  nav_how_it_works: { en: 'How it works', fr: 'Comment ça marche' },
  nav_about: { en: 'About', fr: 'À propos' },
  nav_partners: { en: 'Partners', fr: 'Partenaires' },
  nav_faq: { en: 'FAQ', fr: 'FAQ' },
  nav_cta: { en: 'Join the community', fr: 'Rejoindre la communauté' },
  nav_toggle_label: { en: 'Toggle menu', fr: 'Afficher ou masquer le menu' },
  hero_title: {
    en: 'Find your WhatsApp group in Dubai<br><span class="text-primary">in 30 seconds.</span>',
    fr: 'Trouve ton groupe WhatsApp à Dubaï<br><span class="text-primary">en 30 secondes.</span>',
  },
  hero_subtitle: {
    en: 'By nationality, by need, by interest.<br>WorldXpat connects expats to the right communities without wasting time.',
    fr: 'Par nationalité, par besoin, par centre d’intérêt.<br>WorldXpat connecte les expatriés aux bonnes communautés, sans perdre de temps.',
  },
  hero_primary_cta: { en: 'Choose my nationality', fr: 'Choisir ma nationalité' },
  hero_secondary_cta: { en: 'Discover WorldXpat groups', fr: 'Découvrir les groupes WorldXpat' },
  founder_label: { en: 'WorldXpat Crew', fr: 'Équipe WorldXpat' },
  founder_name: { en: 'Romain & the team', fr: 'Romain & la team' },
  founder_quote: {
    en: '“We create genuine connections, without useless bling.”',
    fr: '« On crée des connexions vraies, sans bling-bling inutile. »',
  },
  founder_image_alt: {
    en: 'WorldXpat founder portrait',
    fr: 'Portrait de la fondatrice WorldXpat',
  },
  nationality_section_title: { en: '1. Where are you from?', fr: '1. De quel pays viens-tu ?' },
  nationality_section_subtitle: {
    en: 'Tap your flag and we’ll guide you to your community.',
    fr: 'Clique sur ton drapeau et on t’emmène vers ta communauté.',
  },
  interest_section_title: { en: '2. What do you need?', fr: '2. Qu’est-ce que tu cherches ?' },
  interest_section_subtitle: {
    en: 'Pick your priority and explore the WhatsApp groups made for you.',
    fr: 'Sélectionne ton besoin pour voir les groupes qui te correspondent.',
  },
  groups_section_title: { en: 'Suggested WhatsApp groups', fr: 'Groupes WhatsApp suggérés' },
  groups_section_subtitle: {
    en: 'Here’s a selection to kick-start your Dubai adventure.',
    fr: 'Voici quelques groupes pour bien commencer ton aventure à Dubaï.',
  },
  groups_prompt_select: {
    en: 'Choose your country and need to view the right groups.',
    fr: 'Choisis ton pays et ton besoin pour découvrir les bons groupes.',
  },
  groups_empty_filtered: {
    en: 'We don’t have a group for this combination yet, but it’s coming soon 😉 You can reset your filters or join the main WorldXpat group.',
    fr: 'On n’a pas encore de groupe pour cette combinaison, mais ça arrive bientôt 😉 Tu peux réinitialiser les filtres ou rejoindre le groupe général WorldXpat.',
  },
  groups_reset_filters: { en: 'Reset filters', fr: 'Réinitialiser les filtres' },
  how_section_title: { en: 'How does it work?', fr: 'Comment ça marche ?' },
  how_section_subtitle: {
    en: 'Three simple steps to find your community.',
    fr: 'En 3 étapes, tu trouves ta communauté.',
  },
  step1_title: { en: 'Choose your nationality', fr: 'Choisis ta nationalité' },
  step1_text: {
    en: 'We highlight the communities that match you.',
    fr: 'On te montre les communautés qui te ressemblent.',
  },
  step2_title: { en: 'Pick your need', fr: 'Choisis ton besoin' },
  step2_text: {
    en: 'Housing, friends, outings, business… you decide.',
    fr: 'Colocation, amis, sorties, business… c’est toi qui décides.',
  },
  step3_title: { en: 'Join the WhatsApp group', fr: 'Rejoins le groupe WhatsApp' },
  step3_text: {
    en: 'One tap and you’re in the right community to get started.',
    fr: 'En un clic, tu es dans le bon groupe pour bien commencer à Dubaï.',
  },
  about_section_title: { en: 'About WorldXpat', fr: 'À propos de WorldXpat' },
  about_section_description: {
    en: 'WorldXpat is a community created by expats, for expats.<br><br>Landing in Dubai is exciting… and sometimes overwhelming.<br><br>Our mission: help you meet the right people from day one.<br><br>Through WhatsApp groups, events and meetups, WorldXpat helps you feel at home faster.',
    fr: 'WorldXpat est une communauté créée par des expatriés, pour les expatriés.<br><br>Arriver à Dubaï peut être excitant… mais aussi déroutant.<br><br>Notre mission : t’aider à rencontrer les bonnes personnes dès les premiers jours.<br><br>À travers des groupes WhatsApp, des événements et des rencontres, WorldXpat te donne les clés pour te sentir chez toi plus vite.',
  },
  highlight1_title: { en: 'Settling in Dubai', fr: 'Installation à Dubaï' },
  highlight1_text: {
    en: 'Housing search, first steps, local tips – we guide you from day one.',
    fr: 'Recherche de logement, premiers repères, bons plans locaux : on t’accompagne dès le premier jour.',
  },
  highlight2_title: { en: 'Car & admin support', fr: 'Voiture & démarches' },
  highlight2_text: {
    en: 'We help you with car search, paperwork and practical life in Dubai.',
    fr: 'On t’aide à trouver une voiture, gérer les démarches administratives et le quotidien à Dubaï.',
  },
  highlight3_title: { en: 'Real estate & investment', fr: 'Immobilier & investissement' },
  highlight3_text: {
    en: 'Connection with trusted real estate agents for buying, renting or investing in Dubai.',
    fr: 'Mise en relation avec les meilleurs agents immobiliers pour acheter, louer ou investir à Dubaï.',
  },
  highlight4_title: { en: 'Events & community', fr: 'Événements & communauté' },
  highlight4_text: {
    en: 'Community evenings, regular meetups and events to build connections and meet other expats.',
    fr: 'Soirées communautaires, meetups réguliers et événements pour créer du lien et rencontrer d\'autres expatriés.',
  },
  faq_section_title: { en: 'Frequently asked questions', fr: 'Questions fréquentes' },
  faq_section_subtitle: {
    en: 'Everything you need to know about WorldXpat.',
    fr: 'Tout ce que tu veux savoir sur WorldXpat.',
  },
  faq_q1: { en: 'Are the groups free?', fr: 'Est-ce que les groupes sont gratuits ?' },
  faq_a1: {
    en: 'Yes, every WorldXpat group is free. Our goal is to connect expats—not to monetize the community.',
    fr: 'Oui, tous les groupes WorldXpat sont 100% gratuits. Notre mission est de connecter les expatriés, pas de monétiser la communauté.',
  },
  faq_q2: { en: 'How do I join a WorldXpat event?', fr: 'Comment rejoindre un événement WorldXpat ?' },
  faq_a2: {
    en: 'Events are announced inside the official WorldXpat WhatsApp groups. Join the group for your nationality or need and you’ll get every update.',
    fr: 'Les événements sont annoncés dans les groupes WhatsApp officiels WorldXpat. Rejoins le groupe correspondant à ta nationalité ou à ton besoin, et tu seras informé de tous les événements à venir.',
  },
  faq_q4: { en: 'Is WorldXpat only for Dubai?', fr: 'Est-ce réservé à Dubaï ?' },
  faq_a4: {
    en: 'For now we focus on Dubai, but expansion is on the roadmap. Want to launch WorldXpat in your city? Reach out.',
    fr: 'Pour le moment, WorldXpat se concentre sur Dubaï. Mais on a de grands projets d’expansion ! Si tu es dans une autre ville et que tu veux créer une communauté WorldXpat, n’hésite pas à nous contacter.',
  },
  faq_q5: { en: 'How can I contribute to the community?', fr: 'Comment puis-je contribuer à la communauté ?' },
  faq_a5: {
    en: 'Be active in the groups, welcome newcomers, share your best tips. You can also host an event or launch a new group if a need isn’t covered yet.',
    fr: 'La meilleure façon de contribuer, c’est d’être actif dans les groupes, d’aider les nouveaux arrivants et de partager tes bons plans. Tu peux aussi proposer d’organiser un événement ou de créer un nouveau groupe si tu identifies un besoin non couvert.',
  },
  faq_q6: { en: 'Are my details visible in the groups?', fr: 'Mes informations sont-elles visibles dans les groupes ?' },
  faq_a6: {
    en: 'WorldXpat runs through moderated WhatsApp groups. Only members of a group can see each other’s numbers, and spam or unsolicited messages are removed immediately.',
    fr: 'WorldXpat fonctionne via des groupes WhatsApp modérés. Seuls les membres voient les numéros des autres, et tout spam ou message non sollicité est supprimé immédiatement.',
  },
  footer_tagline: {
    en: 'Connecting expats in Dubai and beyond.',
    fr: 'Connecter les expatriés à Dubaï et dans le monde.',
  },
  footer_bottom: {
    en: '&copy; 2024 WorldXpat. All rights reserved.',
    fr: '&copy; 2024 WorldXpat. Tous droits réservés.',
  },
  footer_instagram: { en: 'Instagram', fr: 'Instagram' },
  footer_whatsapp: { en: 'WhatsApp Community', fr: 'Communauté WhatsApp' },
  footer_email: { en: 'Email', fr: 'Email' },
  footer_tiktok: { en: 'TikTok', fr: 'TikTok' },
  partners_section_title: {
    en: 'WorldXpat Partners – Trusted contacts for everything in Dubai',
    fr: 'WorldXpat Partners – Les bons contacts pour tout à Dubaï',
  },
  partners_section_subtitle: {
    en: 'Need housing, a car, company setup, visa, or insurance in Dubai? Here are the trusted people I personally recommend. Contact them directly on WhatsApp.',
    fr: 'Tu as besoin d’un logement, d’une voiture, d’un visa, d’une création de société ou d’une assurance à Dubaï ? Voici les personnes de confiance que je recommande personnellement. Tu peux les contacter directement sur WhatsApp.',
  },
  partner_contact_whatsapp: {
    en: 'Contact on WhatsApp',
    fr: 'Contacter sur WhatsApp',
  },
  events_title: {
    en: 'Francophone Meetup in Dubai',
    fr: 'Rencontre francophone à Dubaï',
  },
  events_subtitle: {
    en: 'Every Friday',
    fr: 'Chaque vendredi',
  },
  events_subtitle_fr: {
    en: 'Le rendez-vous hebdomadaire des francophones à Dubaï.',
    fr: 'Le rendez-vous hebdomadaire des francophones à Dubaï.',
  },
  events_description_1: {
    en: 'You\'re new in Dubai or you just want to meet other French speakers?',
    fr: 'Tu es nouveau à Dubaï ou tu veux simplement rencontrer d\'autres francophones ?',
  },
  events_description_2: {
    en: 'Every Friday, WorldXpat organizes a friendly meetup for francophones: drinks, networking, business talks and new friendships.',
    fr: 'Chaque vendredi, WorldXpat organise un meetup convivial pour les francophones : verres, networking, discussions business et nouvelles amitiés.',
  },
  events_description_3: {
    en: 'The exact place and time are shared only inside the WhatsApp group.',
    fr: 'Le lieu exact et l\'heure sont partagés uniquement dans le groupe WhatsApp.',
  },
  events_how_title: {
    en: 'How it works',
    fr: 'Comment ça marche',
  },
  events_step1_title: {
    en: 'Join the WhatsApp group',
    fr: 'Rejoins le groupe WhatsApp',
  },
  events_step2_title: {
    en: 'Get the exact location & time every week',
    fr: 'Reçois le lieu exact et l\'heure chaque semaine',
  },
  events_step3_title: {
    en: 'Come, meet people, and enjoy the evening',
    fr: 'Viens, rencontre des gens et profite de la soirée',
  },
  events_location_notice: {
    en: 'The location is private and shared only inside the WhatsApp group.',
    fr: 'Le lieu est privé et partagé uniquement dans le groupe WhatsApp.',
  },
  events_join_button: {
    en: 'Join the WhatsApp Group',
    fr: 'Rejoindre le groupe WhatsApp',
  },
  events_faq_title: {
    en: 'Frequently asked questions',
    fr: 'Questions fréquentes',
  },
  events_faq_q1: {
    en: 'Who can join?',
    fr: 'Qui peut participer ?',
  },
  events_faq_a1: {
    en: 'All expats in Dubai are welcome to join our community events.',
    fr: 'Tous les expatriés à Dubaï sont les bienvenus dans nos événements communautaires.',
  },
  events_faq_q2: {
    en: 'Is it free?',
    fr: 'C\'est gratuit ?',
  },
  events_faq_a2: {
    en: 'Yes, the meetup is free. You only pay for your own drinks.',
    fr: 'Oui, le meetup est gratuit. Tu paies uniquement tes propres consommations.',
  },
  events_faq_q3: {
    en: 'Do I have to come every week?',
    fr: 'Dois-je venir chaque semaine ?',
  },
  events_faq_a3: {
    en: 'No, you join whenever you want. The group keeps you updated.',
    fr: 'Non, tu viens quand tu veux. Le groupe te tient informé.',
  },
  events_page_title: {
    en: 'WorldXpat Events',
    fr: 'Événements WorldXpat',
  },
  events_page_subtitle: {
    en: 'Join our community meetups and events in Dubai',
    fr: 'Rejoins nos rencontres et événements communautaires à Dubaï',
  },
  events_location_note: {
    en: 'Location shared in the group',
    fr: 'Lieu partagé dans le groupe',
  },
  events_fr_frequency: {
    en: 'Every Friday',
    fr: 'Chaque vendredi',
  },
  events_fr_description: {
    en: 'Friendly meetup for francophones: drinks, networking, business talks and new friendships.',
    fr: 'Rencontre conviviale pour les francophones : verres, networking, discussions business et nouvelles amitiés.',
  },
  events_fr_newcomers_frequency: {
    en: 'Ongoing support',
    fr: 'Accompagnement continu',
  },
  events_fr_newcomers_description: {
    en: 'Guidance for your first weeks in Dubai: paperwork, housing, daily life.',
    fr: 'Accompagnement pour tes premiers jours à Dubaï : démarches, logement, quotidien.',
  },
  events_gb_frequency: {
    en: 'Regular meetups',
    fr: 'Rencontres régulières',
  },
  events_gb_description: {
    en: 'Afterworks, social gatherings and cultural moments for UK expats.',
    fr: 'Afterworks, rencontres et moments culturels pour la communauté britannique.',
  },
  events_gb_newcomers_frequency: {
    en: 'Ongoing support',
    fr: 'Accompagnement continu',
  },
  events_gb_newcomers_description: {
    en: 'Step-by-step support for your move to Dubai.',
    fr: 'Accompagnement étape par étape pour ton installation à Dubaï.',
  },
  events_ie_frequency: {
    en: 'Regular meetups',
    fr: 'Rencontres régulières',
  },
  events_ie_description: {
    en: 'Meetups, nights out and cultural moments for Irish expats.',
    fr: 'Rencontres, sorties et moments culturels pour les expatriés irlandais.',
  },
  events_ie_newcomers_frequency: {
    en: 'Ongoing support',
    fr: 'Accompagnement continu',
  },
  events_ie_newcomers_description: {
    en: 'Community support to navigate paperwork, housing and daily life.',
    fr: 'Entraide pour les démarches, le logement et le quotidien.',
  },
  events_ma_frequency: {
    en: 'Regular meetups',
    fr: 'Rencontres régulières',
  },
  events_ma_description: {
    en: 'Community gatherings, cultural outings and friendly meetups.',
    fr: 'Rencontres communautaires, sorties culturelles et moments conviviaux.',
  },
  events_ma_newcomers_frequency: {
    en: 'Ongoing support',
    fr: 'Accompagnement continu',
  },
  events_ma_newcomers_description: {
    en: 'Guidance for Moroccans settling in Dubai, from paperwork to daily life.',
    fr: 'Accompagnement des nouveaux arrivants marocains à Dubaï, démarches et quotidien.',
  },
  events_filter_title: {
    en: 'Choose your nationality',
    fr: 'Choisis ta nationalité',
  },
  events_filter_subtitle: {
    en: 'Select your country to see relevant events',
    fr: 'Sélectionne ton pays pour voir les événements correspondants',
  },
  events_filter_all: {
    en: 'All events',
    fr: 'Tous les événements',
  },
  events_reset_filter: {
    en: 'Show all events',
    fr: 'Afficher tous les événements',
  },
  events_empty: {
    en: 'No events found for this nationality.',
    fr: 'Aucun événement trouvé pour cette nationalité.',
  },
  events_hero_title: {
    en: 'Events by WorldXpat',
    fr: 'Événements by WorldXpat',
  },
  events_hero_subtitle: {
    en: 'Discover and propose parties for your community in Dubai',
    fr: 'Découvrez et proposez des soirées pour votre communauté à Dubaï',
  },
  events_select_nationality: {
    en: 'Select your nationality',
    fr: 'Sélectionnez votre nationalité',
  },
  events_all_nationalities: {
    en: 'All nationalities',
    fr: 'Toutes les nationalités',
  },
  nav_events: {
    en: 'Events',
    fr: 'Événements',
  },
  event_type_meetup: {
    en: 'Meetup Night',
    fr: 'Soirée Rencontre',
  },
  event_type_newcomers: {
    en: 'Newcomers Night',
    fr: 'Soirée Newcomers',
  },
  event_type_boat_party: {
    en: 'Boat Party',
    fr: 'Soirée Boat Party',
  },
  event_type_dating: {
    en: 'Dating Night',
    fr: 'Soirée Dating',
  },
  event_type_quiz: {
    en: 'Quiz Night',
    fr: 'Soirée Quiz',
  },
  event_type_sport: {
    en: 'Sports Night',
    fr: 'Soirée Sportive',
  },
  // Événements FR
  event_fr_newcomers_title: {
    en: 'Francophone Newcomers Night',
    fr: 'Soirée Newcomers Francophones',
  },
  event_fr_newcomers_desc: {
    en: 'Special evening for new French-speaking arrivals. Exchange experiences and advice.',
    fr: 'Soirée spéciale pour les nouveaux arrivants francophones. Échange d\'expériences et conseils.',
  },
  event_fr_boat_title: {
    en: 'Francophone Boat Party',
    fr: 'Boat Party Francophone',
  },
  event_fr_boat_desc: {
    en: 'Boat cruise with the francophone community. Music, drinks and good vibes.',
    fr: 'Croisière en bateau avec la communauté francophone. Musique, boissons et bonne ambiance.',
  },
  event_fr_dating_title: {
    en: 'Francophone Dating Night',
    fr: 'Soirée Dating Francophone',
  },
  event_fr_dating_desc: {
    en: 'Speed dating evening to meet other French speakers in Dubai.',
    fr: 'Soirée speed dating pour rencontrer d\'autres francophones à Dubaï.',
  },
  event_fr_quiz_title: {
    en: 'Francophone Quiz Night',
    fr: 'Quiz Night Francophone',
  },
  event_fr_quiz_desc: {
    en: 'Quiz night with questions about French culture and Dubai. Teams and prizes to win.',
    fr: 'Soirée quiz avec questions sur la culture française et Dubaï. Équipes et prix à gagner.',
  },
  event_fr_sport_title: {
    en: 'Francophone Sports Night',
    fr: 'Soirée Sportive Francophone',
  },
  event_fr_sport_desc: {
    en: 'Football match or other sports activity followed by drinks.',
    fr: 'Match de football ou autre activité sportive suivie d\'un verre.',
  },
  // Événements GB
  event_gb_meetup_title: {
    en: 'British Meetup Night',
    fr: 'Soirée Rencontre Britannique',
  },
  event_gb_meetup_desc: {
    en: 'Casual meetup for British expats. Pints and networking.',
    fr: 'Rencontre décontractée pour les expatriés britanniques. Pints et networking.',
  },
  event_gb_newcomers_title: {
    en: 'British Newcomers Evening',
    fr: 'Soirée Newcomers Britannique',
  },
  event_gb_newcomers_desc: {
    en: 'Welcome evening for new British arrivals in Dubai. Tips and connections.',
    fr: 'Soirée d\'accueil pour les nouveaux arrivants britanniques à Dubaï. Conseils et connexions.',
  },
  event_gb_boat_title: {
    en: 'UK Expat Boat Party',
    fr: 'Boat Party Britannique',
  },
  event_gb_boat_desc: {
    en: 'Sunset boat cruise with the British community. Drinks and music.',
    fr: 'Croisière en bateau au coucher du soleil avec la communauté britannique. Boissons et musique.',
  },
  event_gb_dating_title: {
    en: 'British Dating Night',
    fr: 'Soirée Dating Britannique',
  },
  event_gb_dating_desc: {
    en: 'Speed dating event for British singles in Dubai.',
    fr: 'Soirée speed dating pour les célibataires britanniques à Dubaï.',
  },
  event_gb_quiz_title: {
    en: 'Pub Quiz Night',
    fr: 'Soirée Quiz Britannique',
  },
  event_gb_quiz_desc: {
    en: 'Traditional British pub quiz. Teams welcome, prizes to win.',
    fr: 'Quiz de pub britannique traditionnel. Équipes bienvenues, prix à gagner.',
  },
  event_gb_sport_title: {
    en: 'British Sports Evening',
    fr: 'Soirée Sportive Britannique',
  },
  event_gb_sport_desc: {
    en: 'Football match or sports activity followed by drinks.',
    fr: 'Match de football ou activité sportive suivie de boissons.',
  },
  // Événements IE
  event_ie_meetup_title: {
    en: 'Irish Community Meetup',
    fr: 'Rencontre Communauté Irlandaise',
  },
  event_ie_meetup_desc: {
    en: 'Relaxed meetup for the Irish community. Casual drinks and chat.',
    fr: 'Rencontre décontractée pour la communauté irlandaise. Boissons et discussions.',
  },
  event_ie_newcomers_title: {
    en: 'Irish Newcomers Night',
    fr: 'Soirée Newcomers Irlandaise',
  },
  event_ie_newcomers_desc: {
    en: 'Welcome event for new Irish arrivals. Support and connections.',
    fr: 'Événement d\'accueil pour les nouveaux arrivants irlandais. Soutien et connexions.',
  },
  event_ie_boat_title: {
    en: 'Irish Boat Party',
    fr: 'Boat Party Irlandaise',
  },
  event_ie_boat_desc: {
    en: 'Boat party with the Irish community. Music, drinks, and fun.',
    fr: 'Boat party avec la communauté irlandaise. Musique, boissons et amusement.',
  },
  event_ie_dating_title: {
    en: 'Irish Dating Night',
    fr: 'Soirée Dating Irlandaise',
  },
  event_ie_dating_desc: {
    en: 'Speed dating for Irish singles in Dubai.',
    fr: 'Speed dating pour les célibataires irlandais à Dubaï.',
  },
  event_ie_quiz_title: {
    en: 'Irish Quiz Night',
    fr: 'Soirée Quiz Irlandaise',
  },
  event_ie_quiz_desc: {
    en: 'Quiz night with Irish-themed questions. Teams and prizes.',
    fr: 'Soirée quiz avec des questions sur l\'Irlande. Équipes et prix.',
  },
  event_ie_sport_title: {
    en: 'Irish Sports Evening',
    fr: 'Soirée Sportive Irlandaise',
  },
  event_ie_sport_desc: {
    en: 'Sports activity followed by drinks with the Irish community.',
    fr: 'Activité sportive suivie de boissons avec la communauté irlandaise.',
  },
  // Événements MA
  event_ma_meetup_title: {
    en: 'Moroccan Community Meetup',
    fr: 'Rencontre Communauté Marocaine',
  },
  event_ma_meetup_desc: {
    en: 'Friendly evening for the Moroccan community. Shisha and discussions.',
    fr: 'Soirée conviviale pour la communauté marocaine. Shisha et discussions.',
  },
  event_ma_newcomers_title: {
    en: 'Moroccan Newcomers Night',
    fr: 'Soirée Newcomers Marocaine',
  },
  event_ma_newcomers_desc: {
    en: 'Welcome evening for new Moroccan arrivals. Advice and exchanges.',
    fr: 'Soirée d\'accueil pour les nouveaux arrivants marocains. Conseils et échanges.',
  },
  event_ma_boat_title: {
    en: 'Moroccan Boat Party',
    fr: 'Boat Party Marocaine',
  },
  event_ma_boat_desc: {
    en: 'Boat cruise with the Moroccan community. Music and atmosphere.',
    fr: 'Croisière en bateau avec la communauté marocaine. Musique et ambiance.',
  },
  event_ma_dating_title: {
    en: 'Moroccan Dating Night',
    fr: 'Soirée Dating Marocaine',
  },
  event_ma_dating_desc: {
    en: 'Speed dating evening for the Moroccan community in Dubai.',
    fr: 'Soirée speed dating pour la communauté marocaine à Dubaï.',
  },
  event_ma_quiz_title: {
    en: 'Moroccan Quiz Night',
    fr: 'Quiz Night Marocaine',
  },
  event_ma_quiz_desc: {
    en: 'Quiz night with questions about Morocco and Dubai. Teams and prizes.',
    fr: 'Soirée quiz avec questions sur le Maroc et Dubaï. Équipes et prix.',
  },
  event_ma_sport_title: {
    en: 'Moroccan Sports Night',
    fr: 'Soirée Sportive Marocaine',
  },
  event_ma_sport_desc: {
    en: 'Sports activity followed by a meal and drinks with the community.',
    fr: 'Activité sportive suivie d\'un repas et verres avec la communauté.',
  },
  interest_housing: { en: 'Housing & Flatshare', fr: 'Logement & Colocation' },
  interest_newcomers: { en: 'Newcomers', fr: 'Nouveaux arrivants' },
  interest_jobs: { en: 'Jobs & Opportunities', fr: 'Jobs & Opportunités' },
  interest_events: { en: 'Outings & Events', fr: 'Sorties & événements' },
  interest_marketplace: { en: 'Marketplace', fr: 'Marketplace' },
  group_badge_official: { en: 'Official WorldXpat', fr: 'Officiel WorldXpat' },
  group_badge_community: { en: 'Community', fr: 'Communautaire' },
  group_members_label: { en: '👥 +{count} members', fr: '👥 +{count} membres' },
  group_members_generic: { en: '👥 Active community', fr: '👥 Communauté active' },
  group_join_button: { en: 'Join the group', fr: 'Rejoindre le groupe' },
  group_join_placeholder: {
    en: 'Coming soon: direct join link. You will be redirected to WhatsApp here.',
    fr: 'Bientôt disponible : lien direct. Tu seras redirigé vers WhatsApp ici.',
  },
  nationality_fr: { en: 'France', fr: 'France' },
  nationality_gb: { en: 'United Kingdom', fr: 'Royaume-Uni' },
  nationality_ie: { en: 'Ireland', fr: 'Irlande' },
  nationality_ma: { en: 'Morocco', fr: 'Maroc' },
  nationality_dz: { en: 'Algeria', fr: 'Algérie' },
  nationality_tn: { en: 'Tunisia', fr: 'Tunisie' },
  nationality_be: { en: 'Belgium', fr: 'Belgique' },
  nationality_ch: { en: 'Switzerland', fr: 'Suisse' },
  nationality_es: { en: 'Spain', fr: 'Espagne' },
  nationality_it: { en: 'Italy', fr: 'Italie' },
  nationality_br: { en: 'Brazil', fr: 'Brésil' },
  nationality_in: { en: 'India', fr: 'Inde' },
  nationality_us: { en: 'United States', fr: 'États-Unis' },
  group_fr_marketplace_name: {
    en: 'French Marketplace – WorldXpat',
    fr: 'Marketplace francophone – WorldXpat',
  },
  group_fr_marketplace_desc: {
    en: 'Community marketplace: furniture, services and great deals among francophones.',
    fr: 'Marketplace communautaire : meubles, services, bons plans entre francophones.',
  },
  group_fr_jobs_name: {
    en: 'Francophone Jobs & Opportunities',
    fr: 'Jobs & Opportunités – Francophones',
  },
  group_fr_jobs_desc: {
    en: 'Job offers, freelance missions and business leads for the francophone community.',
    fr: 'Offres d’emploi, missions freelance et opportunités business pour les francophones.',
  },
  group_fr_events_name: {
    en: 'Francophone Outings & Events',
    fr: 'Sorties & événements – Francophones',
  },
  group_fr_events_desc: {
    en: 'Afterworks, dinners and curated events hosted by the community.',
    fr: 'Afterworks, restos et événements exclusifs organisés par la communauté.',
  },
  group_fr_newcomers_name: {
    en: 'Francophone Newcomers',
    fr: 'Nouveaux arrivants francophones',
  },
  group_fr_newcomers_desc: {
    en: 'Guidance for your first weeks in Dubai: paperwork, housing, daily life.',
    fr: 'Accompagnement pour tes premiers jours à Dubaï : démarches, logement, quotidien.',
  },
  group_fr_housing_name: {
    en: 'Francophone Housing & Flatshare',
    fr: 'Logement & colocation – Francophones',
  },
  group_fr_housing_desc: {
    en: 'Verified listings and flatshare opportunities between francophones.',
    fr: 'Colocations vérifiées, logements entre francophones et bons plans immobiliers.',
  },
  group_gb_marketplace_name: {
    en: 'UK Marketplace – WorldXpat',
    fr: 'Marketplace UK – WorldXpat',
  },
  group_gb_marketplace_desc: {
    en: 'Buy, sell and trade services with the British expat community.',
    fr: 'Achète, vends et échange des services avec la communauté britannique.',
  },
  group_gb_jobs_name: {
    en: 'UK Jobs & Opportunities',
    fr: 'Jobs & Opportunités – Royaume-Uni',
  },
  group_gb_jobs_desc: {
    en: 'Job offers, missions and business deals tailored to UK expats.',
    fr: 'Offres d’emploi, missions et opportunités business pour les expatriés britanniques.',
  },
  group_gb_events_name: {
    en: 'UK Events & Social',
    fr: 'Sorties & événements – Royaume-Uni',
  },
  group_gb_events_desc: {
    en: 'Afterworks, social gatherings and cultural moments for UK expats.',
    fr: 'Afterworks, rencontres et moments culturels pour la communauté britannique.',
  },
  group_gb_newcomers_name: {
    en: 'UK Newcomers',
    fr: 'Nouveaux arrivants – Royaume-Uni',
  },
  group_gb_newcomers_desc: {
    en: 'Step-by-step support for your move to Dubai.',
    fr: 'Accompagnement étape par étape pour ton installation à Dubaï.',
  },
  group_gb_housing_name: {
    en: 'UK Housing & Flatshare',
    fr: 'Logement & colocation – Royaume-Uni',
  },
  group_gb_housing_desc: {
    en: 'Curated housing and flatshare leads for UK newcomers.',
    fr: 'Logements et colocations sélectionnés pour les expatriés britanniques.',
  },
  group_ie_marketplace_name: {
    en: 'Irish Marketplace – Dubai',
    fr: 'Marketplace irlandaise – Dubaï',
  },
  group_ie_marketplace_desc: {
    en: 'Services, items and recommendations exchanged between Irish expats.',
    fr: 'Services, objets et recommandations partagés entre Irlandais à Dubaï.',
  },
  group_ie_jobs_name: {
    en: 'Irish Jobs & Opportunities',
    fr: 'Jobs & Opportunités – Irlande',
  },
  group_ie_jobs_desc: {
    en: 'Business leads and missions for the Irish community in Dubai.',
    fr: 'Opportunités business et missions pour la communauté irlandaise à Dubaï.',
  },
  group_ie_events_name: {
    en: 'Irish Events & Social',
    fr: 'Sorties & rencontres – Irlande',
  },
  group_ie_events_desc: {
    en: 'Meetups, nights out and cultural moments for Irish expats.',
    fr: 'Rencontres, sorties et moments culturels pour les expatriés irlandais.',
  },
  group_ie_newcomers_name: {
    en: 'Irish Newcomers',
    fr: 'Nouveaux arrivants – Irlande',
  },
  group_ie_newcomers_desc: {
    en: 'Community support to navigate paperwork, housing and daily life.',
    fr: 'Entraide pour les démarches, le logement et le quotidien.',
  },
  group_ie_housing_name: {
    en: 'Irish Housing & Flatshare',
    fr: 'Logement & colocation – Irlande',
  },
  group_ie_housing_desc: {
    en: 'Housing opportunities shared by Irish expats in Dubai.',
    fr: 'Opportunités logement partagées par les Irlandais à Dubaï.',
  },
  group_ma_marketplace_name: {
    en: 'Moroccan Marketplace – Dubai',
    fr: 'Marketplace Marocains à Dubaï',
  },
  group_ma_marketplace_desc: {
    en: 'Exchange goods, services and recommendations within the Moroccan community.',
    fr: 'Échanges, services et recommandations entre Marocains à Dubaï.',
  },
  group_ma_jobs_name: {
    en: 'Moroccan Jobs & Opportunities',
    fr: 'Jobs & Opportunités – Maroc',
  },
  group_ma_jobs_desc: {
    en: 'Business opportunities and job leads for Moroccan expats.',
    fr: 'Opportunités business et offres d’emploi pour les Marocains.',
  },
  group_ma_events_name: {
    en: 'Moroccan Events & Social',
    fr: 'Sorties & événements – Maroc',
  },
  group_ma_events_desc: {
    en: 'Community gatherings, cultural outings and friendly meetups.',
    fr: 'Rencontres communautaires, sorties culturelles et moments conviviaux.',
  },
  group_ma_newcomers_name: {
    en: 'Moroccan Newcomers',
    fr: 'Nouveaux arrivants – Maroc',
  },
  group_ma_newcomers_desc: {
    en: 'Guidance for Moroccans settling in Dubai, from paperwork to daily life.',
    fr: 'Accompagnement des nouveaux arrivants marocains à Dubaï, démarches et quotidien.',
  },
  group_ma_housing_name: {
    en: 'Moroccan Housing & Flatshare',
    fr: 'Logement & colocation – Maroc',
  },
  group_ma_housing_desc: {
    en: 'Find or share housing opportunities within the Moroccan community.',
    fr: 'Trouve ou propose un logement au sein de la communauté marocaine.',
  },
  // Jobs page translations
  jobs_hero_title: {
    en: 'Dubai Job Opportunities for Expats',
    fr: 'Opportunités d\'emploi à Dubaï pour expatriés',
  },
  jobs_hero_subtitle: {
    en: 'Companies publish. We deliver talent.',
    fr: 'Les entreprises recrutent. WorldXpat filtre les meilleurs talents.',
  },
  jobs_hero_company_button: {
    en: 'Are you a company? Contact us',
    fr: 'Vous êtes une entreprise ? Contactez-nous',
  },
  application_form_no_link: {
    en: 'No application link available for this offer at the moment.',
    fr: 'Aucun lien de candidature disponible pour cette offre pour le moment.',
  },
  jobs_post_button: {
    en: 'Post a Job Offer',
    fr: 'Publier une offre d\'emploi',
  },
  jobs_filter_all_categories: {
    en: 'All Categories',
    fr: 'Toutes les catégories',
  },
  jobs_filter_all_locations: {
    en: 'All Locations',
    fr: 'Tous les lieux',
  },
  jobs_filter_all_levels: {
    en: 'All Levels',
    fr: 'Tous les niveaux',
  },
  jobs_category_hospitality: {
    en: 'Hospitality & Restaurants',
    fr: 'Hôtellerie & Restaurants',
  },
  jobs_category_sales: {
    en: 'Sales & Retail',
    fr: 'Vente & Commerce',
  },
  jobs_category_real_estate: {
    en: 'Real Estate',
    fr: 'Immobilier',
  },
  jobs_category_customer_service: {
    en: 'Customer Service / Call Center',
    fr: 'Service client / Centre d\'appels',
  },
  jobs_category_administration: {
    en: 'Administration / Office',
    fr: 'Administration / Bureau',
  },
  jobs_category_marketing: {
    en: 'Marketing / Social Media / Content',
    fr: 'Marketing / Réseaux sociaux / Contenu',
  },
  jobs_category_driver: {
    en: 'Driver / Delivery',
    fr: 'Chauffeur / Livraison',
  },
  jobs_category_it: {
    en: 'IT / Web / Tech',
    fr: 'IT / Web / Tech',
  },
  jobs_category_kids: {
    en: 'Kids / Education / Babysitting',
    fr: 'Enfants / Éducation / Garde d\'enfants',
  },
  jobs_category_beauty: {
    en: 'Beauty / Fitness / Wellness',
    fr: 'Beauté / Fitness / Bien-être',
  },
  jobs_category_construction: {
    en: 'Construction / Engineering',
    fr: 'Construction / Ingénierie',
  },
  jobs_location_dubai: {
    en: 'Dubai',
    fr: 'Dubaï',
  },
  jobs_location_abu_dhabi: {
    en: 'Abu Dhabi',
    fr: 'Abou Dhabi',
  },
  jobs_location_sharjah: {
    en: 'Sharjah',
    fr: 'Charjah',
  },
  jobs_location_remote: {
    en: 'Remote',
    fr: 'Télétravail',
  },
  jobs_experience_entry: {
    en: 'Entry level',
    fr: 'Débutant',
  },
  jobs_experience_mid: {
    en: 'Mid level (2-5 years)',
    fr: 'Intermédiaire (2-5 ans)',
  },
  jobs_experience_senior: {
    en: 'Senior (5+ years)',
    fr: 'Senior (5+ ans)',
  },
  jobs_empty_state: {
    en: 'No job offers found.',
    fr: 'Aucune offre d\'emploi trouvée.',
  },
  jobs_modal_title: {
    en: 'Post a Job Offer',
    fr: 'Publier une offre d\'emploi',
  },
  jobs_form_company: {
    en: 'Company Name *',
    fr: 'Nom de l\'entreprise *',
  },
  jobs_form_title: {
    en: 'Job Title *',
    fr: 'Intitulé du poste *',
  },
  jobs_form_description: {
    en: 'Job Description *',
    fr: 'Description du poste *',
  },
  jobs_form_salary: {
    en: 'Salary',
    fr: 'Salaire',
  },
  jobs_form_salary_placeholder: {
    en: 'e.g., 5000-7000 AED or Negotiable',
    fr: 'ex: 5000-7000 AED ou Négociable',
  },
  jobs_form_whatsapp: {
    en: 'WhatsApp Contact *',
    fr: 'Contact WhatsApp *',
  },
  jobs_form_whatsapp_placeholder: {
    en: '+971501234567',
    fr: '+971501234567',
  },
  jobs_form_category: {
    en: 'Category *',
    fr: 'Catégorie *',
  },
  jobs_form_category_select: {
    en: 'Select a category',
    fr: 'Sélectionner une catégorie',
  },
  jobs_form_contract: {
    en: 'Contract Type *',
    fr: 'Type de contrat *',
  },
  jobs_form_contract_select: {
    en: 'Select',
    fr: 'Sélectionner',
  },
  jobs_form_contract_fulltime: {
    en: 'Full-Time',
    fr: 'Temps plein',
  },
  jobs_form_contract_parttime: {
    en: 'Part-time',
    fr: 'Temps partiel',
  },
  jobs_form_contract_contract: {
    en: 'Contract',
    fr: 'Contrat',
  },
  jobs_form_contract_freelance: {
    en: 'Freelance',
    fr: 'Freelance',
  },
  jobs_form_location: {
    en: 'Location *',
    fr: 'Lieu *',
  },
  jobs_form_location_select: {
    en: 'Select a location',
    fr: 'Sélectionner un lieu',
  },
  jobs_form_experience: {
    en: 'Experience Required',
    fr: 'Expérience requise',
  },
  jobs_form_experience_select: {
    en: 'Select',
    fr: 'Sélectionner',
  },
  jobs_form_benefits: {
    en: 'Benefits (visa, accommodation, insurance...)',
    fr: 'Avantages (visa, logement, assurance...)',
  },
  jobs_form_availability: {
    en: 'Availability *',
    fr: 'Disponibilité *',
  },
  jobs_form_availability_placeholder: {
    en: 'e.g., Immediate, In 2 weeks...',
    fr: 'ex: Immédiat, Dans 2 semaines...',
  },
  jobs_form_email: {
    en: 'Email (optional)',
    fr: 'Email (optionnel)',
  },
  jobs_form_submit: {
    en: 'Publish Job Offer',
    fr: 'Publier l\'offre d\'emploi',
  },
  jobs_submission_success: {
    en: '✅ Your job offer has been submitted and is now being reviewed by our team.',
    fr: '✅ Votre offre d\'emploi a été envoyée et est en cours d\'examen par notre équipe.',
  },
  jobs_view_details: {
    en: 'View Details',
    fr: 'Voir les détails',
  },
  jobs_apply_whatsapp: {
    en: 'Apply via WhatsApp',
    fr: 'Postuler via WhatsApp',
  },
  jobs_error_loading: {
    en: 'Error loading job offers.',
    fr: 'Erreur lors du chargement des offres d\'emploi.',
  },
  jobs_nav: {
    en: 'Jobs',
    fr: 'Emplois',
  },
  jobs_search_placeholder: {
    en: 'Search jobs...',
    fr: 'Rechercher un emploi...',
  },
  // Application form translations
  application_form_title: {
    en: 'Apply for this position',
    fr: 'Postuler pour ce poste',
  },
  application_form_subtitle: {
    en: 'Fill out the form below to submit your application.',
    fr: 'Remplissez le formulaire ci-dessous pour soumettre votre candidature.',
  },
  application_form_name: {
    en: 'Full Name',
    fr: 'Nom complet',
  },
  application_form_name_required: {
    en: 'Full name is required',
    fr: 'Le nom complet est requis',
  },
  application_form_email: {
    en: 'Email',
    fr: 'Email',
  },
  application_form_email_required: {
    en: 'Email is required',
    fr: 'L\'email est requis',
  },
  application_form_email_invalid: {
    en: 'Please enter a valid email address',
    fr: 'Veuillez entrer une adresse email valide',
  },
  application_form_phone: {
    en: 'Phone / WhatsApp Number',
    fr: 'Téléphone / Numéro WhatsApp',
  },
  application_form_cv: {
    en: 'CV / Resume',
    fr: 'CV / Curriculum Vitae',
  },
  application_form_cv_required: {
    en: 'CV file is required',
    fr: 'Le fichier CV est requis',
  },
  application_form_cv_invalid: {
    en: 'Only PDF, DOC, and DOCX files are allowed',
    fr: 'Seuls les fichiers PDF, DOC et DOCX sont autorisés',
  },
  application_form_cv_size: {
    en: 'File size must be less than 10MB',
    fr: 'La taille du fichier doit être inférieure à 10MB',
  },
  application_form_cv_hint: {
    en: 'Accepted formats: PDF, DOC, DOCX (max 10MB)',
    fr: 'Formats acceptés : PDF, DOC, DOCX (max 10MB)',
  },
  application_form_submit: {
    en: 'Apply now',
    fr: 'Postuler maintenant',
  },
  application_form_loading: {
    en: 'Submitting your application...',
    fr: 'Envoi de votre candidature...',
  },
  application_form_success: {
    en: 'Your application has been submitted successfully! We will contact you soon.',
    fr: 'Votre candidature a été envoyée avec succès ! Nous vous contacterons bientôt.',
  },
  application_form_error_upload: {
    en: 'Failed to upload CV file. Please try again.',
    fr: 'Échec de l\'upload du fichier CV. Veuillez réessayer.',
  },
  application_form_error_url: {
    en: 'Failed to get CV file URL. Please try again.',
    fr: 'Échec de la récupération de l\'URL du fichier CV. Veuillez réessayer.',
  },
  application_form_error_save: {
    en: 'Failed to save application. Please try again.',
    fr: 'Échec de l\'enregistrement de la candidature. Veuillez réessayer.',
  },
  application_form_error_generic: {
    en: 'An error occurred. Please try again.',
    fr: 'Une erreur est survenue. Veuillez réessayer.',
  },
  application_form_error_client: {
    en: 'Supabase client not available. Please refresh the page and try again.',
    fr: 'Client Supabase non disponible. Veuillez actualiser la page et réessayer.',
  },
  // Company job form translations
  company_form_title: {
    en: 'Publish a Job Offer',
    fr: 'Publier une offre d\'emploi',
  },
  company_form_company_name: {
    en: 'Company Name',
    fr: 'Nom de l\'entreprise',
  },
  company_form_company_name_placeholder: {
    en: 'Your company name',
    fr: 'Nom de votre entreprise',
  },
  company_form_contact_person: {
    en: 'Contact Person Name',
    fr: 'Nom de la personne de contact',
  },
  company_form_contact_person_placeholder: {
    en: 'Your name',
    fr: 'Votre nom',
  },
  company_form_contact_info: {
    en: 'Email or WhatsApp',
    fr: 'Email ou WhatsApp',
  },
  company_form_contact_info_placeholder: {
    en: 'your@email.com or +971501234567',
    fr: 'votre@email.com ou +971501234567',
  },
  company_form_contact_info_hint: {
    en: 'Enter your email or WhatsApp number',
    fr: 'Indiquez votre email ou votre numéro WhatsApp',
  },
  company_form_job_title: {
    en: 'Job Title',
    fr: 'Titre du poste',
  },
  company_form_job_title_placeholder: {
    en: 'Ex: Sales Manager',
    fr: 'Ex: Sales Manager',
  },
  company_form_job_description: {
    en: 'Job Description',
    fr: 'Description du poste',
  },
  company_form_job_description_placeholder: {
    en: 'Describe the position, responsibilities, requirements...',
    fr: 'Décrivez le poste, les responsabilités, les exigences...',
  },
  company_form_availability: {
    en: 'Availability',
    fr: 'Disponibilité',
  },
  company_form_availability_placeholder: {
    en: 'Ex: Immediate, Within 2 weeks...',
    fr: 'Ex: Immediate, Within 2 weeks...',
  },
  company_form_submit: {
    en: 'Send Offer',
    fr: 'Envoyer l\'offre',
  },
  // Colocation page translations
  colocation_hero_title: {
    en: 'Find your Roommate in Dubai',
    fr: 'Trouve ta Colocation à Dubaï',
  },
  colocation_hero_subtitle: {
    en: 'Connect with expats looking for roommates. Share accommodation, share experiences, build your Dubai community.',
    fr: 'Connecte-toi avec des expatriés à la recherche de colocataires. Partage un logement, partage des expériences, construis ta communauté à Dubaï.',
  },
  colocation_create_profile: {
    en: 'Create your Profile',
    fr: 'Créer ton Profil',
  },
  colocation_budget_min: {
    en: 'Budget Min (AED)',
    fr: 'Budget Min (AED)',
  },
  colocation_budget_max: {
    en: 'Budget Max (AED)',
    fr: 'Budget Max (AED)',
  },
  colocation_districts: {
    en: 'Districts',
    fr: 'Quartiers',
  },
  colocation_all_districts: {
    en: 'All Districts',
    fr: 'Tous les quartiers',
  },
  colocation_gender_preference: {
    en: 'Gender Preference',
    fr: 'Préférence de genre',
  },
  colocation_gender_any: {
    en: 'Any',
    fr: 'Tous',
  },
  colocation_gender_male: {
    en: 'Male',
    fr: 'Homme',
  },
  colocation_gender_female: {
    en: 'Female',
    fr: 'Femme',
  },
  colocation_gender_mixed: {
    en: 'Mixed',
    fr: 'Mixte',
  },
  colocation_nationality: {
    en: 'Nationality',
    fr: 'Nationalité',
  },
  colocation_all_nationalities: {
    en: 'All Nationalities',
    fr: 'Toutes les nationalités',
  },
  colocation_search_nationality: {
    en: 'Search nationality...',
    fr: 'Rechercher une nationalité...',
  },
  colocation_filter: {
    en: 'Filter',
    fr: 'Filtrer',
  },
  colocation_clear: {
    en: 'Clear',
    fr: 'Effacer',
  },
  colocation_no_profiles: {
    en: 'No colocation profiles found',
    fr: 'Aucun profil de colocation trouvé',
  },
  colocation_no_profiles_text: {
    en: 'Try adjusting your filters or create your own profile to get started.',
    fr: 'Essaie d\'ajuster tes filtres ou crée ton propre profil pour commencer.',
  },
  colocation_profile_created: {
    en: '✅ Profile created successfully!',
    fr: '✅ Profil créé avec succès !',
  },
  colocation_modal_title: {
    en: 'Create your Roommate Profile',
    fr: 'Créer ton Profil de Colocataire',
  },
  colocation_form_photo: {
    en: 'Photo *',
    fr: 'Photo *',
  },
  colocation_form_photo_hint: {
    en: 'Your profile photo is required and will be visible to others. You\'ll be able to crop it after selection.',
    fr: 'Ta photo de profil est requise et sera visible par les autres. Tu pourras la recadrer après sélection.',
  },
  colocation_form_first_name: {
    en: 'First Name *',
    fr: 'Prénom *',
  },
  colocation_form_age: {
    en: 'Age *',
    fr: 'Âge *',
  },
  colocation_form_nationality: {
    en: 'Nationality *',
    fr: 'Nationalité *',
  },
  colocation_form_nationality_select: {
    en: 'Select your nationality',
    fr: 'Sélectionne ta nationalité',
  },
  colocation_form_languages: {
    en: 'Languages *',
    fr: 'Langues *',
  },
  colocation_form_languages_hint: {
    en: 'Separate languages with commas (e.g., English, French, Arabic)',
    fr: 'Sépare les langues par des virgules (ex: Anglais, Français, Arabe)',
  },
  colocation_form_budget: {
    en: 'Monthly Budget (AED) *',
    fr: 'Budget Mensuel (AED) *',
  },
  colocation_form_districts: {
    en: 'Preferred Districts *',
    fr: 'Quartiers Préférés *',
  },
  colocation_form_districts_select: {
    en: 'Select districts',
    fr: 'Sélectionne les quartiers',
  },
  colocation_form_districts_hint: {
    en: 'Select one or more districts',
    fr: 'Sélectionne un ou plusieurs quartiers',
  },
  colocation_form_availability: {
    en: 'Availability / Arrival Date *',
    fr: 'Disponibilité / Date d\'Arrivée *',
  },
  colocation_form_availability_hint: {
    en: 'When are you available to move in?',
    fr: 'Quand es-tu disponible pour emménager ?',
  },
  colocation_form_gender: {
    en: 'Gender Preference *',
    fr: 'Préférence de Genre *',
  },
  colocation_form_gender_select: {
    en: 'Select preference',
    fr: 'Sélectionne une préférence',
  },
  colocation_form_description: {
    en: 'About my search *',
    fr: 'À propos de ma recherche *',
  },
  colocation_form_description_placeholder: {
    en: 'Tell us about yourself and what you\'re looking for in a roommate or accommodation. Be specific and detailed.',
    fr: 'Parle-nous de toi et de ce que tu recherches chez un colocataire ou un logement. Sois précis et détaillé.',
  },
  colocation_form_description_hint: {
    en: 'Minimum 80 characters, maximum 500',
    fr: 'Minimum 80 caractères, maximum 500',
  },
  colocation_form_whatsapp: {
    en: 'WhatsApp Number *',
    fr: 'Numéro WhatsApp *',
  },
  colocation_form_whatsapp_hint: {
    en: 'Include country code (e.g., +971 for UAE, +33 for France)',
    fr: 'Inclus l\'indicatif pays (ex: +971 pour les EAU, +33 pour la France)',
  },
  colocation_form_submit: {
    en: 'Submit Profile',
    fr: 'Envoyer le Profil',
  },
  colocation_form_cancel: {
    en: 'Cancel',
    fr: 'Annuler',
  },
  colocation_form_submitting: {
    en: 'Submitting...',
    fr: 'Envoi en cours...',
  },
  colocation_form_success_title: {
    en: 'Profile submitted — under review by WorldXpat',
    fr: 'Profil envoyé — en cours d\'examen par WorldXpat',
  },
  colocation_form_success_text: {
    en: 'Your profile will be visible once approved by our team. We\'ll review it within 24-48 hours.',
    fr: 'Ton profil sera visible une fois approuvé par notre équipe. Nous l\'examinerons dans les 24-48 heures.',
  },
  colocation_photo_ready: {
    en: 'Photo ready ✅',
    fr: 'Photo prête ✅',
  },
  colocation_photo_adjust: {
    en: '✏️ Adjust',
    fr: '✏️ Ajuster',
  },
  colocation_photo_use: {
    en: '✅ Use this photo',
    fr: '✅ Utiliser cette photo',
  },
  colocation_photo_hint: {
    en: 'Drag to center your face. Use the slider to zoom.',
    fr: 'Glisse pour centrer ton visage. Utilise le curseur pour zoomer.',
  },
  colocation_photo_zoom: {
    en: 'Zoom:',
    fr: 'Zoom :',
  },
  colocation_photo_save: {
    en: '✅ Save',
    fr: '✅ Enregistrer',
  },
  colocation_profile_details: {
    en: 'Profile Details',
    fr: 'Détails du Profil',
  },
};

// ============================================
// ABOUT SECTION SLIDER
// ============================================

function initAboutSlider() {
  const slider = document.getElementById('aboutSlider');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.about-slide'));
  const dots = Array.from(slider.querySelectorAll('.about-slider-dot'));
  const prevBtn = slider.querySelector('.about-slider-prev');
  const nextBtn = slider.querySelector('.about-slider-next');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoTimer = null;

  const setActiveSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('about-slide-active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('about-slider-dot-active', i === index);
    });
    currentIndex = index;
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    setActiveSlide(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    setActiveSlide(prevIndex);
  };

  // Autoplay
  const startAutoPlay = () => {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(goToNext, 6000);
  };

  const stopAutoPlay = () => {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
  };

  // Init
  setActiveSlide(0);
  startAutoPlay();

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoPlay();
      goToNext();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoPlay();
      goToPrev();
      startAutoPlay();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoPlay();
      setActiveSlide(index);
      startAutoPlay();
    });
  });
}

const nationalities = [
  { id: 'FR', nameKey: 'nationality_fr', flag: '🇫🇷', groups: 8 },
  { id: 'GB', nameKey: 'nationality_gb', flag: '🇬🇧', groups: 3 },
  { id: 'IE', nameKey: 'nationality_ie', flag: '🇮🇪', groups: 2 },
  { id: 'MA', nameKey: 'nationality_ma', flag: '🇲🇦', groups: 5 },
];

const interests = [
  { id: 'housing', translationKey: 'interest_housing' },
  { id: 'newcomers', translationKey: 'interest_newcomers' },
  { id: 'jobs', translationKey: 'interest_jobs' },
  { id: 'events', translationKey: 'interest_events' },
  { id: 'marketplace', translationKey: 'interest_marketplace' },
];

const groupLinks = {
  FR: {
    marketplace: {
      url: 'https://chat.whatsapp.com/IO0h68K5DjNIYh4RSPdzvs',
      nameKey: 'group_fr_marketplace_name',
      descriptionKey: 'group_fr_marketplace_desc',
      flag: '🇫🇷',
    },
    jobs: {
      url: 'https://chat.whatsapp.com/Iv20IjgYQLI0Lt30vcSCEP',
      nameKey: 'group_fr_jobs_name',
      descriptionKey: 'group_fr_jobs_desc',
      flag: '🇫🇷',
    },
    events: {
      url: 'https://chat.whatsapp.com/BiL3Sc0pAhB9u6Bd5yGpt8',
      nameKey: 'group_fr_events_name',
      descriptionKey: 'group_fr_events_desc',
      flag: '🇫🇷',
    },
    newcomers: {
      url: 'https://chat.whatsapp.com/Hb06NYnZcfs4C7Q5DDcebB',
      nameKey: 'group_fr_newcomers_name',
      descriptionKey: 'group_fr_newcomers_desc',
      flag: '🇫🇷',
    },
    housing: {
      url: 'https://chat.whatsapp.com/FZfoDvNNa0VDmJylQ7N2Hg',
      nameKey: 'group_fr_housing_name',
      descriptionKey: 'group_fr_housing_desc',
      flag: '🇫🇷',
    },
  },
  GB: {
    marketplace: {
      url: 'https://chat.whatsapp.com/Ii3d0jTLS1O3Dttsj8qc0c',
      nameKey: 'group_gb_marketplace_name',
      descriptionKey: 'group_gb_marketplace_desc',
      flag: '🇬🇧',
    },
    jobs: {
      url: 'https://chat.whatsapp.com/H7Ugu1f4AqrHTo3m6RepVQ',
      nameKey: 'group_gb_jobs_name',
      descriptionKey: 'group_gb_jobs_desc',
      flag: '🇬🇧',
    },
    events: {
      url: 'https://chat.whatsapp.com/LkEAT5AlWC8DUfXUHzp0n4',
      nameKey: 'group_gb_events_name',
      descriptionKey: 'group_gb_events_desc',
      flag: '🇬🇧',
    },
    newcomers: {
      url: 'https://chat.whatsapp.com/LAc5x9Bcp1RCoJe3EOQMZ4',
      nameKey: 'group_gb_newcomers_name',
      descriptionKey: 'group_gb_newcomers_desc',
      flag: '🇬🇧',
    },
    housing: {
      url: 'https://chat.whatsapp.com/HCdOcXqpBygK0hlAgzvzHH',
      nameKey: 'group_gb_housing_name',
      descriptionKey: 'group_gb_housing_desc',
      flag: '🇬🇧',
    },
  },
  IE: {
    marketplace: {
      url: 'https://chat.whatsapp.com/CM6h1ON97Yn8CwX4FuecHn',
      nameKey: 'group_ie_marketplace_name',
      descriptionKey: 'group_ie_marketplace_desc',
      flag: '🇮🇪',
    },
    jobs: {
      url: 'https://chat.whatsapp.com/GJt6RmlC7gIIQOnGhAzFHW',
      nameKey: 'group_ie_jobs_name',
      descriptionKey: 'group_ie_jobs_desc',
      flag: '🇮🇪',
    },
    events: {
      url: 'https://chat.whatsapp.com/Iu8eYqO4M01C5RR4B2uo3L',
      nameKey: 'group_ie_events_name',
      descriptionKey: 'group_ie_events_desc',
      flag: '🇮🇪',
    },
    newcomers: {
      url: 'https://chat.whatsapp.com/L88wbpdtOjmL8KCiVrJ3YF',
      nameKey: 'group_ie_newcomers_name',
      descriptionKey: 'group_ie_newcomers_desc',
      flag: '🇮🇪',
    },
    housing: {
      url: 'https://chat.whatsapp.com/IsjVupKjp6874QQ0LAIPvP',
      nameKey: 'group_ie_housing_name',
      descriptionKey: 'group_ie_housing_desc',
      flag: '🇮🇪',
    },
  },
  MA: {
    marketplace: {
      url: 'https://chat.whatsapp.com/GemY46AHbYc5c1b7dUckOv',
      nameKey: 'group_ma_marketplace_name',
      descriptionKey: 'group_ma_marketplace_desc',
      flag: '🇲🇦',
    },
    jobs: {
      url: 'https://chat.whatsapp.com/I03D8FdOYTz4D2cz2AobUY',
      nameKey: 'group_ma_jobs_name',
      descriptionKey: 'group_ma_jobs_desc',
      flag: '🇲🇦',
    },
    events: {
      url: 'https://chat.whatsapp.com/HsU2cvFUCytD0wsPbBLOXV',
      nameKey: 'group_ma_events_name',
      descriptionKey: 'group_ma_events_desc',
      flag: '🇲🇦',
    },
    newcomers: {
      url: 'https://chat.whatsapp.com/D3KoAr0CkGT56rMyKAUAls',
      nameKey: 'group_ma_newcomers_name',
      descriptionKey: 'group_ma_newcomers_desc',
      flag: '🇲🇦',
    },
    housing: {
      url: 'https://chat.whatsapp.com/CYlmNnnFll6AJNAjjoX09x',
      nameKey: 'group_ma_housing_name',
      descriptionKey: 'group_ma_housing_desc',
      flag: '🇲🇦',
    },
  },
};

let currentLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';
// Expose currentLanguage globally for other scripts
window.currentLanguage = currentLanguage;
let selectedNationality = null;
let selectedInterest = null;

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize language first to ensure all text is in the correct language
  try {
    if (typeof initLanguageSwitcher === 'function') {
      initLanguageSwitcher();
    } else {
      console.warn('initLanguageSwitcher not found');
    }
    if (typeof applyLanguage === 'function') {
      applyLanguage(currentLanguage);
    } else {
      console.warn('applyLanguage not found');
    }
  } catch (error) {
    console.error('Error initializing language:', error);
  }
  
  // Then initialize all components - each wrapped in try/catch to prevent one failure from blocking others
  try {
    if (typeof initHeader === 'function') {
  initHeader();
    }
  } catch (error) {
    console.error('Error in initHeader:', error);
  }

  try {
    if (typeof initNationalities === 'function') {
  initNationalities();
    } else {
      console.warn('initNationalities not found');
    }
  } catch (error) {
    console.error('Error in initNationalities:', error);
  }

  try {
    if (typeof initInterests === 'function') {
  initInterests();
    } else {
      console.warn('initInterests not found');
    }
  } catch (error) {
    console.error('Error in initInterests:', error);
  }

  try {
    if (typeof initGroups === 'function') {
  initGroups();
    } else {
      console.warn('initGroups not found');
    }
  } catch (error) {
    console.error('Error in initGroups:', error);
  }

  try {
    if (typeof initFAQ === 'function') {
  initFAQ();
    }
  } catch (error) {
    console.error('Error in initFAQ:', error);
  }

  try {
    if (typeof initMobileMenu === 'function') {
  initMobileMenu();
    }
  } catch (error) {
    console.error('Error in initMobileMenu:', error);
  }

  try {
    if (typeof initScrollAnimations === 'function') {
  initScrollAnimations();
    }
  } catch (error) {
    console.error('Error in initScrollAnimations:', error);
  }

  try {
    if (typeof initSmoothScroll === 'function') {
  initSmoothScroll();
    }
  } catch (error) {
    console.error('Error in initSmoothScroll:', error);
  }

  try {
    if (typeof initGroupsResetButton === 'function') {
  initGroupsResetButton();
    }
  } catch (error) {
    console.error('Error in initGroupsResetButton:', error);
  }

  try {
    if (typeof initAboutSlider === 'function') {
      initAboutSlider();
    }
  } catch (error) {
    console.error('Error in initAboutSlider:', error);
  }
});

// ============================================
// HEADER SCROLL
// ============================================

function initHeader() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Ignore empty href, external URLs, and WhatsApp links
      if (href === '#' || !href) return;
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        // Let external links work normally
        return;
      }
      
      // Only handle internal anchor links (starting with #)
      if (!href.startsWith('#')) return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = 70;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Fermer le menu mobile si ouvert
        closeMobileMenu();
      }
    });
  });
}

// ============================================
// NATIONALITÉS
// ============================================

function initNationalities() {
  const grid = document.getElementById('nationalitiesGrid');
  if (!grid) {
    // La grille n'existe pas sur cette page (ex: events.html), on ne fait rien
    console.warn('nationalitiesGrid not found');
    return;
  }
  
  // Verify nationalities array exists and has data
  if (!nationalities || nationalities.length === 0) {
    console.error('nationalities array is empty or undefined');
    return;
  }
  
  // Clear any existing content
  grid.innerHTML = '';
  
  // Create nationality cards
  nationalities.forEach(nat => {
    const card = createNationalityCard(nat);
    if (card) {
      // Make cards visible immediately (don't wait for scroll observer)
      card.classList.add('visible');
    grid.appendChild(card);
    }
  });
  
  // Update text content after creation to ensure correct language
  if (typeof updateNationalityLabels === 'function') {
    updateNationalityLabels();
  }
  
  console.log(`Initialized ${nationalities.length} nationality cards`);
}

function createNationalityCard(nat) {
  if (!nat || !nat.id || !nat.flag || !nat.nameKey) {
    console.error('Invalid nationality data:', nat);
    return null;
  }

  const card = document.createElement('div');
  card.className = 'nationality-card fade-in';
  card.dataset.nationality = nat.id;

  const flag = document.createElement('span');
  flag.className = 'nationality-flag';
  flag.textContent = nat.flag;

  const name = document.createElement('div');
  name.className = 'nationality-name';
  name.dataset.i18n = nat.nameKey;
  name.textContent = t(nat.nameKey);

  card.appendChild(flag);
  card.appendChild(name);
  
  card.addEventListener('click', () => {
    console.log('Nationality card clicked:', nat.id);
    selectNationality(nat.id);
    // Scroll vers la section intérêts
    setTimeout(() => {
      const interestsSection = document.getElementById('interests');
      if (interestsSection) {
        const headerHeight = 70;
        const targetPosition = interestsSection.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  });
  
  return card;
}

function selectNationality(natId) {
  console.log('selectNationality called with:', natId);
  selectedNationality = natId;
  
  // Mettre à jour l'UI
  document.querySelectorAll('.nationality-card').forEach(card => {
    card.classList.remove('selected');
    if (card.dataset.nationality === natId) {
      card.classList.add('selected');
    }
  });
  
  // Filtrer les groupes
  filterGroups();
}

// ============================================
// INTÉRÊTS
// ============================================

function initInterests() {
  const list = document.getElementById('interestsList');
  // La liste n'existe pas sur toutes les pages (ex: partners.html)
  if (!list) {
    return;
  }
  
  interests.forEach(interest => {
    const pill = createInterestPill(interest);
    list.appendChild(pill);
  });
}

function createInterestPill(interest) {
  const pill = document.createElement('button');
  pill.className = 'interest-pill';
  pill.dataset.interest = interest.id;
  pill.dataset.i18n = interest.translationKey;
  pill.textContent = t(interest.translationKey);
  
  pill.addEventListener('click', () => {
    selectInterest(interest.id);
    // Scroll vers la section groupes
    setTimeout(() => {
      const groupsSection = document.getElementById('groups');
      if (groupsSection) {
        const headerHeight = 70;
        const targetPosition = groupsSection.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  });
  
  return pill;
}

function selectInterest(interestId) {
  console.log('selectInterest called with:', interestId);
  selectedInterest = interestId;
  
  // Mettre à jour l'UI
  document.querySelectorAll('.interest-pill').forEach(pill => {
    pill.classList.remove('selected');
    if (pill.dataset.interest === interestId) {
      pill.classList.add('selected');
    }
  });
  
  // Filtrer les groupes
  filterGroups();
}

// ============================================
// GROUPES
// ============================================

function initGroups() {
  // La grille des groupes n'existe que sur la page d'accueil
  const grid = document.getElementById('groupsGrid');
  if (!grid) {
    return;
  }
  filterGroups();
}

function filterGroups() {
  const grid = document.getElementById('groupsGrid');
  const empty = document.getElementById('groupsEmpty');
  const resetButton = document.getElementById('groupsResetButton');
  const emptyMessage = document.getElementById('groupsEmptyMessage');

  // Si ces éléments n'existent pas (ex: sur partners.html), on ne fait rien
  if (!grid || !empty || !emptyMessage) {
    return;
  }

  const hasAnyFilter = Boolean(selectedNationality || selectedInterest);
  const hasCompleteFilter = Boolean(selectedNationality && selectedInterest);

  // Debug logs
  console.log('filterGroups called:', {
    selectedNationality,
    selectedInterest,
    hasAnyFilter,
    hasCompleteFilter
  });

  const matchedGroups = [];

  if (hasCompleteFilter) {
    const countryLinks = groupLinks[selectedNationality];
    console.log('Country links for', selectedNationality, ':', countryLinks);
    
    if (!countryLinks) {
      console.warn(`No group links found for nationality: ${selectedNationality}`);
    } else {
      const link = countryLinks[selectedInterest];
      console.log('Link for interest', selectedInterest, ':', link);

    if (link) {
      const groupName = link.nameKey ? t(link.nameKey) : link.name;
      const groupDescription = link.descriptionKey ? t(link.descriptionKey) : link.description;

      matchedGroups.push({
        id: `${selectedNationality}-${selectedInterest}`,
        name: groupName,
        flag: link.flag,
        nationality: selectedNationality,
        interest: selectedInterest,
        type: 'official',
        members: 0,
        description: groupDescription,
        url: link.url,
      });
        console.log('Added group to matchedGroups:', matchedGroups[0]);
      } else {
        console.warn(`No link found for interest: ${selectedInterest} in nationality: ${selectedNationality}`);
      }
    }
  }

  grid.innerHTML = '';

  if (!hasAnyFilter) {
    showGroupsEmptyState(grid, empty, emptyMessage, resetButton, 'groups_prompt_select', false);
    return;
  }

  if (!hasCompleteFilter) {
    showGroupsEmptyState(grid, empty, emptyMessage, resetButton, 'groups_prompt_select', true);
    return;
  }

  if (matchedGroups.length === 0) {
    showGroupsEmptyState(grid, empty, emptyMessage, resetButton, 'groups_empty_filtered', true);
    return;
  }

  grid.style.display = 'grid';
  empty.style.display = 'none';
  if (resetButton) {
    resetButton.style.display = hasAnyFilter ? 'inline-flex' : 'none';
  }

  matchedGroups.forEach((group, index) => {
    const card = createGroupCard(group);
    card.classList.add('fade-in');
    setTimeout(() => {
      card.style.transitionDelay = `${index * 50}ms`;
    }, 10);
    grid.appendChild(card);
  });

  setTimeout(() => {
    document.querySelectorAll('#groupsGrid .fade-in').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
}

function showGroupsEmptyState(grid, empty, messageEl, resetButton, messageKey, showReset) {
  if (!grid || !empty || !messageEl) return;
  grid.style.display = 'none';
  empty.style.display = 'block';
  setDynamicText(messageEl, messageKey);
  if (resetButton) {
    resetButton.style.display = showReset ? 'inline-flex' : 'none';
  }
}

function createGroupCard(group) {
  const card = document.createElement('div');
  card.className = 'group-card';

  const badgeClass = group.type === 'official' ? 'official' : '';
  const badgeText = group.type === 'official' ? t('group_badge_official') : t('group_badge_community');

  const actionLabel = t('group_join_button');
  const actionElement = group.url
    ? `<a class="group-btn group-btn-link" href="${group.url}" target="_blank" rel="noopener">${actionLabel}</a>`
    : `<button class="group-btn" onclick="handleJoinGroup('${group.id}')">${actionLabel}</button>`;

  const membersLabel = group.members
    ? t('group_members_label').replace('{count}', group.members)
    : t('group_members_generic');

  card.innerHTML = `
    <div class="group-header">
      <span class="group-flag">${group.flag}</span>
      <span class="group-badge ${badgeClass}">${badgeText}</span>
    </div>
    <h3 class="group-title">${group.name}</h3>
    <p class="group-description">${group.description}</p>
    <div class="group-footer">
      <span class="group-members">${membersLabel}</span>
      ${actionElement}
    </div>
  `;

  return card;
}

// Exposer la fonction globalement pour les boutons
window.handleJoinGroup = function(groupId) {
  // Pour l'instant, juste un placeholder
  alert(t('group_join_placeholder'));
};

// ============================================
// FAQ
// ============================================

function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Fermer tous les autres
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle l'item actuel
      if (isActive) {
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ============================================
// MENU MOBILE
// ============================================

function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('mobile-open');
    });
  }
}

function closeMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  
  if (toggle && links) {
    toggle.classList.remove('active');
    links.classList.remove('mobile-open');
  }
}

// ============================================
// ANIMATIONS AU SCROLL
// ============================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observer tous les éléments avec la classe fade-in
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
  
  // Ajouter fade-in aux cartes de nationalités après leur création
  setTimeout(() => {
    document.querySelectorAll('.nationality-card').forEach(card => {
      observer.observe(card);
    });
  }, 100);
}

// ============================================
// RÉINITIALISATION DES FILTRES
// ============================================

function resetFilters() {
  selectedNationality = null;
  selectedInterest = null;
  
  document.querySelectorAll('.nationality-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  document.querySelectorAll('.interest-pill').forEach(pill => {
    pill.classList.remove('selected');
  });
  
  filterGroups();
}

// Exposer la fonction globalement pour le bouton de réinitialisation
window.resetFilters = resetFilters;

function initGroupsResetButton() {
  const button = document.getElementById('groupsResetButton');
  if (!button) return;

  button.addEventListener('click', event => {
    event.preventDefault();
    resetFilters();
    const target = document.getElementById('nationalities');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// ============================================
// LANGUE
// ============================================

function initLanguageSwitcher() {
  const switcher = document.getElementById('languageSwitch');
  if (!switcher) return;

  switcher.addEventListener('click', event => {
    const button = event.target.closest('[data-language-option]');
    if (!button) return;
    const lang = button.dataset.languageOption;
    if (lang && lang !== currentLanguage) {
      applyLanguage(lang);
    }
  });

  updateLanguageButtons();
}

function applyLanguage(lang) {
  if (!['en', 'fr'].includes(lang)) {
    lang = 'en';
  }

  currentLanguage = lang;
  window.currentLanguage = lang; // Update global reference
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);

  updateLanguageButtons();
  updateStaticText();
  updateDynamicTexts();
  updateInterestLabels();
  updateNationalityLabels();
  filterGroups();
  
  // Déclencher un événement pour les autres scripts
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
}

function updateLanguageButtons() {
  document.querySelectorAll('[data-language-option]').forEach(button => {
    const isActive = button.dataset.languageOption === currentLanguage;
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function t(key) {
  const entry = translations[key];
  if (!entry) return '';
  return entry[currentLanguage] ?? entry.en ?? '';
}

// Expose t() globally for other scripts
window.t = t;

function updateStaticText() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const value = t(key);
    if (value) {
      // Don't update innerHTML for select options, they are handled separately
      if (el.tagName === 'OPTION') {
        el.textContent = value;
      } else {
        el.innerHTML = value;
      }
    }
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const mappings = el.dataset.i18nAttr.split(',');
    mappings.forEach(mapping => {
      const [attr, key] = mapping.split(':').map(part => part.trim());
      if (!attr || !key) return;
      const value = t(key);
      if (value) {
        el.setAttribute(attr, value);
      }
    });
  });
  
  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(input => {
    const key = input.getAttribute('data-i18n-placeholder');
    if (key) {
      const value = t(key);
      if (value) {
        input.placeholder = value;
      }
    }
  });
}

// Expose updateStaticText globally for other scripts
window.updateStaticText = updateStaticText;

function updateDynamicTexts() {
  document.querySelectorAll('[data-dynamic-i18n]').forEach(el => {
    const key = el.dataset.dynamicI18n;
    if (key) {
      el.textContent = t(key);
    }
  });
}

function updateInterestLabels() {
  interests.forEach(interest => {
    const pill = document.querySelector(`.interest-pill[data-interest="${interest.id}"]`);
    if (pill) {
      pill.textContent = t(interest.translationKey);
    }
  });
}

function updateNationalityLabels() {
  nationalities.forEach(nat => {
    const nameEl = document.querySelector(`.nationality-card[data-nationality="${nat.id}"] .nationality-name`);
    if (nameEl && nameEl.dataset.i18n === nat.nameKey) {
      nameEl.textContent = t(nat.nameKey);
    }
  });
}

function setDynamicText(element, key) {
  if (!element) return;
  element.dataset.dynamicI18n = key;
  element.textContent = t(key);
}

