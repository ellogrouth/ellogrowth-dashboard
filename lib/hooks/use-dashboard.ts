"use client"

import { useState, useEffect, useMemo } from "react"
import { DashboardService, type IDashboardService } from "../services/dashboard-service"
import type { Metric, TicketData, SalesData } from "../types"

export function useDashboard(service?: IDashboardService) {
  const dashboardService = useMemo(() => service || new DashboardService(), [service])

  const [metrics, setMetrics] = useState<Metric[]>([])
  const [ticketData, setTicketData] = useState<TicketData | null>(null)
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [syncData, salesDataResult] = await Promise.all([
          dashboardService.getSynchronizedData(),
          dashboardService.getSalesData(),
        ])

        setMetrics(syncData.metrics)
        setTicketData(syncData.ticketData)
        setSalesData(salesDataResult)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dashboardService])

  return { metrics, ticketData, salesData, loading, error }
}
