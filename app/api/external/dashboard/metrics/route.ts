import { NextResponse } from "next/server"

// TODO: Route handler para proxy seguro das métricas do dashboard
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "30d"

    // TODO: Implementar chamada real para API externa
    // const apiKey = process.env.API_KEY
    // const externalApiUrl = process.env.EXTERNAL_API_URL
    //
    // const response = await fetch(`${externalApiUrl}/dashboard/metrics?period=${period}`, {
    //   headers: {
    //     'Authorization': `Bearer ${apiKey}`,
    //     'Content-Type': 'application/json'
    //   }
    // })
    //
    // if (!response.ok) {
    //   throw new Error(`API externa retornou erro: ${response.status}`)
    // }
    //
    // const data = await response.json()
    // return NextResponse.json(data)

    // Dados mock enquanto a API externa não está implementada
    const mockMetrics = [
      { id: "1", title: "Vendas Hoje", value: 1250, color: "green" as const, progress: 75 },
      { id: "2", title: "Tickets Abertos", value: 23, color: "purple" as const, progress: 60 },
      { id: "3", title: "Em Andamento", value: 8, color: "orange" as const, progress: 40 },
      { id: "4", title: "Sem Resposta", value: 3, color: "red" as const, progress: 20 },
    ]

    return NextResponse.json(mockMetrics)
  } catch (error) {
    console.error("Erro ao buscar métricas da API externa:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
