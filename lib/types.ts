export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "agent" | "user"
}

export interface Chat {
  id: string
  customerName: string
  status: "support" | "sales" | "progress"
  lastMessage: string
  timestamp: string
  avatar?: string
  agent?: string
}

export interface Metric {
  id: string
  title: string
  value: number
  color: "green" | "purple" | "orange" | "red"
  progress?: number
}

export interface TicketType {
  id: string
  name: string
  color: string
  count: number
}

export interface TicketData {
  support: number
  inProgress: number
  noResponse: number
  ticketTypes?: TicketType[]
}

export interface SalesData {
  period: string
  value: number
}

export interface Template {
  id: string
  name: string
  category: string
  content: string
  createdAt: string
}

export interface CRMContact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: "lead" | "customer" | "prospect"
  lastContact: string
}

export interface Agent {
  id: string
  name: string
  email: string
  status: "active" | "inactive"
  specialization: string[]
  performance: number
}

export interface ApiConfig {
  baseUrl: string
  endpoints: {
    metrics: string
    tickets: string
    sales: string
    reports: string
  }
}
