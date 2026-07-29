import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { MenuItem } from '../../types';
import {
  Menu as MenuIcon,
  Plus,
  Trash2,
  Save,
  ArrowUp,
  ArrowDown,
  Edit2,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Download,
  Upload,
  RefreshCw,
  History,
  Image as ImageIcon,
  ExternalLink,
  Layers,
  CheckCircle2,
  Tag,
  GripVertical,
  BookOpen,
  Monitor,
  Smartphone,
  Shield,
  HelpCircle
} from 'lucide-react';

export const MenuManager: React.FC = () => {
  const { menu, categories, subcategories, saveData, showToast, authUser } = useData();

  const [items, setItems] = useState<MenuItem[]>(menu);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [activePreviewMega, setActivePreviewMega] = useState<string | null>('menu-3');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedSubInfo, setDraggedSubInfo] = useState<{ parentId: string; subIndex: number } | null>(null);

  const [expandedParents, setExpandedParents] = useState<Record<string, boolean>>({
    'menu-2': true,
    'menu-3': true,
    'menu-4': true,
    'menu-5': true,
    'menu-6': true,
    'menu-7': true
  });

  // Action history logs stored in component state
  const [logs, setLogs] = useState<
    Array<{ id: string; date: string; time: string; user: string; action: string }>
  >([
    {
      id: 'log-1',
      date: new Date().toLocaleDateString('fr-FR'),
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      user: authUser?.username || 'Admin',
      action: 'Initialisation du menu CMS avec sous-menus et badges'
    }
  ]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const addLog = (action: string) => {
    const now = new Date();
    setLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        date: now.toLocaleDateString('fr-FR'),
        time: now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        user: authUser?.username || 'Admin',
        action
      },
      ...prev
    ]);
  };

  const toggleExpand = (id: string) => {
    setExpandedParents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Add top-level rubric
  const handleAddTopItem = () => {
    const newItem: MenuItem = {
      id: `menu-${Date.now()}`,
      label: 'NOUVELLE RUBRIQUE',
      url: '#categories',
      order: items.length + 1,
      visible: true,
      visibilityMode: 'all',
      targetType: 'category',
      icon: 'sparkles',
      description: 'Description personnalisée de la rubrique',
      children: []
    };
    setItems([...items, newItem]);
    setEditingId(newItem.id);
    addLog(`Ajout de la rubrique "${newItem.label}"`);
  };

  // Add child sub-item under parent
  const handleAddSubItem = (parentId: string) => {
    const updated = items.map((p) => {
      if (p.id === parentId) {
        const children = p.children || [];
        const newChild: MenuItem = {
          id: `sub-${Date.now()}`,
          label: 'Nouveau Sous-menu',
          url: p.url || '#categories',
          order: children.length + 1,
          visible: true,
          visibilityMode: 'all',
          badge: '',
          badgeColor: 'sky',
          parentId
        };
        return { ...p, children: [...children, newChild] };
      }
      return p;
    });
    setItems(updated);
    setExpandedParents((prev) => ({ ...prev, [parentId]: true }));
    addLog(`Ajout d'un sous-menu dans la rubrique ID ${parentId}`);
  };

  // Drag & Drop reorder Top-level items
  const handleDragStartTop = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOverTop = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropTop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newItems = [...items];
    const [moved] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, moved);

    newItems.forEach((item, idx) => {
      item.order = idx + 1;
    });

    setItems(newItems);
    setDraggedIndex(null);
    addLog(`Réordonnancement par glisser-déposer de "${moved.label}"`);
  };

  // Toggle Visibility
  const handleToggleVisibility = (id: string, isSub: boolean = false, parentId?: string) => {
    if (!isSub) {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, visible: item.visible === false ? true : false } : item
        )
      );
      addLog(`Changement de visibilité pour la rubrique ID ${id}`);
    } else if (parentId) {
      setItems(
        items.map((item) => {
          if (item.id === parentId && item.children) {
            return {
              ...item,
              children: item.children.map((child) =>
                child.id === id ? { ...child, visible: child.visible === false ? true : false } : child
              )
            };
          }
          return item;
        })
      );
      addLog(`Changement de visibilité pour le sous-menu ID ${id}`);
    }
  };

  // Delete item or sub-item
  const handleDelete = (id: string, isSub: boolean = false, parentId?: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cet élément de navigation ?')) return;

    if (!isSub) {
      const deletedItem = items.find((i) => i.id === id);
      setItems(items.filter((item) => item.id !== id));
      addLog(`Suppression de la rubrique "${deletedItem?.label || id}"`);
    } else if (parentId) {
      setItems(
        items.map((item) => {
          if (item.id === parentId && item.children) {
            return {
              ...item,
              children: item.children.filter((c) => c.id !== id)
            };
          }
          return item;
        })
      );
      addLog(`Suppression du sous-menu ID ${id}`);
    }
  };

  // Synchronize with Product Categories
  const handleSyncWithCategories = () => {
    if (categories.length === 0) {
      showToast('Aucune catégorie de produit trouvée à synchroniser.', 'info');
      return;
    }

    let addedCount = 0;
    const updated = [...items];

    // Find CHAMBRES or NURSERIE to add subcategories if missing
    categories.forEach((cat) => {
      // Check if top level rubric exists for category
      const existsTop = updated.some(
        (m) => m.label.toLowerCase() === cat.name.toLowerCase()
      );

      if (!existsTop) {
        // Add as child under CHAMBRES or RANGEMENTS or create new rubric
        const chambresRubric = updated.find((m) => m.label.toUpperCase() === 'CHAMBRES');
        if (chambresRubric) {
          chambresRubric.children = chambresRubric.children || [];
          if (!chambresRubric.children.some((c) => c.label.toLowerCase() === cat.name.toLowerCase())) {
            chambresRubric.children.push({
              id: `sub-cat-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
              label: cat.name,
              url: '#categories',
              order: chambresRubric.children.length + 1,
              visible: true,
              badge: 'Nouveau',
              badgeColor: 'sky'
            });
            addedCount++;
          }
        }
      }
    });

    setItems(updated);
    showToast(`Synchronisation effectuée : ${addedCount} sous-menu(s) ajoutés !`, 'success');
    addLog(`Synchronisation automatique avec ${categories.length} catégories du catalogue`);
  };

  // Export JSON file
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bambinos_menu_config_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Configuration du menu exportée sous format JSON !', 'success');
    addLog('Export de la configuration du menu en fichier JSON');
  };

  // Import JSON file
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        if (Array.isArray(importedData)) {
          setItems(importedData);
          showToast('Menu importé et mis à jour avec succès !', 'success');
          addLog(`Importation d'une nouvelle structure de menu depuis le fichier ${file.name}`);
        } else {
          showToast('Le fichier JSON doit contenir un tableau de rubriques.', 'error');
        }
      } catch (err) {
        showToast('Erreur lors de la lecture du fichier JSON.', 'error');
      }
    };
    reader.readAsText(file);
  };

  // Save changes to /data/menu.json
  const handleSave = async () => {
    const ok = await saveData('menu', items, 'UPDATE_DYNAMIC_MENU');
    if (ok) {
      showToast('Navigation dynamique `/data/menu.json` enregistrée avec succès !', 'success');
      addLog('Publication et sauvegarde définitive du menu dans `/data/menu.json`');
    }
  };

  return (
    <div className="space-y-6 text-slate-100 font-body">
      
      {/* Top Header Controls */}
      <div className="bg-[#002240] p-5 rounded-3xl border border-cyan-500/20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-xl">
        <div>
          <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
            <MenuIcon className="w-5 h-5 text-[#38C0E3]" />
            <span>Gestionnaire de Menu CMS Dynamique (`/data/menu.json`)</span>
          </h3>
          <p className="text-xs text-slate-300 pt-1">
            Pilotez l'arborescence, les Mega Menus, les badges ("Nouveau", "Promo"), les visuels de couverture et le glisser-déposer sans toucher au code.
          </p>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto shrink-0">
          
          <button
            onClick={handleAddTopItem}
            className="bg-[#001830] hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-[#38C0E3]" />
            <span>Ajouter Rubrique</span>
          </button>

          <button
            onClick={handleSyncWithCategories}
            className="bg-[#001830] hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Synchroniser automatiquement avec les catégories du catalogue"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Synchroniser Catégories</span>
          </button>

          <button
            onClick={() => setPreviewOpen(true)}
            className="bg-[#001830] hover:bg-slate-800 text-amber-300 border border-amber-500/30 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Prévisualiser</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="bg-[#001830] hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1"
            title="Exporter la configuration en JSON"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#001830] hover:bg-slate-800 text-slate-200 border border-slate-700 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1"
            title="Importer une configuration JSON"
          >
            <Upload className="w-3.5 h-3.5 text-sky-400" />
            <span>Import</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportJSON}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={handleSave}
            className="bg-[#38C0E3] hover:bg-cyan-300 text-[#002240] font-black px-5 py-2 rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all ml-auto lg:ml-0"
          >
            <Save className="w-4 h-4" />
            <span>Publier dans `/data/menu.json`</span>
          </button>

        </div>
      </div>

      {/* Main Rubrics Drag & Drop List */}
      <div className="bg-[#002240] p-6 rounded-3xl border border-cyan-500/20 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400">
          <span className="flex items-center gap-2 font-bold text-slate-300">
            <GripVertical className="w-4 h-4 text-[#38C0E3]" />
            <span>Faites glisser-déposer les rubriques pour réordonner la navigation</span>
          </span>
          <span className="font-mono text-cyan-400">{items.length} rubrique(s) configurée(s)</span>
        </div>

        {items.map((item, index) => {
          const isExpanded = !!expandedParents[item.id];
          const hasChildren = item.children && item.children.length > 0;
          const isEditing = editingId === item.id;

          return (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStartTop(e, index)}
              onDragOver={handleDragOverTop}
              onDrop={(e) => handleDropTop(e, index)}
              className={`rounded-2xl border transition-all ${
                item.visible === false
                  ? 'bg-[#001830]/50 border-slate-800 opacity-60'
                  : 'bg-[#001830] border-slate-700/80 hover:border-cyan-500/40 shadow-sm'
              }`}
            >
              {/* Parent Item Header Bar */}
              <div className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                
                <div className="flex items-center gap-3 flex-1 w-full">
                  
                  {/* Grip Handle */}
                  <div className="cursor-grab active:cursor-grabbing p-1 text-slate-500 hover:text-cyan-300" title="Glisser pour déplacer">
                    <GripVertical className="w-4 h-4" />
                  </div>

                  {/* Order Index */}
                  <span className="font-mono text-xs font-bold text-[#38C0E3] bg-[#002240] px-2.5 py-1 rounded-lg border border-slate-700 shrink-0">
                    #{index + 1}
                  </span>

                  {/* Expand Submenu Toggle */}
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="p-1 rounded-lg bg-[#002240] text-slate-300 hover:text-cyan-300 transition-colors"
                    title="Déplier/Replier les sous-menus"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[#38C0E3]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {/* Inline Editing or View Form */}
                  {isEditing ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 flex-1 w-full">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => {
                          const updated = [...items];
                          updated[index].label = e.target.value;
                          setItems(updated);
                        }}
                        className="bg-[#002240] border border-cyan-500/40 text-white px-3 py-1.5 rounded-xl text-xs font-bold focus:outline-none"
                        placeholder="Libellé (ex: NURSERIE)"
                      />
                      <input
                        type="text"
                        value={item.url}
                        onChange={(e) => {
                          const updated = [...items];
                          updated[index].url = e.target.value;
                          setItems(updated);
                        }}
                        className="bg-[#002240] border border-cyan-500/40 text-white px-3 py-1.5 rounded-xl text-xs font-mono focus:outline-none"
                        placeholder="Lien / Ancre (ex: #categories)"
                      />
                      <input
                        type="text"
                        value={item.image || ''}
                        onChange={(e) => {
                          const updated = [...items];
                          updated[index].image = e.target.value;
                          setItems(updated);
                        }}
                        className="bg-[#002240] border border-cyan-500/40 text-white px-3 py-1.5 rounded-xl text-xs focus:outline-none"
                        placeholder="Image Mega Menu (URL)"
                      />
                      <input
                        type="text"
                        value={item.description || ''}
                        onChange={(e) => {
                          const updated = [...items];
                          updated[index].description = e.target.value;
                          setItems(updated);
                        }}
                        className="bg-[#002240] border border-cyan-500/40 text-white px-3 py-1.5 rounded-xl text-xs focus:outline-none"
                        placeholder="Description Mega Menu"
                      />
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-wrap items-center gap-3">
                      <h4 className="font-bold text-white text-sm tracking-wide uppercase font-serif flex items-center gap-2">
                        <span>{item.label}</span>
                        {item.image && (
                          <ImageIcon className="w-3.5 h-3.5 text-cyan-400" title="Possède un visuel de couverture Mega Menu" />
                        )}
                      </h4>
                      <span className="text-xs text-cyan-400 font-mono bg-[#002240] px-2 py-0.5 rounded-md border border-slate-800">
                        {item.url}
                      </span>
                      {hasChildren && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          {item.children?.length} sous-menu(s)
                        </span>
                      )}
                      {item.visible === false && (
                        <span className="text-[10px] font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-500/30">
                          Masqué
                        </span>
                      )}
                    </div>
                  )}

                </div>

                {/* Parent Action Buttons */}
                <div className="flex items-center gap-1.5 shrink-0 self-end md:self-auto">
                  
                  {/* Add Subitem */}
                  <button
                    onClick={() => handleAddSubItem(item.id)}
                    className="p-1.5 px-2.5 rounded-xl bg-[#002240] hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1"
                    title="Ajouter un sous-menu"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Sous-menu</span>
                  </button>

                  {/* Visibility Toggle */}
                  <button
                    onClick={() => handleToggleVisibility(item.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      item.visible === false
                        ? 'bg-rose-950/60 border-rose-500/30 text-rose-400'
                        : 'bg-[#002240] border-slate-700 text-emerald-400'
                    }`}
                    title={item.visible === false ? 'Afficher la rubrique' : 'Masquer la rubrique'}
                  >
                    {item.visible === false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>

                  {/* Edit Toggle */}
                  <button
                    onClick={() => setEditingId(isEditing ? null : item.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      isEditing
                        ? 'bg-[#38C0E3] border-[#38C0E3] text-[#002240]'
                        : 'bg-[#002240] border-slate-700 text-slate-300 hover:text-white'
                    }`}
                    title="Éditer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-xl bg-[#002240] border border-slate-700 hover:bg-rose-950 hover:text-rose-400 text-slate-400"
                    title="Supprimer la rubrique"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>

              </div>

              {/* Sub-menus Section */}
              {isExpanded && (
                <div className="border-t border-slate-800 bg-[#001428] p-4 rounded-b-2xl space-y-3">
                  <div className="flex items-center justify-between pb-2 mb-1 border-b border-slate-800/80 text-xs font-bold text-[#38C0E3]">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Sous-menus de "{item.label}" :</span>
                    </span>
                    <button
                      onClick={() => handleAddSubItem(item.id)}
                      className="text-[11px] font-bold text-cyan-300 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Ajouter un sous-menu</span>
                    </button>
                  </div>

                  {!hasChildren ? (
                    <p className="text-xs text-slate-500 italic py-2">
                      Aucun sous-menu pour le moment. Cliquez sur "+ Sous-menu" pour en ajouter un.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {item.children?.map((sub, subIdx) => {
                        const isSubEditing = editingId === sub.id;

                        return (
                          <div
                            key={sub.id}
                            className={`p-3 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
                              sub.visible === false
                                ? 'bg-[#001830]/40 border-slate-800/60 opacity-50'
                                : 'bg-[#001830] border-slate-800 hover:border-cyan-500/30'
                            }`}
                          >
                            <div className="flex items-center gap-2 flex-1 w-full">
                              <span className="text-cyan-400 font-bold">•</span>
                              
                              {isSubEditing ? (
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 flex-1 w-full">
                                  <input
                                    type="text"
                                    value={sub.label}
                                    onChange={(e) => {
                                      const newItems = [...items];
                                      newItems[index].children![subIdx].label = e.target.value;
                                      setItems(newItems);
                                    }}
                                    className="bg-[#002240] border border-cyan-500/40 text-white px-2.5 py-1 rounded-lg text-xs"
                                    placeholder="Libellé sous-menu"
                                  />
                                  <input
                                    type="text"
                                    value={sub.url}
                                    onChange={(e) => {
                                      const newItems = [...items];
                                      newItems[index].children![subIdx].url = e.target.value;
                                      setItems(newItems);
                                    }}
                                    className="bg-[#002240] border border-cyan-500/40 text-white px-2.5 py-1 rounded-lg text-xs font-mono"
                                    placeholder="Lien / URL"
                                  />
                                  <input
                                    type="text"
                                    value={sub.badge || ''}
                                    onChange={(e) => {
                                      const newItems = [...items];
                                      newItems[index].children![subIdx].badge = e.target.value;
                                      setItems(newItems);
                                    }}
                                    className="bg-[#002240] border border-cyan-500/40 text-white px-2.5 py-1 rounded-lg text-xs"
                                    placeholder="Badge (ex: Nouveau, Promo)"
                                  />
                                  <select
                                    value={sub.badgeColor || 'sky'}
                                    onChange={(e) => {
                                      const newItems = [...items];
                                      newItems[index].children![subIdx].badgeColor = e.target.value;
                                      setItems(newItems);
                                    }}
                                    className="bg-[#002240] border border-cyan-500/40 text-cyan-300 px-2.5 py-1 rounded-lg text-xs"
                                  >
                                    <option value="sky">Badge Bleu / Sky</option>
                                    <option value="emerald">Badge Vert / Bestseller</option>
                                    <option value="rose">Badge Rouge / Promo</option>
                                    <option value="amber">Badge Jaune / Nouveau</option>
                                    <option value="purple">Badge Violet / Tendance</option>
                                    <option value="cyan">Badge Cyan / Exclusif</option>
                                  </select>
                                </div>
                              ) : (
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="font-semibold text-slate-200">{sub.label}</span>
                                  <span className="text-[10px] font-mono text-slate-400">({sub.url})</span>
                                  {sub.badge && (
                                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                                      <Tag className="w-2.5 h-2.5 text-[#E5E632]" />
                                      <span>{sub.badge}</span>
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* Subitem Actions */}
                            <div className="flex items-center gap-1 shrink-0 self-end sm:self-auto">
                              <button
                                onClick={() => handleToggleVisibility(sub.id, true, item.id)}
                                className="p-1.5 rounded-lg bg-[#002240] text-slate-300 hover:text-emerald-400"
                                title="Masquer / Afficher"
                              >
                                {sub.visible === false ? <EyeOff className="w-3.5 h-3.5 text-rose-400" /> : <Eye className="w-3.5 h-3.5 text-emerald-400" />}
                              </button>

                              <button
                                onClick={() => setEditingId(isSubEditing ? null : sub.id)}
                                className={`p-1.5 rounded-lg ${
                                  isSubEditing ? 'bg-[#38C0E3] text-[#002240]' : 'bg-[#002240] text-slate-300'
                                }`}
                                title="Éditer le sous-menu"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleDelete(sub.id, true, item.id)}
                                className="p-1.5 rounded-lg bg-[#002240] text-rose-400 hover:bg-rose-950"
                                title="Supprimer le sous-menu"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Action History Log */}
      <div className="bg-[#002240] p-5 rounded-3xl border border-cyan-500/20 space-y-3">
        <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2">
          <History className="w-4 h-4 text-[#38C0E3]" />
          <span>Historique des modifications de la navigation</span>
        </h4>
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2 no-scrollbar text-xs font-mono">
          {logs.map((log) => (
            <div key={log.id} className="p-2 rounded-xl bg-[#001830] border border-slate-800 flex items-center justify-between text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400">[{log.date} {log.time}]</span>
                <span className="text-amber-300 font-bold">[{log.user}]</span>
                <span>{log.action}</span>
              </div>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#001830] border border-cyan-500/40 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl space-y-4 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#38C0E3]" />
                <span>Prévisualisation en Direct du Navbar CMS</span>
              </h3>
              <button
                onClick={() => setPreviewOpen(false)}
                className="px-3 py-1 rounded-xl bg-[#002240] text-slate-300 hover:text-white text-xs font-bold"
              >
                Fermer l'aperçu
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Survolez ou cliquez sur les rubriques ci-dessous pour tester l'affichage exact du Mega Menu :
            </p>

            {/* Simulated Navbar Header */}
            <div className="bg-[#002240] rounded-2xl p-4 border border-cyan-500/30">
              <nav className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
                {items
                  .filter((item) => item.visible !== false)
                  .map((item) => {
                    const hasChildren = item.children && item.children.length > 0;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setActivePreviewMega(activePreviewMega === item.id ? null : item.id)}
                        className={`cursor-pointer px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-1 ${
                          activePreviewMega === item.id
                            ? 'bg-[#38C0E3] text-[#002240]'
                            : 'bg-[#001830] text-slate-200 hover:text-[#38C0E3]'
                        }`}
                      >
                        <span>{item.label}</span>
                        {hasChildren && <ChevronDown className="w-3 h-3 text-cyan-400" />}
                      </div>
                    );
                  })}
              </nav>

              {/* Active Mega Menu Render */}
              {activePreviewMega && (
                <div className="mt-4 p-4 rounded-2xl bg-[#001830] border border-cyan-500/40 text-white">
                  {(() => {
                    const currentItem = items.find((i) => i.id === activePreviewMega);
                    if (!currentItem) return null;

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h5 className="font-serif text-sm font-bold text-[#38C0E3] border-b border-slate-800 pb-1">
                            {currentItem.label}
                          </h5>
                          {currentItem.children && currentItem.children.length > 0 ? (
                            <div className="space-y-1">
                              {currentItem.children.map((sub) => (
                                <div key={sub.id} className="p-2 rounded-xl bg-[#002240] flex items-center justify-between text-xs">
                                  <span>{sub.label}</span>
                                  {sub.badge && (
                                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                                      {sub.badge}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400 italic">Aucun sous-menu configuré.</p>
                          )}
                        </div>

                        {currentItem.image && (
                          <div className="relative rounded-2xl overflow-hidden min-h-[160px] flex flex-col justify-end p-4 border border-cyan-500/20">
                            <img src={currentItem.image} alt={currentItem.label} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#001830] via-[#001830]/60 to-transparent" />
                            <div className="relative z-10 space-y-1">
                              <span className="text-[10px] uppercase font-bold text-[#38C0E3]">Focus {currentItem.label}</span>
                              <p className="text-xs text-slate-200">{currentItem.description}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
