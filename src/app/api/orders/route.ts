import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
  productId: string;
  productName: string;
  quantity: number;
  total: number;
  currency: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  assignedAgent: string | null;
  createdAt: string;
}

const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");
const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

function ensureDataDir() {
  const dir = path.dirname(ORDERS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
}

function readOrders(): Order[] {
  ensureDataDir();
  return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf-8"));
}

function writeOrders(orders: Order[]) {
  ensureDataDir();
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

function sanitize(str: string): string {
  return str.replace(/[<>"']/g, "").trim();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      phone,
      email,
      address,
      city,
      notes,
      productId,
      productName,
      quantity,
      total,
      paymentMethod,
    } = body;

    // Validation
    if (!customerName || !phone || !address || !city) {
      return NextResponse.json(
        { error: "Nom, téléphone, adresse et ville sont requis" },
        { status: 400 }
      );
    }

    if (!/^[+]?[\d\s-]{8,}$/.test(phone)) {
      return NextResponse.json(
        { error: "Numéro de téléphone invalide" },
        { status: 400 }
      );
    }

    const orders = readOrders();
    const newOrder: Order = {
      id: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      customerName: sanitize(customerName),
      phone: sanitize(phone),
      email: email ? sanitize(email) : "",
      address: sanitize(address),
      city: sanitize(city),
      notes: notes ? sanitize(notes) : "",
      productId: productId || "elaris-001",
      productName: productName || "Robe Caftan Édition Limitée",
      quantity: Number(quantity) || 1,
      total: Number(total) || 4500,
      currency: "MAD",
      status: "pending",
      paymentMethod: paymentMethod || "COD",
      assignedAgent: null,
      createdAt: new Date().toISOString(),
    };

    orders.unshift(newOrder);
    writeOrders(orders);

    // Also create a lead from the order for CRM
    try {
      const leads = JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
      leads.unshift({
        id: `lead_${Date.now()}`,
        name: newOrder.customerName,
        phone: newOrder.phone,
        email: newOrder.email,
        interest: "commande",
        message: `Commande ${newOrder.id} — ${newOrder.productName} — ${newOrder.total} MAD`,
        status: "new",
        createdAt: newOrder.createdAt,
      });
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    } catch (_e) {
      // non-critical
    }

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      { error: "Failed to save order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const orders = readOrders();
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read orders" },
      { status: 500 }
    );
  }
}
