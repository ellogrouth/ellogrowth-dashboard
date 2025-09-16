import { NextResponse } from "next/server"

// TODO: Implementar route handler seguro para tickets
export async function GET() {
  try {
    // TODO: Implementar chamada segura para API externa
    // const apiKey = process.env.API_KEY // Seguro no servidor
    // const response = await fetch(`${process.env.EXTERNAL_API_URL}/tickets`, {
    //   headers: {
    //     'Authorization': `Bearer ${apiKey}`,
    //     'Content-Type': 'application/json'
    //   }
    // })

    // Por enquanto, retorna dados mock
    const mockData = {
      support: 45,
      inProgress: 30,
      noResponse: 25,
      ticketTypes: [
        { id: "support", name: "Suporte Técnico", color: "#3b82f6", count: 45 },
        { id: "sales", name: "Vendas", color: "#10b981", count: 20 },
        { id: "progress", name: "Em Andamento", color: "#f59e0b", count: 30 },
        { id: "noresponse", name: "Sem Resposta", color: "#ef4444", count: 25 },
        { id: "financial", name: "Financeiro", color: "#8b5cf6", count: 15 },
      ],
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Erro ao buscar dados de tickets:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
