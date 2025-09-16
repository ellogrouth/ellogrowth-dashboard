import { NextResponse } from "next/server"

// TODO: Implementar route handler seguro para vendas
export async function GET() {
  try {
    // TODO: Implementar chamada segura para API externa
    // const apiKey = process.env.API_KEY // Seguro no servidor
    // const response = await fetch(`${process.env.EXTERNAL_API_URL}/sales`, {
    //   headers: {
    //     'Authorization': `Bearer ${apiKey}`,
    //     'Content-Type': 'application/json'
    //   }
    // })

    // Por enquanto, retorna dados mock
    const mockData = [
      { period: "1", value: 10 },
      { period: "2", value: 15 },
      { period: "3", value: 25 },
      { period: "4", value: 18 },
      { period: "5", value: 22 },
      { period: "6", value: 20 },
      { period: "7", value: 28 },
    ]

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Erro ao buscar dados de vendas:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
