import { ApiService } from "./api-service"

export interface ReportData {
  totalRevenue: number
  revenueGrowth: number
  totalCustomers: number
  customerGrowth: number
  conversionRate: number
  conversionGrowth: number
  satisfaction: number
  satisfactionGrowth: number
}

export interface PerformanceData {
  month: string
  vendas: number
  tickets: number
  leads: number
}

export interface ConversionData {
  stage: string
  value: number
  color: string
}

export interface AgentPerformance {
  name: string
  vendas: number
  tickets: number
  satisfacao: number
  status: "Ativo" | "Inativo"
}

export class ReportsService extends ApiService {
  async getReportData(period = "30d"): Promise<ReportData> {
    try {
      // TODO: Implementar chamada real da API para dados de relatório
      return await this.request<ReportData>(`${this.config.endpoints.reports}/overview?period=${period}`)
    } catch (error) {
      console.warn("Usando dados mock para relatório geral")
      return this.getMockReportData()
    }
  }

  async getPerformanceData(period = "30d"): Promise<PerformanceData[]> {
    try {
      // TODO: Implementar chamada real da API para dados de performance
      return await this.request<PerformanceData[]>(`${this.config.endpoints.reports}/performance?period=${period}`)
    } catch (error) {
      console.warn("Usando dados mock para performance")
      return this.getMockPerformanceData()
    }
  }

  async getConversionData(period = "30d"): Promise<ConversionData[]> {
    try {
      // TODO: Implementar chamada real da API para funil de conversão
      return await this.request<ConversionData[]>(`${this.config.endpoints.reports}/conversion?period=${period}`)
    } catch (error) {
      console.warn("Usando dados mock para conversão")
      return this.getMockConversionData()
    }
  }

  async getAgentPerformance(period = "30d"): Promise<AgentPerformance[]> {
    try {
      // TODO: Implementar chamada real da API para performance dos agentes
      return await this.request<AgentPerformance[]>(`${this.config.endpoints.reports}/agents?period=${period}`)
    } catch (error) {
      console.warn("Usando dados mock para agentes")
      return this.getMockAgentPerformance()
    }
  }

  private getMockReportData(): ReportData {
    return {
      totalRevenue: 125000,
      revenueGrowth: 12.5,
      totalCustomers: 1250,
      customerGrowth: 8.3,
      conversionRate: 3.5,
      conversionGrowth: -0.2,
      satisfaction: 4.7,
      satisfactionGrowth: 0.1,
    }
  }

  private getMockPerformanceData(): PerformanceData[] {
    return [
      { month: "Jan", vendas: 45, tickets: 23, leads: 67 },
      { month: "Fev", vendas: 52, tickets: 19, leads: 78 },
      { month: "Mar", vendas: 48, tickets: 31, leads: 65 },
      { month: "Abr", vendas: 61, tickets: 25, leads: 89 },
      { month: "Mai", vendas: 55, tickets: 18, leads: 92 },
      { month: "Jun", vendas: 67, tickets: 22, leads: 85 },
    ]
  }

  private getMockConversionData(): ConversionData[] {
    return [
      { stage: "Visitantes", value: 1000, color: "#e5e7eb" },
      { stage: "Leads", value: 300, color: "#a78bfa" },
      { stage: "Qualificados", value: 150, color: "#8b5cf6" },
      { stage: "Propostas", value: 75, color: "#7c3aed" },
      { stage: "Vendas", value: 35, color: "#6d28d9" },
    ]
  }

  private getMockAgentPerformance(): AgentPerformance[] {
    return [
      { name: "Ana Silva", vendas: 23, tickets: 45, satisfacao: 4.8, status: "Ativo" },
      { name: "Carlos Santos", vendas: 19, tickets: 38, satisfacao: 4.6, status: "Ativo" },
      { name: "Maria Oliveira", vendas: 31, tickets: 52, satisfacao: 4.9, status: "Ativo" },
      { name: "João Costa", vendas: 15, tickets: 29, satisfacao: 4.4, status: "Inativo" },
    ]
  }
}
