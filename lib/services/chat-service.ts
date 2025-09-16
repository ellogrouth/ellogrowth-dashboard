import { BaseService } from "./base-service"
import type { Chat } from "../types"

export interface IChatService {
  getActiveChats(): Promise<Chat[]>
  getChatHistory(chatId: string): Promise<any[]>
  sendMessage(chatId: string, message: string): Promise<void>
}

export class ChatService extends BaseService<Chat> implements IChatService {
  protected endpoint = "/api/chats"

  async getAll(): Promise<Chat[]> {
    return this.request<Chat[]>("/")
  }

  async getById(id: string): Promise<Chat> {
    return this.request<Chat>(`/${id}`)
  }

  async create(data: Partial<Chat>): Promise<Chat> {
    return this.request<Chat>("/", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async update(id: string, data: Partial<Chat>): Promise<Chat> {
    return this.request<Chat>(`/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async delete(id: string): Promise<void> {
    await this.request(`/${id}`, { method: "DELETE" })
  }

  async getActiveChats(): Promise<Chat[]> {
    // Mock data for demonstration
    return [
      {
        id: "1",
        customerName: "Rodrigo Silva",
        status: "support",
        lastMessage: "Same",
        timestamp: "2m",
        avatar: "/male-professional-avatar.jpg",
        agent: "Support Team",
      },
      {
        id: "2",
        customerName: "Joyce Silva",
        status: "sales",
        lastMessage: "Em Progresso",
        timestamp: "5m",
        avatar: "/female-professional-avatar.jpg",
        agent: "Sales Team",
      },
      {
        id: "3",
        customerName: "Joyce Silva",
        status: "sales",
        lastMessage: "Em Progresso",
        timestamp: "5m",
        avatar: "/female-professional-avatar.jpg",
        agent: "Sales Team",
      },
    ]
  }

  async getChatHistory(chatId: string): Promise<any[]> {
    return this.request<any[]>(`/${chatId}/history`)
  }

  async sendMessage(chatId: string, message: string): Promise<void> {
    await this.request(`/${chatId}/messages`, {
      method: "POST",
      body: JSON.stringify({ message }),
    })
  }
}
