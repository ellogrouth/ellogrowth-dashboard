"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useReports } from "@/lib/hooks/use-reports"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import {
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Target,
  DollarSign,
  Loader2,
} from "lucide-react"

export function ReportsContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedReport, setSelectedReport] = useState("overview")

  const { reportData, performanceData, conversionData, agentPerformance, loading, error } = useReports(selectedPeriod)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Carregando relatórios...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <p>Erro ao carregar relatórios: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Tentar novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Relatórios</h1>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
              <SelectItem value="90d">90 dias</SelectItem>
              <SelectItem value="1y">1 ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
            <Filter className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Filtros</span>
          </Button>
          <Button size="sm" className="flex-1 sm:flex-none">
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Exportar</span>
          </Button>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="flex flex-wrap gap-2 border-b overflow-x-auto">
        {[
          { id: "overview", label: "Visão Geral" },
          { id: "sales", label: "Vendas" },
          { id: "support", label: "Suporte" },
          { id: "agents", label: "Agentes" },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={selectedReport === tab.id ? "default" : "ghost"}
            onClick={() => setSelectedReport(tab.id)}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 whitespace-nowrap"
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {selectedReport === "overview" && reportData && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Receita Total</p>
                    <p className="text-2xl font-bold text-gray-900">R$ {reportData.totalRevenue.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      {reportData.revenueGrowth >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${reportData.revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {reportData.revenueGrowth >= 0 ? "+" : ""}
                        {reportData.revenueGrowth}%
                      </span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Clientes</p>
                    <p className="text-2xl font-bold text-gray-900">{reportData.totalCustomers.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      {reportData.customerGrowth >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${reportData.customerGrowth >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {reportData.customerGrowth >= 0 ? "+" : ""}
                        {reportData.customerGrowth}%
                      </span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                    <p className="text-2xl font-bold text-gray-900">{reportData.conversionRate}%</p>
                    <div className="flex items-center mt-1">
                      {reportData.conversionGrowth >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm ${reportData.conversionGrowth >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {reportData.conversionGrowth >= 0 ? "+" : ""}
                        {reportData.conversionGrowth}%
                      </span>
                    </div>
                  </div>
                  <Target className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Satisfação</p>
                    <p className="text-2xl font-bold text-gray-900">{reportData.satisfaction}/5</p>
                    <div className="flex items-center mt-1">
                      {reportData.satisfactionGrowth >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm ${reportData.satisfactionGrowth >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {reportData.satisfactionGrowth >= 0 ? "+" : ""}
                        {reportData.satisfactionGrowth}
                      </span>
                    </div>
                  </div>
                  <MessageSquare className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Mensal</CardTitle>
              <p className="text-sm text-gray-500">Dados atualizados via API externa - Período: {selectedPeriod}</p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="vendas" fill="#8b5cf6" name="Vendas" />
                    <Bar dataKey="tickets" fill="#f97316" name="Tickets" />
                    <Bar dataKey="leads" fill="#3b82f6" name="Leads" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Funil de Conversão</CardTitle>
              <p className="text-sm text-gray-500">Dados em tempo real da API externa</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionData.map((stage, index) => {
                  const percentage = index === 0 ? 100 : (stage.value / conversionData[0].value) * 100
                  return (
                    <div key={stage.stage} className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium">{stage.stage}</div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-8 relative">
                          <div
                            className="h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: stage.color,
                              minWidth: "60px",
                            }}
                          >
                            {stage.value}
                          </div>
                        </div>
                      </div>
                      <div className="w-16 text-sm text-gray-600 text-right">{percentage.toFixed(1)}%</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedReport === "agents" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance dos Agentes</CardTitle>
              <p className="text-sm text-gray-500">Dados atualizados via API externa - Período: {selectedPeriod}</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Agente</th>
                      <th className="text-left py-3 px-4">Vendas</th>
                      <th className="text-left py-3 px-4">Tickets</th>
                      <th className="text-left py-3 px-4">Satisfação</th>
                      <th className="text-left py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agentPerformance.map((agent, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{agent.name}</td>
                        <td className="py-3 px-4">{agent.vendas}</td>
                        <td className="py-3 px-4">{agent.tickets}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <span>{agent.satisfacao}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-xs ${
                                    i < Math.floor(agent.satisfacao) ? "text-yellow-400" : "text-gray-300"
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={agent.status === "Ativo" ? "default" : "secondary"}>{agent.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
