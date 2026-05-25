"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface OrderForm {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [form, setForm] = useState<OrderForm>({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<OrderForm>>({});

  const cart = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("elaris-cart") || "{}") : {};
  const product = {
    name: "Robe Caftan Édition Limitée",
    price: 4500,
    currency: "MAD",
  };
  const quantity = cart.quantity || 1;
  const total = product.price * quantity;

  const validate = (): boolean => {
    const newErrors: Partial<OrderForm> = {};
    if (!form.customerName.trim()) newErrors.customerName = "Nom requis";
    if (!form.phone.trim()) newErrors.phone = "Téléphone requis";
    if (!form.address.trim()) newErrors.address = "Adresse requise";
    if (!form.city.trim()) newErrors.city = "Ville requise";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          productId: "elaris-001",
          productName: product.name,
          quantity,
          total,
          paymentMethod: "COD",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setOrderId(data.order.id);
        setSuccess(true);
        sessionStorage.removeItem("elaris-cart");
      } else {
        setErrors({ customerName: "Erreur lors de la commande. Réessayez." });
      }
    } catch {
      setErrors({ customerName: "Erreur réseau. Vérifiez votre connexion." });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-elaris-black px-6">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
            <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-playfair text-3xl text-elaris-cream">Commande Confirmée</h1>
          <p className="mt-4 text-elaris-cream/70">
            Merci ! Votre commande a été enregistrée.
          </p>
          <p className="mt-2 text-sm text-elaris-gold">N° de commande: {orderId}</p>
          <p className="mt-4 text-sm text-elaris-cream/50">
            Notre équipe vous contactera sous 24h pour confirmer la livraison.
            Paiement à la livraison : {total.toLocaleString()} MAD
          </p>
          <a
            href="/"
            className="mt-8 inline-block border border-elaris-gold px-8 py-3 text-sm tracking-wider text-elaris-gold transition-all hover:bg-elaris-gold hover:text-elaris-black"
          >
            RETOUR À L'ACCUEIL
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-elaris-black">
      {/* Nav */}
      <nav className="flex items-center justify-between border-b border-elaris-gold/10 px-6 py-4 md:px-12">
        <a href="/" className="font-playfair text-2xl tracking-widest text-elaris-cream">ELARIS</a>
        <a href="/product" className="text-sm text-elaris-cream/60 hover:text-elaris-gold">← Retour au produit</a>
      </nav>

      <section className="px-6 py-12 md:px-12 lg:px-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-playfair text-3xl text-elaris-cream">Finaliser la Commande</h1>
          <p className="mt-2 text-elaris-cream/60">Paiement à la livraison (Cash on Delivery)</p>

          {/* Order Summary */}
          <div className="mt-8 rounded border border-elaris-gold/20 bg-elaris-black-light p-6">
            <h3 className="text-sm tracking-wider text-elaris-gold">RÉCAPITULATIF</h3>
            <div className="mt-4 flex justify-between text-elaris-cream">
              <span>{product.name} × {quantity}</span>
              <span>{total.toLocaleString()} MAD</span>
            </div>
            <div className="mt-2 flex justify-between text-elaris-cream/60">
              <span>Livraison</span>
              <span className="text-green-400">Gratuite</span>
            </div>
            <div className="mt-4 border-t border-elaris-gold/20 pt-4 flex justify-between font-playfair text-xl text-elaris-gold">
              <span>Total</span>
              <span>{total.toLocaleString()} MAD</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-xs tracking-wider text-elaris-gold">NOM COMPLET *</label>
              <input
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                className="mt-2 w-full rounded border border-elaris-gold/20 bg-elaris-black px-4 py-3 text-elaris-cream placeholder:text-elaris-cream/30 focus:border-elaris-gold focus:outline-none"
                placeholder="Votre nom"
              />
              {errors.customerName && <p className="mt-1 text-xs text-red-400">{errors.customerName}</p>}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs tracking-wider text-elaris-gold">TÉLÉPHONE *</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-2 w-full rounded border border-elaris-gold/20 bg-elaris-black px-4 py-3 text-elaris-cream placeholder:text-elaris-cream/30 focus:border-elaris-gold focus:outline-none"
                  placeholder="+212 6XX XXX XXX"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-xs tracking-wider text-elaris-gold">EMAIL</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-2 w-full rounded border border-elaris-gold/20 bg-elaris-black px-4 py-3 text-elaris-cream placeholder:text-elaris-cream/30 focus:border-elaris-gold focus:outline-none"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-wider text-elaris-gold">ADRESSE DE LIVRAISON *</label>
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="mt-2 w-full rounded border border-elaris-gold/20 bg-elaris-black px-4 py-3 text-elaris-cream placeholder:text-elaris-cream/30 focus:border-elaris-gold focus:outline-none"
                placeholder="Rue, numéro, quartier"
              />
              {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-xs tracking-wider text-elaris-gold">VILLE *</label>
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="mt-2 w-full rounded border border-elaris-gold/20 bg-elaris-black px-4 py-3 text-elaris-cream placeholder:text-elaris-cream/30 focus:border-elaris-gold focus:outline-none"
                placeholder="Casablanca, Rabat, Marrakech..."
              />
              {errors.city && <p className="mt-1 text-xs text-red-400">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-xs tracking-wider text-elaris-gold">NOTES (OPTIONNEL)</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                className="mt-2 w-full rounded border border-elaris-gold/20 bg-elaris-black px-4 py-3 text-elaris-cream placeholder:text-elaris-cream/30 focus:border-elaris-gold focus:outline-none"
                placeholder="Instructions spéciales de livraison..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full border border-elaris-gold bg-elaris-gold py-4 text-sm tracking-[0.2em] text-elaris-black transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              {loading ? "TRAITEMENT..." : "CONFIRMER LA COMMANDE — PAIEMENT À LA LIVRAISON"}
            </button>

            <p className="text-center text-xs text-elaris-cream/40">
              Vous ne payez que lors de la réception de votre commande.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
