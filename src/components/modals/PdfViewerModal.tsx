import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { X, Download, Printer, ZoomIn, ZoomOut, FileText, ExternalLink } from 'lucide-react';

export const PdfViewerModal: React.FC = () => {
  const { activePdfUrl, activePdfTitle, closePdfViewer } = useData();

  if (!activePdfUrl) return null;

  const [zoomLevel, setZoomLevel] = useState(100);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 50));

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-fade-in">
      <div className="bg-stone-900 rounded-3xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden border border-amber-900/40 text-stone-100">
        
        {/* Header Bar */}
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-white truncate max-w-md">
                {activePdfTitle || 'Document PDF Bambinos'}
              </h3>
              <span className="text-[10px] text-stone-400 font-mono block">
                {activePdfUrl}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom controls */}
            <div className="hidden sm:flex items-center gap-1 bg-stone-800 rounded-lg p-1 text-xs">
              <button
                onClick={handleZoomOut}
                className="p-1 rounded hover:bg-stone-700 text-stone-300"
                title="Dézoomer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 font-mono text-[11px] text-amber-300">{zoomLevel}%</span>
              <button
                onClick={handleZoomIn}
                className="p-1 rounded hover:bg-stone-700 text-stone-300"
                title="Zoomer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Direct Open in New Tab / Download */}
            <a
              href={activePdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Télécharger PDF</span>
            </a>

            <a
              href={activePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300"
              title="Ouvrir dans un nouvel onglet"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={closePdfViewer}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Iframe Viewer Body */}
        <div className="flex-1 bg-stone-950 overflow-auto flex items-center justify-center p-2 relative">
          <iframe
            src={`${activePdfUrl}#zoom=${zoomLevel}`}
            title={activePdfTitle || "Document PDF"}
            className="w-full h-full rounded-xl border border-stone-800 bg-white"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease-out'
            }}
          ></iframe>
        </div>

      </div>
    </div>
  );
};
