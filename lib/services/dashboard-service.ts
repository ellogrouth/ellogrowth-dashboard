import { BaseService } from "./base-service"
import { ApiService } from "./api-service"
import type { Metric, TicketData, SalesData } from "../types"

export interface IDashboardService {
  getMetrics(): Promise<Metric[]>
  getTicketData(): Promise<TicketData>
  getSalesData(): Promise<SalesData[]>
  getSynchronizedData(): Promise<{ metrics: Metric[]; ticketData: TicketData }>
}

export class DashboardService extends BaseService<Metric> implements IDashboardService {
  protected endpoint = "/api/dashboard"
  private apiService: ApiService

  constructor() {
    super()
    this.apiService = new ApiService()
  }

  async getAll(): Promise<Metric[]> {
    return this.request<Metric[]>("/metrics")
  }

  async getById(id: string): Promise<Metric> {
    return this.request<Metric>(`/metrics/${id}`)
  }

  async create(data: Partial<Metric>): Promise<Metric> {
    return this.request<Metric>("/metrics", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async update(id: string, data: Partial<Metric>): Promise<Metric> {
    return this.request<Metric>(`/metrics/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async delete(id: string): Promise<void> {
    await this.request(`/metrics/${id}`, { method: "DELETE" })
  }

  async getMetrics(): Promise<Metric[]> {
    return await this.apiService.getMetrics()
  }

  async getTicketData(): Promise<TicketData> {
    return await this.apiService.getTicketData()
  }

  async getSalesData(): Promise<SalesData[]> {
    return await this.apiService.getSalesData()
  }

  async getSynchronizedData(): Promise<{ metrics: Metric[]; ticketData: TicketData }> {
    const ticketData = await this.getTicketData()

    const metrics: Metric[] = [
      {
        id: "1",
        title: "Vendas Realizadas",
        value: ticketData.ticketTypes?.find((t) => t.id === "sales")?.count || 0,
        color: "green",
        progress: 65,
      },
      {
        id: "2",
        title: "Em Andamento",
        value: ticketData.ticketTypes?.find((t) => t.id === "progress")?.count || 0,
        color: "purple",
        progress: 60,
      },
      {
        id: "3",
        title: "Tickets - Suporte",
        value: ticketData.ticketTypes?.find((t) => t.id === "support")?.count || 0,
        color: "orange",
        progress: 80,
      },
      {
        id: "4",
        title: "Pararam De Responder",
        value: ticketData.ticketTypes?.find((t) => t.id === "noresponse")?.count || 0,
        color: "red",
        progress: 40,
      },
    ]

    return { metrics, ticketData }
  }
}
