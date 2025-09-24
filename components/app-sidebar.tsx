"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  MessageCircle,
  FileText,
  BookTemplate as FileTemplate,
  Users,
  Bot,
  LogOut,
  X,
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Chats",
    icon: MessageCircle,
    href: "/chats",
  },
  {
    title: "Relatórios",
    icon: FileText,
    href: "/relatorios",
  },
  {
    title: "Templates",
    icon: FileTemplate,
    href: "/templates",
  },
  {
    title: "CRM",
    icon: Users,
    href: "/crm",
  },
  {
    title: "Agentes I.A",
    icon: Bot,
    href: "/agentes",
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const { setOpen, setOpenMobile } = useSidebar()

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  const handleCloseSidebar = () => {
    if (isMobile) {
      setOpenMobile(false)
    } else {
      setOpen(false)
    }
  }

  return (
    <Sidebar className="border-r shadow-sm" style={{ backgroundColor: 'white' }}>
      <SidebarContent className="px-4 py-6" style={{ backgroundColor: 'white' }}>
        {/* Botão de fechar para mobile */}
        {isMobile && (
          <div className="flex justify-end mb-4">
            <button
              onClick={handleCloseSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
        
        <div className="mb-8">
          <div className="flex items-center gap-2 px-2 py-4">
            <Link href="/" onClick={handleLinkClick} className="hover:opacity-80 transition-opacity">
              <Image
                src="ellogrowth_logo.svg"
                alt="ElloGrowth Logo"
                width={400}
                height={100}
                className="max-w-full h-auto"
              />
            </Link>
          </div>
        </div>

        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className={`w-full justify-start gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? "bg-purple-100 text-purple-800 font-medium shadow-sm border border-purple-200" 
                          : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      }`}
                      style={isActive ? { backgroundColor: 'rgb(243 232 255)' } : {}}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 pb-6 border-t border-gray-100 pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="w-full justify-start gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              onClick={handleLinkClick}
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
