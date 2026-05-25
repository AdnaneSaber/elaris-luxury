"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  stock: number;
  featured: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-elaris-cream/60">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-elaris-cream">Produits</h1>
        <p className="mt-2 text-elaris-cream/60">{products.length} produits</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded border border-elaris-gold/10 bg-elaris-black-light p-4"
          >
            <div className="aspect-[3/4] overflow-hidden bg-elaris-black">
              <img
                src={"/images/collection-1.jpg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4">
              <h3 className="font-playfair text-lg text-elaris-cream">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-elaris-cream/60">
                {product.category}
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-playfair text-2xl text-elaris-gold">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-sm text-elaris-cream/60">
                  {product.currency}
                </span>
              </div>
              <div className="mt-2 text-sm text-elaris-cream/50">
                Stock: {product.stock} pièce{product.stock > 1 ? "s" : ""}
              </div>
              {product.featured && (
                <span className="mt-2 inline-block rounded bg-elaris-gold/20 px-2 py-1 text-xs text-elaris-gold">
                  En vedette
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
