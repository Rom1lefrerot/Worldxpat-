# Profile Submission Flow - Refactored

## ✅ Flow Implémenté

### 1. Validation des champs
- Tous les champs obligatoires sont validés
- Photo obligatoire (mais peut être NULL en base si upload échoue)

### 2. INSERT dans `roommate_profiles` (PRIORITÉ ABSOLUE)
```javascript
// Le profil est TOUJOURS créé avec :
- status = 'pending'
- photo_url = null (initialement)
- Tous les autres champs remplis
```

### 3. Récupération de l'ID
```javascript
const profileId = insertData[0].id;
```

### 4. Upload de la photo (APRÈS l'insert)
- Nom du fichier : `{profileId}.{extension}`
- Exemple : `a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg`

### 5. UPDATE si upload réussit
```javascript
// Si upload OK → UPDATE roommate_profiles SET photo_url = ... WHERE id = profileId
```

### 6. Gestion des erreurs d'upload
- Si upload échoue → le profil reste en base
- Message : "Profile submitted — under review by WorldXpat. Your profile was created successfully, but the photo upload failed. You can retry uploading the photo later."

## 📊 Logs Console

Chaque étape est loggée avec des préfixes clairs :
- `[STEP 1]` Parsing languages
- `[STEP 2]` Getting selected districts
- `[STEP 3]` Preparing form data
- `[STEP 4]` Inserting profile
- `[SUCCESS]` Profile inserted successfully
- `[STEP 5]` Uploading photo
- `[STEP 6]` Updating profile with photo_url
- `[WARNING]` Si upload échoue (mais profil créé)
- `[ERROR]` Si insert échoue

## 🔍 Vérification dans Supabase

Après soumission, exécuter dans SQL Editor :

```sql
SELECT 
  id,
  first_name,
  status,
  photo_url,
  created_at
FROM public.roommate_profiles
ORDER BY created_at DESC
LIMIT 5;
```

**Résultat attendu :**
- ✅ Le profil existe avec `status = 'pending'`
- ✅ `photo_url` est rempli si upload OK, NULL si upload KO
- ✅ Tous les autres champs sont remplis

## 🎯 Avantages

1. **Profil toujours créé** : Même si l'upload échoue, les données sont sauvegardées
2. **Pas de perte de données** : L'utilisateur ne perd pas son formulaire
3. **Photo peut être ajoutée plus tard** : Via admin ou retry
4. **Logs clairs** : Facilite le débogage
5. **UX améliorée** : Message clair même en cas d'échec partiel

## 📝 Notes importantes

- Le champ `photo_url` peut être NULL en base
- `is_visible` sera `false` si `photo_url` est NULL (même si `status = 'approved'`)
- L'admin peut approuver un profil et ajouter la photo plus tard
- Le nom du fichier photo est basé sur l'ID du profil pour éviter les collisions


