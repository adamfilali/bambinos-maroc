# Guide Spécifique pour le Déploiement Vercel

Ce document explique le fonctionnement de l'application **BAMBINOS CMS** sur l'infrastructure serverless de **Vercel**.

---

## ⚡ 1. Architecture Jamstack & Fichiers JSON

Sur Vercel, l'application fonctionne sous forme de Single Page Application (SPA) ultra-rapide servie par un CDN global.

- **Données initiales :** Stockées dans le répertoire `/data` (fichiers JSON) et servies statiquement.
- **Médias :** Stockés dans `/public/uploads` et servis à haute vitesse par le CDN Vercel.

---

## 🚀 2. Procédure de Déploiement Vercel (Git Push -> Auto-Deploy)

1. **Connectez votre compte GitHub à Vercel** (https://vercel.com).
2. Cliquez sur **« New Project »** et sélectionnez le dépôt Git `bambinos-cms`.
3. Conservez la configuration de Build par défaut :
   - **Framework Preset :** Vite
   - **Build Command :** `npm run build`
   - **Output Directory :** `dist`
4. Cliquez sur **Deploy**.

À chaque fois que vous exécutez les commandes Git suivantes dans votre terminal :
```bash
git add .
git commit -m "Mise à jour du site BAMBINOS"
git push origin main
```
Vercel reconstruira et redéploiera automatiquement la nouvelle version du site en moins de 30 secondes.

---

## 💾 3. Persistence des Données & Exportations sur Vercel

Comme les fonctions Serverless de Vercel possèdent un système de fichiers en lecture seule (*read-only ephemeral filesystem*), les modifications effectuées dans le panneau d'administration en mode prévisualisation Vercel sont stockées temporairement ou sauvegardées via la fonction d'exportation :

- Utilisez la fonction **« Exporter le Projet »** dans le panneau Admin pour télécharger l'archive ZIP contenant vos fichiers JSON mis à jour.
- Validez ces fichiers JSON dans votre dépôt Git local puis faites un `git push` pour rendre vos modifications permanentes sur le site de production Vercel.
