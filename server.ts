import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import {
  initialCategories,
  initialSubcategories,
  initialProducts,
  initialCatalogues,
  initialPages,
  initialMenu,
  initialHomepage,
  initialSettings,
  initialBanners,
  initialSliders,
  initialCompany,
  initialContacts,
  initialUsers,
  initialHistory
} from './server/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), 'data');
const PRODUCTS_DIR = path.join(DATA_DIR, 'products');
const HISTORY_DIR = path.join(DATA_DIR, 'history');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

const UPLOAD_SUBDIRS = [
  'images',
  'products',
  'catalogues',
  'logos',
  'homepage',
  'banners',
  'services',
  'gallery',
  'pdf',
  'videos'
];

// 1. Ensure required folders exist
function ensureDirectoriesExist() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(PRODUCTS_DIR)) {
    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
  }

  if (!fs.existsSync(HISTORY_DIR)) {
    fs.mkdirSync(HISTORY_DIR, { recursive: true });
  }

  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  UPLOAD_SUBDIRS.forEach((sub) => {
    const dirPath = path.join(UPLOADS_DIR, sub);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}

// 2. Prepare Default Assets
function prepareDefaultAssets() {
  const assetsDir = path.join(process.cwd(), 'src', 'assets', 'images');
  const targetImagesDir = path.join(UPLOADS_DIR, 'images');
  const targetProductsDir = path.join(UPLOADS_DIR, 'products');

  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    files.forEach((file) => {
      const srcFile = path.join(assetsDir, file);
      if (file.includes('bambinos_hero_room')) {
        fs.copyFileSync(srcFile, path.join(targetImagesDir, 'bambinos_hero_room.jpg'));
        fs.copyFileSync(srcFile, path.join(targetProductsDir, 'bambinos_hero_room.jpg'));
      } else if (file.includes('bambinos_dressing')) {
        fs.copyFileSync(srcFile, path.join(targetImagesDir, 'bambinos_dressing.jpg'));
        fs.copyFileSync(srcFile, path.join(targetProductsDir, 'bambinos_dressing.jpg'));
      } else if (file.includes('bambinos_desk')) {
        fs.copyFileSync(srcFile, path.join(targetImagesDir, 'bambinos_desk.jpg'));
        fs.copyFileSync(srcFile, path.join(targetProductsDir, 'bambinos_desk.jpg'));
      }
    });
  }

  // Create sample pdf file if missing
  const pdfDir = path.join(UPLOADS_DIR, 'pdf');
  const samplePdf = path.join(pdfDir, 'fiche_technique_concept_nuage.pdf');
  if (!fs.existsSync(samplePdf)) {
    fs.writeFileSync(samplePdf, '%PDF-1.4 %BAMBINOS Technical Sheet Dummy Content');
  }
  const sampleCatPdf = path.join(pdfDir, 'catalogue_bambinos_2026.pdf');
  if (!fs.existsSync(sampleCatPdf)) {
    fs.writeFileSync(sampleCatPdf, '%PDF-1.4 %BAMBINOS Catalogue 2026 Content');
  }
}

// Default datasets
const DEFAULT_DATA: Record<string, any> = {
  'categories.json': initialCategories,
  'subcategories.json': initialSubcategories,
  'catalogues.json': initialCatalogues,
  'pages.json': initialPages,
  'menu.json': initialMenu,
  'homepage.json': initialHomepage,
  'settings.json': initialSettings,
  'banners.json': initialBanners,
  'sliders.json': initialSliders,
  'company.json': initialCompany,
  'contacts.json': initialContacts,
  'users.json': initialUsers,
  'gallery.json': [
    {
      id: 'gal-1',
      title: 'Chambre Lit Cabane & Mezzanine - Casablanca',
      category: 'Chambre Complète',
      type: 'before_after',
      imageBefore: '/uploads/images/bambinos_hero_room.jpg',
      imageAfter: '/uploads/images/bambinos_hero_room.jpg',
      description: 'Transformation complète d\'une pièce de 12m² avec lit surélevé, penderie et bureau.',
      date: '2026-03-15'
    },
    {
      id: 'gal-2',
      title: 'Dressing & Rangement Sur-Mesure - Rabat',
      category: 'Dressing',
      type: 'photo',
      imageAfter: '/uploads/images/bambinos_dressing.jpg',
      description: 'Dressing en chêne massif avec tiroirs amortis et casiers modulables Montessori.',
      date: '2026-04-10'
    }
  ]
};

