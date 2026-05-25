"use client";

import { useEffect, useState } from "react";

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "agent" | "supervisor";
  assignedLeads: number;
  assignedOrders: number;
  status: "active" | "inactive";
  joinedAt: string;
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    phone: "",
    role: "agent" as Agent["role"],
  });

  useEffect(() => {
    fetch("/api/agents")
      .then((res) => res.json())
      .then((data) => {
        setAgents(data.agents || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addAgent = async () => {
    const res = await fetch("/api/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newAgent, id: crypto.randomUUID() }),
    });
    if (res.ok) {
      const created = await res.json();
      setAgents((prev) => [...prev, created.agent]);
      setShowForm(false);
      setNewAgent({ name: "", email: "", phone: "", role: "agent" });
    }
  };

  const toggleStatus = (id: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === "active" ? "inactive" : "active" } : a
      )
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl text-elaris-cream">Agents & Workspaces</h1>
          <p className="mt-2 text-elaris-cream/60">{agents.length} agents actifs</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded border border-elaris-gold/40 px-5 py-2 text-sm tracking-wider text-elaris-gold transition-all hover:bg-elaris-gold hover:text-elaris-black"
        >
          + Ajouter Agent
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded border border-elaris-gold/20 bg-elaris-black-light p-6">
          <h3 className="mb-4 font-playfair text-lg text-elaris-cream">Nouvel Agent</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <input
              placeholder="Nom complet"
              value={newAgent.name}
              onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
              className="rounded border border-elaris-gold/20 bg-elaris-black px-4 py-2 text-elaris-cream placeholder:text-elaris-cream/40 focus:border-elaris-gold focus:outline-none"
            />
            <input
              placeholder="Email"
              type="email"
              value={newAgent.email}
              onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
              className="rounded border border-elaris-gold/20 bg-elaris-black px-4 py-2 text-elaris-cream placeholder:text-elaris-cream/40 focus:border-elaris-gold focus:outline-none"
            />
            <input
              placeholder="Téléphone"
              value={newAgent.phone}
              onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
              className="rounded border border-elaris-gold/20 bg-elaris-black px-4 py-2 text-elaris-cream placeholder:text-elaris-cream/40 focus:border-elaris-gold focus:outline-none"
            />
            <select
              value={newAgent.role}
              onChange={(e) => setNewAgent({ ...newAgent, role: e.target.value as Agent["role"] })}
              className="rounded border border-elaris-gold/20 bg-elaris-black px-4 py-2 text-elaris-cream focus:border-elaris-gold focus:outline-none"
            >
              <option value="agent">Agent</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={addAgent}
              className="rounded bg-elaris-gold px-6 py-2 text-sm text-elaris-black transition-opacity hover:opacity-80"
            >
              Enregistrer
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="rounded border border-elaris-gold/30 px-6 py-2 text-sm text-elaris-gold hover:bg-elaris-gold/10"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-elaris-gold/20">
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">AGENT</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">RÔLE</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">LEADS</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">COMMANDES</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">STATUT</th>
              <th className="px-4 py-3 text-left text-xs tracking-wider text-elaris-gold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr
                key={agent.id}
                className="border-b border-elaris-gold/10 transition-colors hover:bg-elaris-gold/5"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-elaris-gold/20 font-playfair text-sm text-elaris-gold">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-elaris-cream">{agent.name}</p>
                      <p className="text-xs text-elaris-cream/50">{agent.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-block rounded px-2 py-1 text-xs ${
                      agent.role === "admin"
                        ? "bg-purple-500/20 text-purple-400"
                        : agent.role === "supervisor"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-elaris-gold/20 text-elaris-gold"
                    }`}
                  >
                    {agent.role}
                  </span>
                </td>
                <td className="px-4 py-4 text-elaris-cream">{agent.assignedLeads}</td>
                <td className="px-4 py-4 text-elaris-cream">{agent.assignedOrders}</td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-block rounded px-2 py-1 text-xs ${
                      agent.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {agent.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => toggleStatus(agent.id)}
                    className="rounded border border-elaris-gold/30 px-3 py-1 text-xs text-elaris-gold transition-colors hover:bg-elaris-gold/20"
                  >
                    {agent.status === "active" ? "Désactiver" : "Activer"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
