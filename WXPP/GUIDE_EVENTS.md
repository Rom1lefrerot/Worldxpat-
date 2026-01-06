# 📋 Guide de Gestion des Événements - events.html

## 📍 Où sont gérées les cartes ?

Toutes les cartes d'événements sont gérées dans le fichier **`events.js`**, dans l'objet `EVENTS_BY_NATIONALITY` (lignes 11-236).

---

## ➕ Comment AJOUTER une carte d'événement ?

### Étape 1 : Ouvrir `events.js`
### Étape 2 : Trouver la nationalité concernée dans `EVENTS_BY_NATIONALITY`

Les nationalités disponibles sont :
- `FR` : Francophones
- `GB` : British
- `IE` : Irish
- `MA` : Moroccan

### Étape 3 : Ajouter un nouvel objet dans le tableau

**Exemple : Ajouter un événement pour les Francophones**

```javascript
FR: [
  // ... événements existants ...
  {
    id: 'fr-nouvel-evenement-1',  // ⚠️ ID unique (ex: fr-meetup-2, fr-boat-2)
    title: 'Titre de votre événement',
    type: 'Soirée Rencontre',  // Type (voir types disponibles ci-dessous)
    date: '2025-02-15',  // Format: YYYY-MM-DD
    time: '20:00',  // Format: HH:MM
    location: 'Dubai Marina',  // Lieu de l'événement
    description: 'Description de votre événement',
    // Optionnel : image personnalisée
    image: 'https://votre-image.com/image.jpg'  // Si omis, utilise l'image par défaut du type
  },
],
```

**Types d'événements disponibles :**
- `'Soirée Rencontre'` 🤝
- `'Soirée Newcomers'` 👋
- `'Soirée Boat Party'` ⛵
- `'Soirée Dating'` 💕
- `'Soirée Quiz'` 🧠
- `'Soirée Sportive'` ⚽

---

## ➖ Comment RETIRER une carte d'événement ?

### Étape 1 : Ouvrir `events.js`
### Étape 2 : Trouver l'événement dans `EVENTS_BY_NATIONALITY`
### Étape 3 : Supprimer tout l'objet (de `{` à `},`)

**Exemple : Retirer l'événement `fr-meetup-1`**

```javascript
FR: [
  // ❌ SUPPRIMER CET OBJET ENTIER :
  // {
  //   id: 'fr-meetup-1',
  //   title: 'Soirée Rencontre Francophone',
  //   type: 'Soirée Rencontre',
  //   date: '2025-01-15',
  //   time: '19:30',
  //   location: 'Dubai Marina',
  //   description: 'Rencontre conviviale...',
  // },
  
  // Garder les autres événements...
],
```

---

## 🖼️ Comment GÉRER les PHOTOS des cartes ? (SYSTÈME SIMPLIFIÉ ✨)

### 🎯 Méthode RECOMMANDÉE : Images automatiques (SUPER SIMPLE !)

**Le système cherche automatiquement une image basée sur l'ID de l'événement !**

#### Comment ça marche ?

1. **Trouvez l'ID de votre événement** dans `events.js`
   ```javascript
   {
     id: 'fr-newcomers-1',  // ← Cet ID
     title: '...',
     // ...
   }
   ```

2. **Nommez votre image** avec exactement cet ID
   - Exemple : `fr-newcomers-1.jpg`

3. **Placez l'image** dans le dossier `images/events/`

4. **C'est tout !** Le système utilisera automatiquement votre image ! 🎉

#### Exemple concret :

```javascript
// Dans events.js
{
  id: 'fr-boat-1',
  title: 'Boat Party Francophone',
  // ... pas besoin d'ajouter 'image' !
}
```

→ Placez `fr-boat-1.jpg` dans `images/events/`
→ L'image sera automatiquement utilisée !

#### Formats supportés :
- ✅ `.jpg` (recommandé)
- ✅ `.jpeg`
- ✅ `.png`
- ✅ `.webp`

---

### Option 2 : Image personnalisée (URL externe)

Si vous voulez utiliser une URL externe, ajoutez la propriété `image` :

```javascript
{
  id: 'fr-meetup-1',
  title: 'Soirée Rencontre Francophone',
  // ...
  image: 'https://images.unsplash.com/photo-1234567890?w=800&h=600&fit=crop'  // ✅ URL externe
}
```

