import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

const AGENTS_FILE = path.join(process.cwd(), "data", "agents.json");

function readAgents(): Agent[] {
  if (!fs.existsSync(AGENTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(AGENTS_FILE, "utf-8"));
}

function writeAgents(agents: Agent[]) {
  fs.writeFileSync(AGENTS_FILE, JSON.stringify(agents, null, 2));
}

export async function GET() {
  try {
    const agents = readAgents();
    return NextResponse.json({ agents });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read agents" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const agents = readAgents();
    const newAgent: Agent = {
      id: body.id || `agent_${Date.now()}`,
      name: body.name || "",
      email: body.email || "",
      phone: body.phone || "",
      role: body.role || "agent",
      assignedLeads: 0,
      assignedOrders: 0,
      status: "active",
      joinedAt: new Date().toISOString(),
    };
    agents.push(newAgent);
    writeAgents(agents);
    return NextResponse.json({ success: true, agent: newAgent });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save agent" }, { status: 500 });
  }
}
