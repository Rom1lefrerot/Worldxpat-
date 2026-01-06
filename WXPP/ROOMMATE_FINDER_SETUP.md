# Roommate Finder - Configuration Guide

## 📋 Vue d'ensemble

La page `colocation.html` a été transformée en une plateforme complète de recherche de colocation ("roommate finder") avec toutes les fonctionnalités demandées.

## 🗂️ Fichiers modifiés/créés

### Fichiers créés :
- **`roommate_profiles_schema.sql`** : Schéma SQL complet pour créer la table `roommate_profiles` dans Supabase
- **`ROOMMATE_FINDER_SETUP.md`** : Ce fichier de documentation

### Fichiers modifiés :
- **`colocation.html`** : Formulaire complet avec tous les nouveaux champs (photo, nationalité, langues, quartiers multiples, type, etc.)
- **`colocation.js`** : Logique complète réécrite (upload photo, validation, filtres, modale détails)
- **`colocation.css`** : Styles ajoutés pour le nouveau formulaire, upload photo, modale détails

## 🗄️ Configuration Supabase

### 1. Créer la table `roommate_profiles`

Exécutez le script SQL dans `roommate_profiles_schema.sql` dans l'éditeur SQL de Supabase :

1. Allez dans votre projet Supabase
2. Cliquez sur "SQL Editor" dans le menu de gauche
3. Créez une nouvelle requête
4. Copiez-collez le contenu de `roommate_profiles_schema.sql`
5. Exécutez la requête

### 2. Créer le bucket Storage pour les photos

1. Allez dans "Storage" dans le dashboard Supabase
2. Cliquez sur "Create a new bucket"
3. Nommez-le : **`roommate-photos`**
4. Configurez les options :
   - **Public** : `false` (ou `true` si vous voulez que les photos soient publiques)
   - **File size limit** : 5MB
   - **Allowed MIME types** : `image/*`

### 3. Configurer les politiques Storage

Dans Storage > Policies pour le bucket `roommate-photos`, créez :

**Policy pour SELECT (lecture publique)** :
```sql
CREATE POLICY "Public can view roommate photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'roommate-photos');
```

**Policy pour INSERT (upload)** :
```sql
CREATE POLICY "Public can upload roommate photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'roommate-photos');
```

## 📊 Structure de la table `roommate_profiles`

### Champs obligatoires :
- `photo_url` (TEXT) - URL de la photo (obligatoire pour `is_visible`)
- `first_name` (TEXT) - Prénom
- `age` (INTEGER) - Âge (18-100)
- `nationality` (TEXT) - Nationalité
- `languages` (TEXT[]) - Array de langues
- `monthly_budget` (INTEGER) - Budget mensuel en AED
- `preferred_districts` (TEXT[]) - Array de quartiers préférés
- `availability_date` (DATE) - Date de disponibilité
- `search_type` (ENUM) - `'looking_for_room'` ou `'looking_for_roommate'`
- `gender_preference` (ENUM) - `'Mixed'`, `'Male'`, ou `'Female'`
- `description` (TEXT) - Description (80-500 caractères)
- `whatsapp` (TEXT) - Numéro WhatsApp

### Champs automatiques :
- `id` (UUID) - Identifiant unique
- `status` (ENUM) - `'pending'`, `'approved'`, `'rejected'` (défaut: `'pending'`)
- `is_visible` (BOOLEAN) - Calculé automatiquement (true si approved + photo + tous champs obligatoires)
- `created_at` (TIMESTAMP) - Date de création
- `updated_at` (TIMESTAMP) - Date de mise à jour
- `last_activity` (TIMESTAMP) - Dernière activité

## ✨ Fonctionnalités implémentées

### A) Formulaire "Create your Profile"

✅ **Photo obligatoire** avec upload vers Supabase Storage
✅ **Prénom** (obligatoire)
✅ **Âge** (18-100, obligatoire)
✅ **Nationalité** (obligatoire)
✅ **Langues** (séparées par virgules, obligatoire)
✅ **Budget mensuel** en AED (obligatoire, minimum 500)
✅ **Quartiers préférés** (sélection multiple, obligatoire)
✅ **Date de disponibilité** (obligatoire)
✅ **Type recherché** :
   - "Looking for a room"
   - "Looking for a roommate to rent together"
✅ **Gender preference** : Mixed / Male / Female
✅ **Description** : 80-500 caractères (obligatoire)
✅ **WhatsApp** (obligatoire)

**Validation front-end** :
- Photo obligatoire (max 5MB, formats image)
- Tous les champs obligatoires vérifiés
- Description entre 80 et 500 caractères
- Compteur de caractères en temps réel
- Messages d'erreur clairs

**Après soumission** :
- Message de succès : "Profile submitted — under review by WorldXpat"
- Le profil est créé avec `status = 'pending'`
- Le profil n'est pas visible tant qu'il n'est pas approuvé

