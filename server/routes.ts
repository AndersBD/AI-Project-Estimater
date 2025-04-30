import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertProjectSchema } from "@shared/schema";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api

  // Get project by ID
  app.get("/api/projects/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await storage.getProject(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.json(project);
  });

  // Get all projects
  app.get("/api/projects", async (req, res) => {
    const projects = await storage.getAllProjects();
    return res.json(projects);
  });

  // Create a new project
  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      return res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Update a project
  app.put("/api/projects/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const updated = await storage.updateProject(id, validatedData);
      if (!updated) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      return res.status(500).json({ message: "Failed to update project" });
    }
  });

  // Delete a project
  app.delete("/api/projects/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const success = await storage.deleteProject(id);
    if (!success) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(204).end();
  });

  // Generate project plan using OpenAI
  app.post("/api/generate/plan", async (req, res) => {
    try {
      const { projectInfo } = req.body;
      
      if (!projectInfo) {
        return res.status(400).json({ message: "Project information is required" });
      }

      // Generate project plan with OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an expert software development planner. Generate a detailed project plan with timeline, features, and technical requirements. Respond in JSON format with clean structure."
          },
          {
            role: "user",
            content: `Generate a comprehensive project plan for a software development project with the following details: ${JSON.stringify(projectInfo)}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const generatedPlan = JSON.parse(response.choices[0].message.content || "{}");
      return res.json(generatedPlan);
    } catch (error) {
      console.error("OpenAI API error:", error);
      return res.status(500).json({ 
        message: "Failed to generate project plan",
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Generate project timeline
  app.post("/api/generate/timeline", async (req, res) => {
    try {
      const { projectInfo, features } = req.body;
      
      if (!projectInfo || !features) {
        return res.status(400).json({ message: "Project information and features are required" });
      }

      // Generate timeline with OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an expert software project manager. Generate a detailed timeline for the project with specific milestones, durations, and tasks. Respond in JSON format."
          },
          {
            role: "user",
            content: `Generate a timeline for a software project with the following details: Project: ${JSON.stringify(projectInfo)}, Selected Features: ${JSON.stringify(features)}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const generatedTimeline = JSON.parse(response.choices[0].message.content || "{}");
      return res.json(generatedTimeline);
    } catch (error) {
      console.error("OpenAI API error:", error);
      return res.status(500).json({ 
        message: "Failed to generate timeline",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  // Generate feature suggestions
  app.post("/api/generate/features", async (req, res) => {
    try {
      const { projectInfo } = req.body;
      
      if (!projectInfo) {
        return res.status(400).json({ message: "Project information is required" });
      }

      // Generate feature suggestions with OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an expert software architect. Suggest relevant features for the software project based on the project requirements. Each feature should have a name, description, and category. Respond in JSON format."
          },
          {
            role: "user",
            content: `Suggest features for a software project with the following details: ${JSON.stringify(projectInfo)}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const generatedFeatures = JSON.parse(response.choices[0].message.content || "{}");
      return res.json(generatedFeatures);
    } catch (error) {
      console.error("OpenAI API error:", error);
      return res.status(500).json({ 
        message: "Failed to suggest features",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  
  // Generate tech stack suggestions
  app.post("/api/generate/tech-stack", async (req, res) => {
    try {
      const { projectInfo, features } = req.body;
      
      if (!projectInfo || !features) {
        return res.status(400).json({ message: "Project information and features are required" });
      }

      // Generate tech stack suggestions with OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          {
            role: "system",
            content: "You are an expert software architect. Suggest a suitable technology stack for the project based on the requirements and selected features. Each tech item should have a name, category, and brief description. Respond in JSON format."
          },
          {
            role: "user",
            content: `Suggest a technology stack for a software project with the following details: Project: ${JSON.stringify(projectInfo)}, Selected Features: ${JSON.stringify(features)}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const generatedTechStack = JSON.parse(response.choices[0].message.content || "{}");
      return res.json(generatedTechStack);
    } catch (error) {
      console.error("OpenAI API error:", error);
      return res.status(500).json({ 
        message: "Failed to suggest tech stack",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
