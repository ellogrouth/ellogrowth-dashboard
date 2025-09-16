"use client"

import { useState, useEffect, useMemo } from "react"
import { ChatService, type IChatService } from "../services/chat-service"
import type { Chat } from "../types"

export function useChats(service?: IChatService) {
  const chatService = useMemo(() => service || new ChatService(), [service])

  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true)
        const chatsData = await chatService.getActiveChats()
        setChats(chatsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchChats()
  }, [chatService])

  const sendMessage = async (chatId: string, message: string) => {
    try {
      await chatService.sendMessage(chatId, message)
      // Refresh chats after sending message
      const updatedChats = await chatService.getActiveChats()
      setChats(updatedChats)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    }
  }

  return { chats, loading, error, sendMessage }
}
