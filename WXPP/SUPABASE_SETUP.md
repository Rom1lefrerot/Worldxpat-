# Configuration Supabase pour WorldXpat Jobs

## Structure de la table `jobs`

Créez une table `jobs` dans Supabase avec les colonnes suivantes :

### Colonnes requises :

```sql
CREATE TABLE jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('offer', 'request')),
  category TEXT NOT NULL,
  title TEXT,
  company_name TEXT,
  author_name TEXT,
  name TEXT,
  nationality TEXT,
  age INTEGER,
  poste_propose TEXT,
  contract_type TEXT,
  salary TEXT,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  experience TEXT,
  languages TEXT,
  availability TEXT,
  benefits TEXT,
  contact_whatsapp TEXT NOT NULL,
  contact_email TEXT,
  photo_url TEXT,
  logo_url TEXT,
  cv_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_type ON jobs(type);
CREATE INDEX idx_jobs_category ON jobs(category);
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Politique RLS (Row Level Security)

Activez RLS et créez les politiques suivantes :

```sql
-- Activer RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Politique : Tout le monde peut lire les annonces approuvées
CREATE POLICY "Public can view approved jobs"
ON jobs FOR SELECT
USING (status = 'approved');

-- Politique : Tout le monde peut insérer (créer) des annonces
CREATE POLICY "Public can insert jobs"
ON jobs FOR INSERT
WITH CHECK (true);

-- Politique : Seuls les admins peuvent mettre à jour (via service_role key)
-- Note: Pour l'admin, vous devrez utiliser la service_role key côté serveur
-- ou créer une fonction Supabase Edge Function pour gérer les mises à jour
```

### Configuration actuelle

- **URL Supabase** : `https://sb_publishable_g8eJLWzqLSNlIzKPB58xUg_nXAj_dx1`
- **Anon Key** : Configurée dans `jobs.js` et `admin.js`

### Notes importantes

1. **Sécurité Admin** : Pour que l'admin puisse modifier les statuts, vous avez deux options :
   - Utiliser la `service_role` key côté serveur (recommandé)
   - Créer une Edge Function Supabase avec authentification
   - Désactiver temporairement RLS pour les UPDATE (non recommandé en production)

2. **Upload de fichiers** : Actuellement, les fichiers (CV, photos, logos) sont stockés en base64 dans la base de données. Pour la production, considérez :
   - Utiliser Supabase Storage pour les fichiers
   - Modifier le code pour uploader vers Storage et stocker uniquement l'URL

3. **Migration depuis localStorage** : Si vous avez des données dans localStorage, vous pouvez créer un script de migration pour les importer dans Supabase.

### Test de connexion

Pour tester si la connexion fonctionne, ouvrez la console du navigateur sur `jobs.html` et vérifiez qu'il n'y a pas d'erreurs Supabase.






