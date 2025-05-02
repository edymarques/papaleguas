import { apiRequest } from "@/lib/queryClient";
import { 
  TimelineEntry, 
  InsertTimelineEntry, 
  UpdateTimelineEntry 
} from "@shared/schema";

// Functions to interact with the timeline API
export const timelineClient = {
  // Get all timeline entries
  getAll: async (): Promise<TimelineEntry[]> => {
    const response = await apiRequest("GET", "/api/timeline", undefined);
    return response.json();
  },
  
  // Get a single timeline entry by ID
  getById: async (id: number): Promise<TimelineEntry> => {
    const response = await apiRequest("GET", `/api/timeline/${id}`, undefined);
    return response.json();
  },
  
  // Create a new timeline entry
  create: async (data: InsertTimelineEntry): Promise<TimelineEntry> => {
    const response = await apiRequest("POST", "/api/timeline", data);
    return response.json();
  },
  
  // Update an existing timeline entry
  update: async (id: number, data: Partial<UpdateTimelineEntry>): Promise<TimelineEntry> => {
    const response = await apiRequest("PUT", `/api/timeline/${id}`, data);
    return response.json();
  },
  
  // Delete a timeline entry
  delete: async (id: number): Promise<void> => {
    await apiRequest("DELETE", `/api/timeline/${id}`, undefined);
  }
};
