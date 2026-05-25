"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: "elaris-001",
    name: "Robe Caftan Édition Limitée",
    description:
      "Caftan en soie brodée à la main, pièce unique de la collection ELARIS 2026. Chaque broderie est réalisée par nos artisans à Casablanca avec des fils d'or et de soie naturelle. Une création qui célèbre l'élégance intemporelle de la femme marocaine.",
    price: 4500,
    currency: "MAD",
    image: "/images/collection-1.jpg",
    category: "Caftans",
    stock: 1,
    featured: true,
    details: [
      "Soie naturelle 100%",
      "Brodée à la main",
      "Fil d'or véritable",
      "Pièce unique",
      "Livraison incluse",
    ],
  };

  const handleOrder = () => {
    const orderData = {
      productId: product.id,
      quantity,
      total: product.price * quantity,
    };
    sessionStorage.setItem("elaris-cart", JSON.stringify(orderData));
    router.push("/checkout");
  };

  return (
    <main className="min-h-screen bg-elaris-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-elaris-gold/10 bg-elaris-black/90 px-6 py-4 backdrop-blur-md md:px-12">
        <a href="/" className="font-playfair text-2xl font-normal tracking-widest text-elaris-cream">
          ELARIS
        </a>
        <div className="flex items-center gap-6">
          <a href="/" className="text-sm tracking-wider text-elaris-cream/70 transition-colors hover:text-elaris-gold">
            ACCUEIL
          </a>
          <a
            href="/admin/login"
            className="border border-elaris-gold/40 px-4 py-2 text-xs tracking-wider text-elaris-gold transition-all hover:bg-elaris-gold hover:text-elaris-black"
          >
            ADMIN
          </a>
        </div>
      </nav>

      {/* Product Detail */}
      <section className="px-6 pt-28 pb-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-elaris-black-light">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 rounded bg-elaris-gold px-3 py-1 text-xs tracking-wider text-elaris-black">
                ÉDITION LIMITÉE
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <span className="text-xs tracking-[0.3em] text-elaris-gold">{product.category}</span>
              <h1 className="mt-3 font-playfair text-4xl text-elaris-cream md:text-5xl">
                {product.name}
              </h1>
              <div className="mt-4 h-px w-16 bg-elaris-gold/40" />
              <p className="mt-6 font-cormorant text-lg leading-relaxed text-elaris-cream/80">
                {product.description}
              </p>

              <ul className="mt-6 space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-elaris-cream/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-elaris-gold" />
                    {detail}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-playfair text-4xl text-elaris-gold">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-lg text-elaris-cream/60">{product.currency}</span>
              </div>

              <div className="mt-2 text-sm text-elaris-cream/50">
                Stock: {product.stock} pièce{product.stock > 1 ? "s" : ""} disponible
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center border border-elaris-gold/30">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-elaris-cream transition-colors hover:bg-elaris-gold/10"
                  >
                    −
                  </button>
                  <span className="px-4 py-3 text-elaris-cream">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-3 text-elaris-cream transition-colors hover:bg-elaris-gold/10"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleOrder}
                  className="flex-1 border border-elaris-gold bg-elaris-gold px-8 py-4 text-center text-sm tracking-[0.2em] text-elaris-black transition-opacity hover:opacity-80"
                >
                  COMMANDER — PAIEMENT À LA LIVRAISON
                </button>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-elaris-cream/40">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Paiement sécurisé à la livraison (Cash on Delivery)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-elaris-gold/10 bg-elaris-black px-6 py-12 md:px-12">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-playfair text-2xl text-elaris-cream">ELARIS</p>
          <p className="mt-2 text-xs tracking-[0.2em] text-elaris-gold">LUXURY</p>
          <p className="mt-4 text-sm text-elaris-cream/50">Maison de Couture 100% Marocaine</p>
          <p className="mt-8 text-xs text-elaris-cream/40">© 2026 ELARIS Luxury. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  );
}
