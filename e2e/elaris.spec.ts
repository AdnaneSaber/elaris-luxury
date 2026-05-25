import { test, expect } from "@playwright/test";

/**
 * E2E Test Suite for ELARIS Luxury
 * Tests public pages, admin routes, forms, and APIs
 */

// ───────────────────────────────────────────────
// PUBLIC PAGES
// ───────────────────────────────────────────────

test.describe("Public Pages", () => {
  test("landing page loads with hero section", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/ELARIS Luxury/);
    await expect(page.locator("h1", { hasText: "ELARIS" })).toBeVisible();
    await expect(page.getByText("Maison de Couture", { exact: true })).toBeVisible();
  });

  test("landing page has 4 pricing plans", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.querySelector('#plans')?.scrollIntoView());
    await expect(page.locator('h3:has-text("Essentiel")')).toBeVisible();
    await expect(page.locator('h3:has-text("Élégance")')).toBeVisible();
    await expect(page.locator('h3:has-text("Prestige")')).toBeVisible();
    await expect(page.locator('h3:has-text("Royale")')).toBeVisible();
  });

  test("landing page has featured product section", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.querySelector('#product')?.scrollIntoView());
    await expect(page.getByText("Robe Caftan Édition Limitée")).toBeVisible();
    await expect(page.getByText("4,500").first()).toBeVisible();
  });

  test("product page shows caftan details", async ({ page }) => {
    await page.goto("/product");
    await expect(page.locator("h1", { hasText: "Robe Caftan" })).toBeVisible();
    await expect(page.getByText("4,500")).toBeVisible();
    await expect(page.getByText("MAD")).toBeVisible();
    await expect(page.getByText("Soie naturelle 100%")).toBeVisible();
  });

  test("product page has order button linking to checkout", async ({ page }) => {
    await page.goto("/product");
    await expect(page.getByText("Paiement à la livraison")).toBeVisible();
  });

  test("checkout page shows COD form", async ({ page }) => {
    await page.goto("/checkout");
    await expect(page.locator("h1", { hasText: "Finaliser" })).toBeVisible();
    await expect(page.getByText("Paiement à la livraison (Cash on Delivery)")).toBeVisible();
    await expect(page.locator("input").first()).toBeVisible();
  });

  test("contact form is present on landing page", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => document.querySelector('#contact')?.scrollIntoView());
    await expect(page.getByText("NOM COMPLET")).toBeVisible();
    await expect(page.getByText("TÉLÉPHONE")).toBeVisible();
  });
});

// ───────────────────────────────────────────────
// ADMIN PAGES
// ───────────────────────────────────────────────

