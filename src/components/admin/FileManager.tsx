import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Folder,
  FileImage,
  FileText,
  Search,
  Upload,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  Sparkles,
  FileCode,
  FolderPlus
} from 'lucide-react';

interface MediaFile {
  id: string;
  name: string;
  folder: 'images' | 'logos' | 'catalogues' | 'pdf' | 'videos' | 'sliders' | 'hero' | 'backgrounds' | 'icons' | 'banners' | 'gallery';
  url: string;
  size: string;
  type: 'image' | 'pdf' | 'video' | 'svg';
  dimensions?: string;
  uploadedAt: string;
}

export const FileManager: React.FC = () => {
  const { uploadFile, showToast } = useData();
  const [isDragging, setIsDragging] = useState(false);

  // Media list representing files in /public/uploads/
  const [files, setFiles] = useState<MediaFile[]>([
    {
      id: 'f-1',
      name: 'bambinos_hero_room.jpg',
      folder: 'hero',
      url: '/uploads/images/bambinos_hero_room.jpg',
      size: '1.2 MB (WebP Optimisé)',
      type: 'image',
      dimensions: '1920x1080',
      uploadedAt: '2026-07-28'
    },
    {
      id: 'f-2',
      name: 'bambinos_dressing.jpg',
      folder: 'images',
      url: '/uploads/images/bambinos_dressing.jpg',
      size: '850 KB (WebP Optimisé)',
      type: 'image',
      dimensions: '1600x1200',
      uploadedAt: '2026-07-28'
    },
    {
      id: 'f-3',
      name: 'bambinos_desk.jpg',
      folder: 'images',
      url: '/uploads/images/bambinos_desk.jpg',
      size: '720 KB (WebP Optimisé)',
      type: 'image',
      dimensions: '1600x1200',
      uploadedAt: '2026-07-28'
    },
    {
      id: 'f-4',
      name: 'catalogue_bambinos_2026.pdf',
      folder: 'pdf',
      url: '/uploads/pdf/catalogue_bambinos_2026.pdf',
      size: '12.4 MB',
      type: 'pdf',
      uploadedAt: '2026-07-28'
    },
    {
      id: 'f-5',
      name: 'logo_bambinos.svg',
      folder: 'logos',
      url: '/uploads/logos/logo_bambinos.svg',
      size: '18 KB',
      type: 'svg',
      uploadedAt: '2026-07-28'
    },
    {
      id: 'f-6',
      name: 'banner_promo_ban.jpg',
      folder: 'banners',
      url: '/uploads/images/bambinos_hero_room_ban.jpg',
      size: '450 KB (WebP Optimisé)',
      type: 'image',
      dimensions: '1920x600',
      uploadedAt: '2026-07-28'
    },
    {
      id: 'f-7',
      name: 'hero_background_loop.mp4',
      folder: 'videos',
      url: '/uploads/videos/hero_loop.mp4',
      size: '8.4 MB (H.264)',
      type: 'video',
      dimensions: '1920x1080',
      uploadedAt: '2026-07-28'
    }
  ]);

  const [activeFolder, setActiveFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'size' | 'date'>('date');
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);
  const [renamingFile, setRenamingFile] = useState<MediaFile | null>(null);
  const [newFileName, setNewFileName] = useState('');

  const foldersList = [
    { id: 'all', label: 'Tous les fichiers', icon: Folder },
    { id: 'images', label: 'images/', icon: FileImage },
    { id: 'logos', label: 'logos/', icon: Sparkles },
    { id: 'catalogues', label: 'catalogues/', icon: FolderPlus },
    { id: 'pdf', label: 'pdf/', icon: FileText },
    { id: 'videos', label: 'videos/', icon: Folder },
    { id: 'sliders', label: 'sliders/', icon: Folder },
    { id: 'hero', label: 'hero/', icon: Folder },
    { id: 'backgrounds', label: 'backgrounds/', icon: Folder },
    { id: 'icons', label: 'icons/', icon: Folder },
    { id: 'banners', label: 'banners/', icon: Folder },
    { id: 'gallery', label: 'gallery/', icon: FileImage }
  ];

  const filteredFiles = files
    .filter((f) => {
      const matchesFolder = activeFolder === 'all' || f.folder === activeFolder;
      const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFolder && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'date') return b.uploadedAt.localeCompare(a.uploadedAt);
      return b.size.localeCompare(a.size);
    });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    const targetFolder = activeFolder === 'all' ? 'products' : activeFolder;
    const url = await uploadFile(file, targetFolder);

    if (url) {
      const isPdf = file.name.endsWith('.pdf');
      const isSvg = file.name.endsWith('.svg');
      const newFileObj: MediaFile = {
        id: `f-${Date.now()}`,
        name: file.name,
        folder: targetFolder,
        url,
        size: `${(file.size / 1024).toFixed(0)} KB (WebP Converti)`,
        type: isPdf ? 'pdf' : isSvg ? 'svg' : 'image',
        dimensions: isPdf || isSvg ? undefined : '1920x1080',
        uploadedAt: new Date().toISOString().split('T')[0]
      };
      setFiles([newFileObj, ...files]);
      showToast(`Fichier ${file.name} téléversé et optimisé en WebP avec succès !`, 'success');
    }
  };

  const handleDeleteFile = (id: string) => {
    if (!confirm('Supprimer ce fichier du dossier /public/uploads ?')) return;
    setFiles(files.filter((f) => f.id !== id));
    showToast('Fichier supprimé', 'info');
  };

  const handleRenameFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!renamingFile || !newFileName.trim()) return;
    setFiles(
      files.map((f) => (f.id === renamingFile.id ? { ...f, name: newFileName.trim() } : f))
    );
    showToast(`Fichier renommé en ${newFileName}`, 'success');
    setRenamingFile(null);
    setNewFileName('');
  };

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Top Header Controls */}
      <div className="bg-[#002240] p-5 rounded-3xl border border-cyan-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <Folder className="w-5 h-5 text-[#38C0E3]" />
            <span>Explorateur de Fichiers & Médias `/public/uploads`</span>
          </h3>
          <p className="text-xs text-slate-300 pt-1">
            Gérez vos visuels WebP, catalogues PDF, logos vectoriels SVG et miniatures optimisées.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="bg-[#38C0E3] hover:bg-cyan-300 text-[#002240] font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-lg shrink-0">
            <Upload className="w-4 h-4" />
            <span>Importer Nouveau Média</span>
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Folders & Filter Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap bg-[#002240] p-3 rounded-2xl border border-cyan-500/20">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold no-scrollbar py-1">
          {foldersList.map((folder) => {
            const IconComp = folder.icon;
            return (
              <button
                key={folder.id}
                onClick={() => setActiveFolder(folder.id)}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors text-[11px] whitespace-nowrap ${
                  activeFolder === folder.id
                    ? 'bg-[#38C0E3] text-[#002240] font-black shadow-md'
                    : 'bg-[#001830] text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{folder.label}</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom..."
            className="w-full bg-[#001830] border border-slate-700 pl-9 pr-3 py-2 rounded-xl text-xs text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            className="bg-[#002240] p-3 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex flex-col justify-between group space-y-2 relative"
          >
            {/* File Preview thumbnail */}
            <div
              className="relative h-28 bg-[#001830] rounded-xl overflow-hidden flex items-center justify-center cursor-pointer border border-slate-800"
              onClick={() => setPreviewFile(file)}
            >
              {file.type === 'image' || file.type === 'svg' ? (
                <img src={file.url} alt={file.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              ) : (
                <FileText className="w-10 h-10 text-yellow-300" />
              )}
              
              <span className="absolute top-2 left-2 bg-[#001830]/80 text-cyan-300 text-[9px] font-mono px-2 py-0.5 rounded-full border border-cyan-500/30">
                {file.folder}
              </span>
            </div>

            {/* File Info */}
            <div className="space-y-1">
              <h5 className="font-bold text-white text-xs truncate" title={file.name}>
                {file.name}
              </h5>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>{file.size}</span>
                <span>{file.type.toUpperCase()}</span>
              </div>
            </div>

            {/* Quick Action Tools */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <button
                onClick={() => setPreviewFile(file)}
                className="text-xs text-cyan-300 hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> Aperçu
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setRenamingFile(file);
                    setNewFileName(file.name);
                  }}
                  className="text-xs text-slate-400 hover:text-yellow-300"
                  title="Renommer"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteFile(file.id)}
                  className="text-xs text-rose-400 hover:text-rose-300"
                  title="Supprimer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Rename */}
      {renamingFile && (
        <div className="fixed inset-0 z-50 bg-[#001830]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#002240] border border-cyan-500/30 text-white rounded-3xl p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-serif font-bold text-base text-white">Renommer le fichier</h4>
              <button onClick={() => setRenamingFile(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleRenameFile} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Nouveau nom de fichier :</label>
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#001830] border border-slate-700 rounded-xl text-white font-mono"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRenamingFile(null)}
                  className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#38C0E3] text-[#002240] font-black rounded-xl"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Preview */}
      {previewFile && (
        <div className="fixed inset-0 z-50 bg-[#001830]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#002240] border border-cyan-500/30 text-white rounded-3xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-serif font-bold text-base text-white">{previewFile.name}</h4>
              <button onClick={() => setPreviewFile(null)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="bg-[#001830] p-4 rounded-2xl flex items-center justify-center min-h-[220px]">
              {previewFile.type === 'image' || previewFile.type === 'svg' ? (
                <img src={previewFile.url} alt={previewFile.name} className="max-h-64 object-contain rounded-xl" />
              ) : (
                <div className="text-center space-y-2">
                  <FileText className="w-16 h-16 text-yellow-300 mx-auto" />
                  <p className="text-xs text-slate-300">Document PDF HD - {previewFile.name}</p>
                </div>
              )}
            </div>

            <div className="text-xs text-slate-300 space-y-1 font-mono">
              <p>Chemin local : <span className="text-yellow-300">/public/uploads/{previewFile.folder}/{previewFile.name}</span></p>
              <p>Taille : {previewFile.size}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPreviewFile(null)}
                className="px-4 py-2 bg-[#38C0E3] text-[#002240] font-black rounded-xl text-xs"
              >
                Fermer Aperçu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
