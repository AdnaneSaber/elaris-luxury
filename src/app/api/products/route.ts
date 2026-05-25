import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
  details: string[];
}

const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json");

function readProducts(): Product[] {
  if (!fs.existsSync(PRODUCTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf-8"));
}

export async function GET() {
  try {
    const products = readProducts();
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: "Failed to read products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const products = readProducts();
    const newProduct: Product = {
      id: body.id || `prod_${Date.now()}`,
      name: body.name || "",
      description: body.description || "",
      price: Number(body.price) || 0,
      currency: body.currency || "MAD",
      image: body.image || "",
      category: body.category || "",
      stock: Number(body.stock) || 0,
      featured: body.featured || false,
      details: body.details || [],
    };
    products.push(newProduct);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save product" }, { status: 500 });
  }
}
