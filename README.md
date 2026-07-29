# BAMBINOS — Mobilier & Espaces Sur-Mesure pour Enfants

Plateforme CMS et e-catalogue professionnelle pour **BAMBINOS**, créateur d'espaces sur-mesure haut de gamme pour enfants à Casablanca, Maroc.

---

## 🌟 Présentation du Projet

Cette application web moderne et élégante permet aux clients de découvrir les collections de chambres, dressings, lits cabanes, bibliothèques et bureaux sur-mesure de BAMBINOS, d'interagir avec un catalogue sous forme de magazine interactif double page, et de solliciter des études 3D et devis personnalisés.

Elle intègre un **Espace d'Administration (CMS) complet** permettant la gestion dynamique de tout le site sans toucher au code :
- **Éditeur Visuel de la Page d'Accueil** (activation/désactivation des sections, personnalisation des contenus)
- **Gestionnaire de Médias Avancé** (`/public/uploads/` hiérarchisé : produits, catalogues, galeries, etc.)
- **Gestionnaire de Catalogues autonomes & Magazine 3D** (double page interactive, import PDF, couverture, aperçu)
- **Gestionnaire de Menu & Navigation Dynamic** (modifications des liens et sous-menus)
- **Gestion de Produit avec États** (`Brouillon`, `Publié`, `Archivé`)
- **Paramètres Globaux du Site** (Logo, couleurs, SEO, coordonnées, réseaux sociaux)
- **Moteur de Sauvegarde & Restauration ZIP/JSON**
- **Sécurité Renforcée** (mots de passe hachés, protection anti-brute force, validation des uploads)

---

## 🚀 Prérequis

- **Node.js** >= 18.x (recommandé v20+ LTS)
- **npm** >= 9.x (ou `bun` / `yarn`)

---

## 🛠️ Démarrage Rapide

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-compte/bambinos-cms.git
cd bambinos-cms

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement local
npm run dev

# L'application est accessible sur http://localhost:3000
```

---

## 📂 Structure du Projet

```text
├── data/                       # Base de données JSON dynamiques
│   ├── company.json            # Infos entreprise & coordonnées
│   ├── homepage.json           # Configuration des sections de la page d'accueil
│   ├── products.json           # Base de données produits & états
│   ├── categories.json         # Catégories de mobilier
│   ├── catalogues.json         # Catalogues PDF & magazines
│   ├── menu.json               # Navigation & sous-menus
│   ├── settings.json           # Paramètres SEO & médias
│   └── gallery.json            # Projets & Réalisations Avant/Après
├── public/
│   └── uploads/                # Gestionnaire de médias hiérarchisé
│       ├── products/
│       ├── catalogues/
│       ├── gallery/
│       ├── logos/
│       ├── banners/
│       ├── homepage/
│       ├── pdf/
│       └── icons/
├── src/
│   ├── components/             # Composants UI modulaires
│   │   ├── admin/              # Module CMS Administration
│   │   ├── catalogue/          # Magazine interactif FlipBook double page
│   │   ├── home/               # Sections de la page d'accueil
│   │   ├── layout/             # Header, Footer, Navigation
│   │   └── modals/             # Devis 3D, Fiche Produit, Auth Admin
│   ├── context/                # Context API React (DataContext)
│   ├── types.ts                # Interfaces TypeScript strictes
│   ├── index.css               # Configuration Tailwind CSS & Typographie
│   └── App.tsx                 # Application racine avec moteur de sections
├── server.ts                   # Serveur Express & API backend local/Cloud Run
└── package.json                # Dépendances et scripts de déploiement
```

---

## 📖 Guides de Documentation

- 📦 [Guide d'Installation & Configuration (`INSTALL.md`)](./INSTALL.md)
- 🚀 [Guide de Déploiement Vercel & Production (`DEPLOY.md`)](./DEPLOY.md)
- 🛠️ [Manuel de l'Administrateur CMS (`ADMIN_GUIDE.md`)](./ADMIN_GUIDE.md)
- 📐 [Guide Spécifique Vercel (`VERCEL_GUIDE.md`)](./VERCEL_GUIDE.md)
- 💾 [Guide de Sauvegarde (`BACKUP_GUIDE.md`)](./BACKUP_GUIDE.md)
- 🔄 [Guide de Restauration (`RESTORE_GUIDE.md`)](./RESTORE_GUIDE.md)

---

## 🎨 Palette de Couleurs & Typographie Officielle

- **Bleu Marine Officiel :** `#003E73` (et fond obscur `#001830`)
- **Cyan Accent :** `#38C0E3`
- **Jaune Lumineux :** `#E5E632`
- **Blanc Cassé / Fond :** `#FAFAF8`
- **Texte Principal :** `#2B2B2B`
- **Polices Google Fonts :**
  - Titres : `Playfair Display`
  - Sous-titres : `Cormorant Garamond`
  - Corps de texte & UI : `Inter` / `Manrope`

---

## 📄 Licence

Propriété exclusive de **BAMBINOS SARL** — Casablanca, Maroc. Tous droits réservés.
"# bambinos-maroc" 
