import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

function ensureDataDir() {
  const dir = path.dirname(LEADS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([]));
  }
}

function readLeads(): Lead[] {
  ensureDataDir();
  const data = fs.readFileSync(LEADS_FILE, "utf-8");
  return JSON.parse(data);
}

function writeLeads(leads: Lead[]) {
  ensureDataDir();
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, interest, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const leads = readLeads();
    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      phone,
      email: email || "",
      interest: interest || "",
      message: message || "",
      status: "new",
      createdAt: new Date().toISOString(),
    };

    leads.unshift(newLead);
    writeLeads(leads);

    // Try to notify via WhatsApp through OpenClaw sub instance
    try {
      await notifyViaWhatsApp(newLead);
    } catch (_err) {
      console.error("WhatsApp notification failed:", _err);
    }

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = readLeads();
    return NextResponse.json({ leads });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read leads" },
      { status: 500 }
    );
  }
}

async function notifyViaWhatsApp(lead: Lead) {
  // OpenClaw sub instance configuration
  const SUB_GATEWAY_URL = "http://localhost:18790";
  const ADMIN_PHONE = process.env.ADMIN_WHATSAPP || "+212696879642";

  const message = `🔔 *Nouveau Lead ELARIS Luxury*

👤 *Nom:* ${lead.name}
📞 *Téléphone:* ${lead.phone}
📧 *Email:* ${lead.email || "Non fourni"}
🎯 *Intérêt:* ${lead.interest || "Non spécifié"}
📝 *Message:* ${lead.message || "Aucun"}

⏰ *Date:* ${new Date(lead.createdAt).toLocaleString("fr-FR")}

🌐 Dashboard: https://elaris-luxury.vercel.app/dashboard`;

  // Try to send via OpenClaw sub instance webhook or API
  try {
    const response = await fetch(`${SUB_GATEWAY_URL}/api/v1/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: "whatsapp",
        to: ADMIN_PHONE,
        text: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (_err) {
    // If direct API fails, write to notification queue for cron pickup
    const NOTIF_FILE = path.join(process.cwd(), "data", "notifications.json");
    const notifs = fs.existsSync(NOTIF_FILE)
      ? JSON.parse(fs.readFileSync(NOTIF_FILE, "utf-8"))
      : [];
    notifs.push({
      type: "whatsapp",
      to: ADMIN_PHONE,
      text: message,
      leadId: lead.id,
      createdAt: new Date().toISOString(),
      sent: false,
    });
    fs.writeFileSync(NOTIF_FILE, JSON.stringify(notifs, null, 2));
  }
}
