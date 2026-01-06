# 📁 Dossier des Images d'Événements

## 🎯 Comment ça fonctionne ?

Ce dossier contient les images des événements. Le système cherche automatiquement une image pour chaque événement basé sur son **ID**.

## 📝 Règle de nommage

**Nom de fichier = ID de l'événement + extension**

### Exemples :

Si votre événement a l'ID `fr-newcomers-1`, le système cherchera automatiquement :
- `fr-newcomers-1.jpg` ✅ (recommandé)
- `fr-newcomers-1.png`
- `fr-newcomers-1.jpeg`
- `fr-newcomers-1.webp`

## ➕ Comment ajouter une photo ?

1. **Trouvez l'ID de votre événement** dans `events.js`
   ```javascript
   {
     id: 'fr-newcomers-1',  // ← C'est cet ID
     title: '...',
     // ...
   }
   ```

2. **Nommez votre image** avec cet ID
   - Exemple : `fr-newcomers-1.jpg`

3. **Placez l'image** dans ce dossier (`images/events/`)

4. **C'est tout !** Le système utilisera automatiquement votre image.

## 🖼️ Formats supportés

- ✅ `.jpg` (recommandé)
- ✅ `.jpeg`
- ✅ `.png`
- ✅ `.webp`

## 💡 Astuces

- **Taille recommandée** : 800x600px ou ratio 4:3
- **Poids** : Optimisez vos images (max 500KB recommandé)
- **Nom** : Utilisez exactement l'ID de l'événement (sensible à la casse)

## ⚠️ Si l'image n'existe pas

Si aucune image n'est trouvée dans ce dossier, le système utilisera automatiquement :
- L'image par défaut du **type d'événement** (définie dans `EVENT_TYPE_IMAGES`)

## 🔄 Priorité des images

1. **Image personnalisée** : Si vous ajoutez `image: 'URL'` dans l'événement
2. **Image automatique** : `images/events/{id}.jpg` (ce dossier)
3. **Image par défaut** : Image du type d'événement

## 📋 Exemple complet

```javascript
// Dans events.js
{
  id: 'fr-boat-1',
  title: 'Boat Party Francophone',
  // ...
}
```

→ Placez `fr-boat-1.jpg` dans ce dossier
→ L'image sera automatiquement utilisée ! 🎉

