import { NextResponse } from "next/server"

// TODO: Implementar route handler seguro para métricas
export async function GET() {
  try {
    // TODO: Implementar autenticação segura no servidor
    // const apiKey = process.env.API_KEY // Seguro no servidor
    // const response = await fetch(`${process.env.EXTERNAL_API_URL}/metrics`, {\n    //   headers: {\n    //     'Authorization': `Bearer ${apiKey}`,\n    //     'Content-Type': 'application/json'\n    //   }\n    // })

    // Dados baseados no gráfico: Total 135 tickets
    // Suporte Técnico: 45, Vendas: 20, Em Andamento: 30, Sem Resposta: 25, Financeiro: 15
    const mockData = [
      { id: "1", title: "Vendas Realizadas", value: 20, color: "green", progress: 65 },
      { id: "2", title: "Em Andamento", value: 30, color: "purple", progress: 60 },
      { id: "3", title: "Tickets - Suporte", value: 45, color: "orange", progress: 80 },
      { id: "4", title: "Pararam De Responder", value: 25, color: "red", progress: 40 },
    ]

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Erro ao buscar métricas:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
