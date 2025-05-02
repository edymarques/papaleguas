import { 
  users, type User, type InsertUser,
  timelineEntries, type TimelineEntry, type InsertTimelineEntry, type UpdateTimelineEntry,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission
} from "@shared/schema";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Timeline entries
  getAllTimelineEntries(): Promise<TimelineEntry[]>;
  getTimelineEntry(id: number): Promise<TimelineEntry | undefined>;
  createTimelineEntry(entry: InsertTimelineEntry): Promise<TimelineEntry>;
  updateTimelineEntry(id: number, entry: Partial<UpdateTimelineEntry>): Promise<TimelineEntry | undefined>;
  deleteTimelineEntry(id: number): Promise<boolean>;
  
  // Contact submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private timelineEntries: Map<number, TimelineEntry>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private userCurrentId: number;
  private timelineCurrentId: number;
  private contactCurrentId: number;

  constructor() {
    this.users = new Map();
    this.timelineEntries = new Map();
    this.contactSubmissions = new Map();
    this.userCurrentId = 1;
    this.timelineCurrentId = 1;
    this.contactCurrentId = 1;
    
    // Add default admin user
    this.createUser({
      username: "admin",
      password: "admin123", // In a real app, this would be hashed
    });
    
    // Add initial timeline entries
    this.createTimelineEntry({
      title: "O Início",
      description: "A Papaléguas Mudanças começou com apenas um caminhão e três funcionários. Com dedicação e comprometimento, rapidamente conquistamos a confiança de nossos primeiros clientes.",
      year: "2005",
      imageUrl: "https://images.unsplash.com/photo-1635350736475-c8cef4b21906?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      order: 1,
    });
    
    this.createTimelineEntry({
      title: "Expansão",
      description: "Após 5 anos de sucesso, expandimos nossa frota para 5 caminhões e contratamos mais profissionais qualificados. Começamos a atender cidades vizinhas e ampliamos nossos serviços.",
      year: "2010",
      imageUrl: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      order: 2,
    });
    
    this.createTimelineEntry({
      title: "Modernização",
      description: "Investimos em tecnologia e inovação, implementando um sistema de rastreamento de veículos e um software de gestão de mudanças para oferecer maior transparência e eficiência.",
      year: "2015",
      imageUrl: "https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      order: 3,
    });
    
    this.createTimelineEntry({
      title: "Reconhecimento",
      description: "Fomos reconhecidos como uma das melhores empresas de mudanças da região, recebendo prêmios de excelência em serviço e satisfação do cliente.",
      year: "2020",
      imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      order: 4,
    });
    
    this.createTimelineEntry({
      title: "Referência no Mercado",
      description: "Atualmente, contamos com uma frota moderna, equipe especializada e processos otimizados para oferecer o melhor serviço de mudanças do mercado.",
      year: "Hoje",
      imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      order: 5,
    });
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

  // Timeline methods
  async getAllTimelineEntries(): Promise<TimelineEntry[]> {
    return Array.from(this.timelineEntries.values())
      .sort((a, b) => a.order - b.order);
  }

  async getTimelineEntry(id: number): Promise<TimelineEntry | undefined> {
    return this.timelineEntries.get(id);
  }

  async createTimelineEntry(entry: InsertTimelineEntry): Promise<TimelineEntry> {
    const id = this.timelineCurrentId++;
    const now = new Date();
    const timelineEntry: TimelineEntry = { 
      ...entry, 
      id, 
      createdAt: now,
      imageUrl: entry.imageUrl || null // Ensure imageUrl is string or null, not undefined
    };
    this.timelineEntries.set(id, timelineEntry);
    return timelineEntry;
  }

  async updateTimelineEntry(id: number, update: Partial<UpdateTimelineEntry>): Promise<TimelineEntry | undefined> {
    const entry = this.timelineEntries.get(id);
    if (!entry) return undefined;
    
    const updatedEntry: TimelineEntry = { 
      ...entry, 
      ...update 
    };
    this.timelineEntries.set(id, updatedEntry);
    return updatedEntry;
  }

  async deleteTimelineEntry(id: number): Promise<boolean> {
    return this.timelineEntries.delete(id);
  }

  // Contact submissions methods
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactCurrentId++;
    const now = new Date();
    const contactSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      createdAt: now 
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const storage = new MemStorage();
