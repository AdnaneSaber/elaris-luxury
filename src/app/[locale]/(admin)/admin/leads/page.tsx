"use client";

import { useEffect, useState } from "react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data.leads || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = (id: string, status: string) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
  };

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
        <h1 className="font-playfair text-3xl text-elaris-cream">Leads</h1>
        <p className="mt-2 text-elaris-cream/60">{leads.length} demandes reçues</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-elaris-gold/20">
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">NOM</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">TÉLÉPHONE</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">EMAIL</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">INTÉRÊT</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">DATE</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">STATUT</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-elaris-gold/10 transition-colors hover:bg-elaris-gold/5"
              >
                <td className="px-4 py-4 text-elaris-cream">{lead.name}</td>
                <td className="px-4 py-4 text-elaris-cream/80">{lead.phone}</td>
                <td className="px-4 py-4 text-elaris-cream/80">{lead.email || "—"}</td>
                <td className="px-4 py-4 text-elaris-cream/80">{lead.interest || "—"}</td>
                <td className="px-4 py-4 text-sm text-elaris-cream/60">
                  {new Date(lead.createdAt).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-block rounded px-2 py-1 text-xs ${
                      lead.status === "new"
                        ? "bg-elaris-gold/20 text-elaris-gold"
                        : lead.status === "contacted"
                          ? "bg-blue-500/20 text-blue-400"
                          : lead.status === "converted"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(lead.id, "contacted")}
                      className="rounded border border-elaris-gold/30 px-3 py-1 text-xs text-elaris-gold transition-colors hover:bg-elaris-gold/20"
                    >
                      Contacter
                    </button>
                    <button
                      onClick={() => updateStatus(lead.id, "converted")}
                      className="rounded border border-green-500/30 px-3 py-1 text-xs text-green-400 transition-colors hover:bg-green-500/20"
                    >
                      Convertir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
