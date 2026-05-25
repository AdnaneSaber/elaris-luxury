"use client";

import { useEffect, useState } from "react";

interface Stat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stat[]>([
    { label: "Commandes", value: "0", change: "+", positive: true },
    { label: "Leads", value: "0", change: "+", positive: true },
    { label: "Produits", value: "0", change: "+", positive: true },
    { label: "Agents", value: "0", change: "+", positive: true },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/orders").then((r) => r.json()),
      fetch("/api/leads").then((r) => r.json()),
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/agents").then((r) => r.json()),
    ])
      .then(([ordersData, leadsData, productsData, agentsData]) => {
        setStats([
          {
            label: "Commandes",
            value: String((ordersData.orders || []).length),
            change: "+",
            positive: true,
          },
          {
            label: "Leads",
            value: String((leadsData.leads || []).length),
            change: "+",
            positive: true,
          },
          {
            label: "Produits",
            value: String((productsData.products || []).length),
            change: "+",
            positive: true,
          },
          {
            label: "Agents",
            value: String((agentsData.agents || []).length),
            change: "+",
            positive: true,
          },
        ]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="font-playfair text-3xl text-elaris-cream">
          Tableau de Bord
        </h1>
        <p className="mt-2 text-elaris-cream/60">
          Vue d'ensemble de ELARIS Luxury
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded border border-elaris-gold/10 bg-elaris-black-light p-6"
          >
            <p className="text-xs tracking-wider text-elaris-gold">
              {stat.label.toUpperCase()}
            </p>
            <p className="mt-2 font-playfair text-3xl text-elaris-cream">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded border border-elaris-gold/10 bg-elaris-black-light p-6">
        <h2 className="font-playfair text-xl text-elaris-cream">
          Bienvenue dans l'Admin ELARIS
        </h2>
        <p className="mt-2 text-elaris-cream/60">
          Utilisez le menu de gauche pour gérer les commandes, les leads, les
          produits et les agents.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="/admin/orders"
            className="rounded border border-elaris-gold/20 p-4 transition-colors hover:border-elaris-gold/40"
          >
            <p className="text-sm text-elaris-gold">Commandes</p>
            <p className="mt-1 text-xs text-elaris-cream/50">
              Gérer les commandes COD
            </p>
          </a>
          <a
            href="/admin/leads"
            className="rounded border border-elaris-gold/20 p-4 transition-colors hover:border-elaris-gold/40"
          >
            <p className="text-sm text-elaris-gold">Leads</p>
            <p className="mt-1 text-xs text-elaris-cream/50">
              Suivre les demandes clients
            </p>
          </a>
          <a
            href="/admin/products"
            className="rounded border border-elaris-gold/20 p-4 transition-colors hover:border-elaris-gold/40"
          >
            <p className="text-sm text-elaris-gold">Produits</p>
            <p className="mt-1 text-xs text-elaris-cream/50">
              Catalogue de produits
            </p>
          </a>
          <a
            href="/admin/agents"
            className="rounded border border-elaris-gold/20 p-4 transition-colors hover:border-elaris-gold/40"
          >
            <p className="text-sm text-elaris-gold">Agents</p>
            <p className="mt-1 text-xs text-elaris-cream/50">
              Gérer les équipes
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
