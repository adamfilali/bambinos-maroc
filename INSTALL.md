# Guide d'Installation et d'Exécution Locale

Ce document détalle la procédure d'installation et d'exécution du projet **BAMBINOS CMS** sur n'importe quel environnement local (Windows, macOS, Linux/Ubuntu/Debian).

---

## 💻 1. Prérequis Système

| Composant | Version Minimale Recommandée |
| :--- | :--- |
| **Node.js** | LTS v18.0.0 ou supérieure (v20+ fortement conseillée) |
| **npm** | v9.0.0 ou supérieure |
| **Git** | v2.30 ou supérieure |
| **Système** | Windows 10/11, Linux (Ubuntu 20.04+), macOS |

Pour vérifier vos versions actuelles :
```bash
node -v
npm -v
git --version
```

---

## 🛠️ 2. Installation Pas à Pas

### Étape 1 : Clonage du Dépôt Git
```bash
git clone https://github.com/votre-utilisateur/bambinos-cms.git
cd bambinos-cms
```

### Étape 2 : Installation des Dépendances
```bash
npm install
```

### Étape 3 : Fichier d'Environnement (Optionnel)
Créez un fichier `.env` à la racine si vous souhaitez configurer un port spécifique ou une clé API Gemini pour l'assistance IA :
```env
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=
```

---

## 🚀 3. Lancement des Scripts npm

### Développement Local
```bash
npm run dev
```
Ouvrez votre navigateur sur `http://localhost:3000`.

### Vérification de la Compilation (Build Check)
```bash
npm run build
```

### Exécution du Serveur en Mode Production Local
```bash
npm start
```

### Contrôle Linter & Typescript
```bash
npm run lint
```

---

## 🔍 4. Résolution des Problèmes Courants

- **Erreur `EADDRINUSE: 3000`** : Le port 3000 est déjà occupé. Libérez le port ou modifiez le port dans `server.ts`.
- **Module non trouvé** : Lancez `npm install` ou supprimez `node_modules` et `package-lock.json` avant de réinstaller :
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
