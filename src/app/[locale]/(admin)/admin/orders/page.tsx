"use client";

import { useEffect, useState } from "react";

interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  productName: string;
  quantity: number;
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = (id: string, status: string) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
  };

  const filtered =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status === filter);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-elaris-cream/60">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl text-elaris-cream">Commandes</h1>
          <p className="mt-2 text-elaris-cream/60">{orders.length} commandes totales</p>
        </div>
        <div className="flex gap-2">
          {["all", "pending", "confirmed", "shipped", "delivered"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded border px-3 py-1 text-xs capitalize transition-colors ${
                filter === f
                  ? "border-elaris-gold bg-elaris-gold/20 text-elaris-gold"
                  : "border-elaris-gold/20 text-elaris-cream/60 hover:text-elaris-gold"
              }`}
            >
              {f === "all" ? "Tout" : f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-elaris-gold/20">
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">N°</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">CLIENT</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">TÉLÉPHONE</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">PRODUIT</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">TOTAL</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">DATE</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">STATUT</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr
                key={order.id}
                className="border-b border-elaris-gold/10 transition-colors hover:bg-elaris-gold/5"
              >
                <td className="px-4 py-4 text-sm text-elaris-cream/60">{order.id.slice(-6)}</td>
                <td className="px-4 py-4 text-elaris-cream">{order.customerName}</td>
                <td className="px-4 py-4 text-elaris-cream/80">{order.phone}</td>
                <td className="px-4 py-4 text-elaris-cream/80">{order.productName}</td>
                <td className="px-4 py-4 text-elaris-gold">{order.total.toLocaleString()} MAD</td>
                <td className="px-4 py-4 text-sm text-elaris-cream/60">
                  {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-block rounded px-2 py-1 text-xs ${
                      order.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : order.status === "confirmed"
                          ? "bg-blue-500/20 text-blue-400"
                          : order.status === "shipped"
                            ? "bg-purple-500/20 text-purple-400"
                            : order.status === "delivered"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    {order.status === "pending" && (
                      <button
                        onClick={() => updateStatus(order.id, "confirmed")}
                        className="rounded border border-blue-500/30 px-3 py-1 text-xs text-blue-400 hover:bg-blue-500/20"
                      >
                        Confirmer
                      </button>
                    )}
                    {order.status === "confirmed" && (
                      <button
                        onClick={() => updateStatus(order.id, "shipped")}
                        className="rounded border border-purple-500/30 px-3 py-1 text-xs text-purple-400 hover:bg-purple-500/20"
                      >
                        Expédier
                      </button>
                    )}
                    {order.status === "shipped" && (
                      <button
                        onClick={() => updateStatus(order.id, "delivered")}
                        className="rounded border border-green-500/30 px-3 py-1 text-xs text-green-400 hover:bg-green-500/20"
                      >
                        Livrer
                      </button>
                    )}
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
