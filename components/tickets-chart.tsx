"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import type { TicketData } from "@/lib/types"

interface TicketsChartProps {
  data?: TicketData | null
}

const TICKET_COLORS = {
  "Suporte Técnico": "#3b82f6", // blue-500
  Vendas: "#10b981", // emerald-500
  "Em Andamento": "#f59e0b", // amber-500
  "Sem Resposta": "#ef4444", // red-500
  Financeiro: "#8b5cf6", // violet-500
} as const

export function TicketsChart({ data }: TicketsChartProps) {
  const chartData = useMemo(() => {
    if (data?.ticketTypes && data.ticketTypes.length > 0) {
      return data.ticketTypes.map((ticket) => ({
        name: ticket.name,
        value: ticket.count,
        color: TICKET_COLORS[ticket.name as keyof typeof TICKET_COLORS] || "#6b7280",
      }))
    }

    return data
      ? [
          { name: "Suporte Técnico", value: data.support, color: TICKET_COLORS["Suporte Técnico"] },
          { name: "Vendas", value: 20, color: TICKET_COLORS["Vendas"] },
          { name: "Em Andamento", value: data.inProgress, color: TICKET_COLORS["Em Andamento"] },
          { name: "Sem Resposta", value: data.noResponse, color: TICKET_COLORS["Sem Resposta"] },
          { name: "Financeiro", value: 15, color: TICKET_COLORS["Financeiro"] },
        ]
      : [
          { name: "Suporte Técnico", value: 45, color: TICKET_COLORS["Suporte Técnico"] },
          { name: "Vendas", value: 20, color: TICKET_COLORS["Vendas"] },
          { name: "Em Andamento", value: 30, color: TICKET_COLORS["Em Andamento"] },
          { name: "Sem Resposta", value: 25, color: TICKET_COLORS["Sem Resposta"] },
          { name: "Financeiro", value: 15, color: TICKET_COLORS["Financeiro"] },
        ]
  }, [data])

  const total = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.value, 0)
  }, [chartData])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">
            Tickets: <span className="font-semibold">{data.value}</span>
          </p>
          <p className="text-sm text-gray-600">
            Percentual: <span className="font-semibold">{((data.value / total) * 100).toFixed(1)}%</span>
          </p>
        </div>
      )
    }
    return null
  }

  console.log("[v0] Chart data with colors:", chartData)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Gráfico Todos os Tickets</CardTitle>
        <p className="text-sm text-gray-500">Distribuição por tipo de ticket registrado</p>
      </CardHeader>
      <CardContent>
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold">{total}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full border border-gray-200"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">{item.value}</span>
                <span className="text-xs text-gray-500 ml-1">({((item.value / total) * 100).toFixed(1)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