### B) Affichage des profils (listings)

✅ **Grille de cartes responsive** (mobile-friendly)
✅ **Chaque carte affiche** :
   - Photo (ou placeholder si pas de photo)
   - Prénom + âge
   - Nationalité
   - Langues (2 premières + "...")
   - Budget mensuel
   - Quartiers préférés (2 premiers + "...")
   - Type recherché (badge)
   - Gender preference
   - Description tronquée (150 caractères max)
   - Bouton "Read more" si description > 150 caractères
   - Date de disponibilité
   - Bouton WhatsApp

✅ **Filtrage** :
   - Seuls les profils avec `is_visible = true` sont affichés
   - Les profils `pending` ou `rejected` ne sont pas visibles
   - Les profils sans photo ne sont pas visibles

### C) Modale "Read more" (détails complets)

✅ **Affiche toutes les informations** :
   - Photo grande taille
   - Prénom + âge + nationalité
   - Description complète
   - Toutes les langues
   - Budget détaillé
   - Tous les quartiers préférés
   - Date de disponibilité
   - Type recherché
   - Gender preference
   - Date de création
   - Dernière activité
   - Bouton WhatsApp

### D) Filtres

✅ **Budget Min/Max** (AED)
✅ **District** (filtre sur les quartiers préférés)
✅ **Gender Preference**
✅ **Boutons Filter et Clear** fonctionnels
✅ **Filtres combinables** (tous ensemble)

### E) Intégration Supabase

✅ **Table `roommate_profiles`** avec tous les champs
✅ **Upload photo** vers Supabase Storage (bucket `roommate-photos`)
✅ **RLS (Row Level Security)** configuré :
   - Public peut lire les profils visibles
   - Public peut créer des profils
✅ **Champ `is_visible`** calculé automatiquement (GENERATED ALWAYS AS)
✅ **Index** pour optimiser les performances

## 🔧 Configuration requise

### Variables Supabase
Les variables sont déjà configurées dans `colocation.html` :
```javascript
const SUPABASE_URL = 'https://qkqdbxerbaskmgarxwak.supabase.co';
const SUPABASE_ANON_KEY = '...';
```

### Bucket Storage
Le nom du bucket est défini dans `colocation.js` :
```javascript
const STORAGE_BUCKET = 'roommate-photos';
```

## 🚀 Utilisation

### Pour les utilisateurs :
1. Cliquer sur "Create your Profile"
2. Remplir le formulaire complet
3. Uploader une photo
4. Soumettre le profil
5. Attendre l'approbation (24-48h)

### Pour l'admin (à implémenter plus tard) :
- Créer une page `admin-roommate.html` pour approuver/rejeter les profils
- Utiliser la `service_role` key pour modifier le `status`
- Les profils approuvés deviennent automatiquement visibles si tous les champs sont remplis

## 📝 Notes importantes

1. **Photo obligatoire** : Un profil sans photo ne sera jamais visible (`is_visible = false`)
2. **Validation stricte** : La description doit être entre 80 et 500 caractères
3. **Statut par défaut** : Tous les nouveaux profils sont créés avec `status = 'pending'`
4. **Visibilité automatique** : Le champ `is_visible` est calculé automatiquement par Supabase
5. **Storage** : Assurez-vous que le bucket `roommate-photos` existe et a les bonnes politiques

## 🐛 Dépannage

### Les profils ne s'affichent pas :
- Vérifiez que `is_visible = true` dans Supabase
- Vérifiez que `status = 'approved'`
- Vérifiez que la photo est uploadée (`photo_url` non null)

### L'upload de photo échoue :
- Vérifiez que le bucket `roommate-photos` existe
- Vérifiez les politiques Storage (SELECT et INSERT)
- Vérifiez la taille du fichier (max 5MB)

### Les filtres ne fonctionnent pas :
- Vérifiez la console du navigateur pour les erreurs
- Vérifiez que les données sont bien chargées depuis Supabase

## ✅ Checklist de déploiement

- [ ] Exécuter le script SQL `roommate_profiles_schema.sql` dans Supabase
- [ ] Créer le bucket Storage `roommate-photos`
- [ ] Configurer les politiques Storage (SELECT et INSERT)
- [ ] Tester l'upload d'une photo
- [ ] Tester la création d'un profil
- [ ] Vérifier que le profil n'est pas visible (status = pending)
- [ ] Tester les filtres
- [ ] Tester la modale "Read more"
- [ ] Tester sur mobile

## 🎯 Prochaines étapes (optionnel)

1. **Page admin** : Créer `admin-roommate.html` pour approuver/rejeter les profils
2. **Notifications** : Envoyer un email/SMS quand un profil est approuvé
3. **Recherche** : Ajouter une barre de recherche par nom/nationalité
4. **Favoris** : Permettre aux utilisateurs de sauvegarder des profils
5. **Messagerie** : Système de messagerie intégré (au lieu de WhatsApp uniquement)


