-- ============================================
-- ROOMMATE PROFILES TABLE SCHEMA
-- ============================================
-- Table pour stocker les profils de recherche de colocation
-- Créer cette table dans Supabase SQL Editor

-- Créer les types ENUM si nécessaire
CREATE TYPE roommate_search_type AS ENUM ('looking_for_room', 'looking_for_roommate');
CREATE TYPE roommate_gender_preference AS ENUM ('Mixed', 'Male', 'Female');
CREATE TYPE roommate_status AS ENUM ('pending', 'approved', 'rejected');

-- Table principale
CREATE TABLE IF NOT EXISTS roommate_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Photo (obligatoire pour is_visible)
  photo_url TEXT,
  
  -- Informations personnelles
  first_name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 100),
  nationality TEXT NOT NULL,
  languages TEXT[] NOT NULL DEFAULT '{}', -- Array de langues
  
  -- Budget et localisation
  monthly_budget INTEGER NOT NULL CHECK (monthly_budget > 0), -- en AED
  preferred_districts TEXT[] NOT NULL DEFAULT '{}', -- Array de quartiers
  
  -- Disponibilité
  availability_date DATE NOT NULL,
  
  -- Type de recherche
  search_type roommate_search_type NOT NULL,
  
  -- Préférences
  gender_preference roommate_gender_preference NOT NULL,
  
  -- Description (max 500 caractères, pas de minimum)
  description TEXT NOT NULL CHECK (char_length(description) > 0 AND char_length(description) <= 500),
  
  -- Contact
  whatsapp TEXT NOT NULL,
  
  -- Métadonnées
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Statut
  status roommate_status DEFAULT 'pending',
  
  -- Visibilité (calculée automatiquement)
  is_visible BOOLEAN GENERATED ALWAYS AS (
    status = 'approved'::roommate_status 
    AND photo_url IS NOT NULL 
    AND photo_url != ''
    AND first_name IS NOT NULL 
    AND first_name != ''
    AND age IS NOT NULL
    AND nationality IS NOT NULL
    AND nationality != ''
    AND array_length(languages, 1) > 0
    AND monthly_budget IS NOT NULL
    AND array_length(preferred_districts, 1) > 0
    AND availability_date IS NOT NULL
    AND search_type IS NOT NULL
    AND gender_preference IS NOT NULL
    AND description IS NOT NULL
    AND description != ''
    AND whatsapp IS NOT NULL
    AND whatsapp != ''
  ) STORED
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_roommate_profiles_status ON roommate_profiles(status);
CREATE INDEX IF NOT EXISTS idx_roommate_profiles_is_visible ON roommate_profiles(is_visible);
CREATE INDEX IF NOT EXISTS idx_roommate_profiles_created_at ON roommate_profiles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_roommate_profiles_monthly_budget ON roommate_profiles(monthly_budget);
CREATE INDEX IF NOT EXISTS idx_roommate_profiles_gender_preference ON roommate_profiles(gender_preference);
CREATE INDEX IF NOT EXISTS idx_roommate_profiles_search_type ON roommate_profiles(search_type);

-- Index GIN pour les arrays (recherche dans les quartiers et langues)
CREATE INDEX IF NOT EXISTS idx_roommate_profiles_districts ON roommate_profiles USING GIN(preferred_districts);
CREATE INDEX IF NOT EXISTS idx_roommate_profiles_languages ON roommate_profiles USING GIN(languages);

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_roommate_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    NEW.last_activity = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_roommate_profiles_updated_at 
    BEFORE UPDATE ON roommate_profiles
    FOR EACH ROW EXECUTE FUNCTION update_roommate_profiles_updated_at();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS
ALTER TABLE roommate_profiles ENABLE ROW LEVEL SECURITY;

-- Politique : Tout le monde peut lire les profils visibles
CREATE POLICY "Public can view visible roommate profiles"
ON roommate_profiles FOR SELECT
USING (is_visible = true);

-- Politique : Tout le monde peut insérer (créer) des profils
CREATE POLICY "Public can insert roommate profiles"
ON roommate_profiles FOR INSERT
WITH CHECK (true);

-- Politique : Seuls les admins peuvent mettre à jour (via service_role key)
-- Note: Pour l'admin, utiliser la service_role key côté serveur
-- ou créer une fonction Supabase Edge Function pour gérer les mises à jour

-- ============================================
-- STORAGE BUCKET (à créer dans Supabase Storage)
-- ============================================
-- 
-- Créer un bucket nommé "roommate-photos" dans Supabase Storage :
-- 1. Aller dans Storage dans le dashboard Supabase
-- 2. Créer un nouveau bucket "roommate-photos"
-- 3. Configurer les politiques :
--    - Public: false (ou true si vous voulez que les photos soient publiques)
--    - Policies: 
--      * SELECT: Public (pour que les photos soient accessibles)
--      * INSERT: Authenticated ou Public (selon vos besoins)
-- 
-- Exemple de politique Storage (à créer dans Storage > Policies):
-- 
-- Policy pour SELECT (lecture publique):
-- CREATE POLICY "Public can view roommate photos"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'roommate-photos');
-- 
-- Policy pour INSERT (upload):
-- CREATE POLICY "Public can upload roommate photos"
-- ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'roommate-photos' AND (storage.foldername(name))[1] = 'public');