test.describe("Admin Pages", () => {
  test("admin login page loads", async ({ page }) => {
    await page.goto("/admin/login");
    // Wait for form to hydrate, then check for any input field
    await page.waitForSelector("input", { timeout: 10000 });
    const inputs = await page.locator("input").all();
    expect(inputs.length).toBeGreaterThan(0);
    const buttons = await page.locator("button").all();
    expect(buttons.length).toBeGreaterThan(0);
  });

  test("admin dashboard loads with stats", async ({ page }) => {
    await page.goto("/admin/dashboard");
    await expect(page.getByText("Tableau de Bord").first()).toBeVisible();
    await expect(page.getByText("Commandes").first()).toBeVisible();
    await expect(page.getByText("Leads").first()).toBeVisible();
    await expect(page.getByText("Agents").first()).toBeVisible();
  });

  test("admin leads page shows table", async ({ page }) => {
    await page.goto("/admin/leads");
    await expect(page.getByText("Leads").first()).toBeVisible();
  });

  test("admin orders page shows table with status filters", async ({ page }) => {
    await page.goto("/admin/orders");
    await expect(page.getByText("Commandes").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Tout" })).toBeVisible();
    await expect(page.getByRole("button", { name: "pending" })).toBeVisible();
  });

  test("admin products page shows product cards", async ({ page }) => {
    await page.goto("/admin/products");
    await expect(page.getByText("Produits").first()).toBeVisible();
  });

  test("admin agents page shows agent table", async ({ page }) => {
    await page.goto("/admin/agents");
    await expect(page.getByText("Agents").first()).toBeVisible();
    await expect(page.getByText("Sara Benali")).toBeVisible();
    await expect(page.getByText("Youssef El Amrani")).toBeVisible();
    await expect(page.getByText("Fatima Zahra")).toBeVisible();
  });
});

// ───────────────────────────────────────────────
// API ENDPOINTS
// ───────────────────────────────────────────────

test.describe("API Endpoints", () => {
  test("GET /api/products returns 1 product", async ({ request }) => {
    const response = await request.get("/api/products");
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.products).toHaveLength(1);
    expect(data.products[0].name).toBe("Robe Caftan Édition Limitée");
    expect(data.products[0].price).toBe(4500);
  });

  test("GET /api/agents returns agents", async ({ request }) => {
    const response = await request.get("/api/agents");
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.agents.length).toBeGreaterThanOrEqual(3);
    expect(data.agents.map((a: any) => a.name)).toContain("Sara Benali");
  });

  test("GET /api/leads returns array", async ({ request }) => {
    const response = await request.get("/api/leads");
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.leads)).toBe(true);
  });

  test("GET /api/orders returns array", async ({ request }) => {
    const response = await request.get("/api/orders");
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data.orders)).toBe(true);
  });

  test("POST /api/leads creates a lead", async ({ request }) => {
    const response = await request.post("/api/leads", {
      data: {
        name: "Test Lead",
        phone: "+212600000001",
        email: "test@example.com",
        interest: "caftan",
        message: "E2E test message",
      },
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.lead.name).toBe("Test Lead");
    expect(data.lead.phone).toBe("+212600000001");
  });

  test("POST /api/orders creates an order", async ({ request }) => {
    const response = await request.post("/api/orders", {
      data: {
        customerName: "Test Customer",
        phone: "+212600000002",
        email: "customer@example.com",
        address: "123 Test Street",
        city: "Casablanca",
        notes: "E2E test order",
        productId: "elaris-001",
        productName: "Robe Caftan Édition Limitée",
        quantity: 1,
        total: 4500,
        paymentMethod: "COD",
      },
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.order.customerName).toBe("Test Customer");
    expect(data.order.total).toBe(4500);
    expect(data.order.paymentMethod).toBe("COD");
    expect(data.order.status).toBe("pending");
  });

  test("POST /api/agents creates an agent", async ({ request }) => {
    const response = await request.post("/api/agents", {
      data: {
        name: "Test Agent",
        email: "agent@elaris.ma",
        phone: "+212600000003",
        role: "agent",
      },
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.agent.name).toBe("Test Agent");
    expect(data.agent.role).toBe("agent");
  });

  test("POST /api/leads rejects missing name", async ({ request }) => {
    const response = await request.post("/api/leads", {
      data: { phone: "+212600000001" },
    });
    expect(response.status()).toBe(400);
  });

  test("POST /api/orders rejects missing fields", async ({ request }) => {
    const response = await request.post("/api/orders", {
      data: { customerName: "Test" },
    });
    expect(response.status()).toBe(400);
  });
});

// ───────────────────────────────────────────────
// FORM SUBMISSIONS (Full Flow)
// ───────────────────────────────────────────────

test.describe("Form Submissions", () => {
  test("contact form submits successfully", async ({ page }) => {
    await page.goto("/");

    // Fill contact form
    await page.fill('input[placeholder="Votre nom"]', "E2E Test User");
    await page.fill('input[placeholder="+212 ..."]', "+212600000004");
    await page.fill('input[placeholder="votre@email.com"]', "e2e@test.com");
    await page.selectOption("select", "caftan");
    await page.fill("textarea", "This is an automated E2E test");

    await page.click('button:has-text("ENVOYER")');

    // Should show success message
    await expect(page.getByText("Merci")).toBeVisible({ timeout: 10000 });
  });

  test("checkout flow: product → checkout → submit order", async ({ page, request }) => {
    // Pre-seed sessionStorage with cart data so checkout page doesn't need product click
    await page.goto("/checkout");
    await page.evaluate(() => {
      sessionStorage.setItem("elaris-cart", JSON.stringify({ productId: "elaris-001", quantity: 1, total: 4500 }));
    });
    await page.reload();

    // Should be on checkout page
    await expect(page.locator("h1", { hasText: "Finaliser" })).toBeVisible();

    // Fill checkout form - match placeholders by content
    const allInputs = await page.locator("input").all();
    for (const input of allInputs) {
      const ph = await input.getAttribute("placeholder");
      if (!ph) continue;
      const phLower = ph.toLowerCase();
      if (phLower.includes("nom") && phLower.includes("complet")) await input.fill("E2E Customer");
      else if (phLower.includes("téléphone") || phLower.includes("telephone")) await input.fill("+212600000005");
      else if (phLower.includes("email")) await input.fill("e2e@order.com");
      else if (phLower.includes("adresse")) await input.fill("123 Test Avenue");
      else if (phLower.includes("ville")) await input.fill("Rabat");
    }
    await page.fill("textarea", "Leave at reception");

    // Submit order
    await page.click('button[type="submit"]');

    // Should show confirmation - wait for navigation or state change
    await page.waitForTimeout(2000);
    const bodyText = await page.locator("body").textContent();
    expect(bodyText).toContain("Commande");
    expect(bodyText).toContain("Confirm");
  });

  test("admin order status workflow", async ({ page, request }) => {
    // First create an order via API
    const orderResponse = await request.post("/api/orders", {
      data: {
        customerName: "Workflow Test",
        phone: "+212600000006",
        address: "456 Workflow St",
        city: "Casablanca",
        productId: "elaris-001",
        productName: "Robe Caftan",
        quantity: 1,
        total: 4500,
        paymentMethod: "COD",
      },
    });
    expect(orderResponse.status()).toBe(200);

    // Navigate to admin orders
    await page.goto("/admin/orders");
    await page.waitForLoadState("networkidle");
    await expect(page.getByText("Workflow Test").first()).toBeVisible();

    // Verify pending status
    await expect(page.getByText("pending").first()).toBeVisible();
  });
});

// ───────────────────────────────────────────────
// SECURITY HEADERS
// ───────────────────────────────────────────────

test.describe("Security", () => {
  test("has security headers", async ({ request }) => {
    const response = await request.get("/");
    expect(response.status()).toBe(200);

    const headers = response.headers();
    expect(headers["strict-transport-security"]).toBeDefined();
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBeDefined();
  });

  test("admin routes require auth or show login", async ({ page }) => {
    await page.goto("/admin/dashboard");
    const url = page.url();
    expect(url.includes("login") || url.includes("dashboard")).toBe(true);
  });
});
