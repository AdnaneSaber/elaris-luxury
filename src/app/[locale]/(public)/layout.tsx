import "@/styles/globals.css";

import { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { Providers } from "@/services/providers";
import { playfair, cormorant } from "@/styles/fonts";

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning={true}
    >
      <body className={`${playfair.variable} ${cormorant.variable} bg-elaris-black text-elaris-cream antialiased`}>
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL("https://elaris.ma"),
  title: {
    default: "ELARIS Luxury | Maison de Couture Marocaine",
    template: "%s | ELARIS Luxury",
  },
  description:
    "ELARIS Luxury — Maison de Couture 100% Marocaine. Élégance, Modernité, Authenticité. Découvrez nos créations uniques célébrant la femme moderne.",
  keywords: [
    "ELARIS",
    "ELARIS Luxury",
    "Maison de Couture",
    "Maroc",
    "Made in Morocco",
    "Haute Couture Marocaine",
    "Mode Maroc",
    "Caftan",
    "Tenues traditionnelles",
  ],
  authors: [{ name: "ELARIS Luxury" }],
  creator: "ELARIS Luxury",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://elaris.ma",
    siteName: "ELARIS Luxury",
    title: "ELARIS Luxury | Maison de Couture Marocaine",
    description:
      "ELARIS Luxury — Maison de Couture 100% Marocaine. Élégance, Modernité, Authenticité.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ELARIS Luxury | Maison de Couture Marocaine",
    description:
      "ELARIS Luxury — Maison de Couture 100% Marocaine. Élégance, Modernité, Authenticité.",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
