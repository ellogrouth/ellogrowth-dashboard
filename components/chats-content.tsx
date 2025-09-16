"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useChats } from "@/lib/hooks/use-chats"
import { Skeleton } from "@/components/ui/skeleton"
import { Send, Search, Filter, MoreVertical, MessageCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ChatsContent() {
  const { chats, loading, sendMessage } = useChats()
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredChats = chats.filter(
    (chat) =>
      chat.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = async () => {
    if (!selectedChat || !message.trim()) return

    await sendMessage(selectedChat, message)
    setMessage("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "support":
        return "bg-blue-500"
      case "sales":
        return "bg-green-500"
      case "progress":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "support":
        return "Suporte"
      case "sales":
        return "Vendas"
      case "progress":
        return "Em Progresso"
      default:
        return "Desconhecido"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Chats</h1>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          <Skeleton className="h-full" />
          <div className="lg:col-span-2">
            <Skeleton className="h-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Chats</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
          <Button size="sm">Novo Chat</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Chat List */}
        <Card className="flex flex-col">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar conversas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-2">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedChat === chat.id ? "bg-purple-50 border border-purple-200" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {chat.customerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{chat.customerName}</h3>
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={`${getStatusColor(chat.status)} text-white text-xs px-2 py-0.5`}>
                        {getStatusLabel(chat.status)}
                      </Badge>
                      {chat.agent && <span className="text-xs text-gray-500">{chat.agent}</span>}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          {selectedChat ? (
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const chat = chats.find((c) => c.id === selectedChat)
                      return chat ? (
                        <>
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
                            <h3 className="font-medium text-gray-900">{chat.customerName}</h3>
                            <div className="flex items-center gap-2">
                              <Badge className={`${getStatusColor(chat.status)} text-white text-xs px-2 py-0.5`}>
                                {getStatusLabel(chat.status)}
                              </Badge>
                              <span className="text-xs text-gray-500">Online</span>
                            </div>
                          </div>
                        </>
                      ) : null
                    })()}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                      <DropdownMenuItem>Transferir chat</DropdownMenuItem>
                      <DropdownMenuItem>Arquivar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {/* Mock messages */}
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Olá, preciso de ajuda com meu pedido</p>
                      <span className="text-xs text-gray-500 mt-1 block">14:30</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-purple-600 text-white rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Olá! Claro, posso te ajudar. Qual é o número do seu pedido?</p>
                      <span className="text-xs text-purple-200 mt-1 block">14:32</span>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">É o pedido #12345</p>
                      <span className="text-xs text-gray-500 mt-1 block">14:33</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Digite sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 min-h-[40px] max-h-32 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={!message.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Selecione um chat para começar a conversa</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
