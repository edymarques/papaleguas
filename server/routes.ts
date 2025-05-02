import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { storage } from "./storage";
import { insertTimelineEntrySchema, updateTimelineEntrySchema, insertContactSubmissionSchema } from "@shared/schema";
import { ZodError } from "zod";
import MemoryStore from "memorystore";

declare module "express-session" {
  interface SessionData {
    userId: number;
    isAdmin: boolean;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  const MemoryStoreSession = MemoryStore(session);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "papaleguas-mudancas-secret",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production", maxAge: 3600000 },
      store: new MemoryStoreSession({
        checkPeriod: 86400000 // prune expired entries every 24h
      })
    })
  );

  // Authentication routes
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Set user session
      req.session.userId = user.id;
      req.session.isAdmin = true; // For simplicity, all users are admins in this demo
      
      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/auth/me", (req: Request, res: Response) => {
    if (req.session.userId) {
      return res.status(200).json({ authenticated: true, isAdmin: req.session.isAdmin });
    }
    return res.status(401).json({ authenticated: false });
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie("connect.sid");
      return res.status(200).json({ message: "Logout successful" });
    });
  });

  // Authentication middleware
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  // Timeline entry routes
  app.get("/api/timeline", async (_req: Request, res: Response) => {
    try {
      const entries = await storage.getAllTimelineEntries();
      return res.status(200).json(entries);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch timeline entries" });
    }
  });

  app.get("/api/timeline/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const entry = await storage.getTimelineEntry(id);
      if (!entry) {
        return res.status(404).json({ message: "Timeline entry not found" });
      }

      return res.status(200).json(entry);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch timeline entry" });
    }
  });

  app.post("/api/timeline", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const validatedData = insertTimelineEntrySchema.parse(req.body);
      const newEntry = await storage.createTimelineEntry(validatedData);
      return res.status(201).json(newEntry);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to create timeline entry" });
    }
  });

  app.put("/api/timeline/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const validatedData = updateTimelineEntrySchema.partial().parse(req.body);
      const updatedEntry = await storage.updateTimelineEntry(id, validatedData);
      
      if (!updatedEntry) {
        return res.status(404).json({ message: "Timeline entry not found" });
      }

      return res.status(200).json(updatedEntry);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to update timeline entry" });
    }
  });

  app.delete("/api/timeline/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const result = await storage.deleteTimelineEntry(id);
      if (!result) {
        return res.status(404).json({ message: "Timeline entry not found" });
      }

      return res.status(200).json({ message: "Timeline entry deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete timeline entry" });
    }
  });

  // Contact submission routes
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      return res.status(201).json({ message: "Contact form submitted successfully", id: submission.id });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  app.get("/api/contact", isAuthenticated, async (_req: Request, res: Response) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      return res.status(200).json(submissions);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
