"use client"

import { useState, useEffect, useMemo } from "react"
import {
  ReportsService,
  type ReportData,
  type PerformanceData,
  type ConversionData,
  type AgentPerformance,
} from "../services/reports-service"

export function useReports(period = "30d") {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])
  const [conversionData, setConversionData] = useState<ConversionData[]>([])
  const [agentPerformance, setAgentPerformance] = useState<AgentPerformance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const service = useMemo(() => new ReportsService(), [])

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        setLoading(true)
        setError(null)

        // TODO: Implementar cache local para evitar chamadas desnecessárias
        const [report, performance, conversion, agents] = await Promise.all([
          service.getReportData(period),
          service.getPerformanceData(period),
          service.getConversionData(period),
          service.getAgentPerformance(period),
        ])

        setReportData(report)
        setPerformanceData(performance)
        setConversionData(conversion)
        setAgentPerformance(agents)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar relatórios")
        console.error("Erro ao carregar dados de relatórios:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchReportsData()
  }, [service, period])

  return {
    reportData,
    performanceData,
    conversionData,
    agentPerformance,
    loading,
    error,
    refetch: () => {
      // TODO: Implementar invalidação de cache
      setLoading(true)
    },
  }
}
