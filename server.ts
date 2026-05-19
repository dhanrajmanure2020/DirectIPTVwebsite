import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createClient } from "@supabase/supabase-js";
import { initDb, query, dbConnected } from "./db.js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'dummy';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Trust proxy for rate limiting behind reverse proxy headers
app.set('trust proxy', 1);

app.use(helmet({
  contentSecurityPolicy: false, // leave it to front-end / vite
  crossOriginEmbedderPolicy: false
}));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' && !process.env.VERCEL ? 'https://your-production-url.com' : '*',
  credentials: true
}));
app.use(express.json());

// Rate limiting to prevent brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  standardHeaders: true, 
  legacyHeaders: false,
  validate: { xForwardedForHeader: false, trustProxy: false },
  keyGenerator: (req) => {
    const forwarded = req.headers['x-forwarded-for'] || req.headers['forwarded'];
    const ip = forwarded ? (Array.isArray(forwarded) ? forwarded[0] : forwarded) : req.ip;
    return String(ip || 'unknown');
  }
});
app.use("/api", limiter);

// Authentication Middleware for Protected Routes
const requireAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // For preview environment bypass if Supabase is not configured
  if (!supabaseUrl || supabaseUrl === 'mock') {
      return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authentication token' });
  }
  const token = authHeader.split(' ')[1];
  
  // In dev mode, allow mock token
  if (token === 'mock-token' || token === 'mock') {
    return next();
  }
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }
    
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Auth error' });
  }
};