// Seed individual product files in data/products/
function initializeModularProducts() {
  if (!fs.existsSync(PRODUCTS_DIR)) {
    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
  }

  const existingFiles = fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith('.json'));
  if (existingFiles.length === 0) {
    initialProducts.forEach((prod) => {
      const slug = prod.reference.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const filename = `${slug}.json`;
      fs.writeFileSync(path.join(PRODUCTS_DIR, filename), JSON.stringify(prod, null, 2), 'utf-8');
    });
  }
}

// 3. Initialize JSON files if not present
function initializeJSONFiles() {
  Object.keys(DEFAULT_DATA).forEach((fileName) => {
    const filePath = path.join(DATA_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(DEFAULT_DATA[fileName], null, 2), 'utf-8');
    }
  });

  initializeModularProducts();
}

// Read products from data/products/*.json
function readAllProducts(): any[] {
  if (!fs.existsSync(PRODUCTS_DIR)) return [];
  const files = fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith('.json'));
  const list: any[] = [];
  files.forEach((file) => {
    try {
      const content = fs.readFileSync(path.join(PRODUCTS_DIR, file), 'utf-8');
      list.push(JSON.parse(content));
    } catch (e) {
      console.error(`Error reading product file ${file}`, e);
    }
  });

  // Sort by displayOrder or createdAt
  return list.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
}

