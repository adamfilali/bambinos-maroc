import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2, FileText } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { company, sendContactMessage } = useData();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Demande d\'étude / devis sur mesure',
    message: '',
    productRef: ''
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
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: 'Demande d\'étude / devis sur mesure',
        message: '',
        productRef: ''
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-stone-100/90 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-amber-800 text-xs font-semibold uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Contact & Rendez-vous
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Concevons Ensemble la Chambre de vos Rêves
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Envoyez-nous vos dimensions ou venez nous rencontrer dans notre showroom.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details & Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xs border border-stone-200/90 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-stone-900 border-b border-stone-100 pb-3">
                Coordonnées du Showroom
              </h3>

              <ul className="space-y-4 text-xs sm:text-sm text-stone-700">
                {company?.address && (
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-900">Adresse :</strong>
                      <span>{company.address}, {company.city}</span>
                    </div>
                  </li>
                )}

                {company?.phone && (
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-900">Téléphone Showroom :</strong>
                      <a
                        href={`tel:${company.phone.replace(/\s+/g, '')}`}
                        className="text-amber-900 font-bold hover:underline"
                        title="Cliquer pour appeler directement"
                      >
                        {company.phone} (Appel direct)
                      </a>
                    </div>
                  </li>
                )}

                {company?.whatsapp && (
                  <li className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-900">WhatsApp Réactif :</strong>
                      <a
                        href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 font-bold hover:underline"
                      >
                        {company.whatsapp} (Discussion instantanée)
                      </a>
                    </div>
                  </li>
                )}

                {company?.email && (
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-900">E-mail :</strong>
                      <a href={`mailto:${company.email}`} className="text-stone-800 hover:underline">
                        {company.email}
                      </a>
                    </div>
                  </li>
                )}

                {company?.workingHours && (
                  <li className="flex items-start gap-3 pt-2 border-t border-stone-100">
                    <Clock className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-stone-900">Horaires d'Ouverture :</strong>
                      <span>{company.workingHours}</span>
                    </div>
                  </li>
                )}
              </ul>

              {/* Direct Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-3">
                {company?.phone && (
                  <a
                    href={`tel:${company.phone.replace(/\s+/g, '')}`}
                    className="bg-amber-900 hover:bg-amber-800 text-amber-100 py-3 px-2 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Appeler Showroom</span>
                  </a>
                )}
                {company?.whatsapp && (
                  <a
                    href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-2 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>

            </div>

            {/* Map Embed */}
            {company?.mapEmbedUrl && (
              <div className="bg-white p-2 rounded-3xl shadow-xs border border-stone-200 overflow-hidden h-56">
                <iframe
                  src={company.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '1rem' }}
                  allowFullScreen
                  loading="lazy"
                  title="Localisation Showroom Bambinos"
                ></iframe>
              </div>
            )}
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-xs border border-stone-200/90 space-y-6">
            
            <div className="border-b border-stone-100 pb-4">
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Formulaire de Demande d'Étude 3D & Devis
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Remplissez vos coordonnées. Nos architectes d'intérieur vous répondent sous 24h ouvrées.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-emerald-950">
                  Demande transmise avec succès !
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Merci pour votre confiance. Un conseiller Bambinos étudie vos besoins et vous recontactera très rapidement.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Mme / M. Nom"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Numéro de Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+212 6 XX XX XX XX"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      E-mail (optionnel)
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="votre.email@exemple.com"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">
                      Référence modèle (si applicable)
                    </label>
                    <input
                      type="text"
                      value={form.productRef}
                      onChange={(e) => setForm({ ...form, productRef: e.target.value })}
                      placeholder="ex: BAM-2026-NUA"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Sujet de votre demande
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-900 bg-white"
                  >
                    <option value="Demande d'étude / devis sur mesure">Demande d'étude / devis sur mesure</option>
                    <option value="Projet de chambre complète">Projet de chambre complète</option>
                    <option value="Lit superposé ou cabane">Lit superposé ou cabane</option>
                    <option value="Dressing ou penderie">Dressing ou penderie</option>
                    <option value="Bureau & bibliothèque">Bureau & bibliothèque</option>
                    <option value="Prise de rendez-vous Showroom">Prise de rendez-vous Showroom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Description de votre projet & dimensions estimées *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Précisez la pièce, l'âge de l'enfant, vos couleurs préférées et les dimensions approximatives..."
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-800 text-stone-900"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-amber-900 hover:bg-amber-800 text-amber-50 font-bold py-4 rounded-xl text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{submitting ? 'Envoi en cours...' : 'Envoyer ma Demande de Devis'}</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
