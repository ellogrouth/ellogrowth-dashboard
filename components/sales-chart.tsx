"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import type { SalesData } from "@/lib/types"

interface SalesChartProps {
  data?: SalesData[]
}

export function SalesChart({ data }: SalesChartProps) {
  const chartData = useMemo(() => {
    return (
      data || [
        { period: "1", value: 5 },
        { period: "2", value: 15 },
        { period: "3", value: 25 },
        { period: "4", value: 18 },
        { period: "5", value: 22 },
        { period: "6", value: 20 },
        { period: "7", value: 25 },
      ]
    )
  }, [data])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">Período {label}</p>
          <p className="text-sm text-gray-600">
            Vendas: <span className="font-semibold text-blue-600">{payload[0].value}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Vendas concluídas (por período)</CardTitle>
        <p className="text-sm text-gray-500">
          {/* TODO: Adicionar indicador de fonte de dados da API */}
          Dados atualizados via API externa
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="period" axisLine={false} tickLine={false} className="text-sm text-gray-500" />
              <YAxis axisLine={false} tickLine={false} className="text-sm text-gray-500" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
