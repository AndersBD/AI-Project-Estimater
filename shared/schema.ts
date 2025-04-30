import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Project model to store user's project information
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  features: jsonb("features").notNull(),
  techStack: jsonb("tech_stack").notNull(),
  timeline: jsonb("timeline").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export const featureSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  category: z.string(),
  selected: z.boolean().default(true),
});

export const timelineItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  duration: z.string(),
  order: z.number(),
  tasks: z.array(z.string()),
  color: z.string().optional(),
});

export const techStackItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  icon: z.string(),
  selected: z.boolean().default(false),
});

export const projectSetupSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  description: z.string().min(10, "Project description must be at least 10 characters"),
  type: z.enum(["web", "mobile", "desktop", "backend", "fullstack"]),
  industry: z.string().optional(),
  teamSize: z.number().min(1).default(1),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type Feature = z.infer<typeof featureSchema>;
export type TimelineItem = z.infer<typeof timelineItemSchema>;
export type TechStackItem = z.infer<typeof techStackItemSchema>;
export type ProjectSetup = z.infer<typeof projectSetupSchema>;

// User model for authentication
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
