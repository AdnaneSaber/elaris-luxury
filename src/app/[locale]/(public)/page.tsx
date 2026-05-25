import ContactForm from "@/components/views/landing/ContactForm";

export const metadata = {
  title: "ELARIS Luxury | Maison de Couture Marocaine",
};

const plans = [
  {
    name: "Essentiel",
    price: "2,500",
    description: "Caftan standard",
    features: ["Caftan prêt-à-porter", "Livraison incluse", "3 tailles disponibles", "Retour sous 7 jours"],
    popular: false,
  },
  {
    name: "Élégance",
    price: "4,500",
    description: "Sur mesure",
    features: ["Caftan sur mesure", "Brodé à la main", "Consultation styliste", "Livraison incluse", "Retour sous 14 jours"],
    popular: true,
  },
  {
    name: "Prestige",
    price: "8,500",
    description: "Collection privée",
    features: ["Collection privée", "Brodé fil d'or", "Consultation styliste dédiée", "Livraison express", "Retour sous 30 jours", "Entretien gratuit 1 an"],
    popular: false,
  },
  {
    name: "Royale",
    price: "15,000",
    description: "Haute couture",
    features: ["Pièce unique", "Haute couture", "Service concierge", "Livraison VIP", "Retour sous 30 jours", "Entretien gratuit 2 ans", "Invitation événements"],
    popular: false,
  },
];

