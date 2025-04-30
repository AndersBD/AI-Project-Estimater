import { 
  type Project, 
  type InsertProject, 
  type User, 
  type InsertUser,
  projects
} from "@shared/schema";

export interface IStorage {
  // Project methods
  createProject(project: InsertProject): Promise<Project>;
  getProject(id: number): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  updateProject(id: number, project: InsertProject): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private userCurrentId: number;
  private projectCurrentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.userCurrentId = 1;
    this.projectCurrentId = 1;
  }

  // Project methods
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectCurrentId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async updateProject(id: number, project: InsertProject): Promise<Project | undefined> {
    if (!this.projects.has(id)) {
      return undefined;
    }
    
    const updatedProject: Project = { ...project, id };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
