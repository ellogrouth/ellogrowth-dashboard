"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSidebar } from "@/components/ui/sidebar"

export function DashboardHeader() {
  const isMobile = useIsMobile()
  const { toggleSidebar, openSidebar, closeSidebar } = useSidebar()

  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Botão de menu para mobile */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}
        
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-gray-700">Bom dia, User</span>
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder-user.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
