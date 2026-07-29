# Guide de Déploiement en Production

Ce document explique comment déployer l'application **BAMBINOS CMS** sur diverses plateformes d'hébergement modernes : **Vercel**, **Docker / Cloud Run**, **Linux VPS (Ubuntu/Debian avec PM2 & Nginx)**.

---

## 🌐 Option 1 : Déploiement Automatique sur Vercel (Recommandé pour Jamstack/Static)

Consultez le guide détaillé dédié : [`VERCEL_GUIDE.md`](./VERCEL_GUIDE.md).

---

## 🐳 Option 2 : Déploiement Docker / Cloud Run / VPS Container

L'application est pré-configurée avec un serveur Express embarquant le middleware Vite et la gestion des API REST.

### Construction de l'Image Docker
```bash
docker build -t bambinos-app .
```

### Exécution du Conteneur
```bash
docker run -d -p 3000:3000 --name bambinos-instance bambinos-app
```

---

## 🖥️ Option 3 : Déploiement sur Linux VPS avec PM2 & Nginx

### 1. Préparation du Serveur VPS (Ubuntu 22.04 LTS)
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm nginx git
sudo npm install -y -g pm2
```

### 2. Récupération et Build du Code
```bash
cd /var/www
sudo git clone https://github.com/votre-compte/bambinos-cms.git
cd bambinos-cms
sudo npm install
sudo npm run build
```

### 3. Démarrage du Serveur avec PM2
```bash
pm2 start dist/server.cjs --name "bambinos-cms"
pm2 save
pm2 startup
```

### 4. Configuration Nginx (Reverse Proxy)
Éditez `/etc/nginx/sites-available/bambinos` :
```nginx
server {
    listen 80;
    server_name bambinos.ma www.bambinos.ma;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Activez le site et rechargez Nginx :
```bash
sudo ln -s /etc/nginx/sites-available/bambinos /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Certificat SSL HTTPS avec Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d bambinos.ma -d www.bambinos.ma
```
