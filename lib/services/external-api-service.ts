export class ExternalApiService {
  private baseUrl: string
  private apiKey: string

  constructor() {
    // TODO: Configurar URLs e chaves da API externa
    this.baseUrl = process.env.EXTERNAL_API_URL || "https://api.exemplo.com"
    this.apiKey = process.env.API_KEY || ""
  }

  private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      // TODO: Implementar autenticação real com a API externa
      const response = await fetch(`/api/external${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`Erro na chamada da API externa (${endpoint}):`, error)
      throw error
    }
  }

  // TODO: Implementar endpoints específicos para cada tipo de dado
  async getDashboardMetrics(period = "30d") {
    return this.makeRequest(`/dashboard/metrics?period=${period}`)
  }

  async getTicketsData(period = "30d") {
    return this.makeRequest(`/dashboard/tickets?period=${period}`)
  }

  async getSalesData(period = "30d") {
    return this.makeRequest(`/dashboard/sales?period=${period}`)
  }

  async getReportsData(period = "30d") {
    return this.makeRequest(`/reports/overview?period=${period}`)
  }

  async getAgentPerformance(period = "30d") {
    return this.makeRequest(`/reports/agents?period=${period}`)
  }

  async getConversionData(period = "30d") {
    return this.makeRequest(`/reports/conversion?period=${period}`)
  }
}

// Singleton instance
export const externalApiService = new ExternalApiService()