---

### Option 3 : Changer l'image par défaut d'un type

Modifiez `EVENT_TYPE_IMAGES` dans `events.js` (lignes 249-256) :

```javascript
const EVENT_TYPE_IMAGES = {
  'Soirée Rencontre': 'https://votre-nouvelle-image.com/image.jpg',  // ✅ Nouvelle image
  'Soirée Newcomers': 'https://images.unsplash.com/...',
  // ...
};
```

---

### 📊 Priorité des images (ordre de recherche)

1. **Image personnalisée** : Si vous ajoutez `image: 'URL'` dans l'événement
2. **Image automatique** : `images/events/{id}.jpg` (méthode recommandée ✨)
3. **Image par défaut** : Image du type d'événement (définie dans `EVENT_TYPE_IMAGES`)

---

### 💡 Astuces pour les images

- **Taille recommandée** : 800x600px ou ratio 4:3
- **Poids** : Optimisez vos images (max 500KB recommandé)
- **Nom** : Utilisez **exactement** l'ID de l'événement (sensible à la casse)
- **Dossier** : Toutes les images vont dans `images/events/`

---

## 📝 Exemple Complet : Ajouter un nouvel événement

```javascript
FR: [
  // ... événements existants ...
  {
    id: 'fr-concert-1',
    title: 'Concert Live Francophone',
    type: 'Soirée Rencontre',  // Utilise l'icône 🤝 et l'image par défaut
    date: '2025-02-20',
    time: '21:00',
    location: 'Downtown Dubai',
    description: 'Concert live avec des artistes francophones. Ambiance garantie !',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop'  // Image personnalisée
  },
],
```

---

## ⚠️ Points Importants

1. **ID unique** : Chaque événement doit avoir un `id` unique (ex: `fr-meetup-1`, `gb-boat-2`)
2. **Format de date** : Toujours utiliser `YYYY-MM-DD` (ex: `'2025-01-15'`)
3. **Format d'heure** : Toujours utiliser `HH:MM` (ex: `'20:00'`, `'19:30'`)
4. **Virgule** : N'oubliez pas la virgule après chaque objet (sauf le dernier)
5. **Sauvegarder** : Après modification, sauvegardez `events.js` et rechargez la page

---

## 🔍 Structure d'un Événement

```javascript
{
  id: 'unique-id',              // ⚠️ Obligatoire - Identifiant unique
  title: 'Titre',                // ⚠️ Obligatoire - Titre de l'événement
  type: 'Type d\'événement',     // ⚠️ Obligatoire - Un des types disponibles
  date: '2025-01-15',           // ⚠️ Obligatoire - Format YYYY-MM-DD
  time: '20:00',                // ⚠️ Obligatoire - Format HH:MM
  location: 'Lieu',             // ⚠️ Obligatoire - Lieu de l'événement
  description: 'Description',   // ⚠️ Obligatoire - Description de l'événement
  image: 'URL'                  // ✅ Optionnel - Image personnalisée
}
```

---

## 🎨 Personnalisation des Images par Type

Pour changer toutes les images d'un type d'événement, modifiez `EVENT_TYPE_IMAGES` :

```javascript
const EVENT_TYPE_IMAGES = {
  'Soirée Rencontre': 'https://nouvelle-image-rencontre.jpg',
  'Soirée Newcomers': 'https://nouvelle-image-newcomers.jpg',
  'Soirée Boat Party': 'https://nouvelle-image-boat.jpg',
  'Soirée Dating': 'https://nouvelle-image-dating.jpg',
  'Soirée Quiz': 'https://nouvelle-image-quiz.jpg',
  'Soirée Sportive': 'https://nouvelle-image-sport.jpg',
};
```

---

## ✅ Checklist pour Ajouter un Événement

- [ ] ID unique et descriptif
- [ ] Titre clair et accrocheur
- [ ] Type d'événement valide
- [ ] Date au format YYYY-MM-DD
- [ ] Heure au format HH:MM
- [ ] Lieu précis
- [ ] Description informative
- [ ] Image personnalisée (optionnel)
- [ ] Virgule après l'objet
- [ ] Sauvegarde du fichier

