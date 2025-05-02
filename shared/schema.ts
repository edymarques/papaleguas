import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Timeline entries for company history
export const timelineEntries = pgTable("timeline_entries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  year: text("year").notNull(), // e.g., "2005", "2010", etc.
  imageUrl: text("image_url"), // URL for the image
  order: integer("order").notNull(), // Used for ordering the timeline entries
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTimelineEntrySchema = createInsertSchema(timelineEntries).omit({
  id: true,
  createdAt: true,
});

export const updateTimelineEntrySchema = createInsertSchema(timelineEntries).omit({
  createdAt: true,
});

export type InsertTimelineEntry = z.infer<typeof insertTimelineEntrySchema>;
export type UpdateTimelineEntry = z.infer<typeof updateTimelineEntrySchema>;
export type TimelineEntry = typeof timelineEntries.$inferSelect;

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