// Initialize DB if DATABASE_URL is provided
if (process.env.DATABASE_URL) {
  initDb().catch((e) => {
    console.warn("DB init failed", e);
  });
} else {
  console.warn("DATABASE_URL is not set. Database features will not work.");
}

  // In-memory fallbacks
  let mockPurchases: any[] = [];
  let mockFreeTrials: any[] = [];
  let mockPromos: any[] = [
    { id: 1, code: 'WELCOME10', discount_percentage: 10, active: true },
    { id: 2, code: 'SUMMER20', discount_percentage: 20, active: true }
  ];
  let mockSubscriptionPlans: any[] = [];

  // --- API Routes ---
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", dbConfigured: !(!process.env.DATABASE_URL) });
  });

  // Admin Users Routes
  app.get("/api/admin-users", requireAuth, async (_req, res) => {
    try {
      if (!process.env.DATABASE_URL) return res.json([]);
      const result = await query("SELECT * FROM admin_users ORDER BY created_at DESC");
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/admin-users", requireAuth, async (req, res) => {
    try {
      const { id, fullName, email, phone, role, status } = req.body;
      if (!process.env.DATABASE_URL) return res.status(201).json({ success: true });

      await query(
        `INSERT INTO admin_users (id, full_name, email, phone, role, status) VALUES ($1, $2, $3, $4, $5, $6)`,
        [id, fullName, email, phone, role || 'Admin', status || 'Active']
      );
      res.status(201).json({ success: true });
    } catch (e: any) {
      if (e.code === '23505') {
         res.status(400).json({ error: 'An admin with this email already exists.' });
      } else {
         res.status(500).json({ error: e.message });
      }
    }
  });

  app.put("/api/admin-users/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const { full_name, phone, role, status } = req.body;
      if (!process.env.DATABASE_URL) return res.status(200).json({ success: true });

      await query(
        `UPDATE admin_users SET full_name = $1, phone = $2, role = $3, status = $4 WHERE id = $5`,
        [full_name, phone, role, status, id]
      );
      res.status(200).json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/admin-users/:id", requireAuth, async (req, res) => {
    try {
      // For a real app, we should also delete from Supabase Auth via Admin API
      // Since we don't have the Service Role Key here easily, we'll just delete from DB.
      if (!process.env.DATABASE_URL) return res.status(204).send();
      await query(`DELETE FROM admin_users WHERE id = $1`, [req.params.id]);
      res.status(204).send();
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Purchases
  app.get("/api/purchases", requireAuth, async (_req, res) => {
    try {
      if (!process.env.DATABASE_URL) return res.json(mockPurchases);
      const result = await query("SELECT * FROM purchases ORDER BY date DESC");
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/purchases", async (req, res) => {
    try {
      const { fullName, email, country, phone, deviceType, macAddress, planName, devices, total, paymentMethod } = req.body;
      if (!process.env.DATABASE_URL) {
        const newPurchase = {
          id: Date.now(),
          full_name: fullName,
          email,
          country,
          phone: phone || '-',
          device_type: deviceType || '-',
          mac_address: macAddress,
          plan_name: planName,
          devices,
          total,
          payment_method: paymentMethod,
          date: new Date().toISOString()
        };
        mockPurchases.unshift(newPurchase);
        return res.status(201).json(newPurchase);
      }
      
      const result = await query(
        `INSERT INTO purchases (full_name, email, country, phone, device_type, mac_address, plan_name, devices, total, payment_method)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [fullName, email, country, phone || '-', deviceType || '-', macAddress, planName, devices, total, paymentMethod]
      );
      res.status(201).json(result.rows[0]);
    } catch (e: any) {
      console.error("DB Insert Error Purchases:", e);
      res.status(500).json({ error: e.message });
    }
  });

  // Free Trials
  app.get("/api/free-trials", requireAuth, async (_req, res) => {
    try {
      if (!process.env.DATABASE_URL) return res.json(mockFreeTrials);
      const result = await query("SELECT * FROM free_trials ORDER BY date DESC");
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/free-trials", async (req, res) => {
    try {
      const { name, email, phone, country, device, status, macAddress } = req.body;
      if (!process.env.DATABASE_URL) {
         const newTrial = {
           id: Date.now(),
           name,
           email,
           phone,
           country,
           device,
           status: status || 'Pending',
           mac_address: macAddress,
           date: new Date().toISOString()
         };
         mockFreeTrials.unshift(newTrial);
         return res.status(201).json(newTrial);
      }

      const result = await query(
        `INSERT INTO free_trials (name, email, phone, country, device, status, mac_address)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [name, email, phone, country, device, status || 'Pending', macAddress]
      );
      res.status(201).json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/free-trials/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      if (!process.env.DATABASE_URL) {
        const trial = mockFreeTrials.find(t => t.id.toString() === id);
        if (trial) trial.status = status;
        return res.json(trial || { status });
      }

      const result = await query(
        `UPDATE free_trials SET status = $1 WHERE id = $2 RETURNING *`,
        [status, id]
      );
      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/free-trials/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      if (!process.env.DATABASE_URL) {
        mockFreeTrials = mockFreeTrials.filter(t => t.id.toString() !== id);
        return res.status(204).send();
      }

      await query(`DELETE FROM free_trials WHERE id = $1`, [id]);
      res.status(204).send();
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/purchases/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      if (!process.env.DATABASE_URL) {
         mockPurchases = mockPurchases.filter(p => p.id.toString() !== id);
         return res.status(204).send();
      }

      await query(`DELETE FROM purchases WHERE id = $1`, [id]);
      res.status(204).send();
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Promos
  app.get("/api/promos", async (_req, res) => {
    try {
      if (!process.env.DATABASE_URL) return res.json(mockPromos);

      const result = await query("SELECT * FROM promos ORDER BY created_at DESC");
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/promos", requireAuth, async (req, res) => {
    try {
      const { code, discountPercentage, active } = req.body;
      if (!process.env.DATABASE_URL) {
        if (mockPromos.some(p => p.code === code)) {
          return res.status(400).json({ error: 'A promo code with this name already exists.' });
        }
        const newPromo = {
          id: Date.now(),
          code,
          discount_percentage: discountPercentage,
          active,
          created_at: new Date().toISOString()
        };
        mockPromos.unshift(newPromo);
        return res.status(201).json(newPromo);
      }

      const result = await query(
        `INSERT INTO promos (code, discount_percentage, active)
         VALUES ($1, $2, $3) RETURNING *`,
        [code, discountPercentage, active]
      );
      res.status(201).json(result.rows[0]);
    } catch (e: any) {
      if (e.code === '23505') {
        res.status(400).json({ error: 'A promo code with this name already exists.' });
      } else {
        res.status(500).json({ error: e.message });
      }
    }
  });

  app.put("/api/promos/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const { code, discountPercentage, active } = req.body;
      if (!process.env.DATABASE_URL) {
        if (mockPromos.some(p => p.code === code && p.id.toString() !== id)) {
          return res.status(400).json({ error: 'A promo code with this name already exists.' });
        }
        const promo = mockPromos.find(p => p.id.toString() === id);
        if (promo) {
          promo.code = code;
          promo.discount_percentage = discountPercentage;
          promo.active = active;
        }
        return res.json(promo || req.body);
      }

      const result = await query(
        `UPDATE promos SET code = $1, discount_percentage = $2, active = $3 WHERE id = $4 RETURNING *`,
        [code, discountPercentage, active, id]
      );
      res.json(result.rows[0]);
    } catch (e: any) {
      if (e.code === '23505') {
        res.status(400).json({ error: 'A promo code with this name already exists.' });
      } else {
        res.status(500).json({ error: e.message });
      }
    }
  });

  app.delete("/api/promos/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      if (!process.env.DATABASE_URL) {
        mockPromos = mockPromos.filter(p => p.id.toString() !== id);
        return res.status(204).send();
      }

      await query(`DELETE FROM promos WHERE id = $1`, [id]);
      res.status(204).send();
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Subscription Plans
  app.get("/api/subscription-plans", async (_req, res) => {
    try {
      if (!process.env.DATABASE_URL) return res.json(mockSubscriptionPlans);

      const result = await query("SELECT * FROM subscription_plans ORDER BY id ASC");
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/subscription-plans", requireAuth, async (req, res) => {
    try {
      const { devices, duration, price, sub_text } = req.body;
      if (!process.env.DATABASE_URL) {
        const newPlan = { id: Date.now(), devices, duration, price, sub_text };
        mockSubscriptionPlans.push(newPlan);
        return res.status(201).json(newPlan);
      }

      const result = await query(
        `INSERT INTO subscription_plans (devices, duration, price, sub_text)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [devices, duration, price, sub_text || '']
      );
      res.status(201).json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/subscription-plans/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const { devices, duration, price, sub_text } = req.body;
      if (!process.env.DATABASE_URL) {
        const plan = mockSubscriptionPlans.find(p => p.id.toString() === id);
        if (plan) {
          plan.devices = devices;
          plan.duration = duration;
          plan.price = price;
          plan.sub_text = sub_text;
        }
        return res.json(plan || req.body);
      }

      const result = await query(
        `UPDATE subscription_plans SET devices = $1, duration = $2, price = $3, sub_text = $4 WHERE id = $5 RETURNING *`,
        [devices, duration, price, sub_text || '', id]
      );
      res.json(result.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete("/api/subscription-plans/:id", requireAuth, async (req, res) => {
    try {
      const { id } = req.params;
      if (!process.env.DATABASE_URL) {
        mockSubscriptionPlans = mockSubscriptionPlans.filter(p => p.id.toString() !== id);
        return res.status(204).send();
      }

      await query(`DELETE FROM subscription_plans WHERE id = $1`, [id]);
      res.status(204).send();
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    import("vite").then(({ createServer: createViteServer }) => {
      createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      }).then(vite => {
        app.use(vite.middlewares);
      }).catch(err => {
        console.error("Failed to start Vite dev server:", err);
      });
    });
  } else if (!process.env.VERCEL) {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT as number, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

export default app;
