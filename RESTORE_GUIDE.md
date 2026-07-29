# Guide de Restauration du Site et des Données

Ce guide explique la procédure pas à pas pour restaurer votre site **BAMBINOS CMS** à partir d'un fichier de sauvegarde.

---

## 🔄 1. Restauration via le Panneau Administrateur (Recommandée)

1. Connectez-vous à l'espace d'administration du site.
2. Allez dans l'onglet **« Sauvegarde »**.
3. Repérez la section **« Importer une sauvegarde »**.
4. Sélectionnez le fichier de sauvegarde JSON préalablement exporté.
5. Cliquez sur **« Restaurer les données »**.
6. Le CMS vérifie la validité du fichier JSON, met à jour l'ensemble des données (produits, catégories, pages, paramètres) et rafraîchit l'application.

---

## 🛠️ 2. Restauration Manuelle du Système de Fichiers

Si vous souhaitez restaurer manuellement les données sur un serveur local ou un VPS :

1. Remplacez le contenu du dossier `/data/` par vos fichiers JSON de sauvegarde :
   - `company.json`
   - `homepage.json`
   - `products.json`
   - `categories.json`
   - `catalogues.json`
   - `menu.json`
   - `settings.json`
   - `gallery.json`
2. Remplacez le dossier `/public/uploads/` par votre dossier d'images et PDF sauvegardés.
3. Relancez le serveur :
   ```bash
   npm run build
   npm start
   ```
4. Votre site est instantanément restauré dans son état exact lors de la sauvegarde.
