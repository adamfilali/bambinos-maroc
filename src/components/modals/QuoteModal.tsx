import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { X, Send, CheckCircle2, FileText, Phone, MessageCircle } from 'lucide-react';

export const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, quoteProductRef, closeQuoteModal, sendContactMessage, company } = useData();

  if (!isQuoteModalOpen) return null;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: `Devis Sur-Mesure - Modèle ${quoteProductRef || ''}`,
    message: quoteProductRef
      ? `Bonjour, je souhaiterais recevoir une étude personnalisée et un devis pour le modèle sur mesure réf. ${quoteProductRef}.`
      : 'Bonjour, je souhaiterais obtenir une étude 3D et un devis pour la réalisation d\'un espace enfant sur mesure.',
    productRef: quoteProductRef || ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;

    setSubmitting(true);
    const success = await sendContactMessage(form);
    setSubmitting(false);

    if (success) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-stone-200 my-auto text-stone-900">
        
        {/* Header */}
        <div className="p-6 bg-stone-900 text-stone-100 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Demande de Devis 3D Sur-Mesure
              </h3>
              {quoteProductRef && (
                <span className="text-xs text-amber-300 font-mono block">
                  Modèle Référence : {quoteProductRef}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={closeQuoteModal}
            className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-xl font-bold text-stone-900">
                Demande transmise avec succès !
              </h4>
              <p className="text-xs text-stone-600">
                Merci. Un architecte d'intérieur Bambinos étudie vos besoins et vous recontactera très rapidement.
              </p>
              <button
                onClick={closeQuoteModal}
                className="mt-4 px-6 py-2.5 bg-amber-900 text-amber-50 rounded-xl text-xs font-semibold"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Nom Complet *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Mme / M. Votre Nom"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+212 6 XX XX XX XX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    E-mail (optionnel)
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@exemple.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Détails du Projet & Dimensions *
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-900"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-amber-900 hover:bg-amber-800 text-amber-50 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>{submitting ? 'Transmission...' : 'Envoyer ma Demande de Devis'}</span>
              </button>

              {/* Direct Quick WhatsApp or Phone */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>Ou contactez-nous directement :</span>
                <div className="flex items-center gap-2">
                  {company?.phone && (
                    <a
                      href={`tel:${company.phone.replace(/\s+/g, '')}`}
                      className="text-amber-900 font-bold hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> Appel
                    </a>
                  )}
                  {company?.whatsapp && (
                    <a
                      href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3 fill-current" /> WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
