# Guide de Sauvegarde du Site et des Données

Ce guide explique comment réaliser des sauvegardes complètes et régulières du site **BAMBINOS CMS**.

---

## 💾 1. Sauvegarde Automatique via le Panneau Administrateur

Le CMS intègre un moteur d'exportation complet :

1. Connectez-vous à l'administration du site.
2. Cliquez sur l'onglet **« Sauvegarde »** (ou icône de sauvegarde).
3. Cliquez sur le bouton **« Exporter la sauvegarde du projet »**.
4. Le système génère automatiquement un fichier JSON/ZIP complet contenant :
   - Tous les fichiers de données (`company.json`, `homepage.json`, `products.json`, `categories.json`, `catalogues.json`, `menu.json`, `settings.json`, `gallery.json`).
   - La liste de tous les paramètres et configurations.

Conservez ce fichier téléchargé en lieu sûr (sur votre ordinateur, Google Drive ou Dropbox).

---

## 📁 2. Sauvegarde Manuelle du Code et des Médias

Pour sauvegarder l'intégralité du projet (code source + médias importés) :

1. Copiez le dossier `/data/` contenant vos bases de données JSON.
2. Copiez le dossier `/public/uploads/` contenant toutes vos photos, brochures PDF et logos.
3. Si vous utilisez Git, effectuez simplement :
   ```bash
   git add .
   git commit -m "Sauvegarde périodique du site et des produits"
   git push origin main
   ```
