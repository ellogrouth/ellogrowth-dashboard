import type { ApiConfig, Metric, TicketData, SalesData } from "../types"

export class ApiService {
  private config: ApiConfig

  constructor() {
    this.config = {
      baseUrl: "", // Usando route handlers locais
      endpoints: {
        metrics: "/api/dashboard/metrics",
        tickets: "/api/dashboard/tickets",
        sales: "/api/dashboard/sales",
        reports: "/api/reports",
      },
    }
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`

    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        // Não precisa de autenticação aqui - é feita nos route handlers
      },
    }

    try {
      const response = await fetch(url, { ...defaultOptions, ...options })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`Erro na chamada da API: ${endpoint}`, error)
      throw error
    }
  }

  async getMetrics(): Promise<Metric[]> {
    try {
      // Chamar route handler local: /api/dashboard/metrics
      // que fará proxy seguro para API externa
      return await this.request<Metric[]>(this.config.endpoints.metrics)
    } catch (error) {
      // Fallback para dados mock enquanto API não está implementada
      console.warn("Usando dados mock para métricas")
      return this.getMockMetrics()
    }
  }

  async getTicketData(): Promise<TicketData> {
    try {
      // Chamar route handler local: /api/dashboard/tickets
      return await this.request<TicketData>(this.config.endpoints.tickets)
    } catch (error) {
      // Fallback para dados mock
      console.warn("Usando dados mock para tickets")
      return this.getMockTicketData()
    }
  }

  async getSalesData(): Promise<SalesData[]> {
    try {
      // Chamar route handler local: /api/dashboard/sales
      return await this.request<SalesData[]>(this.config.endpoints.sales)
    } catch (error) {
      // Fallback para dados mock
      console.warn("Usando dados mock para vendas")
      return this.getMockSalesData()
    }
  }

  private getMockMetrics(): Metric[] {
    return [
      { id: "1", title: "Vendas Realizadas", value: 35, color: "green", progress: 75 },
      { id: "2", title: "Em Andamento", value: 10, color: "purple", progress: 45 },
      { id: "3", title: "Tickets - Suporte", value: 35, color: "orange", progress: 80 },
      { id: "4", title: "Pararam De Responder", value: 10, color: "red", progress: 30 },
    ]
  }

  private getMockTicketData(): TicketData {
    return {
      support: 45,
      inProgress: 30,
      noResponse: 25,
      ticketTypes: [
        { id: "support", name: "Suporte Técnico", color: "#3b82f6", count: 45 },
        { id: "sales", name: "Vendas", color: "#10b981", count: 20 },
        { id: "progress", name: "Em Andamento", color: "#f59e0b", count: 30 },
        { id: "noresponse", name: "Sem Resposta", color: "#ef4444", count: 25 },
        { id: "billing", name: "Financeiro", color: "#8b5cf6", count: 15 },
      ],
    }
  }

  private getMockSalesData(): SalesData[] {
    return [
      { period: "1", value: 10 },
      { period: "2", value: 15 },
      { period: "3", value: 25 },
      { period: "4", value: 18 },
      { period: "5", value: 22 },
      { period: "6", value: 20 },
      { period: "7", value: 28 },
    ]
  }
}
