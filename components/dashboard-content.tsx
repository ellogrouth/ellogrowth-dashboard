"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MetricCard } from "@/components/metric-card"
import { TicketsChart } from "@/components/tickets-chart"
import { SalesChart } from "@/components/sales-chart"
import { useDashboard } from "@/lib/hooks/use-dashboard"
import { useChats } from "@/lib/hooks/use-chats"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardContent() {
  const { metrics, ticketData, salesData, loading: dashboardLoading } = useDashboard()
  const { chats, loading: chatsLoading } = useChats()

  if (dashboardLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Resumo - Relatórios</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Resumo - Relatórios</h1>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.id}
              title={metric.title}
              value={metric.value.toString()}
              color={`bg-${metric.color}-500`}
              progress={metric.progress}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chats em Andamento */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Chats em Andamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {chatsLoading
              ? [...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))
              : chats.map((chat) => (
                  <div key={chat.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {chat.customerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{chat.customerName}</span>
                          <Badge
                            className={`text-white text-xs px-2 py-1 ${
                              chat.status === "support"
                                ? "bg-blue-500"
                                : chat.status === "sales"
                                  ? "bg-green-500"
                                  : "bg-purple-500"
                            }`}
                          >
                            {chat.status === "support" ? "Suporte" : chat.status === "sales" ? "Venda" : "Progresso"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">{chat.timestamp}</span>
                  </div>
                ))}
          </CardContent>
        </Card>

        {/* Tickets Chart */}
        <TicketsChart data={ticketData} />
      </div>

      {/* Sales Chart */}
      <SalesChart data={salesData} />
    </div>
  )
}