// Save all products into modular files
function writeAllProducts(productsList: any[], user: string = 'admin') {
  if (!fs.existsSync(PRODUCTS_DIR)) {
    fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
  }

  // Clear obsolete files if any
  const currentSlugs = new Set();
  productsList.forEach((prod) => {
    const slug = (prod.reference || prod.id).toLowerCase().replace(/[^a-z0-9]/g, '-');
    currentSlugs.add(`${slug}.json`);
    const filePath = path.join(PRODUCTS_DIR, `${slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(prod, null, 2), 'utf-8');
  });

  // Delete files no longer in array
  const existingFiles = fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith('.json'));
  existingFiles.forEach((file) => {
    if (!currentSlugs.has(file)) {
      try {
        fs.unlinkSync(path.join(PRODUCTS_DIR, file));
      } catch (e) {}
    }
  });

  // Also maintain master products.json for fallback compatibility
  fs.writeFileSync(path.join(DATA_DIR, 'products.json'), JSON.stringify(productsList, null, 2), 'utf-8');
}

function readDataFile(fileName: string) {
  const cleanName = fileName.replace('.json', '');

  if (cleanName === 'products') {
    return readAllProducts();
  }

  const filePath = path.join(DATA_DIR, `${cleanName}.json`);
  if (!fs.existsSync(filePath)) {
    if (DEFAULT_DATA[`${cleanName}.json`]) {
      fs.writeFileSync(filePath, JSON.stringify(DEFAULT_DATA[`${cleanName}.json`], null, 2), 'utf-8');
      return DEFAULT_DATA[`${cleanName}.json`];
    }
    return null;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  try {
    return JSON.parse(content);
  } catch (err) {
    return null;
  }
}

// Modular history recording: data/history/YYYY/MM/DD/history.json
function writeHistoryEntry(user: string, actionName: string, target: string, oldValue: string, newValue: string) {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const dayDir = path.join(HISTORY_DIR, year, month, day);
  if (!fs.existsSync(dayDir)) {
    fs.mkdirSync(dayDir, { recursive: true });
  }

  const dayHistoryPath = path.join(dayDir, 'history.json');
  let dayHistory: any[] = [];
  if (fs.existsSync(dayHistoryPath)) {
    try {
      dayHistory = JSON.parse(fs.readFileSync(dayHistoryPath, 'utf-8'));
    } catch (e) {
      dayHistory = [];
    }
  }

  const entry = {
    id: `hist-${Date.now()}`,
    date: `${year}-${month}-${day}`,
    time: now.toTimeString().split(' ')[0],
    user,
    action: actionName,
    target,
    oldValue: oldValue ? (oldValue.length > 120 ? `${oldValue.substring(0, 120)}...` : oldValue) : 'None',
    newValue: newValue ? (newValue.length > 120 ? `${newValue.substring(0, 120)}...` : newValue) : 'None'
  };

  dayHistory.unshift(entry);
  fs.writeFileSync(dayHistoryPath, JSON.stringify(dayHistory, null, 2), 'utf-8');

  // Also append to root history.json for fast UI retrieval
  const rootHistoryPath = path.join(DATA_DIR, 'history.json');
  let rootHistory: any[] = [];
  if (fs.existsSync(rootHistoryPath)) {
    try {
      rootHistory = JSON.parse(fs.readFileSync(rootHistoryPath, 'utf-8'));
    } catch (e) {
      rootHistory = [];
    }
  }
  rootHistory.unshift(entry);
  if (rootHistory.length > 200) rootHistory = rootHistory.slice(0, 200);
  fs.writeFileSync(rootHistoryPath, JSON.stringify(rootHistory, null, 2), 'utf-8');
}

function writeDataFile(fileName: string, data: any, user: string = 'admin', actionName: string = 'UPDATE_FILE') {
  const cleanName = fileName.replace('.json', '');

  if (cleanName === 'products') {
    writeAllProducts(data, user);
    writeHistoryEntry(user, actionName, 'products', 'Multiple products', `Count: ${data.length}`);
    return;
  }

  const filePath = path.join(DATA_DIR, `${cleanName}.json`);
  const oldValue = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : null;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

  if (cleanName !== 'history') {
    writeHistoryEntry(user, actionName, cleanName, oldValue || 'New file', JSON.stringify(data));
  }
}

// Configure Multer storage for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = (req.body.category || 'images').toLowerCase();
    const destDir = UPLOAD_SUBDIRS.includes(category)
      ? path.join(UPLOADS_DIR, category)
      : path.join(UPLOADS_DIR, 'images');
    cb(null, destDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const sanitizedName = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');
    const uniqueSuffix = Date.now();
    cb(null, `${sanitizedName}_${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});

async function startServer() {
  ensureDirectoriesExist();
  prepareDefaultAssets();
  initializeJSONFiles();

  const app = express();

  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ extended: true, limit: '100mb' }));

  // Static uploads serving
  app.use('/uploads', express.static(UPLOADS_DIR));
  app.use('/public/uploads', express.static(UPLOADS_DIR));

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Auth Login (admin / nejjari or custom hashed/settings credential)
  app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const settings = readDataFile('settings') || {};
    const adminPass = settings.adminPassword || process.env.ADMIN_PASSWORD || 'nejjari';

    if (username === 'admin' && password === adminPass) {
      const now = new Date().toISOString();
      const users = readDataFile('users') || [];
      const adminUser = users.find((u: any) => u.username === 'admin') || {
        id: 'usr-admin',
        username: 'admin',
        role: 'Administrator'
      };
      adminUser.lastLogin = now;
      writeDataFile('users', users, 'admin', 'USER_LOGIN');

      return res.json({
        success: true,
        user: {
          id: adminUser.id,
          username: adminUser.username,
          role: adminUser.role,
          token: `token_bambinos_${Date.now()}`
        }
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Nom d\'utilisateur ou mot de passe incorrect'
    });
  });

  // GET JSON data file
  app.get('/api/data/:filename', (req, res) => {
    const { filename } = req.params;
    const data = readDataFile(filename);
    if (data === null) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.json(data);
  });

  // POST/PUT JSON data file
  app.post('/api/data/:filename', (req, res) => {
    const { filename } = req.params;
    const { data, user, actionName } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }

    writeDataFile(filename, data, user || 'admin', actionName || `UPDATE_${filename.toUpperCase()}`);
    res.json({ success: true, message: `Updated ${filename}.json successfully` });
  });

  // Backup Export Endpoint: Download complete site backup JSON
  app.get('/api/backup/export', (req, res) => {
    try {
      const backupData = {
        exportedAt: new Date().toISOString(),
        version: '2.0.0',
        products: readAllProducts(),
        categories: readDataFile('categories'),
        subcategories: readDataFile('subcategories'),
        catalogues: readDataFile('catalogues'),
        pages: readDataFile('pages'),
        menu: readDataFile('menu'),
        homepage: readDataFile('homepage'),
        settings: readDataFile('settings'),
        banners: readDataFile('banners'),
        sliders: readDataFile('sliders'),
        company: readDataFile('company'),
        contacts: readDataFile('contacts'),
        gallery: readDataFile('gallery'),
        history: readDataFile('history')
      };

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="bambinos_backup_${Date.now()}.json"`);
      res.send(JSON.stringify(backupData, null, 2));
    } catch (err) {
      res.status(500).json({ error: 'Failed to export backup' });
    }
  });

  // Backup Import Endpoint: Restore all JSON files
  app.post('/api/backup/import', (req, res) => {
    try {
      const backupData = req.body;
      if (!backupData || typeof backupData !== 'object') {
        return res.status(400).json({ error: 'Fichier de sauvegarde invalide' });
      }

      if (backupData.products && Array.isArray(backupData.products)) {
        writeAllProducts(backupData.products, 'admin');
      }
      if (backupData.categories) writeDataFile('categories', backupData.categories, 'admin', 'RESTORE_BACKUP');
      if (backupData.subcategories) writeDataFile('subcategories', backupData.subcategories, 'admin', 'RESTORE_BACKUP');
      if (backupData.catalogues) writeDataFile('catalogues', backupData.catalogues, 'admin', 'RESTORE_BACKUP');
      if (backupData.pages) writeDataFile('pages', backupData.pages, 'admin', 'RESTORE_BACKUP');
      if (backupData.menu) writeDataFile('menu', backupData.menu, 'admin', 'RESTORE_BACKUP');
      if (backupData.homepage) writeDataFile('homepage', backupData.homepage, 'admin', 'RESTORE_BACKUP');
      if (backupData.settings) writeDataFile('settings', backupData.settings, 'admin', 'RESTORE_BACKUP');
      if (backupData.banners) writeDataFile('banners', backupData.banners, 'admin', 'RESTORE_BACKUP');
      if (backupData.sliders) writeDataFile('sliders', backupData.sliders, 'admin', 'RESTORE_BACKUP');
      if (backupData.company) writeDataFile('company', backupData.company, 'admin', 'RESTORE_BACKUP');
      if (backupData.gallery) writeDataFile('gallery', backupData.gallery, 'admin', 'RESTORE_BACKUP');

      writeHistoryEntry('admin', 'RESTORE_FULL_BACKUP', 'all', 'Previous State', `Restored from ${backupData.exportedAt || 'backup'}`);

      res.json({ success: true, message: 'Sauvegarde restaurée avec succès !' });
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la restauration' });
    }
  });

  // Upload endpoint
  app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }
    const category = (req.body.category || 'images').toLowerCase();
    const folder = UPLOAD_SUBDIRS.includes(category) ? category : 'images';
    const relativeUrl = `/uploads/${folder}/${req.file.filename}`;

    const user = req.body.user || 'admin';
    writeHistoryEntry(user, `UPLOAD_${folder.toUpperCase()}`, req.file.filename, 'None', relativeUrl);

    res.json({
      success: true,
      url: relativeUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  });

  // Submit Contact Form
  app.post('/api/contact', (req, res) => {
    const { name, email, phone, subject, message, productRef } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ error: 'Nom, téléphone et message sont requis' });
    }
    const contacts = readDataFile('contacts') || [];
    const newContact = {
      id: `cnt-${Date.now()}`,
      name,
      email: email || '',
      phone,
      subject: subject || 'Contact Bambinos',
      message,
      productRef: productRef || '',
      date: new Date().toISOString(),
      read: false
    };
    contacts.unshift(newContact);
    writeDataFile('contacts', contacts, 'Visitor', 'SUBMIT_CONTACT_FORM');
    res.json({ success: true, message: 'Message reçu avec succès. Notre équipe vous recontactera sous 24h.' });
  });

  // Sitemap generator endpoint
  app.get('/sitemap.xml', (req, res) => {
    const settings = readDataFile('settings') || {};
    const products = readAllProducts();
    const pages = readDataFile('pages') || [];

    const baseUrl = process.env.APP_URL || 'https://bambinos-surmesure.ma';

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

    pages.forEach((page: any) => {
      if (page.published) {
        xml += `
  <url>
    <loc>${baseUrl}/#page-${page.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      }
    });

    products.forEach((prod: any) => {
      if (prod.status === 'active') {
        xml += `
  <url>
    <loc>${baseUrl}/#product-${prod.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
      }
    });

    xml += `\n</urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });

  // Robots.txt endpoint
  app.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.APP_URL || 'https://www.bambinos.ma';
    const txt = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`;
    res.header('Content-Type', 'text/plain');
    res.send(txt);
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[BAMBINOS V2] Modular Server running on http://localhost:${PORT}`);
  });
}

startServer();
