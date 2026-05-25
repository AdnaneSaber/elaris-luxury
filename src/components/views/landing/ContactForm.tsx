"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", phone: "", email: "", interest: "", message: "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12 space-y-6 text-left">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-xs tracking-[0.15em] text-elaris-cream/60">NOM COMPLET *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-2 w-full border-b border-elaris-gold/30 bg-transparent py-3 text-elaris-cream outline-none transition-colors focus:border-elaris-gold"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label className="block text-xs tracking-[0.15em] text-elaris-cream/60">TÉLÉPHONE *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="mt-2 w-full border-b border-elaris-gold/30 bg-transparent py-3 text-elaris-cream outline-none transition-colors focus:border-elaris-gold"
            placeholder="+212 ..."
          />
        </div>
      </div>
      <div>
        <label className="block text-xs tracking-[0.15em] text-elaris-cream/60">EMAIL</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-2 w-full border-b border-elaris-gold/30 bg-transparent py-3 text-elaris-cream outline-none transition-colors focus:border-elaris-gold"
          placeholder="votre@email.com"
        />
      </div>
      <div>
        <label className="block text-xs tracking-[0.15em] text-elaris-cream/60">INTÉRÊT</label>
        <select
          value={formData.interest}
          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
          className="mt-2 w-full border-b border-elaris-gold/30 bg-transparent py-3 text-elaris-cream outline-none transition-colors focus:border-elaris-gold"
        >
          <option value="" className="bg-elaris-black">Choisir une option</option>
          <option value="caftan" className="bg-elaris-black">Caftan Sur Mesure</option>
          <option value="tenue" className="bg-elaris-black">Tenue de Cérémonie</option>
          <option value="accessoire" className="bg-elaris-black">Accessoires</option>
          <option value="autre" className="bg-elaris-black">Autre</option>
        </select>
      </div>
      <div>
        <label className="block text-xs tracking-[0.15em] text-elaris-cream/60">MESSAGE</label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="mt-2 w-full border-b border-elaris-gold/30 bg-transparent py-3 text-elaris-cream outline-none transition-colors focus:border-elaris-gold"
          placeholder="Décrivez votre projet..."
        />
      </div>
      <div className="pt-4 text-center">
        {submitted ? (
          <div className="text-elaris-gold">
            <p className="font-playfair text-lg">Merci ! ✨</p>
            <p className="mt-2 text-sm text-elaris-cream/60">Nous vous contacterons bientôt.</p>
          </div>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-3 border border-elaris-gold/50 bg-elaris-gold/10 px-12 py-4 text-sm tracking-[0.25em] text-elaris-gold transition-all hover:bg-elaris-gold hover:text-elaris-black disabled:opacity-50"
          >
            {submitting ? "ENVOI..." : "ENVOYER"}
          </button>
        )}
      </div>
    </form>
  );
}