export default function LandingPage() {
  return (
    <main className="relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <div className="font-playfair text-2xl font-normal tracking-widest text-elaris-cream">
          ELARIS
        </div>
        <div className="hidden items-center gap-8 text-sm tracking-[0.15em] text-elaris-cream/70 md:flex">
          <a href="#product" className="transition-colors hover:text-elaris-gold">PRODUIT</a>
          <a href="#plans" className="transition-colors hover:text-elaris-gold">PLANS</a>
          <a href="#collections" className="transition-colors hover:text-elaris-gold">COLLECTIONS</a>
          <a href="#maison" className="transition-colors hover:text-elaris-gold">LA MAISON</a>
          <a href="#contact" className="transition-colors hover:text-elaris-gold">CONTACT</a>
        </div>
        <a
          href="/admin/login"
          className="border border-elaris-gold/40 px-5 py-2 text-xs tracking-[0.2em] text-elaris-gold transition-all hover:bg-elaris-gold hover:text-elaris-black"
        >
          ADMIN
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-elaris-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        >
          <source src="/brand-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-elaris-black/30 via-transparent to-elaris-black" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="mb-6">
            <span className="text-xs tracking-[0.4em] text-elaris-gold uppercase md:text-sm">
              Maison de Couture
            </span>
          </div>

          <h1 className="font-playfair text-6xl font-normal tracking-wide text-elaris-cream sm:text-8xl md:text-9xl lg:text-[10rem]">
            ELARIS
          </h1>

          <p className="mt-4 font-cormorant text-2xl font-light italic tracking-wider text-elaris-cream/80 sm:text-3xl">
            Luxury
          </p>

          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-16 bg-elaris-gold/60" />
            <span className="text-xs tracking-[0.3em] text-elaris-gold">100% MAROCAINE</span>
            <span className="h-px w-16 bg-elaris-gold/60" />
          </div>

          <div className="mt-14 flex flex-col gap-4 sm:flex-row">
            <a
              href="#product"
              className="inline-flex items-center gap-3 border border-elaris-gold/50 px-10 py-4 text-sm tracking-[0.25em] text-elaris-gold transition-all hover:bg-elaris-gold hover:text-elaris-black"
            >
              DÉCOUVRIR
            </a>
            <a
              href="/product"
              className="inline-flex items-center gap-3 bg-elaris-gold px-10 py-4 text-sm tracking-[0.25em] text-elaris-black transition-opacity hover:opacity-80"
            >
              COMMANDER
            </a>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 text-elaris-cream/40">
              <span className="text-[10px] tracking-[0.2em]">SCROLL</span>
              <div className="h-8 w-px bg-elaris-gold/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product */}
      <section id="product" className="relative bg-elaris-black px-6 py-24 md:px-12 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="text-xs tracking-[0.3em] text-elaris-gold">PIÈCE EN VEDETTE</span>
            <h2 className="mt-4 font-playfair text-4xl font-normal text-elaris-cream md:text-5xl">
              Notre Création
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-elaris-gold/40" />
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden bg-elaris-black-light">
              <img
                src="/images/collection-1.jpg"
                alt="Robe Caftan Édition Limitée"
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 rounded bg-elaris-gold px-3 py-1 text-xs tracking-wider text-elaris-black">
                ÉDITION LIMITÉE
              </div>
            </div>
            <div>
              <h3 className="font-playfair text-3xl text-elaris-cream md:text-4xl">
                Robe Caftan Édition Limitée
              </h3>
              <p className="mt-4 font-cormorant text-lg leading-relaxed text-elaris-cream/80">
                Caftan en soie brodée à la main, pièce unique de la collection ELARIS 2026.
                Chaque broderie est réalisée par nos artisans avec des fils d'or et de soie naturelle.
              </p>
              <ul className="mt-6 space-y-2">
                {["Soie naturelle 100%", "Brodée à la main", "Fil d'or véritable", "Pièce unique", "Livraison incluse"].map((d, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-elaris-cream/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-elaris-gold" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-playfair text-4xl text-elaris-gold">4,500</span>
                <span className="text-lg text-elaris-cream/60">MAD</span>
              </div>
              <a
                href="/product"
                className="mt-8 inline-block border border-elaris-gold bg-elaris-gold px-10 py-4 text-sm tracking-[0.2em] text-elaris-black transition-opacity hover:opacity-80"
              >
                VOIR LE PRODUIT — COMMANDER
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="plans" className="relative bg-elaris-black-light px-6 py-24 md:px-12 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="text-xs tracking-[0.3em] text-elaris-gold">NOS OFFRES</span>
            <h2 className="mt-4 font-playfair text-4xl font-normal text-elaris-cream md:text-5xl">
              4 Plans d'Élégance
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-cormorant text-lg text-elaris-cream/70">
              Choisissez l'expérience qui correspond à votre style.
            </p>
            <div className="mx-auto mt-6 h-px w-24 bg-elaris-gold/40" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded border p-6 transition-all hover:border-elaris-gold/40 ${
                  plan.popular
                    ? "border-elaris-gold bg-elaris-gold/5"
                    : "border-elaris-gold/10 bg-elaris-black"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-elaris-gold px-4 py-1 text-xs tracking-wider text-elaris-black">
                    POPULAIRE
                  </div>
                )}
                <h3 className="font-playfair text-xl text-elaris-cream">{plan.name}</h3>
                <p className="mt-1 text-sm text-elaris-cream/50">{plan.description}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-playfair text-3xl text-elaris-gold">{plan.price}</span>
                  <span className="text-sm text-elaris-cream/60">MAD</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-elaris-cream/70">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-elaris-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/product"
                  className={`mt-6 block w-full rounded py-3 text-center text-sm tracking-wider transition-all ${
                    plan.popular
                      ? "bg-elaris-gold text-elaris-black hover:opacity-80"
                      : "border border-elaris-gold/30 text-elaris-gold hover:bg-elaris-gold/10"
                  }`}
                >
                  CHOISIR
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="relative bg-elaris-black px-6 py-24 md:px-12 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="text-xs tracking-[0.3em] text-elaris-gold">NOS CRÉATIONS</span>
            <h2 className="mt-4 font-playfair text-4xl font-normal text-elaris-cream md:text-5xl">
              Collections
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-elaris-gold/40" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="group relative aspect-[3/4] overflow-hidden bg-elaris-black-light"
              >
                <img
                  src={`/images/collection-${i}.jpg`}
                  alt={`Collection ${i}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-elaris-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-xs tracking-[0.2em] text-elaris-gold">ÉDITION LIMITÉE</span>
                  <p className="mt-2 font-playfair text-lg text-elaris-cream">Pièce Unique {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section id="maison" className="relative bg-elaris-black-light px-6 py-24 md:px-12 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/images/brand-story.jpg"
                  alt="ELARIS Atelier"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 border border-elaris-gold/30 bg-elaris-black p-6 md:-bottom-8 md:-right-8 md:p-8">
                <p className="font-playfair text-3xl text-elaris-gold md:text-4xl">100%</p>
                <p className="mt-1 text-xs tracking-[0.2em] text-elaris-cream/70">MAROCAINE</p>
              </div>
            </div>

            <div>
              <span className="text-xs tracking-[0.3em] text-elaris-gold">NOTRE HISTOIRE</span>
              <h2 className="mt-4 font-playfair text-4xl font-normal leading-tight text-elaris-cream md:text-5xl">
                L'Élégance
                <br />
                <span className="italic text-elaris-gold">de l'Authenticité</span>
              </h2>
              <div className="mt-6 h-px w-16 bg-elaris-gold/40" />
              <p className="mt-8 font-cormorant text-lg leading-relaxed text-elaris-cream/80">
                Bienvenue chez ELARIS Luxury – Maison de Couture. Une marque 100% marocaine,
                née de la passion pour l'élégance et le savoir-faire artisanal.
              </p>
              <p className="mt-4 font-cormorant text-lg leading-relaxed text-elaris-cream/80">
                Nos créations célèbrent la femme moderne, entre tradition et modernité.
                Chaque pièce est pensée pour refléter la beauté, la force et l'authenticité
                de la femme marocaine.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="font-playfair text-3xl text-elaris-gold">Élégance</p>
                </div>
                <div className="text-center">
                  <p className="font-playfair text-3xl text-elaris-gold">Modernité</p>
                </div>
                <div className="text-center">
                  <p className="font-playfair text-3xl text-elaris-gold">Authenticité</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Lead Form Section */}
      <section id="contact" className="relative bg-elaris-black px-6 py-24 md:px-12 lg:px-20 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs tracking-[0.3em] text-elaris-gold">PRENDRE CONTACT</span>
          <h2 className="mt-4 font-playfair text-4xl font-normal text-elaris-cream md:text-5xl">
            Votre Élégance Commence Ici
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-cormorant text-lg text-elaris-cream/70">
            Laissez-nous vos coordonnées et nous vous contacterons pour une consultation privée.
          </p>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-elaris-gold/10 bg-elaris-black px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-playfair text-2xl text-elaris-cream">ELARIS</p>
              <p className="mt-2 text-xs tracking-[0.2em] text-elaris-gold">LUXURY</p>
              <p className="mt-4 text-sm text-elaris-cream/50">
                Maison de Couture 100% Marocaine
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] text-elaris-gold">LIENS</p>
              <div className="mt-4 space-y-3 text-sm text-elaris-cream/60">
                <a href="#product" className="block transition-colors hover:text-elaris-gold">Produit</a>
                <a href="#plans" className="block transition-colors hover:text-elaris-gold">Plans</a>
                <a href="#collections" className="block transition-colors hover:text-elaris-gold">Collections</a>
                <a href="#maison" className="block transition-colors hover:text-elaris-gold">La Maison</a>
                <a href="#contact" className="block transition-colors hover:text-elaris-gold">Contact</a>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] text-elaris-gold">CONTACT</p>
              <div className="mt-4 space-y-3 text-sm text-elaris-cream/60">
                <p>contact@elaris.ma</p>
                <p>+212 6XX XXX XXX</p>
                <p>Casablanca, Maroc</p>
              </div>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] text-elaris-gold">RÉSEAUX</p>
              <div className="mt-4 flex gap-4">
                <a href="#" className="text-elaris-cream/50 transition-colors hover:text-elaris-gold">Instagram</a>
                <a href="#" className="text-elaris-cream/50 transition-colors hover:text-elaris-gold">Facebook</a>
                <a href="#" className="text-elaris-cream/50 transition-colors hover:text-elaris-gold">WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-elaris-gold/10 pt-8 sm:flex-row">
            <p className="text-xs text-elaris-cream/40">
              © 2026 ELARIS Luxury. Tous droits réservés.
            </p>
            <p className="text-xs text-elaris-cream/40">
              #MadeInMorocco 🇲🇦
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
